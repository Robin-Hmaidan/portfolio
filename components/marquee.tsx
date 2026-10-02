/**
 * Slow, infinite tech-stack marquee. Pure CSS (see .marquee in globals.css):
 * pauses on hover, becomes a static wrapped list for reduced motion.
 * Decorative: every item is also listed in the skills list right below it,
 * so the whole band is hidden from assistive technology.
 */
export function Marquee({ items }: { items: readonly string[] }) {
  const row = (copy: number) => (
    <ul key={copy} className="flex shrink-0 items-center gap-x-10 gap-y-4 pr-10 sm:gap-x-14 sm:pr-14">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 sm:gap-14">
          <span className="text-3xl font-semibold tracking-[-0.03em] whitespace-nowrap text-slate-400/80 transition-colors duration-300 hover:text-ink sm:text-5xl">
            {item}
          </span>
          <span className="size-2 rounded-full bg-accent/60" />
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-hidden="true" className="marquee py-2">
      <div className="marquee-track">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
