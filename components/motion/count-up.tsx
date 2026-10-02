"use client";

import { useEffect, useRef } from "react";

const DURATION = 1600;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts a figure like "1,500+" up from zero when it scrolls into view.
 * The server renders the final value, so it is correct without JavaScript,
 * and the final value reserves the width, so counting never shifts layout.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)([\d,]+)(.*)$/);
    if (!el || !match) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    const format = (n: number) => `${prefix}${Math.round(n).toLocaleString("en-US")}${suffix}`;

    if (
      target < 10 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !document.documentElement.hasAttribute("data-js") ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    // Already on screen and fully visible (slow hydration): the visitor has
    // read the number, so do not reset it to zero.
    const rect = el.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
    const host = el.closest<HTMLElement>("[data-count-host]") ?? el;
    if (onScreen && Number.parseFloat(getComputedStyle(host).opacity) > 0.95) return;

    el.textContent = format(0);
    let frame = 0;
    let timer = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION);
        el.textContent = format(target * easeOutExpo(t));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      // If the host is still waiting on its staggered CSS entrance, start
      // counting when it begins to appear, not while it is invisible.
      const entrance = host.getAnimations?.()[0];
      const wait = entrance
        ? Number(entrance.effect?.getTiming().delay ?? 0) - Number(entrance.currentTime ?? 0)
        : 0;
      timer = window.setTimeout(run, Math.max(0, wait));
    });
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <>
      <span aria-hidden="true" className="inline-grid tabular-nums">
        <span className="invisible col-start-1 row-start-1">{value}</span>
        <span ref={ref} className="col-start-1 row-start-1">
          {value}
        </span>
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
