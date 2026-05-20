import { BiTask } from "react-icons/bi";
import { RiProgress3Line, RiPieChartLine } from "react-icons/ri";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const ProgressBar = () => {
  // Sample calculation data
  const total = 12;
  const completed = 7;
  const completionRate = Math.round((completed / total) * 100);

  const stats = [
    {
      id: 1,
      label: "Total Tasks",
      value: total,
      icon: <BiTask />,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-500/10",
    },
    {
      id: 2,
      label: "In Progress",
      value: 5,
      icon: <RiProgress3Line />,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-500/10",
    },
    {
      id: 3,
      label: "Completed",
      value: completed,
      icon: <IoCheckmarkDoneCircleOutline />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-100 dark:bg-emerald-500/10",
    },
  ];

  return (
    <section className="mt-4 w-full">
      {/* 4-Column Grid: 1 on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* First 3 Info Cards */}
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="px-5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer"
          >
            <div
              className={`text-xl p-2.5 rounded-xl ${stat.bgColor} ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}

        {/* 4th Card: Overall Completion */}
        <div className="px-5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex items-center gap-2">
              <div className="text-xl p-2 rounded-lg bg-orange-100 dark:bg-orange-500/10 text-orange-500">
                <RiPieChartLine />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Progress
              </p>
            </div>
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
              {completionRate}%
            </span>
          </div>

          {/* Compact Progress Bar */}
          <div className="w-full h-1 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressBar;