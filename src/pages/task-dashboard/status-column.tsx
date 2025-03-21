import React, { useState } from "react";
import PlusIcon from "../../assets/icons/plus.svg";
import { useTaskContext } from "../../context/TaskContext";
import { getTaskStatusName, TaskStatus } from "../../models/task/task";
import { AddTaskForm } from "./add-task-form";
import TaskCard from "./task-card";

export interface StatusColumnProps {
  status: TaskStatus;
}

const StatusColumn: React.FC<StatusColumnProps> = ({ status }) => {
  const { getTasksByStatus } = useTaskContext();
  const tasksInColumn = getTasksByStatus(status);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-md min-w-[300px]">
      <h2 className="text-lg font-semibold mb-2">
        {getTaskStatusName(status)}
      </h2>

      {tasksInColumn.length === 0 ? (
        <div className="text-gray-400 italic">No tasks</div>
      ) : (
        tasksInColumn.map((task) => <TaskCard key={task.id} task={task} />)
      )}
      <div className="flex justify-center items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-300">
        <img src={PlusIcon} alt="add-task" />
        <span className="text-gray-500" onClick={() => setIsTaskFormOpen(true)}>
          Add Task
        </span>
      </div>
      <AddTaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        taskStatus={status}
      />
    </div>
  );
};

export default StatusColumn;
