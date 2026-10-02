# Robin Hmaidan · Portfolio

Personal developer portfolio for Robin Hmaidan, full-stack developer (Next.js, TypeScript, PostgreSQL) with a focus on web security.

It is a fully static Next.js site (App Router, TypeScript, Tailwind CSS v4). No backend, no database, no analytics.

## Pages

- `/`: hero, selected work, security, experience, skills, contact
- `/work/[slug]`: case studies (`esthejob`, `esthejob-cowork`, `multi-store-pos`, `warai`, `automatedpos`, `dakdouk-ecommerce`)
- Generated: `/opengraph-image`, `/work/[slug]/opengraph-image`, `/icon.svg`, `/apple-icon`, `/sitemap.xml`, `/robots.txt`

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all pages are prerendered)
npm run start   # serve the production build
npm run lint
```

## Where to edit content

Every fact on the site comes from the CV (`public/CV-Robin-Hmaidan.pdf`), except the public esthéJob figure "200+ registered freelancers" (shown on the esthejob.fr home page). Update the CV first, then the site.

| What | File |
| --- | --- |
| Name, pitch, email, GitHub, **LinkedIn** (empty = hidden), site URL | `lib/site.ts` |
| Headline numbers, security section, experience, education, skills | `lib/content.ts` |
| Case studies (text, stack, links, screenshots) | `lib/projects.ts` |
| Colours and fonts | `app/globals.css`, `app/layout.tsx` |
| Social preview image | `lib/og.tsx` |

- **LinkedIn:** set `linkedin` in `lib/site.ts` to the full profile URL. Links show up in the contact section and footer automatically.
- **Site URL:** set `NEXT_PUBLIC_SITE_URL` (for example in Vercel project settings) or change the fallback in `lib/site.ts`. It is used for canonical URLs, Open Graph, the sitemap and robots.txt.
- **CV:** replace `public/CV-Robin-Hmaidan.pdf` (keep the file name, or update `cvPath` in `lib/site.ts`).
- **Screenshots:** optimised WebP files live in `public/screens/` and are imported in `lib/projects.ts`. Only use public, logged-out pages, never pages with personal data.

## Motion

- Hero and case-study headers use pure CSS entrance animations (`enter`, `enter-word` in `app/globals.css`), so they never depend on JavaScript.
- Scroll reveals: add `data-reveal` to an element (stagger siblings with `style={stagger(i)}`). `components/motion/reveal-observer.tsx` reveals them once in view. They are only hidden while JS is running (an inline script in `app/layout.tsx` sets `data-js` and removes it after 3 s if the observer never starts).
- `components/motion/scroll-fx.tsx` (scroll-linked scale/parallax, motion `scroll()`), `count-up.tsx` (hero numbers) and `header-shell.tsx` (blurred header, active nav link) are the only client components.
- Everything respects `prefers-reduced-motion`: no reveals, no parallax, no count-up, and the tech marquee becomes a static list.

## Notes

- `assets/fonts/` holds Inter and JetBrains Mono TTF files (SIL Open Font License), used only to render the Open Graph images.
- `review-shots/` (local review screenshots) and `raw/` (unprocessed captures) are git-ignored.
