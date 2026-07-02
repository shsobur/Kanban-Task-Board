import { Draggable } from "@hello-pangea/dnd";
import { MdEdit, MdDelete, MdDragIndicator } from "react-icons/md";

const TaskCard = ({ task, index, onEdit, onDelete }) => {
  // Priority badge styling configuration_
  const priorityColors = {
    high: "bg-rose-100 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
    medium:
      "bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
    low: "bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{ ...provided.draggableProps.style }}
          className={`
            bg-white dark:bg-slate-900 p-5 rounded-lg border-2 mb-4 group transition-all
            ${
              snapshot.isDragging
                ? "border-purple-500 shadow-2xl rotate-2 scale-105 z-50 ring-4 ring-purple-500/10"
                : "border-gray-200 dark:border-slate-800 shadow-sm"
            }
          `}
        >
          <div className="flex justify-between items-start mb-3">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-lg border ${priorityColors[task.priority]}`}
            >
              {task.priority}
            </span>

            <div
              {...provided.dragHandleProps}
              className="p-2 -mt-2 -mr-2 text-slate-400 hover:text-purple-500 cursor-grab active:cursor-grabbing transition-colors"
            >
              <MdDragIndicator className="text-2xl" />
            </div>
          </div>

          <h4 className="text-slate-800 dark:text-white font-bold text-base mb-2 line-clamp-1 uppercase tracking-tight">
            {task.title}
          </h4>

          <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-5 leading-relaxed">
            {task.description}
          </p>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-slate-800">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium">
                {task.createdAt}
              </span>

              {task.timeAgo && (
                <span className="text-[11px] text-slate-500 dark:text-slate-500">
                  {task.timeAgo}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-slate-500 hover:text-blue-500 bg-gray-50 dark:bg-slate-800 rounded-lg transition-all border border-gray-100 dark:border-slate-700"
              >
                <MdEdit size={18} />
              </button>

              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-slate-500 hover:text-rose-500 bg-gray-50 dark:bg-slate-800 rounded-lg transition-all border border-gray-100 dark:border-slate-700"
              >
                <MdDelete size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;