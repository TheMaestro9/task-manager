// Dialog.tsx
import { useEffect, useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { Task } from "../../models/task/task";
import Popup from "../../shared/popup";

interface AddTaskFormProps {
  isOpen: boolean;
  task: Task;
  onClose: () => void;
}

export function EditTaskForm({ isOpen, onClose, task }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const { addTask, deleteTask, editTask } = useTaskContext();
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setShowDeleteButton(task.id !== "");
  }, [task]);

  if (!isOpen) return null;
  const isOnEditMode = task.id !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      id: task.id,
      title,
      description,
      status: task.status,
    };

    if (isOnEditMode) editTask(newTask);
    else addTask(newTask);
    onClose(); // close the modal after save
    setTitle(""); // reset form
    setDescription("");
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
          <h2 className="text-xl font-bold mb-4">Add New Task</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows={3}
              />
            </div>
            <div
              className={`flex gap-2 ${
                showDeleteButton ? "justify-between" : "justify-end"
              }`}
            >
              {showDeleteButton && (
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
    ></Popup>
  );
}
