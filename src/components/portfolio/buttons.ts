// Shared button styles: one shape (10px controls), one accent, pressed-state feedback.
const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98]";

export const btn = {
  primary: `${base} h-10 px-4 bg-accent text-on-accent hover:bg-accent-hover`,
  secondary: `${base} h-10 px-4 border border-line bg-surface-1 text-ink hover:bg-surface-2 hover:border-line-strong`,
  primarySm: `${base} h-8 px-3 bg-accent text-on-accent hover:bg-accent-hover`,
  ghost: `${base} h-9 px-3 text-ink-subtle hover:text-ink hover:bg-surface-2`,
};
