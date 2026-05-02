// File path__
import Navbar from "../../Components/BoardLayout/Navbar/Navbar";

// From react__
import { useState, useEffect } from "react";

const TaskBoard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark Mode__

  // Handle dark mode class on the body/root__
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* 1. Navbar Section */}
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* 2. Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1536px] min-w-[320px] mx-auto p-4 sm:p-6 lg:p-8">
          {/* Temporary placeholder for the other 5 sections */}
          <div className="space-y-6">
            <div className="h-40 border-2 border-dashed border-purple-200 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
              Section 2: Stats/Filters Container
            </div>
            <div className="h-[800px] border-2 border-dashed border-purple-200 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
              Section 3: Kanban Columns (Scrollable Area Test)
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskBoard;
