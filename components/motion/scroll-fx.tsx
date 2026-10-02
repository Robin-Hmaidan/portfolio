"use client";

import { scroll } from "motion";
import { useEffect, useRef, type ReactNode } from "react";

type Offset = NonNullable<Parameters<typeof scroll>[1]>["offset"];

const transformAt = (scale: [number, number], y: [number, number], p: number) =>
  `translate3d(0, ${(y[0] + (y[1] - y[0]) * p).toFixed(2)}px, 0) scale(${(scale[0] + (scale[1] - scale[0]) * p).toFixed(4)})`;

/**
 * Scroll-linked scale / vertical parallax for screenshots, driven by motion's
 * small vanilla `scroll()` helper (no React animation runtime needed).
 * Children stay server-rendered; only this thin wrapper is a client component.
 * Off for reduced motion, here and via the .scroll-fx rule in globals.css.
 */
export function ScrollFx({
  children,
  className = "",
  scale = [1, 1],
  y = [0, 0],
  offset = ["start end", "end start"],
}: {
  children: ReactNode;
  className?: string;
  /** [start, end] scale across the scroll range */
  scale?: [number, number];
  /** [start, end] translateY in px across the scroll range */
  y?: [number, number];
  offset?: Offset;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const key = JSON.stringify([scale, y, offset]);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [s, ty, off] = JSON.parse(key) as [[number, number], [number, number], Offset];
    return scroll(
      (progress: number) => {
        el.style.transform = transformAt(s, ty, progress);
      },
      { target: el, offset: off },
    );
  }, [key]);

  return (
    <div ref={ref} style={{ transform: transformAt(scale, y, 0) }} className={`scroll-fx will-change-transform ${className}`}>
      {children}
    </div>
  );
}
