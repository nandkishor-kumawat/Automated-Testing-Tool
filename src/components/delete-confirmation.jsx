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
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import Modal from "./modal";
import { Button } from "./ui/button";
import TaskDetails from "./task-details";

export const DeleteConfirmationModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { selectedTables } = useTableStore();
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteComplete, setDeleteComplete] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [results, setResults] = useState(null);


    const handleClose = e => {
        e.preventDefault();
        setIsOpen(false);
        if (deleteComplete) setDeleteComplete(false);
    }

    const handleConfirm = async (e) => {
        e.preventDefault();
        if (deleteComplete) {
            setIsDetailModalOpen(true);
            setIsOpen(false);
            return;
        }

        if (selectedTables.length) {
            setDeleteLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setDeleteLoading(false);
            setDeleteComplete(true);
        }
    }

    const handleCloseViewDetailsModal = () => {
        setIsDetailModalOpen(false);
        setDeleteComplete(false);
    }

    return (
        <>
            <Modal isOpen={isDetailModalOpen} setIsOpen={setIsDetailModalOpen}>
                <TaskDetails
                    handleClose={handleCloseViewDetailsModal}
                    result={results}
                    title="Details of Deleted Data"
                />
            </Modal>

            <AlertDialog open={isOpen} onOpenChange={setIsOpen} >
                <AlertDialogTrigger asChild>
                    <Button
                        variant={"destructive"}
                        disabled={!selectedTables.length}
                    >
                        Delete Selected</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-800">

                    {deleteComplete ? (
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Data has been deleted successfully.
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                You can view the details of the deleted data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    ) : <AlertDialogHeader>
                        <AlertDialogTitle>Warning: Irreversible Action</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action is irreversible and will permanently delete data from the database. The following tables will be affected
                        </AlertDialogDescription>
                        <h3 className="font-bold">Selected Tables</h3>
                        <ScrollArea>
                            <div className='grid grid-cols-2 flex-wrap gap-2'>
                                {selectedTables.map((table, i) => (
                                    <div key={i} className='flex justify-center items-center border-gray-700 border px-2 py-2 rounded-md'>
                                        <label className='mx-2 text-center text-gray-400 text-sm text-balance'>{table.name}</label>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </AlertDialogHeader>
                    }
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleClose}>{deleteComplete ? "Close" : "Cancel"}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm} disabled={deleteLoading}>
                            {deleteComplete ? "View Details" : deleteLoading ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteConfirmationModal;