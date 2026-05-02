// Packages__
import { TbSubtask } from "react-icons/tb";
import { MdDarkMode, MdLightMode, MdAdd } from "react-icons/md";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <nav className="w-full border-b transition-colors duration-300 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
      {/* Constraints: Max width 1536px, centered, responsive padding */}
      <div className="max-w-[1536px] min-w-[320px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-2 rounded-lg text-white text-2xl shadow-lg shadow-purple-500/30">
            <TbSubtask />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white hidden sm:block">
            Kanban<span className="text-purple-600">Task</span>
          </h1>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-all text-gray-600 dark:text-gray-300 text-xl"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>

          {/* Add Task Button */}
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all active:scale-95 shadow-md shadow-purple-500/20">
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