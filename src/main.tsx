import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { HomePage } from "./components/portfolio/HomePage";
import { getRouter } from "./router";
import "./styles.css";

const container = document.getElementById("root")!;

// "/" is prerendered at build time (see scripts/prerender.mjs), so hydrate the same tree the
// server rendered. Everything else (dev server, 404s) goes through the router with a client render.
if (window.location.pathname === "/" && container.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    container,
    <StrictMode>
      <HomePage />
      <Analytics />
    </StrictMode>,
  );
} else {
  ReactDOM.createRoot(container).render(
    <StrictMode>
      <RouterProvider router={getRouter()} />
      <Analytics />
    </StrictMode>,
  );
}
