import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import {
  fetchControlData,
  fetchHistoryData,
  fetchParamAutomation,
  fetchPreferencesData,
  fetchSensorData,
  fetchNotificationData,
} from "./hooks/fetchInitialData";
import MainLayout from "./global/_MainLayout";

// Lazy-loaded components
// const MainLayout = lazy(() => import("./global/_MainLayout"));
const HomePage = lazy(() => import("./pages/HomeWindow"));
const ControlCenter = lazy(() => import("./pages/ControlCenterRender"));
const HistoryStatsPage = lazy(() => import("./pages/HistoryStatsRender"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: async () => {
      const [
        initialControlData,
        initialpreferenceData,
        initialNotificationData,
        initialSensorData,
      ] = await Promise.all([
        fetchControlData(),
        fetchPreferencesData(),
        fetchNotificationData(),
        fetchSensorData(),
      ]);

      return {
        initialControlData,
        initialpreferenceData,
        initialNotificationData,
        initialSensorData,
      };
    },
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: fetchSensorData,
      },
      {
        path: "control-center",
        element: <ControlCenter />,
      },
      {
        path: "history-statistics",
        element: <HistoryStatsPage />,
        loader: async () => {
          const historyData = await fetchHistoryData();
          const paramAutomationData = await fetchParamAutomation();
          return { historyData, paramAutomationData };
        },
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
  </StrictMode>,
);
