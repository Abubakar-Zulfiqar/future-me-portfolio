import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowRightIcon,
  ChatBubbleIcon,
  CopyIcon,
  DownloadIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  MagnifyingGlassIcon,
  MoonIcon,
} from "@radix-ui/react-icons";
import { SECTIONS, SITE } from "@/lib/site";
import { resumeDoc, trackContact, trackDownload } from "@/lib/documents";
import { toggleTheme } from "@/lib/theme";

type Item = {
  id: string;
  group: "Go to" | "Actions" | "Links";
  label: string;
  keywords?: string;
  icon: ReactNode;
  /** Returns a short status message to announce, if any. */
  run: () => string | void;
};

function download(href: string, file: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = file;
  a.click();
}

function buildItems(): Item[] {
  const icon = "size-4 shrink-0";
  return [
    ...SECTIONS.map<Item>((s) => ({
      id: `go-${s.id}`,
      group: "Go to",
      label: s.label,
      icon: <ArrowRightIcon className={icon} />,
      run: () => {
        document.getElementById(s.id)?.scrollIntoView();
      },
    })),
    {
      id: "resume",
      group: "Actions",
      label: "Download resume",
      keywords: "cv pdf",
      icon: <DownloadIcon className={icon} />,
      run: () => {
        trackDownload(resumeDoc.k);
        download(resumeDoc.href, resumeDoc.file);
      },
    },
    {
      id: "copy-email",
      group: "Actions",
      label: "Copy email address",
      keywords: "mail contact",
      icon: <CopyIcon className={icon} />,
      run: () => {
        void navigator.clipboard?.writeText(SITE.email);
        trackContact("copy_email", "command_menu");
        return "Email address copied";
      },
    },
    {
      id: "theme",
      group: "Actions",
      label: "Toggle light / dark theme",
      keywords: "mode appearance",
      icon: <MoonIcon className={icon} />,
      run: () => toggleTheme(),
    },
    {
      id: "whatsapp",
      group: "Links",
      label: "Message on WhatsApp",
      keywords: "contact hire chat",
      icon: <ChatBubbleIcon className={icon} />,
      run: () => {
        trackContact("whatsapp", "command_menu");
        window.open(SITE.whatsapp, "_blank", "noopener");
      },
    },
    {
      id: "github",
      group: "Links",
      label: "Open GitHub",
      icon: <GitHubLogoIcon className={icon} />,
      run: () => {
        trackContact("github", "command_menu");
        window.open(SITE.github, "_blank", "noopener");
      },
    },
    {
      id: "linkedin",
      group: "Links",
      label: "Open LinkedIn",
      icon: <LinkedInLogoIcon className={icon} />,
      run: () => {
        trackContact("linkedin", "command_menu");
        window.open(SITE.linkedin, "_blank", "noopener");
      },
    },
  ];
}

export function CommandMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState("");
  const items = useMemo(buildItems, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.label} ${i.keywords ?? ""} ${i.group}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery("");
      setActive(0);
      setStatus("");
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const runItem = (item: Item) => {
    // Only strings are status messages. (scrollIntoView() now returns a Promise in Chrome; an
    // object reaching the status <p> would crash React with error #31.)
    const message = item.run();
    if (typeof message === "string" && message) {
      setStatus(message);
      window.setTimeout(onClose, 700);
    } else {
      onClose();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (results.length ? (a + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      runItem(results[active]);
    }
  };

  let lastGroup = "";
  return (
    <dialog
      ref={dialogRef}
      aria-label="Command menu"
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      className="m-0 mx-auto mt-[12vh] w-[min(560px,calc(100vw-2rem))] max-w-none overflow-hidden rounded-[var(--radius-card)] border border-line-strong bg-surface-1 p-0 text-ink shadow-[0_24px_64px_rgb(0_0_0/0.45)] backdrop:bg-black/50 backdrop:backdrop-blur-[2px] open:animate-[menu-in_160ms_var(--ease-out-expo)]"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <MagnifyingGlassIcon className="size-4 text-ink-subtle" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-list"
          aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
          aria-label="Search commands"
          placeholder="Type a command or search…"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          className="h-12 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint focus-visible:outline-none"
        />
        <kbd className="rounded border border-line px-1.5 font-mono text-[11px] text-ink-subtle">
          esc
        </kbd>
      </div>

      <ul
        id="command-list"
        role="listbox"
        aria-label="Commands"
        className="max-h-[50vh] overflow-y-auto overscroll-contain p-2"
      >
        {results.length === 0 && (
          <li className="px-3 py-8 text-center text-sm text-ink-subtle">
            No commands match “{query}”.
          </li>
        )}
        {results.map((item, i) => {
          const header = item.group !== lastGroup ? item.group : null;
          lastGroup = item.group;
          return (
            <li key={item.id} role="presentation">
              {header && (
                <div
                  className="px-3 pb-1 pt-3 text-xs font-medium text-ink-faint first:pt-1"
                  aria-hidden="true"
                >
                  {header}
                </div>
              )}
              <div
                id={`cmd-${item.id}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => runItem(item)}
                className={`flex cursor-pointer items-center gap-3 rounded-[var(--radius-control)] px-3 py-2.5 text-sm transition-colors ${
                  i === active ? "bg-surface-3 text-ink" : "text-ink-muted"
                }`}
              >
                <span className="text-ink-subtle">{item.icon}</span>
                {item.label}
              </div>
            </li>
          );
        })}
      </ul>

      <p
        role="status"
        aria-live="polite"
        className="border-t border-line px-4 py-2.5 text-xs text-ink-subtle"
      >
        {status || "Use ↑ ↓ to navigate, Enter to select"}
      </p>
    </dialog>
  );
}
