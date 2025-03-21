export class Task {
  id: string = "";
  title: string = "";
  description: string = "";
  status: TaskStatus = TaskStatus.PENDING;
}

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETE = "COMPLETE",
}

export function getTaskStatusName(status: TaskStatus) {
  return (
    status.charAt(0).toUpperCase() +
    status.replace("_", " ").slice(1).toLowerCase()
  );
}
