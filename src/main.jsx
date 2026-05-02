// File path__
import "./index.css";
import TaskBoard from "./Pages/TaskBoard/TaskBoard";

// From react__
import { StrictMode } from "react";

// Packages__
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskBoard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);