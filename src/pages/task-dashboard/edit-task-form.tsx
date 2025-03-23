// Dialog.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTaskContext } from "../../context/TaskContext";
import { Task } from "../../models/task/task";
import Popup from "../../shared/popup";
import TextInput from "../../shared/form-fields/text-input";
import TextArea from "../../shared/form-fields/text-area";

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

  useEffect(() => {
    reset({
      title: task.title,
      description: task.description,
    });
  }, [task, reset]);

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

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
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
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-300 text-gray-800 rounded hover:bg-red-400"
                >
                  Delete Task
                </button>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      }
    />
  );
}
