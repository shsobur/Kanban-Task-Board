import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../Column/Column";

// Fake Data for demo
const initialData = {
  todo: [
    {
      id: "1",
      title: "Design Landing Page",
      description: "Create a modern landing page for the startup project.",
      priority: "high",
      createdAt: "May 20, 2024",
      timeAgo: "2m ago",
    },
    {
      id: "2",
      title: "Fix Auth Bug",
      description: "Login button is not working on mobile devices.",
      priority: "medium",
      createdAt: "May 19, 2024",
      timeAgo: "1d ago",
    },
  ],
  inProgress: [
    {
      id: "3",
      title: "Setup Redux",
      description: "Install and configure Redux Toolkit for state management.",
      priority: "high",
      createdAt: "May 20, 2024",
      timeAgo: "5h ago",
    },
  ],
  done: [
    {
      id: "4",
      title: "Project Setup",
      description: "Initial Vite + React installation.",
      priority: "low",
      createdAt: "May 15, 2024",
      timeAgo: "1w ago",
    },
  ],
};

const TaskBoardColumns = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; // Dropped outside
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return; // No change

    // Logic to move task between columns
    const sourceCol = Array.from(data[source.droppableId]);
    const destCol = Array.from(data[destination.droppableId]);
    const [movedTask] = sourceCol.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceCol.splice(destination.index, 0, movedTask);
      setData({ ...data, [source.droppableId]: sourceCol });
    } else {
      destCol.splice(destination.index, 0, movedTask);
      setData({
        ...data,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol,
      });
    }
  };

  return (
    <section className="mt-6">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Horizontal scroll on mobile, flex on desktop */}
        <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-6 no-scrollbar min-h-[70vh]">
          <Column id="todo" title="To Do" tasks={data.todo} />
          <Column id="inProgress" title="In Progress" tasks={data.inProgress} />
          <Column id="done" title="Done" tasks={data.done} />
        </div>
      </DragDropContext>
    </section>
  );
};

export default TaskBoardColumns;