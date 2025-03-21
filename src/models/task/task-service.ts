// services/api.ts
import { Observable, of } from "rxjs";
import { Task, TaskStatus } from "./task";

export function fetchTasks$() {
  return of(getDummyTasks());
}

// this function mimics the api call to add a task
export function addTask$(task: Task): Observable<Task> {
  task.id = generateRandomId();
  return of(task);
}

export function generateRandomId() {
  return Math.random().toString(20);
}

function getDummyTasks(): Task[] {
  return [
    {
      id: "1",
      title: "Task 1",
      description: "Task 1 description",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Task 2 description",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Task 3 description",
      status: TaskStatus.COMPLETE,
    },
  ];
}
