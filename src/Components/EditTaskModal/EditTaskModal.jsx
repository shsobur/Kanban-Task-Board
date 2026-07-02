import { useState, useEffect } from "react";
import { MdTitle, MdDescription, MdFlag, MdClose } from "react-icons/md";

const EditTaskModal = ({ task, onUpdate, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  // --Open Edit Modal When Component Mounts---
  useEffect(() => {
    const modal = document.getElementById("edit_task_modal");

    if (modal) {
      modal.showModal();
    }
  }, []);

  // Track whether task data has changed_
  const isChanged =
    title !== task.title ||
    description !== task.description ||
    priority !== task.priority;

  // --Handle Task Update Submission---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    if (isChanged) {
      onUpdate({
        ...task,
        title: title.trim(),
        description: description.trim(),
        priority,
      });

      document.getElementById("edit_task_modal").close();
      onClose();
    }
  };

  // Close modal and reset editing state_
  const handleClose = () => {
    document.getElementById("edit_task_modal").close();
    onClose();
  };

  // Priority selection options_
  const priorityOptions = [
    { id: "low", label: "Low", color: "bg-emerald-500" },
    { id: "medium", label: "Medium", color: "bg-amber-500" },
    { id: "high", label: "High", color: "bg-rose-500" },
  ];

  return (
    <dialog
      id="edit_task_modal"
      className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
    >
      <div className="modal-box p-0 bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 rounded-lg shadow-2xl">
        {/* Modal Header_ */}
        <div className="bg-gray-50 dark:bg-slate-800/50 px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-extrabold text-slate-800 dark:text-white uppercase tracking-tight text-sm sm:text-base">
            Edit Task Details
          </h3>

          <button onClick={handleClose}>
            <MdClose
              size={24}
              className="text-slate-400 hover:text-rose-500 transition-colors"
            />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Task Title Input_ */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
              <MdTitle className="text-purple-500" /> Task Title
            </label>

            <input
              type="text"
              className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:border-purple-500 outline-none transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={30}
            />
          </div>

          {/* Task Description Input_ */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
              <MdDescription className="text-purple-500" /> Description
            </label>

            <textarea
              className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg px-4 py-3 h-28 focus:border-purple-500 outline-none transition-all resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={100}
            />
          </div>

          {/* Priority Selection_ */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
              <MdFlag className="text-purple-500" /> Priority Level
            </label>

            <div className="grid grid-cols-3 gap-3">
              {priorityOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPriority(opt.id)}
                  className={`py-3 rounded-lg border-2 flex flex-col items-center gap-1 transition-all ${
                    priority === opt.id
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20 shadow-sm"
                      : "border-gray-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${opt.color}`} />

                  <span
                    className={`text-xs font-bold ${
                      priority === opt.id
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-slate-500"
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Actions_ */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 font-bold text-slate-400 hover:text-slate-600 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isChanged}
              className="flex-[2] py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold rounded-lg shadow-lg shadow-purple-500/20 transition-all active:scale-95"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditTaskModal;