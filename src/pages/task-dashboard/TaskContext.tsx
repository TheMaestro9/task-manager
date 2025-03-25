import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { first } from "rxjs";
import { Task, TaskStatus } from "../../models/task/task";
import {
  addTask$,
  deleteTask$,
  editTask$,
  fetchTasks$,
  moveTask$,
} from "../../models/task/task-apis";

interface TaskContextType {
  tasks: Task[];
  addTask: (taskData: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksByStatus: (status: string) => Task[];
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  editTask: (task: Task) => void;
  reorderTasksInColumn: (
    status: TaskStatus,
    activeId: string,
    overId: string
  ) => void;
  getTaskById: (id: string) => Task | undefined;
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

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "tasks" && event.newValue) {
        const updatedTasks = JSON.parse(event.newValue);
        setTasks(updatedTasks);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    moveTask$(taskId, newStatus).subscribe(() => {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    });
  };

  const editTask = (task: Partial<Task>) => {
    editTask$(task).subscribe(() => {
      setTasks(tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)));
    });
  };

  const getTaskById = (id: string): Task | undefined => {
    return tasks.find((task) => task.id === id);
  };

  const reorderTasksInColumn = (
    status: TaskStatus,
    activeId: string,
    overId: string
  ) => {
    setTasks((prevTasks) => {
      const columnTasks = prevTasks.filter((t) => t.status === status);
      const otherTasks = prevTasks.filter((t) => t.status !== status);

      const activeIndex = columnTasks.findIndex((t) => t.id === activeId);
      const overIndex = columnTasks.findIndex((t) => t.id === overId);

      if (activeIndex === -1 || overIndex === -1) return prevTasks;

      const updatedColumnTasks = [...columnTasks];
      const [moved] = updatedColumnTasks.splice(activeIndex, 1);
      updatedColumnTasks.splice(overIndex, 0, moved);

      return [...otherTasks, ...updatedColumnTasks];
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        getTasksByStatus,
        deleteTask,
        moveTask,
        editTask,
        reorderTasksInColumn,
        getTaskById,
      }}
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
