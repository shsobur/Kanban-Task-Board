// File path__
import Navbar from "../../Components/BoardLayout/Navbar/Navbar";
import FilterBar from "../../Components/BoardLayout/FilterBar/FilterBar";
import ProgressBar from "../../Components/BoardLayout/ProgressBar/ProgressBar";

// From react__
import { useState, useEffect } from "react";
import TaskBoardColumns from "../../Components/BoardLayout/TaskBoardColumns/TaskBoardColumns";

const TaskBoard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Theme Logic
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* Fixed Top Navbar */}
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Main Content (Scrollable) */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-[1536px] min-w-[320px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          {/* Section 1: Stats */}
          <ProgressBar />

          {/* Section 2: Search & Filter */}
          <FilterBar />

          {/* Section 3, 4, 5: The Kanban Board (DND Area) */}
          <TaskBoardColumns />
        </div>
      </main>
    </div>
  );
};

export default TaskBoard;