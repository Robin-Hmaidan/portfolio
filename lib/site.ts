/**
 * Site-wide configuration. Edit personal details and links here.
 *
 * Every fact on this site must come from the CV (public/CV-Robin-Hmaidan.pdf).
 */
export const site = {
  name: "Robin Hmaidan",
  role: "Full-Stack Developer",
  pitch:
    "I take SaaS products from prototype to production: database, auth, payments, tests and deployment, with security built in from day one.",
  location: "Lebanon, UTC+2 · Available now, remote",

  email: "robinhmiadan01@gmail.com",
  github: "https://github.com/Robin-Hmaidan",

  /** LinkedIn profile URL. Set to "" to hide the LinkedIn link everywhere. */
  linkedin: "https://www.linkedin.com/in/robin-hmaidan-09a9a0230" as string,

  cvPath: "/CV-Robin-Hmaidan.pdf",

  /**
   * Public URL of the deployed site, used for canonical URLs, Open Graph,
   * the sitemap and robots.txt. Set NEXT_PUBLIC_SITE_URL when deploying,
   * or replace the fallback below once the final domain is known.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://robin-hmaidan.vercel.app",
} as const;

export const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#security", label: "Security" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
] as const;
