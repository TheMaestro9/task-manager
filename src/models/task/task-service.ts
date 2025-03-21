// services/api.ts
import { Observable, of } from "rxjs";
import { Task } from "./task";

export function fetchTasks$() {
  return of(getFromLocalStorage());
}

// this function mimics the api call to add a task
export function addTask$(task: Task): Observable<Task> {
  task.id = generateRandomId();
  saveToLocalStorage(task);
  return of(task);
}

export function deleteTask$(id: string): Observable<void> {
  const tasks = getFromLocalStorage();
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  return of(undefined);
}

export function generateRandomId() {
  return Math.random().toString(20);
}

function saveToLocalStorage(task: Task) {
  const tasks = getFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getFromLocalStorage(): Task[] {
  const tasksFromStorage = localStorage.getItem("tasks");

  if (tasksFromStorage) {
    return JSON.parse(tasksFromStorage) as Task[];
  }

  return [];
}
