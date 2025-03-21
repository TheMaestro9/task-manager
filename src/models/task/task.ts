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
