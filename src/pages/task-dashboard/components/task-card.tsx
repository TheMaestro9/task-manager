import { useSortable } from "@dnd-kit/sortable";
import EditIcon from "../../../assets/icons/pencil.svg";
import { getTaskStatusName, Task, TaskStatus } from "../../../models/task/task";
import Badge from "../../../shared/badge";
import React from "react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  console.log("rending card");
  const getBadgeColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDING:
        return "bg-gray-200";
      case TaskStatus.IN_PROGRESS:
        return "bg-blue-200";
      case TaskStatus.COMPLETE:
        return "bg-green-200";
    }
  };
  const getTaskStatusCircleColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDING:
        return "bg-gray-500";
      case TaskStatus.IN_PROGRESS:
        return "bg-blue-500";
      case TaskStatus.COMPLETE:
        return "bg-green-500";
    }
  };

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition: "all 0ms",
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onClick={() => onEdit(task)}
      className="py-2 px-4 flex gap-2 flex-col bg-white rounded-xl border-gray-200 border shadow-sm hover:border-blue-500 transition-all duration-300 cursor-pointer"
    >
      <div className="flex justify-between">
        <div className="font-semibold">{task.title}</div>
        <div className="p-1">
          <img width={14} src={EditIcon} alt="edit" />
        </div>
      </div>
      <div className="text-sm text-gray-500 line-clamp-2">
        {task.description}
      </div>
      <Badge
        placeholder={getTaskStatusName(task.status)}
        color={getBadgeColor(task.status)}
        fontColor="text-gray-800"
        leadingIcon={
          <div
            className={`w-2 h-2 rounded-full ${getTaskStatusCircleColor(
              task.status
            )}`}
          />
        }
      />
    </div>
  );
};

export default React.memo(TaskCard);
