import { useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  MobileIcon,
} from "@radix-ui/react-icons";
import { documents, trackContact, trackDownload } from "@/lib/documents";
import { CONTACT_LABEL, SITE } from "@/lib/site";
import { btn } from "./buttons";
import { Reveal } from "./ui";

const channels = [
  {
    k: "email",
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: EnvelopeClosedIcon,
  },
  { k: "phone", label: "Phone", value: SITE.phone, href: SITE.phoneHref, icon: MobileIcon },
  {
    k: "linkedin",
    label: "LinkedIn",
    value: SITE.linkedinLabel,
    href: SITE.linkedin,
    icon: LinkedInLogoIcon,
  },
  {
    k: "github",
    label: "GitHub",
    value: SITE.githubLabel,
    href: SITE.github,
    icon: GitHubLogoIcon,
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      trackContact("copy_email", "contact");
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate px-4 pt-20 sm:px-6 md:pt-28"
    >
      <div aria-hidden="true" className="hero-glow absolute inset-x-0 top-0 -z-10 h-[620px]" />
      <div className="mx-auto max-w-6xl">
        <div className="panel grid grid-cols-1 gap-14 rounded-[var(--radius-media)] p-6 sm:p-10 md:p-12 lg:grid-cols-12">
          <Reveal blur className="lg:col-span-7">
            <h2
              id="contact-title"
              className="text-lit pb-1 text-4xl font-semibold leading-[1.06] tracking-[-0.04em] md:text-[3.5rem]"
            >
              Let’s build something unreasonable.
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-subtle">
              Open to full-time roles, AI and full-stack contracts, and ambitious new products. I
              usually reply within a day.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackContact("whatsapp", "contact")}
                className={btn.primary}
              >
                {CONTACT_LABEL}
              </a>
              <button type="button" onClick={copyEmail} className={btn.secondary}>
                {copied ? (
                  <CheckIcon className="size-4 text-success" aria-hidden="true" />
                ) : (
                  <CopyIcon className="size-4" aria-hidden="true" />
                )}
                <span aria-live="polite">{copied ? "Email copied" : "Copy email"}</span>
              </button>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <ul className="divide-y divide-[var(--glass-border)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--glass-border)] bg-bg/30">
              {channels.map((c) => (
                <li key={c.k}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    onClick={() => trackContact(c.k, "contact")}
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2"
                  >
                    <c.icon
                      className="size-4 shrink-0 text-ink-subtle group-hover:text-ink"
                      aria-hidden="true"
                    />
                    <span className="sr-only text-sm text-ink-subtle sm:not-sr-only sm:w-20 sm:shrink-0">
                      {c.label}
                    </span>
                    <span className="min-w-0 truncate text-sm text-ink">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div id="docs" className="mt-6 scroll-mt-24">
              <p className="text-sm text-ink-subtle">Documents</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {documents.map((d) => (
                  <a
                    key={d.k}
                    href={d.href}
                    download={d.file}
                    onClick={() => trackDownload(d.k)}
                    className="inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-line px-3 py-2 text-sm text-ink transition-colors hover:border-line-strong hover:bg-surface-2"
                  >
                    <DownloadIcon className="size-3.5 text-ink-subtle" aria-hidden="true" />
                    {d.title}
                    <span className="text-ink-subtle">{d.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <footer className="mt-24 flex flex-col gap-4 border-t border-line py-8 text-sm text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE.name}</p>
          <div className="flex items-center gap-5">
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-6 items-center hover:text-ink"
            >
              GitHub
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-6 items-center hover:text-ink"
            >
              LinkedIn
            </a>
            <a href="#top" className="inline-flex min-h-6 items-center hover:text-ink">
              Back to top
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
