import React from "react";
import { useTaskContext } from "../../context/TaskContext";
import { getTaskStatusName, TaskStatus } from "../../models/task/task";
import TaskCard from "./task-card";

export interface StatusColumnProps {
  status: TaskStatus;
}

const StatusColumn: React.FC<StatusColumnProps> = ({ status }) => {
  const { getTasksByStatus } = useTaskContext();
  const tasksInColumn = getTasksByStatus(status);

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
    </div>
  );
};

export default StatusColumn;
