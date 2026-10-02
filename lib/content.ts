/**
 * Home page content: headline numbers, security work, experience, skills.
 * Source of truth: the CV. Do not add facts that are not on the CV.
 */

export const stats = [
  { value: "1,500+", label: "commits shipped in 5 months" },
  { value: "2 live", label: "production products" },
  { value: "120+", label: "end-to-end test scenarios" },
  { value: "145", label: "PostgreSQL migrations" },
] as const;

export type SecurityItem = {
  tag: string;
  title: string;
  context: string;
  points: string[];
  href?: string;
};

export const security: SecurityItem[] = [
  {
    tag: "audit + fixes",
    title: "Backend security audit",
    context: "esthéJob Cowork · booking & subscription SaaS",
    points: [
      "Audited the backend and wrote the report, then fixed the findings",
      "Content Security Policy with violation reporting",
      "Cloudflare Turnstile on public forms",
      "Tighter database privileges and server-only token lifetimes",
      "Race conditions in promo-code reservations and refunds fixed with atomic PostgreSQL functions",
      "Hardened sign-up, password and email-link flows for the shared account system",
    ],
    href: "/work/esthejob-cowork",
  },
  {
    tag: "design",
    title: "Row Level Security",
    context: "esthéJob · multi-role marketplace",
    points: [
      "Row Level Security design on Supabase (PostgreSQL) for a live marketplace with salon, freelancer and admin roles",
      "One shared database and a single login across two domains, rehearsed on staging before the production cutover",
    ],
    href: "/work/esthejob",
  },
  {
    tag: "pentest",
    title: "Black-box penetration test",
    context: "WarAI · in development",
    points: [
      "Tested with Kali Linux, sqlmap and jwt_tool",
      "Documented findings in a report with proof-of-concept commands and fixes",
    ],
    href: "/work/warai",
  },
];

export const pentestFindings = [
  "Prompt injection",
  "JWT revocation failure",
  "Rate-limit bypass via IP spoofing",
] as const;

export type ExperienceItem = {
  title: string;
  org: string;
  orgHref?: string;
  period: string;
  location: string;
  points: string[];
  stack?: string;
  sub?: {
    title: string;
    href?: string;
    period: string;
    points: string[];
    stack?: string;
  };
  caseStudy?: string;
};

export const experience: ExperienceItem[] = [
  {
    title: "Founding Full-Stack Developer",
    org: "esthéJob",
    orgHref: "https://esthejob.fr",
    period: "May 2026 – Present",
    location: "Remote · France",
    points: [
      "Lead developer of a live B2B marketplace connecting beauty and hairdressing salons with freelance professionals, built from prototype to production: 79 pages, 145 database migrations",
      "Multi-role dashboards, job board, messaging, application workflows, CV builder with server-side PDF generation, video interviews, maps and Stripe payments",
      "Quality pipeline: 120+ Playwright end-to-end scenarios, GitHub Actions CI, post-deploy smoke tests, Sentry and PostHog monitoring",
      "Merged the job board and the Cowork SaaS onto one shared database with a single login across two domains (Sep 2026)",
    ],
    stack: "Next.js · TypeScript · Supabase · Stripe · Tailwind · Playwright · Vercel",
    sub: {
      title: "esthéJob Cowork · Security & integration lead",
      href: "https://cowork.esthejob.fr",
      period: "Sep 2026 – Present",
      points: [
        "Backend security audit and report, then fixes: CSP with violation reporting, Cloudflare Turnstile, tighter database privileges, server-only token lifetimes",
        "Fixed race conditions in promo-code reservations and refunds with atomic PostgreSQL functions",
        "Cleared all 39 React lint errors without changing behaviour; integrated Sentry",
      ],
      stack: "Next.js · Supabase · Stripe · Claude API · Vitest · Sentry · Cloudflare Turnstile",
    },
    caseStudy: "/work/esthejob",
  },
  {
    title: "Freelance Frontend Developer (Contract)",
    org: "OEG Outsourcing · SharePoint Online",
    period: "Jan 2026 – Feb 2026",
    location: "Mount Lebanon",
    points: [
      "Designed and built a client-facing SharePoint Online interface with responsive layouts for document libraries, task lists and calendars",
      "Worked with stakeholders to turn business requirements into clear, usable UI",
    ],
  },
  {
    title: "Freelance Full-Stack Developer",
    org: "Multi-Store POS System · Clothing Factory",
    orgHref: "https://github.com/Robin-Hmaidan/multi-store-pos",
    period: "Jan 2024 – Jun 2025",
    location: "Remote",
    points: [
      "Built and deployed a POS and factory management system used daily across 4 stores and 1 production facility",
      "Billing, inventory flows and cross-store statistics, giving management real-time visibility of operations",
      "Owned the full architecture, client requirements, iterations and production deployment on my own",
    ],
    stack: "React · Node.js · Express · MySQL",
    caseStudy: "/work/multi-store-pos",
  },
  {
    title: "Freelance Frontend Developer",
    org: "E-Commerce Platform · Toy Store",
    orgHref: "https://github.com/Robin-Hmaidan/dakdouk-ecommerce",
    period: "Jan 2024 – Dec 2024",
    location: "Remote",
    points: [
      "Built a client-facing e-commerce site with product listings, shopping cart and an integrated delivery system",
      "Developed responsive React interfaces connected to REST APIs for order and delivery management",
    ],
    caseStudy: "/work/toy-store-ecommerce",
  },
  {
    title: "Computer Science Lab Assistant",
    org: "University of Balamand",
    period: "Sep 2023 – Dec 2023",
    location: "Lebanon",
    points: [
      "Supported students in Java and Data Structures labs: explained concepts and helped them debug",
    ],
  },
];

export const education = {
  degree: "BSc in Computer Science",
  school: "University of Balamand",
  period: "2021 – 2024",
  location: "Lebanon",
} as const;

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: ["React", "Next.js (App Router)", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "shadcn/ui", "HTML", "CSS"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "REST APIs", "Supabase (Auth, RLS, Storage, RPC)", "Stripe", "Zod", "JWT authentication"],
  },
  {
    group: "Databases",
    items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Firebase"],
  },
  {
    group: "Security",
    items: [
      "Web application pentesting",
      "OWASP Top 10",
      "Row Level Security",
      "Content Security Policy",
      "JWT attacks",
      "SQL injection",
      "Rate-limit bypass",
      "Prompt injection",
      "Kali Linux",
      "sqlmap",
    ],
  },
  {
    group: "Testing & Ops",
    items: ["Playwright", "Vitest", "GitHub Actions", "Vercel", "Sentry", "PostHog", "Git"],
  },
  {
    group: "AI",
    items: ["Claude API", "Groq API", "RAG", "AI-assisted development (Claude Code)"],
  },
  {
    group: "Languages",
    items: ["Arabic (native)", "English (fluent)"],
  },
];
