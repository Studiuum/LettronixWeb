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
      <Suspense fallback={<div>Loading layout...</div>}>
        <MainLayout />
      </Suspense>
    ),
    loader: async () => {
      const initialControlData = await fetchControlData();
      const preferenceData: DailyDataProp = await fetchPreferencesData();
      return { initialControlData, preferenceData };
    },
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading Home...</div>}>
            <HomePage />
          </Suspense>
        ),
        loader: fetchSensorData,
      },
      {
        path: "control-center",
        element: (
          <Suspense fallback={<div>Loading Control Center...</div>}>
            <ControlCenter />
          </Suspense>
        ),
      },
      {
        path: "history-statistics",
        element: (
          <Suspense fallback={<div>Loading History Statistics...</div>}>
            <HistoryStatsPage />
          </Suspense>
        ),
        loader: fetchHistoryData,
      },
    ],
  }, // ← ✅ this comma was missing
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
