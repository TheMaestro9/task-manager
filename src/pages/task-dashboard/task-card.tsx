import { Task } from "../../models/task/task";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="p-6 rounded-md border-gray-200 border shadow-sm">
      <div>{task.title}</div>
      <div>{task.description}</div>
    </div>
  );
};

export default TaskCard;
