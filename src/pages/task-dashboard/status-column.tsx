import { Task } from "../../models/task/task";

import React, { useState } from "react";
import PlusIcon from "../../assets/icons/plus.svg";
import { useTaskContext } from "../../context/TaskContext";
import { getTaskStatusName, TaskStatus } from "../../models/task/task";
import { EditTaskForm } from "./edit-task-form";
import TaskCard from "./task-card";

export interface StatusColumnProps {
  status: TaskStatus;
}

const StatusColumn: React.FC<StatusColumnProps> = ({ status }) => {
  const { getTasksByStatus } = useTaskContext();
  const [taskToEdit, setTaskToEdit] = useState<Task>(new Task());
  const tasksInColumn = getTasksByStatus(status);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  const handleTaskClick = (task: Task) => {
    console.log(task);
  };

  const handleTaskEdit = (task: Task) => {
    setIsTaskFormOpen(true);
    setTaskToEdit(task);
  };

  const handleTaskAdd = () => {
    setIsTaskFormOpen(true);
    const newTask: Task = new Task();
    newTask.status = status;
    setTaskToEdit(newTask);
  };

  return (
    <div className="flex flex-col justify-between gap-4 p-4 bg-gray-100 rounded-xl w-[300px] ">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold mb-2">
          {getTaskStatusName(status)}
        </h2>

        {tasksInColumn.length === 0 ? (
          <div className="text-gray-400 italic">No tasks</div>
        ) : (
          tasksInColumn.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={handleTaskEdit}
              onEdit={handleTaskEdit}
            />
          ))
        )}
      </div>

      <div className="flex justify-center items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-300">
        <img src={PlusIcon} alt="add-task" />
        <span className="text-gray-500" onClick={() => handleTaskAdd()}>
          Add Task
        </span>
      </div>
      <EditTaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        task={taskToEdit}
      />
    </div>
  );
};

export default StatusColumn;
