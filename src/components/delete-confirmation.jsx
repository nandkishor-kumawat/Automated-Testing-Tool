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
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import Modal from "./modal";
import { useRouter } from "next/navigation";

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
        console.log('done');
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

    return (
        <>
            <Modal isOpen={isDetailModalOpen} setIsOpen={setIsDetailModalOpen}>
                <div className='bg-gray-600 py-4 px-6 rounded-md flex flex-col max-h-[400px]'>
                    <h2 className='text-lg font-bold my-3'>Details of Deleted Data</h2>
                    <div className="flex-1 overflow-hidden">
                        <ScrollArea className='h-full'>
                            <table className='w-full h-full'>
                                <thead className="sticky top-0 bg-gray-400">
                                    <tr>
                                        <th className='text-left'>Table Name</th>
                                        <th className='text-left'>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {selectedTables.map((result, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}. {result.name}</td>
                                            <td>{i & 1 ? "Success" : "Error"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </ScrollArea>
                    </div>
                    <div className="flex justify-end mt-3">
                        <button onClick={() => {
                            setIsDetailModalOpen(false);
                            setDeleteComplete(false);
                        }} className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-100 ease-in-out'>Close</button>
                    </div>
                </div>
            </Modal>

            <AlertDialog open={isOpen} onOpenChange={setIsOpen} >
                <AlertDialogTrigger asChild>
                    <button type='button' className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-100 ease-in-out'>Delete Selected</button>
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
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete data from database.
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