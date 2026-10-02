import Link from "next/link";

import { DownloadIcon } from "@/components/icons";
import { HeaderShell } from "@/components/motion/header-shell";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-[0.95rem] font-semibold tracking-tight text-ink"
          aria-label={`${site.name}, home`}
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-full bg-ink text-[0.72rem] font-bold tracking-normal text-white transition-[background-color,rotate] duration-500 ease-expo group-hover:-rotate-12 group-hover:bg-accent-strong"
          >
            RH
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-nav=""
                  className="link-underline py-1 text-sm font-medium text-slate-600 hover:text-ink data-active:text-ink"
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
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-[background-color,translate] duration-300 hover:-translate-y-px hover:bg-slate-800"
        >
          <DownloadIcon width={16} height={16} />
          <span>
            CV<span className="sr-only"> (PDF)</span>
          </span>
        </a>
      </div>

      {/* Compact nav for small screens: no JavaScript needed */}
      <nav aria-label="Main (mobile)" className="md:hidden">
        <ul className="container-page flex items-center justify-between gap-1 overflow-x-auto pb-2">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-nav=""
                className="link-underline block py-1 text-[0.82rem] font-medium whitespace-nowrap text-slate-600 hover:text-ink data-active:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </HeaderShell>
  );
}
