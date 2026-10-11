import type { PointerEvent } from "react";

/**
 * Pointer handlers for `.spotlight` cards: a cursor-following light and up to `tilt` degrees of
 * 3D tilt. Values go straight to CSS variables on the element, so moving the mouse never
 * re-renders React. Touch pointers are ignored (no hover on touch screens).
 */
export function spotlightHandlers(tilt = 3) {
  return {
    onPointerMove(e: PointerEvent<HTMLElement>) {
      if (e.pointerType !== "mouse") return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
      el.style.setProperty("--rx", `${(0.5 - y) * tilt}deg`);
      el.style.setProperty("--ry", `${(x - 0.5) * tilt}deg`);
    },
    onPointerLeave(e: PointerEvent<HTMLElement>) {
      const el = e.currentTarget;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    },
  };
}
