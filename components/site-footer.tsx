import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { site } from "@/lib/site";

const linkClass = "inline-flex items-center gap-2 py-1.5 transition-colors hover:text-ink";

export function SiteFooter() {
  return (
    <footer className="bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-4 border-t border-line py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-semibold text-ink">{site.name}</span> · {site.role} · Lebanon
          </p>
          <ul className="flex items-center gap-5">
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                <MailIcon width={16} height={16} />
                <span className="link-underline sr-only sm:not-sr-only">Email</span>
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <GitHubIcon width={16} height={16} />
                <span className="link-underline sr-only sm:not-sr-only">GitHub</span>
              </a>
            </li>
            {site.linkedin ? (
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <LinkedInIcon width={16} height={16} />
                  <span className="link-underline sr-only sm:not-sr-only">LinkedIn</span>
                </a>
              </li>
            ) : null}
          </ul>
          <p className="text-xs">Built with Next.js · No tracking</p>
        </div>
      </div>
    </footer>
  );
}
