import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./LettronixTheme.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import MainLayout from "./global/_MainLayout.tsx";
import ControlCenterRender from "./pages/ControlCenterRender.tsx";
import HistoryStatsRender from "./pages/HistoryStatsRender.tsx";
import HomeWindowRender from "./pages/HomeWindow.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomeWindowRender />,
      },
      {
        path: "control-center",
        element: <ControlCenterRender />,
      },
      {
        path: "history-statistics",
        element: <HistoryStatsRender />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
