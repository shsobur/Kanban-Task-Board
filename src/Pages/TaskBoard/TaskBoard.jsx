// File path__
import Navbar from "../../Components/BoardLayout/Navbar/Navbar";
import FilterBar from "../../Components/BoardLayout/FilterBar/FilterBar";
import ProgressBar from "../../Components/BoardLayout/ProgressBar/ProgressBar";

// From react__
import { useState, useEffect } from "react";

const TaskBoard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-[1536px] min-w-[320px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          {/* Section 1: Progress Stats */}
          <ProgressBar />

          {/* Section 2: Search & Filter */}
          <FilterBar />

          {/* Placeholders for the remaining 4 sections */}
          <div className="mt-8">
            <div className="h-[600px] border-2 border-dashed border-purple-200 dark:border-slate-800 rounded-3xl flex items-center justify-center text-slate-400">
              Future Section 3: Kanban Board Columns
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskBoard;