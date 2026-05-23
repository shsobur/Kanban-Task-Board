import Swal from "sweetalert2";
import { useState } from "react";
import "sweetalert2/themes/bulma.css";
import { MdTitle, MdDescription, MdFlag, MdClose, MdAdd } from "react-icons/md";

const AddTaskModal = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      document.getElementById("add_task_modal").close();

      Swal.fire({
        icon: "warning",
        theme: "bulma",
        draggable: true,
        title: "Please fill out all fields",
        confirmButtonColor: "#9333ea",
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById("add_task_modal").showModal();
        }
      });
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      status: "todo",
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: Date.now(),
    };

    onAddTask(newTask);

    Swal.fire({
      title: "Success!",
      text: `Task "${title}" added successfully`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      background: document.documentElement.classList.contains("dark")
        ? "#0f172a"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#f8fafc"
        : "#1e293b",
      iconColor: "#9333ea",
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    document.getElementById("add_task_modal").close();
  };

  const priorityOptions = [
    {
      id: "low",
      label: "Low",
      color: "bg-emerald-500",
      text: "text-emerald-600",
    },
    {
      id: "medium",
      label: "Medium",
      color: "bg-amber-500",
      text: "text-amber-600",
    },
    { id: "high", label: "High", color: "bg-rose-500", text: "text-rose-600" },
  ];

  return (
    <dialog
      id="add_task_modal"
      className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
    >
      <div className="modal-box max-w-[768px] p-0 overflow-hidden bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 rounded-lg shadow-2xl">
        {/* Header */}
        <div className="bg-gray-50 dark:bg-slate-800/50 px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-1.5 rounded-lg text-white">
              <MdAdd size={20} />
            </div>
            <h3 className="font-extrabold text-slate-800 dark:text-white uppercase tracking-tight">
              Create New Task
            </h3>
          </div>
          <button
            onClick={() => document.getElementById("add_task_modal").close()}
            className="text-slate-400 hover:text-rose-500 transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <MdTitle className="text-purple-500 text-base" /> Task Title
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="What needs to be done?"
                className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 text-slate-700 dark:text-white transition-all font-medium"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={30}
              />
              <span className="absolute right-3 top-3.5 text-[10px] font-bold text-slate-400">
                {title.length}/30
              </span>
            </div>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <MdDescription className="text-purple-500 text-base" />{" "}
              Description
            </label>
            <div className="relative">
              <textarea
                placeholder="Provide some details..."
                className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg px-4 py-3 h-28 focus:outline-none focus:border-purple-500 text-slate-700 dark:text-white transition-all resize-none leading-relaxed"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={100}
                required
              />
              <span className="absolute right-3 bottom-3 text-[10px] font-bold text-slate-400">
                {description.length}/100
              </span>
            </div>
          </div>

          {/* Priority Selection - Visual Chips */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <MdFlag className="text-purple-500 text-base" /> Select Priority
            </label>
            <div className="grid grid-cols-3 gap-3">
              {priorityOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPriority(opt.id)}
                  className={`
                    py-3 rounded-lg border-2 flex flex-col items-center gap-1 transition-all
                    ${
                      priority === opt.id
                        ? `border-purple-600 bg-purple-50 dark:bg-purple-500/10 shadow-md scale-[1.02]`
                        : `border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-600`
                    }
                  `}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${opt.color} shadow-[0_0_8px_rgba(0,0,0,0.1)]`}
                  />
                  <span
                    className={`text-xs font-bold ${priority === opt.id ? "text-purple-600 dark:text-purple-400" : "text-slate-500"}`}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={() => document.getElementById("add_task_modal").close()}
              className="flex-1 py-3 font-bold text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg shadow-purple-500/30 active:scale-95 transition-all"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddTaskModal;