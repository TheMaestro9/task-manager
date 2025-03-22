import {
  closestCorners,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React from "react";
import { TaskProvider, useTaskContext } from "../../context/TaskContext";
import { TaskStatus } from "../../models/task/task";
import StatusColumn from "./status-column";
import "./task-dashboard.scss";

const TaskDashboardContent: React.FC = () => {
  const { moveTask } = useTaskContext();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // User has to move at least 10 pixels
      // before a drag is triggered.
      // A simple click won't activate drag.
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const taskId = active.id.toString();
    const newStatus = over.id as TaskStatus;

    moveTask(taskId, newStatus);
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="p-6 diagonal-gradient">
        <div className="flex justify-between items-center mb-6"></div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          <StatusColumn status={TaskStatus.PENDING} />
          <StatusColumn status={TaskStatus.IN_PROGRESS} />
          <StatusColumn status={TaskStatus.COMPLETE} />
        </div>
      </div>
    </DndContext>
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
