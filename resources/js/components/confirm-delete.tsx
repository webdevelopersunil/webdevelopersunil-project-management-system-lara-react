// resources/js/components/confirm-delete.tsx
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
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { useForm } from "@inertiajs/react";

interface ConfirmDeleteProps {
    itemId: number;
    itemName: string;
    deleteUrl: string;
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    dropItemMenuItemLabel?: string;
}

export default function ConfirmDelete({ 
    itemId, 
    itemName, 
    deleteUrl, 
    title = "Delete Row", 
    description = `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
    cancelText = "Cancel",
    confirmText = "Delete",
    dropItemMenuItemLabel = "Delete Row"
}: ConfirmDeleteProps) {
    const { delete: destroy, processing } = useForm();

    // const handleDelete = () => {
    //     destroy(deleteUrl, {
    //         preserveScroll: true,
    //     });
    // };


    const handleDelete = () => {
        destroy(deleteUrl, {
            preserveScroll: true,
            preserveState: true, // ← Add this to preserve flash messages
            onSuccess: () => {
                // Flash message is handled by Laravel controller
                // No need to do anything here
            },
            onError: (errors) => {
                console.error('Delete failed:', errors);
            }
        });
    };


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem 
                    className="cursor-pointer text-red-600" 
                    onSelect={(e) => e.preventDefault()}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {dropItemMenuItemLabel}
                </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700"
                        disabled={processing}
                    >
                        {processing ? "Deleting..." : confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}