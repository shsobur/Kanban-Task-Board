import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../Column/Column";

// Format timestamp into user-friendly relative time_
const formatTimeAgo = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString();
};

const TaskBoardColumns = ({ tasks, setTasks, onEditTask, onDeleteTask }) => {
  // --Prepare Tasks For Each Board Column---
  const todoTasks = tasks
    .filter((t) => t.status === "todo")
    .map((t) => ({ ...t, timeAgo: formatTimeAgo(t.timestamp) }));

  const inProgressTasks = tasks
    .filter((t) => t.status === "inProgress")
    .map((t) => ({ ...t, timeAgo: formatTimeAgo(t.timestamp) }));

  const doneTasks = tasks
    .filter((t) => t.status === "done")
    .map((t) => ({ ...t, timeAgo: formatTimeAgo(t.timestamp) }));

  // --Handle Task Reordering And Status Changes---
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks = Array.from(tasks);

    const movedTaskIndex = updatedTasks.findIndex((t) => t.id === draggableId);

    const [movedTask] = updatedTasks.splice(movedTaskIndex, 1);

    // Update task status based on destination column_
    movedTask.status = destination.droppableId;

    // Separate destination column tasks for correct insertion order_
    const otherTasks = updatedTasks.filter(
      (t) => t.status !== destination.droppableId,
    );

    const destinationColTasks = updatedTasks.filter(
      (t) => t.status === destination.droppableId,
    );

    destinationColTasks.splice(destination.index, 0, movedTask);

    setTasks([...otherTasks, ...destinationColTasks]);
  };

  // --Remove All Completed Tasks---
  const handleClearDone = () => {
    const remainingTasks = tasks.filter((t) => t.status !== "done");
    setTasks(remainingTasks);
  };

  return (
    <section className="mt-8">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-6 no-scrollbar min-h-[70vh]">
          <Column
            id="todo"
            title="To Do"
            tasks={todoTasks}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />

          <Column
            id="inProgress"
            title="In Progress"
            tasks={inProgressTasks}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />

          <Column
            id="done"
            title="Done"
            tasks={doneTasks}
            onClear={handleClearDone}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        </div>
      </DragDropContext>
    </section>
  );
};

export default TaskBoardColumns;