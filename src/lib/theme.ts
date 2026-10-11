export type Theme = "dark" | "light";

const THEME_COLOR: Record<Theme, string> = { dark: "#06070b", light: "#fbfbfc" };

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
}

export function toggleTheme() {
  setTheme(currentTheme() === "dark" ? "light" : "dark");
}
