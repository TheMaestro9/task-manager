// services/api.ts
import { of } from "rxjs";
import { Task, TaskStatus } from "./task";

export function fetchTasks$() {
  return of(getTaskDummyTasks());
}

function getTaskDummyTasks(): Task[] {
  return [
    {
      title: "Task 1",
      description: "Task 1 description",
      status: TaskStatus.PENDING,
    },
    {
      title: "Task 2",
      description: "Task 2 description",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      title: "Task 3",
      description: "Task 3 description",
      status: TaskStatus.COMPLETE,
    },
  ];
}
