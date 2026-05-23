import { useState, useEffect } from "react";
import { TbSubtask } from "react-icons/tb";
import { MdDarkMode, MdLightMode, MdAdd, MdStorage } from "react-icons/md";

const Navbar = ({ isDarkMode, setIsDarkMode, tasks }) => {
  const [storageUsage, setStorageUsage] = useState(0);
  const STORAGE_LIMIT_KB = 5120; // 5MB is the standard limit

  // Function to calculate localStorage usage
  useEffect(() => {
    const calculateStorage = () => {
      let total = 0;

      for (let key in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
          // Each character in JS is 2 bytes (UTF-16)
          total += (localStorage[key].length + key.length) * 2;
        }
      }

      setStorageUsage((total / 1024).toFixed(2)); // Convert to KB
    };

    calculateStorage();
  }, [tasks]);

  const usagePercentage = (storageUsage / STORAGE_LIMIT_KB) * 100;

  return (
    <nav className="w-full border-b transition-colors duration-300 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
      <div className="max-w-[1536px] min-w-[320px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-2 rounded-lg text-white text-xl shadow-lg shadow-purple-500/30">
            <TbSubtask />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white hidden sm:block">
            Kanban<span className="text-purple-600">Task</span>
          </h1>
        </div>

        {/* Center/Right: Storage Monitor (Visible on Tablet/Desktop) */}
        <div className="hidden md:flex flex-col items-end gap-1 px-4 border-r border-gray-200 dark:border-slate-800 mr-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            <MdStorage className="text-purple-500 text-sm" />
            Storage: {storageUsage} KB / 5MB
          </div>
          <div className="w-32 h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all duration-500"
              style={{ width: `${Math.max(usagePercentage, 2)}%` }}
            />
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-all text-gray-600 dark:text-gray-300 text-xl"
          >
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>

          {/* Add Task Button */}
          <button
            onClick={() =>
              document.getElementById("add_task_modal").showModal()
            }
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all active:scale-95 shadow-md shadow-purple-500/20"
          >
            <MdAdd className="text-xl" />
            <span className="hidden xs:block text-sm sm:text-base">
              Add Task
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
