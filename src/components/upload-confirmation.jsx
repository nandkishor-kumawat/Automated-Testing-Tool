import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useTableStore } from "@/store";
import { useMemo, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import Modal from "./modal";
import { Button } from "./ui/button";
import TaskDetails from "./task-details";
import { TableData } from "@/lib/constants";
import { fetchQuery } from "@/lib/helpers";

export const UploadConfirmationModal = ({
    fileData,
    handleClosePreviewModal
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { selectedTables } = useTableStore();
    const [addLoading, setAddLoading] = useState(false);
    const [addComplete, setAddComplete] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [results, setResults] = useState(null);

    const filteredData = useMemo(() => {
        return selectedTables.reduce((acc, table) => {
            if (fileData[table.id]) acc[table.id] = fileData[table.id];
            return acc;
        }, {})
    }, [fileData, selectedTables])


    const handleClose = e => {
        e.preventDefault();
        setIsOpen(false);
        if (addComplete) {
            setAddComplete(false);
            handleClosePreviewModal();
        }
    }


    const handleConfirm = async (e) => {
        e.preventDefault();

        if (addComplete) {
            setIsDetailModalOpen(true);
            setIsOpen(false);
            return;
        }

        if (Object.keys(filteredData).length === 0) {
            alert('No data to add');
            return;
        }

        setAddLoading(true);

        try {
            const promises = Object.entries(filteredData).map(async ([tableId, data]) => {
                const curr = TableData.find(t => t.id === tableId);

                if (!curr) return { id: tableId, result: [] };

                const results = await Promise.all(data.map(async (d) => {
                    return fetchQuery(curr.postEndpoint, d)
                }));

                return {
                    id: tableId,
                    result: results
                };
            });


            const results = await Promise.all(promises);

            const refinedResult = results.reduce((acc, curr) => {
                acc[curr.id] = curr.result;
                return acc;
            }, {});

            console.log(refinedResult)

            setResults(refinedResult);
            setAddComplete(true);
        } catch (error) {
            console.error('Error adding data:', error);
        } finally {
            setAddLoading(false);
        }
    }



    const handleCloseViewDetailsModal = () => {
        setIsDetailModalOpen(false);
        setAddComplete(false);
        handleClosePreviewModal();
    }


    return (
        <>
            <Modal isOpen={isDetailModalOpen} setIsOpen={setIsDetailModalOpen}>
                <TaskDetails
                    handleClose={handleCloseViewDetailsModal}
                    result={results}
                    affectedTables={filteredData}
                    title={"Details of Added Data"}
                />
            </Modal>

            <AlertDialog open={isOpen} onOpenChange={setIsOpen} >
                <AlertDialogTrigger asChild>
                    <Button className='bg-primary/60 flex-auto' onClick={e => {
                        e.preventDefault();
                        if (Object.keys(filteredData).length) setIsOpen(true);
                        else alert('No data to add');
                    }} >Upload Data</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-800">

                    {addComplete ? (
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                The data has been successfully added.
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                You can view the details of the added data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    ) : <AlertDialogHeader>
                        <AlertDialogTitle>Confirmation Required</AlertDialogTitle>
                        <AlertDialogDescription>
                            The following information will be added to the database.
                        </AlertDialogDescription>
                        <h2 className="font-bold text-sm">List of tables where data will be added</h2>
                        <ScrollArea>
                            <div className='grid grid-cols-2 flex-wrap gap-2'>
                                {selectedTables.map((table, i) => {
                                    if (filteredData[table.id]) return (
                                        <div key={i} className='flex justify-center items-center border-gray-700 border px-2 py-2 rounded-md'>
                                            <label className='mx-2 text-center text-gray-400 text-sm text-balance'>{table.name}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </ScrollArea>
                    </AlertDialogHeader>
                    }
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleClose}>{addComplete ? "Close" : "Cancel"}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm} disabled={addLoading}>
                            {addComplete ? "View Details" : addLoading ? "Adding..." : "Continue"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default UploadConfirmationModal;