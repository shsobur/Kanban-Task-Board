// File path__
import "./index.css";
import TaskBoard from "./Pages/TaskBoard/TaskBoard";

// From react__
import { StrictMode } from "react";

// Packages__
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: TaskBoard,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);