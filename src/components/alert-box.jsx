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

export const AlertBox = ({
    handleConfirm,
    children,
    asChild,
    description,
    confirmText = "Continue",
    cancelText = "Cancel",
    title = "Are you absolutely sure?",
    isOpen,
    setIsOpen
}) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(a => !a)}>
            <AlertDialogTrigger asChild={asChild}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-800">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>{confirmText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertBox;