import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "../TaskCard/TaskCard";

const Column = ({ title, tasks, id, onClear, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col w-full min-w-[320px] bg-gray-50 dark:bg-slate-900/20 rounded-lg border-2 border-gray-200 dark:border-slate-800 p-5">
      {/* Column Header_ */}
      <div className="flex justify-between items-center mb-6 px-1">
        <div className="flex items-center gap-3">
          <h3 className="text-slate-800 dark:text-slate-100 font-extrabold text-lg tracking-tight">
            {title}
          </h3>

          <span className="bg-purple-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-lg shadow-md shadow-purple-500/20">
            {tasks.length}
          </span>
        </div>

        {id === "done" && tasks.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-rose-500 hover:text-rose-600 font-bold uppercase tracking-wider transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* --Task Drop Zone---
       */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex-1 min-h-[400px] rounded-lg transition-colors duration-200 ${
              snapshot.isDraggingOver
                ? "bg-purple-500/5 border-2 border-dashed border-purple-500/20"
                : "bg-transparent"
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;