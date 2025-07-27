import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import {
  fetchControlData,
  fetchHistoryData,
  fetchPreferencesData,
  fetchSensorData,
} from "./hooks/fetchInitialData";
import type { DailyDataProp } from "./data/dataProps/dataProps";

// Lazy-loaded components
const MainLayout = lazy(() => import("./global/_MainLayout"));
const HomePage = lazy(() => import("./pages/HomeWindow"));
const ControlCenter = lazy(() => import("./pages/ControlCenterRender"));
const HistoryStatsPage = lazy(() => import("./pages/HistoryStatsRender"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading Main Layout...</div>}>
        <MainLayout />
      </Suspense>
    ),
    loader: async () => {
      const initialControlData = await fetchControlData();
      const initialpreferenceData: DailyDataProp = await fetchPreferencesData();
      return { initialControlData, initialpreferenceData };
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
        loader: fetchHistoryData,
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
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={routes} />
    </Suspense>
  </StrictMode>,
);
