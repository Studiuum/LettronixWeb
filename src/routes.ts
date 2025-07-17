import MainLayout from "./routes/_MainLayout";
import HomeWindow, {
  loader as homeloader,
  meta as homemeta,
} from "./routes/HomeWindow.tsx";
import ControlCenter, {
  loader as controlcenterloader,
  meta as controlcentermeta,
} from "./routes/ControlCenter.tsx";
import HistoryStats, {
  loader as jhistorystatsloader,
  meta as historystatsmeta,
} from "./routes/HomeWindow.tsx";

import { createBrowserRouter } from "react-router";

const routeSetup = createBrowserRouter([
  { path: "/", Component: HomeWindow },
  { path: "/Control-Center", Component: ControlCenter },
  { path: "/History-Statistics", Component: HistoryStats },
]);

export default routeSetup;
