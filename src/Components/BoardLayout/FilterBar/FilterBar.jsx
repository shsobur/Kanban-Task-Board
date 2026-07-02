import { FiSearch, FiFilter } from "react-icons/fi";

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  filterPriority,
  setFilterPriority,
}) => {
  const priorities = [
    { name: "All", color: "bg-slate-400" },
    { name: "High", color: "bg-rose-500" },
    { name: "Medium", color: "bg-amber-500" },
    { name: "Low", color: "bg-emerald-500" },
  ];

  return (
    <section className="mt-8 w-full flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative w-full md:w-96 group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch
            className={`transition-colors ${searchQuery ? "text-purple-500" : "text-gray-400"}`}
          />
        </div>
        <input
          type="text"
          placeholder="Search tasks by title..."
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-slate-700 dark:text-slate-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Priority Selector */}
      <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-gray-200 dark:border-slate-800">
          {priorities.map((p) => (
            <button
              key={p.name}
              onClick={() => setFilterPriority(p.name)}
              className={`
                px-4 py-1.5 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap
                flex items-center gap-2
                ${
                  filterPriority === p.name
                    ? "bg-white dark:bg-slate-800 text-purple-600 shadow-md ring-1 ring-black/5"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }
              `}
            >
              {p.name !== "All" && (
                <span className={`w-2 h-2 rounded-full ${p.color}`} />
              )}
              {p.name}
            </button>
          ))}
        </div>

        <div className="p-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-slate-400">
          <FiFilter />
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
