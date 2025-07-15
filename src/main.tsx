import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HeaderRender from "./App.tsx";
import "./LettronixTheme.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeaderRender />
  </StrictMode>
);
