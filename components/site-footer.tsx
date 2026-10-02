import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-medium text-ink">{site.name}</span> · {site.role} · Lebanon
        </p>
        <ul className="flex items-center gap-1">
          <li>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-100 hover:text-ink"
            >
              <MailIcon width={16} height={16} />
              <span className="sr-only sm:not-sr-only">Email</span>
            </a>
          </li>
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-100 hover:text-ink"
            >
              <GitHubIcon width={16} height={16} />
              <span className="sr-only sm:not-sr-only">GitHub</span>
            </a>
          </li>
          {site.linkedin ? (
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-100 hover:text-ink"
              >
                <LinkedInIcon width={16} height={16} />
                <span className="sr-only sm:not-sr-only">LinkedIn</span>
              </a>
            </li>
          ) : null}
        </ul>
        <p className="font-mono text-xs">
          Built with Next.js · No tracking
        </p>
      </div>
    </footer>
  );
}
