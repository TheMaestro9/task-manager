// services/api.ts
import { Observable, of } from "rxjs";
import { Task, TaskStatus } from "./task";

export function fetchTasks$() {
  return of(getFromLocalStorage());
}

// this function mimics the api call to add a task
export function addTask$(task: Task): Observable<Task> {
  task.id = generateRandomId();
  const tasks = getFromLocalStorage();
  tasks.push(task);
  saveToLocalStorage(tasks);
  return of(task);
}

export function deleteTask$(id: string): Observable<void> {
  const tasks = getFromLocalStorage();
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveToLocalStorage(tasks);
  }
  return of(undefined);
}

export function moveTask$(
  taskId: string,
  newStatus: TaskStatus
): Observable<void> {
  const tasks = getFromLocalStorage();
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks[index].status = newStatus;
    saveToLocalStorage(tasks);
  }
  return of(undefined);
}

export function editTask$(task: Partial<Task>): Observable<Task> {
  const tasks = getFromLocalStorage();
  const index = tasks.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...task };
    saveToLocalStorage(tasks);
  }
  return of(tasks[index]);
}

function generateRandomId() {
  return Math.random().toString(20);
}

function saveToLocalStorage(newTasks: Task[]) {
  localStorage.setItem("tasks", JSON.stringify(newTasks));
}

function getFromLocalStorage(): Task[] {
  const tasksFromStorage = localStorage.getItem("tasks");

  if (tasksFromStorage) {
    return JSON.parse(tasksFromStorage) as Task[];
  }

  return [];
}
