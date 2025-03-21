import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { first } from "rxjs";
import { Task } from "../models/task/task";
import {
  addTask$,
  deleteTask$,
  fetchTasks$,
} from "../models/task/task-service";

interface TaskContextType {
  tasks: Task[];
  addTask: (taskData: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksByStatus: (status: string) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks$()
      .pipe(first())
      .subscribe((fetchedTasks) => {
        setTasks(fetchedTasks);
      });
  }, []);

  const addTask = (taskData: Partial<Task>) => {
    const newTask = new Task();
    newTask.title = taskData.title || "New Task";
    newTask.description = taskData.description || "New Task Description";
    newTask.status = taskData.status || newTask.status;

    addTask$(newTask).subscribe((addedTask) => {
      setTasks([...tasks, addedTask]);
    });
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  const deleteTask = (id: string) => {
    deleteTask$(id).subscribe(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, getTasksByStatus, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
