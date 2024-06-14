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

        if (Object.keys(filteredData).length) {
            setAddLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setAddLoading(false);
            setAddComplete(true);
        } else {
            alert('No data to add');
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
                    result={selectedTables}
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
                                Data has been added successfully.
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                You can view the details of the added data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    ) : <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. These data will be added to database.
                        </AlertDialogDescription>
                        <h3 className="font-bold">Data will be added in following tables</h3>
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