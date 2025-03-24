// Dialog.tsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTaskContext } from "../../context/TaskContext";
import { Task } from "../../models/task/task";
import Popup from "../../shared/popups/popup";
import TextInput from "../../shared/form-fields/text-input";
import TextArea from "../../shared/form-fields/text-area";
import Button from "../../shared/button";
import ConfirmDialog from "../../shared/popups/confim-dialog";

interface AddTaskFormProps {
  isOpen: boolean;
  task: Task;
  onClose: () => void;
}

const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters"),
});

type TaskFormData = z.infer<typeof TaskSchema>;

export function EditTaskForm({ isOpen, onClose, task }: AddTaskFormProps) {
  const { addTask, deleteTask, editTask } = useTaskContext();
  const isOnEditMode = task.id !== "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  });

  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    reset({
      title: task.title,
      description: task.description,
    });
  }, [task, reset]);

  useEffect(() => {
    if (!isOpen) {
      setShowConfirm(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const onSubmit = (data: TaskFormData) => {
    const newTask: Task = {
      id: task.id,
      title: data.title,
      description: data.description || "",
      status: task.status,
    };

    isOnEditMode ? editTask(newTask) : addTask(newTask);
    onClose();
  };

  const handleDeleteClick = () => setShowConfirm(true);
  const handleConfirmDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <div>
      <Popup
        onClose={onClose}
        content={
          <div>
            <h2 className="text-xl font-bold mb-4">
              {isOnEditMode ? "Edit Task" : "Add New Task"}
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <TextInput
                label="Title"
                type="text"
                register={register("title")}
                error={errors.title?.message}
              />
              <TextArea
                label="Description"
                register={register("description")}
                error={errors.description?.message}
              />
              <div
                className={`flex gap-2 ${
                  isOnEditMode ? "justify-between" : "justify-end"
                }`}
              >
                {isOnEditMode && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={handleDeleteClick}
                  >
                    Delete Task
                  </Button>
                )}
                <div className="flex gap-2">
                  <Button type="button" variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </div>
        }
      />
      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </div>
  );
}
