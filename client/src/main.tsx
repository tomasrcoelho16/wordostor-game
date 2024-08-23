import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import Mobile from "./Mobile.tsx";
// import Ingame from "./Ingame.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Mobile />
  </StrictMode>
);
