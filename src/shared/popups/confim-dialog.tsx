// shared/confirm-dialog/ConfirmDialog.tsx
import { ReactNode } from "react";
import Button from "../button";
import Popup from "./popup";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string | ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

const ConfirmDialog = ({
  isOpen,
  title = "Are you sure?",
  message,
  onCancel,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <Popup onClose={onCancel}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-sm text-gray-700">{message}</div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default ConfirmDialog;
