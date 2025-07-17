import "./LettronixTheme.css";
import "./App.css";

import HeaderRender from "./components/HeaderRender";
import FootRender from "./components/FooterRender";
import { Outlet } from "react-router";
// import "./index.css";

function App() {
  return (
    <>
      <div className="flex flex-col justify-between gap-y-2 mx-45 my-2 overflow-visible">
        <HeaderRender />
        <Outlet />
      </div>
      <FootRender />
    </>
  );
}

export default App;
