import "./LettronixTheme.css";
import "./App.css";

import HeaderRender from "./components/HeaderRender";
import HomeWindowRender from "./components/HomeWindow";

// import "./index.css";
function App() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <HeaderRender />
        <HomeWindowRender />
      </div>
    </>
  );
}

export default App;
