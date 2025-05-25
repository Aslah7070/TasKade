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
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
  triggerText: React.ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  onConfirm: () => void;
  variant?: "outline" | "destructive" | "default";
}

export function DeleteDialog({
  triggerText,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  onConfirm,
  variant = "destructive",
}: DeleteDialogProps) {
  return (
    <AlertDialog  >
      <AlertDialogTrigger asChild>
        <Button variant={variant}>{triggerText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent  >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-red-500">Cancel</AlertDialogCancel>
          <AlertDialogAction className="text-green-500" onClick={onConfirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
