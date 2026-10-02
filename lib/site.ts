/**
 * Site-wide configuration. Edit personal details and links here.
 *
 * Every fact on this site must come from the CV (public/CV-Robin-Hmaidan.pdf).
 */
export const site = {
  name: "Robin Hmaidan",
  role: "Full-Stack Developer",
  pitch:
    "I build and ship production software for paying clients, end to end: database design, APIs, UI, payments, testing and deployment, with a security-minded approach.",
  location: "Lebanon · Open to remote or relocation",

  email: "robinhmiadan01@gmail.com",
  github: "https://github.com/Robin-Hmaidan",

  /**
   * LINKEDIN URL — EMPTY ON PURPOSE.
   * Paste the full profile URL here (e.g. "https://www.linkedin.com/in/...")
   * once the profile exists. While this is an empty string, no LinkedIn link
   * is rendered anywhere on the site.
   */
  linkedin: "" as string,

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
