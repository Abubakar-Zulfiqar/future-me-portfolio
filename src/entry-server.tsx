import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { HomePage } from "./components/portfolio/HomePage";

// Used only at build time by scripts/prerender.mjs to produce static HTML for "/".
// It renders the page without the router so the markup matches main.tsx's hydrateRoot tree.
export function render() {
  return renderToString(
    <StrictMode>
      <HomePage />
    </StrictMode>,
  );
}
