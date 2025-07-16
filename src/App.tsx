import "./LettronixTheme.css";
import "./App.css";

import HeaderRender from "./components/HeaderRender";
import HomeWindowRender from "./components/HomeWindow";
import FootRender from "./components/FooterRender";
import ControlCenterRender from "./components/ControlCenterRender";
import HistoryStatRender from "./components/HistoryStatsRender";
// import "./index.css";

function App() {
  return (
    <>
      <div className="flex flex-col justify-between gap-y-2 mx-45 my-2 overflow-visible">
        <HeaderRender />
        {/* <HomeWindowRender /> */}
        {/* <ControlCenterRender /> */}
        <HistoryStatRender />
      </div>
      <FootRender />
    </>
  );
}

export default App;
