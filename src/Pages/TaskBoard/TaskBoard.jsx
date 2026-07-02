import { useState, useEffect } from "react";
import Swal from "sweetalert2";

// Components__
import Navbar from "../../Components/BoardLayout/Navbar/Navbar";
import AddTaskModal from "../../Components/AddTaskModal/AddTaskModal";
import EditTaskModal from "../../Components/EditTaskModal/EditTaskModal";
import FilterBar from "../../Components/BoardLayout/FilterBar/FilterBar";
import ProgressBar from "../../Components/BoardLayout/ProgressBar/ProgressBar";
import TaskBoardColumns from "../../Components/BoardLayout/TaskBoardColumns/TaskBoardColumns";

const TaskBoard = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });
  const [taskToEdit, setTaskToEdit] = useState(null);

  // --- Search & Filter States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("KanBanTask");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("KanBanTask", JSON.stringify(tasks));
  }, [tasks]);

  // --- THE FILTERING LOGIC ---
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPriority =
      filterPriority === "All" ||
      task.priority.toLowerCase() === filterPriority.toLowerCase();

    return matchesSearch && matchesPriority;
  });

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedList = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t,
    );
    setTasks(updatedList);
    Swal.fire({
      title: "Updated!",
      text: `Task "${updatedTask.title}" has been modified.`,
      icon: "success",
      confirmButtonColor: "#9333ea",
      background: document.documentElement.classList.contains("dark")
        ? "#0f172a"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#1e293b",
    });
  };

  const handleDeleteTask = (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.classList.contains("dark")
        ? "#0f172a"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#1e293b",
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks(tasks.filter((t) => t.id !== taskId));
      }
    });
  };

  useEffect(() => {
    const root = window.document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        tasks={tasks}
      />

      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-[1536px] min-w-[320px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <ProgressBar tasks={tasks} />

          {/* Pass search/filter states to the FilterBar */}
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
          />

          {/* Pass the FILTERED tasks to the columns */}
          <TaskBoardColumns
            tasks={filteredTasks}
            setTasks={setTasks}
            onEditTask={(task) => setTaskToEdit(task)}
            onDeleteTask={handleDeleteTask}
          />

          {/* Empty State Message */}
          {filteredTasks.length === 0 && tasks.length > 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                No tasks match your search or filter.
              </p>
            </div>
          )}
        </div>
      </main>

      <AddTaskModal onAddTask={handleAddTask} />
      {taskToEdit && (
        <EditTaskModal
          task={taskToEdit}
          onUpdate={handleUpdateTask}
          onClose={() => setTaskToEdit(null)}
        />
      )}
    </div>
  );
};

export default TaskBoard;