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

Every fact on the site comes from the CV (`public/CV-Robin-Hmaidan.pdf`). Update the CV first, then the site.

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

## Notes

- `assets/fonts/` holds Inter and JetBrains Mono TTF files (SIL Open Font License), used only to render the Open Graph images.
- `review-shots/` (local review screenshots) and `raw/` (unprocessed captures) are git-ignored.
