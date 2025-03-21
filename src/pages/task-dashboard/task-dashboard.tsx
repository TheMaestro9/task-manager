import { useEffect, useState } from "react";
import { first } from "rxjs";
import { Task } from "../../models/task/task";
import { addTask$, fetchTasks$ } from "../../models/task/task-service";
import TaskCard from "./task-card";

const TaskDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    fetchTasks$()
      .pipe(first())
      .subscribe((fetchedTasks) => {
        setTasks(fetchedTasks);
      });
  }, []);

  function addTask() {
    const newTask = new Task();
    newTask.title = "New Task";
    newTask.description = "New Task Description";
    addTask$(newTask).subscribe((addedTask) => {
      setTasks([...tasks, addedTask]);
    });
  }
  return (
    <div className="flex flex-wrap gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      <div onClick={addTask}> add task </div>
    </div>
  );
};

export default TaskDashboard;
