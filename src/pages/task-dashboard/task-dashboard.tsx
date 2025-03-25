import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useState } from "react";
import { TaskProvider, useTaskContext } from "./TaskContext";
import { TaskStatus } from "../../models/task/task";
import StatusColumn from "./components/status-column";
import "./task-dashboard.scss";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./components/task-card";

const TaskDashboardContent: React.FC = () => {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const { moveTask, getTaskById, reorderTasksInColumn, tasks } =
    useTaskContext();

  const allTaskIds = tasks.map((task) => task.id);

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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTaskId(null); // clear after drop

    console.log("koko");
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (isDroppingOnColumn(overId)) {
      handleMoveToEmptyColumn(activeId, overId as TaskStatus);
      return;
    }

    handleTaskReorderOrMove(activeId, overId);
  };

  const isDroppingOnColumn = (id: string): boolean => {
    return Object.values(TaskStatus).includes(id as TaskStatus);
  };

  const handleMoveToEmptyColumn = (taskId: string, toStatus: TaskStatus) => {
    const task = getTaskById(taskId);
    if (!task || task.status === toStatus) return;

    moveTask(taskId, toStatus);
  };

  const handleTaskReorderOrMove = (activeId: string, overId: string) => {
    const sourceTask = getTaskById(activeId);
    const targetTask = getTaskById(overId);
    if (!sourceTask || !targetTask) return;

    const fromStatus = sourceTask.status;
    const toStatus = targetTask.status;

    if (fromStatus === toStatus) {
      reorderTasksInColumn(fromStatus, activeId, overId);
    } else {
      moveTask(activeId, toStatus);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <SortableContext
        items={allTaskIds}
        strategy={verticalListSortingStrategy}
      >
        <div className="p-6 diagonal-gradient">
          <div className="flex justify-between items-center mb-6"></div>

          <div className="flex gap-6 overflow-x-auto pb-4">
            <StatusColumn status={TaskStatus.PENDING} />
            <StatusColumn status={TaskStatus.IN_PROGRESS} />
            <StatusColumn status={TaskStatus.COMPLETE} />
          </div>
        </div>
      </SortableContext>

      <DragOverlay>
        {activeTaskId ? (
          <TaskCard
            task={getTaskById(activeTaskId)!}
            onClick={() => {}}
            onEdit={() => {}}
          />
        ) : null}
      </DragOverlay>
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
