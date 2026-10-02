import Link from "next/link";

import { DownloadIcon } from "@/components/icons";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-sm font-medium text-ink"
          aria-label={`${site.name}, home`}
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-md bg-ink text-[0.8rem] font-semibold text-white transition-colors group-hover:bg-accent-strong"
          >
            RH
          </span>
          <span className="hidden sm:inline">
            robin<span className="text-accent-strong">@</span>hmaidan
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={site.cvPath}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-ink px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          <DownloadIcon width={16} height={16} />
          <span>
            CV<span className="sr-only"> (PDF)</span>
          </span>
        </a>
      </div>

      {/* Compact nav for small screens: no JavaScript needed */}
      <nav aria-label="Main (mobile)" className="border-t border-line/70 md:hidden">
        <ul className="container-page flex items-center justify-between gap-1 overflow-x-auto py-1.5">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-2 py-1.5 text-[0.8rem] font-medium whitespace-nowrap text-slate-600 hover:bg-slate-100 hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
