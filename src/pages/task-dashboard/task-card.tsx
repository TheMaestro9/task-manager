import { getTaskStatusName, Task, TaskStatus } from "../../models/task/task";
import Badge from "../../shared/badge";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const getBadgeColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDING:
        return "bg-gray-200";
      case TaskStatus.IN_PROGRESS:
        return "bg-blue-200";
      case TaskStatus.COMPLETE:
        return "bg-green-200";
    }
  };

  return (
    <div className="p-6 bg-white rounded-md border-gray-200 border shadow-sm">
      <div>{task.title}</div>
      <div>{task.description}</div>
      <Badge
        placeholder={getTaskStatusName(task.status)}
        color={getBadgeColor(task.status)}
        fontColor="text-gray-800"
      />
    </div>
  );
};

export default TaskCard;
