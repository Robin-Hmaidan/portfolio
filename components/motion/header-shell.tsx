"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sticky header wrapper: gets a blurred background and a hairline once the
 * page scrolls, and underlines the nav link of the section currently in view.
 * The header content itself is rendered on the server.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => el.toggleAttribute("data-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[data-nav]"));
    const setActive = (id: string | null) =>
      links.forEach((l) => l.toggleAttribute("data-active", id !== null && l.hash === `#${id}`));
    setActive(null);
    if (pathname !== "/" || !("IntersectionObserver" in window)) return;

    const sections = Array.from(new Set(links.map((l) => l.hash.slice(1))))
      .map((id) => document.querySelector<HTMLElement>(`section[aria-labelledby="${id}"]`))
      .filter((s): s is HTMLElement => s !== null);

    // Track which sections cross the reading line, so the underline clears again
    // above the first section (hero) instead of sticking to the last one seen.
    const inView = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target);
          else inView.delete(entry.target);
        }
        const current = sections.findLast((s) => inView.has(s));
        setActive(current ? current.getAttribute("aria-labelledby") : null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <header
      ref={ref}
      className="sticky top-0 z-40 border-b border-transparent transition-[background-color,border-color,box-shadow] duration-300 data-scrolled:border-line/70 data-scrolled:bg-white/80 data-scrolled:shadow-[0_10px_30px_-18px_rgb(15_23_42/0.25)] data-scrolled:backdrop-blur-lg"
    >
      {children}
    </header>
  );
}
