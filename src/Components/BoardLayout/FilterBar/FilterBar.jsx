import { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const priorities = [
    { name: "All", color: "bg-slate-500" },
    { name: "High", color: "bg-rose-500" },
    { name: "Medium", color: "bg-amber-500" },
    { name: "Low", color: "bg-emerald-500" },
  ];

  return (
    <section className="mt-5 w-full flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left Side: Search Bar */}
      <div className="relative w-full md:w-[49%] group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400 group-focus-within:text-purple-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none"
        />
      </div>

      {/* Right Side: Priority Filters */}
      <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
        {/* Extra Filter Icon for Mobile/Visual polish */}
        {/* <button className="p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-slate-500 hover:text-purple-600 transition-colors">
          <FiFilter />
        </button> */}

        <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-800">
          {priorities.map((priority) => (
            <button
              key={priority.name}
              onClick={() => setActiveFilter(priority.name)}
              className={`
                px-4 py-1 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
                flex items-center gap-2
                ${
                  activeFilter === priority.name
                    ? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm ring-1 ring-gray-200 dark:ring-slate-700"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }
              `}
            >
              {priority.name !== "All" && (
                <span className={`w-2 h-2 rounded-full ${priority.color}`} />
              )}
              {priority.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterBar;