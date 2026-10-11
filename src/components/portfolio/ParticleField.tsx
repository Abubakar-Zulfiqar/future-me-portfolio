import { useEffect, useRef } from "react";

/**
 * Fixed full-screen particle layer behind the whole page, driven by scroll (see
 * particleScene.ts). Server-renders an empty container so hydration matches; three.js loads on
 * idle. Each section below the hero anchors one particle formation.
 */
export function ParticleField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    // Formations 1..7 are anchored to these sections, in page order (formation 0 is the hero).
    const anchors = [
      "story-agents",
      "story-brain",
      "projects",
      "experience",
      "skills",
      "about",
      "contact",
    ]
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    if (!el || anchors.length !== 7) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;

    const load = () =>
      import("./particleScene")
        .then(({ mountParticleScene }) => {
          if (cancelled) return;
          try {
            dispose = mountParticleScene(el, {
              reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
              compact: window.innerWidth < 768,
              anchors,
            });
            el.dataset.ready = "true";
          } catch {
            // No WebGL: the CSS glow behind the hero stays as the visual.
          }
        })
        .catch(() => {});

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(load, { timeout: 1000 })
      : window.setTimeout(load, 250);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
      dispose?.();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="particle-field pointer-events-none fixed inset-0 z-[-1] transition-opacity duration-700"
    />
  );
}
