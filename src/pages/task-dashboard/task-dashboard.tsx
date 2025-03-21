import React from "react";
import { TaskProvider, useTaskContext } from "../../context/TaskContext";
import { TaskStatus } from "../../models/task/task";
import StatusColumn from "./status-column";
import "./task-dashboard.scss";

const TaskDashboardContent: React.FC = () => {
  const { addTask } = useTaskContext();

  const handleAddTask = () => {
    addTask({
      title: "New Task",
      description: "New Task Description",
    });
  };

  return (
    <div className="p-6 diagonal-gradient">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Task Dashboard</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        <StatusColumn status={TaskStatus.PENDING} />
        <StatusColumn status={TaskStatus.IN_PROGRESS} />
        <StatusColumn status={TaskStatus.COMPLETE} />
      </div>
    </div>
  );
};

const TaskDashboard: React.FC = () => {
  return (
    <TaskProvider>
      <TaskDashboardContent />
    </TaskProvider>
  );
};

export default TaskDashboard;
