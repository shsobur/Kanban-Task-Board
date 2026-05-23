import Column from "../Column/Column";
import { DragDropContext } from "@hello-pangea/dnd";


// Helper function to calculate "Time Ago" (Junior friendly logic)
const formatTimeAgo = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp; // difference in milliseconds

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString(); // fallback to date
};

const TaskBoardColumns = ({ tasks, setTasks }) => {
  // 1. Filter tasks into their respective columns
  const todoTasks = tasks
    .filter((t) => t.status === "todo")
    .map((t) => ({ ...t, timeAgo: formatTimeAgo(t.timestamp) }));
  const inProgressTasks = tasks
    .filter((t) => t.status === "inProgress")
    .map((t) => ({ ...t, timeAgo: formatTimeAgo(t.timestamp) }));
  const doneTasks = tasks
    .filter((t) => t.status === "done")
    .map((t) => ({ ...t, timeAgo: formatTimeAgo(t.timestamp) }));

  // 2. The Drag and Drop Logic
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If dropped outside or in the same place, do nothing
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Create a copy of tasks to modify
    const updatedTasks = Array.from(tasks);

    // Find the task that was moved
    const movedTaskIndex = updatedTasks.findIndex((t) => t.id === draggableId);
    const [movedTask] = updatedTasks.splice(movedTaskIndex, 1);

    // Update the status of the moved task based on the destination column ID
    movedTask.status = destination.droppableId;

    // Logic for reordering:
    // This part is a bit tricky for a junior, so we simply push it into the new position
    // First, get tasks NOT in the destination column
    const otherTasks = updatedTasks.filter(
      (t) => t.status !== destination.droppableId,
    );
    // Second, get tasks ALREADY in the destination column
    const destinationColTasks = updatedTasks.filter(
      (t) => t.status === destination.droppableId,
    );

    // Insert the moved task into the specific index of the destination column
    destinationColTasks.splice(destination.index, 0, movedTask);

    // Combine everything back together
    setTasks([...otherTasks, ...destinationColTasks]);
  };

  // 3. Clear All logic for the "Done" column
  const handleClearDone = () => {
    const remainingTasks = tasks.filter((t) => t.status !== "done");
    setTasks(remainingTasks);
  };

  return (
    <section className="mt-8">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Container for the 3 columns */}
        <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-6 no-scrollbar min-h-[70vh]">
          <Column id="todo" title="To Do" tasks={todoTasks} />

          <Column id="inProgress" title="In Progress" tasks={inProgressTasks} />

          <Column
            id="done"
            title="Done"
            tasks={doneTasks}
            onClear={handleClearDone}
          />
        </div>
      </DragDropContext>
    </section>
  );
};

export default TaskBoardColumns;
