import { useEffect, useState } from "react";
import {
  Cross2Icon,
  HamburgerMenuIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { trackContact } from "@/lib/documents";
import { CONTACT_LABEL, SECTIONS, SITE } from "@/lib/site";
import { toggleTheme } from "@/lib/theme";
import { btn } from "./buttons";
import { CommandMenu } from "./CommandMenu";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [modKey, setModKey] = useState("⌘");

  // Highlight the section currently crossing the middle of the viewport. The hero ("top") is
  // observed too, so the highlight clears when you scroll back up.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ["top", ...SECTIONS.map((s) => s.id)]) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!/Mac|iPhone|iPad/.test(navigator.platform)) setModKey("Ctrl");
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMenuOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4">
        <nav
          aria-label="Primary"
          className="panel mx-auto flex h-14 max-w-5xl items-center gap-6 rounded-full pl-5 pr-2"
        >
          <a
            href="#top"
            className="inline-flex min-h-8 items-center text-[15px] font-semibold tracking-[-0.01em] text-ink"
          >
            {SITE.shortName}
          </a>

          <ul className="hidden flex-1 items-center gap-1 lg:flex">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "location" : undefined}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors hover:text-ink ${
                    active === s.id ? "text-ink" : "text-ink-subtle"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open command menu"
              className="hidden h-8 items-center gap-2 rounded-full border border-line bg-surface-1/60 pl-2.5 pr-1.5 text-sm text-ink-subtle transition-colors hover:border-line-strong hover:text-ink sm:inline-flex"
            >
              <MagnifyingGlassIcon className="size-3.5" aria-hidden="true" />
              <span>Search</span>
              <kbd className="rounded border border-line bg-surface-2 px-1.5 font-mono text-[11px]">
                {modKey} K
              </kbd>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle light and dark theme"
              className="inline-flex size-8 items-center justify-center rounded-full text-ink-subtle transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <SunIcon className="theme-icon-dark size-4" aria-hidden="true" />
              <MoonIcon className="theme-icon-light size-4" aria-hidden="true" />
            </button>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackContact("whatsapp", "nav")}
              className={`${btn.primarySm} hidden rounded-full! sm:inline-flex`}
            >
              {CONTACT_LABEL}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-9 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            >
              {open ? <Cross2Icon className="size-4" /> : <HamburgerMenuIcon className="size-4" />}
            </button>
          </div>
        </nav>

        {open && (
          <div
            id="mobile-menu"
            className="panel mx-auto mt-2 max-w-5xl rounded-[var(--radius-card)] px-4 pb-5 lg:hidden"
          >
            <ul className="py-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === s.id ? "location" : undefined}
                    className={`block border-b border-line py-3.5 text-base ${
                      active === s.id ? "text-ink" : "text-ink-muted"
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setMenuOpen(true);
                }}
                className={btn.secondary}
              >
                <MagnifyingGlassIcon className="size-4" aria-hidden="true" /> Search
              </button>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  trackContact("whatsapp", "mobile_nav");
                  setOpen(false);
                }}
                className={btn.primary}
              >
                {CONTACT_LABEL}
              </a>
            </div>
          </div>
        )}
      </header>
      <CommandMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
