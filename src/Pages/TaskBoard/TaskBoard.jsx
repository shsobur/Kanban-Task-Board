import { useState, useEffect } from "react";
import Navbar from "../../Components/BoardLayout/Navbar/Navbar";
import AddTaskModal from "../../Components/AddTaskModal/AddTaskModal";
import FilterBar from "../../Components/BoardLayout/FilterBar/FilterBar";
import ProgressBar from "../../Components/BoardLayout/ProgressBar/ProgressBar";
import TaskBoardColumns from "../../Components/BoardLayout/TaskBoardColumns/TaskBoardColumns";

const TaskBoard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize tasks from LocalStorage or empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("KanBanTask");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save to LocalStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("KanBanTask", JSON.stringify(tasks));
  }, [tasks]);

  // Handle adding a new task
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Logic for Dark Mode...
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        tasks={tasks}
      />

      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-[1536px] min-w-[320px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <ProgressBar tasks={tasks} />
          <FilterBar />

          {/* Pass tasks and setTasks to handle DND updates later */}
          <TaskBoardColumns tasks={tasks} setTasks={setTasks} />
        </div>
      </main>

      {/* The Modal Component */}
      <AddTaskModal onAddTask={handleAddTask} />
    </div>
  );
};

export default TaskBoard;
