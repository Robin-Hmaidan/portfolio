"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/**
 * Reveals every [data-reveal] element once, when it scrolls into view.
 * Elements already in view on load are revealed straight away (the observer
 * reports them in its first callback). Mounted once in the root layout and
 * re-run on every client-side navigation.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    window.__revealReady = true;
    const root = document.documentElement;
    const pending = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])"));
    const show = (el: Element) => el.setAttribute("data-shown", "");

    if (!root.hasAttribute("data-js") || !("IntersectionObserver" in window)) {
      pending().forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    pending().forEach((el) => io.observe(el));

    // Anything still hidden when the visitor reaches the very bottom is revealed.
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= root.scrollHeight - 4) {
        pending().forEach(show);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
