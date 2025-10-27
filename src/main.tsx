import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App as ParentApp } from "./parent";
import { App as ChildApp } from "./child";
import "./main.css";

declare global {
  interface Window {
    addEventListener(
      type: "fulfilled",
      listener: (event: CustomEvent) => void,
      options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
      type: "pending",
      listener: (event: CustomEvent) => void,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener(
      type: "fulfilled",
      listener: (event: CustomEvent) => void,
      options?: boolean | EventListenerOptions
    ): void;
    removeEventListener(
      type: "pending",
      listener: (event: CustomEvent) => void,
      options?: boolean | EventListenerOptions
    ): void;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div id="app">
      <ParentApp />

      <ChildApp />
    </div>
  </StrictMode>
);
