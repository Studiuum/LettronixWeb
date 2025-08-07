import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import {
  fetchControlData,
  fetchHistoryData,
  fetchPreferencesData,
  fetchSensorData,
} from "./hooks/fetchInitialData";
import MainLayout from "./global/_MainLayout";

// Lazy-loaded components
// const MainLayout = lazy(() => import("./global/_MainLayout"));
const HomePage = lazy(() => import("./pages/HomeWindow"));
const ControlCenter = lazy(() => import("./pages/ControlCenterRender"));
const HistoryStatsPage = lazy(() => import("./pages/HistoryStatsRender"));

// const SkeletonHomePage = lazy(() => import("./skeleton/SkeletonHomeWindow"));
// const SkeletonControlCenter = lazy(
//   () => import("./skeleton/SkeletonControlCenterRender"),
// );
// const SkeletonHistoryStatsPage = lazy(
//   () => import("./skeleton/SkeletonHistoryStatsRender"),
// );

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: async () => {
      const initialControlData = await fetchControlData();
      const initialpreferenceData = await fetchPreferencesData();
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
    <RouterProvider router={routes} />
  </StrictMode>,
);
