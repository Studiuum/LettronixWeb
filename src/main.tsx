import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./LettronixTheme.css";
import _router from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router";

import MainLayout from "./routes/_MainLayout";

import HomeWindow, {
  loader as homeloader,
  meta as homemeta,
} from "./routes/HomeWindow";
import ControlCenter, {
  loader as controlcenterloader,
  meta as controlcentermeta,
} from "./routes/ControlCenter";
import HistoryStats, {
  loader as historystatsloader,
  meta as historystatsmeta,
} from "./routes/HistoryStats";

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
        element: <ControlCenterRender />, // ✅ Now uses loader and meta
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
