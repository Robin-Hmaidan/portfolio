import Image from "next/image";

import type { Shot } from "@/lib/projects";

const zoomClass = "transition-transform duration-700 ease-expo group-hover:scale-[1.03]";

/** Desktop screenshot inside a minimal browser window */
export function BrowserFrame({
  shot,
  sizes = "(min-width: 1024px) 760px, 100vw",
  preload = false,
  zoom = false,
  className = "",
}: {
  shot: Shot;
  sizes?: string;
  preload?: boolean;
  /** Zoom the screenshot slightly when a parent `.group` is hovered */
  zoom?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-25px_rgb(15_23_42/0.35)] ring-1 ring-slate-900/10 ${className}`}
    >
      <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 shadow-[inset_0_-1px_0_var(--color-line)]">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-slate-200" />
          <span className="size-2.5 rounded-full bg-slate-200" />
          <span className="size-2.5 rounded-full bg-slate-200" />
        </span>
        {shot.url ? (
          <span className="mx-auto truncate rounded-md bg-white px-3 py-0.5 font-mono text-[0.7rem] text-muted ring-1 ring-line">
            {shot.url}
          </span>
        ) : null}
      </div>
      <div className="overflow-hidden">
        <Image
          src={shot.src}
          alt={shot.alt}
          sizes={sizes}
          placeholder="blur"
          preload={preload}
          className={`block h-auto w-full ${zoom ? zoomClass : ""}`}
        />
      </div>
    </div>
  );
}

/** Mobile screenshot inside a simple phone outline */
export function PhoneFrame({
  shot,
  className = "",
  sizes = "240px",
}: {
  shot: Shot;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[1.75rem] bg-ink p-1.5 shadow-[0_30px_60px_-20px_rgb(15_23_42/0.45)] ring-1 ring-slate-900/20 ${className}`}
    >
      <div className="overflow-hidden rounded-[1.4rem] bg-white">
        <Image src={shot.src} alt={shot.alt} sizes={sizes} placeholder="blur" className="block h-auto w-full" />
      </div>
    </div>
  );
}
