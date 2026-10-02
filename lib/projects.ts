import type { StaticImageData } from "next/image";

import ejHomeDesktop from "@/public/screens/esthejob-home-desktop.webp";
import ejHomeMobile from "@/public/screens/esthejob-home-mobile.webp";
import ejOfferDesktop from "@/public/screens/esthejob-offer-coworking-desktop.webp";
import cwLoginDesktop from "@/public/screens/cowork-login-desktop.webp";
import cwLoginMobile from "@/public/screens/cowork-login-mobile.webp";
import posDashboard from "@/public/screens/pos-dashboard.webp";
import posAddProduct from "@/public/screens/pos-add-product.webp";
import toyHome from "@/public/screens/toystore-home.webp";
import toyStores from "@/public/screens/toystore-stores.webp";

/**
 * Case studies. Source of truth: the CV. Where the CV is vague, stay vague.
 */

export type Shot = {
  src: StaticImageData;
  alt: string;
  caption?: string;
  device: "desktop" | "mobile";
  /** URL shown in the fake browser bar */
  url?: string;
};

export type ProjectLink = { label: string; href: string; kind: "live" | "github" };

export type Project = {
  slug: string;
  name: string;
  /** One-line description used on cards and as page subtitle */
  tagline: string;
  /** Short label shown above the title (mono) */
  label: string;
  period: string;
  role: string;
  status?: string;
  size: "featured" | "standard" | "small";
  summary: string;
  context: string[];
  myRole: string[];
  built: string[];
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
  sourceNote?: string;
  shots: Shot[];
  /** Simple flow shown when there is no screenshot */
  flow?: { title: string; steps: string[] };
  /** Use a summary of the security work instead of a screenshot on the home card */
  cardVisual?: "audit";
};

const PRIVATE_CLIENT =
  "Source code is private (client project). Happy to walk through it in an interview.";

export const projects: Project[] = [
  {
    slug: "esthejob",
    name: "esthéJob",
    tagline: "Live B2B marketplace for the French beauty and hairdressing industry",
    label: "Founding full-stack developer",
    period: "May 2026 – Present",
    role: "Founding Full-Stack Developer (lead developer)",
    status: "Live",
    size: "featured",
    summary:
      "Lead developer of a live marketplace connecting beauty and hairdressing salons with freelance professionals, with 200+ registered freelancers. Built from prototype to production: 79 pages, 145 database migrations.",
    context: [
      "esthéJob (esthejob.fr) is a live B2B marketplace that connects beauty and hairdressing salons with freelance professionals for replacements and cabin rental, in France.",
      "The product had to go from prototype to production, serving several user roles with payments, messaging and hiring workflows.",
      "The platform has 200+ registered freelancers (beauty and hairdressing), a figure shown publicly on the esthejob.fr home page.",
    ],
    myRole: [
      "Founding full-stack developer and lead developer, working remotely (France).",
      "Author of roughly 1,500 of the project's ~1,700 commits, shipped in 5 months.",
      "Owned the product end to end: database design, APIs, UI, payments, testing, deployment and monitoring.",
    ],
    built: [
      "Multi-role dashboards for salons, freelancers and admins",
      "Job board with sector filters, messaging and application workflows",
      "CV builder with server-side PDF generation",
      "Video interviews (Daily.co) and maps (Leaflet)",
      "Stripe payments",
      "Feature-flagged expansion into a second business vertical (hairdressing)",
      "A 15-phase design-system migration, turning the product designer's high-fidelity prototypes into production UI",
    ],
    highlights: [
      "Quality pipeline: 120+ Playwright end-to-end scenarios, GitHub Actions CI (type-checking, lint baseline, custom contract checks) and post-deploy smoke tests",
      "Production monitoring with Sentry and PostHog",
      "Row Level Security design on Supabase (PostgreSQL), 145 migrations",
      "Merged the job board and the Cowork SaaS onto one shared database with a single login across two domains, rehearsed on staging before the production cutover (Sep 2026)",
    ],
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "Supabase (PostgreSQL, Auth, RLS)",
      "Stripe",
      "Tailwind",
      "Playwright",
      "GitHub Actions",
      "Sentry",
      "PostHog",
      "Daily.co",
      "Leaflet",
      "Vercel",
    ],
    links: [{ label: "esthejob.fr", href: "https://esthejob.fr", kind: "live" }],
    sourceNote: PRIVATE_CLIENT,
    shots: [
      {
        src: ejHomeDesktop,
        alt: "esthéJob public home page on desktop: headline 'Trouvez votre coworking beauté & bien-être en France' with a search bar for space type and city",
        device: "desktop",
        url: "esthejob.fr",
        caption: "Public home page (desktop)",
      },
      {
        src: ejHomeMobile,
        alt: "esthéJob public home page on a phone, with the search form and space categories",
        device: "mobile",
        url: "esthejob.fr",
        caption: "Public home page (mobile)",
      },
    ],
  },
  {
    slug: "esthejob-cowork",
    cardVisual: "audit",
    name: "esthéJob Cowork",
    tagline: "Security audit and integration of a booking & subscription SaaS",
    label: "Security & integration lead",
    period: "Sep 2026 – Present",
    role: "Security & integration lead",
    status: "Live",
    size: "featured",
    summary:
      "I did not build this product. I joined in Sep 2026 to audit its backend, fix the findings, and integrate it with esthéJob: shared login, one shared database.",
    context: [
      "esthéJob Cowork (cowork.esthejob.fr) is the companion booking and subscription SaaS for coworking beauty spaces in the esthéJob ecosystem.",
      "The product was built by others. Before merging it with the esthéJob job board, it needed a security review and a shared account system across the two domains.",
    ],
    myRole: [
      "Security & integration lead since Sep 2026. I did not build the original product.",
      "Ran the backend security audit, wrote the report, then implemented the fixes.",
      "Led the integration with esthéJob: shared login and the merge onto one shared database.",
    ],
    built: [
      "Backend security audit of the booking and subscription SaaS, with a written report",
      "Content Security Policy with violation reporting",
      "Cloudflare Turnstile on public forms",
      "Tighter database privileges and server-only token lifetimes",
      "Hardened sign-up, password and email-link flows for the shared account system",
      "Shared login with esthéJob and merge onto the shared database",
      "Sentry error tracking",
    ],
    highlights: [
      "Fixed race conditions in promo-code reservations and refunds using atomic PostgreSQL functions",
      "Cleared all 39 React lint errors without changing behaviour",
      "Shared database and single login across two domains, rehearsed on staging before the production cutover (Sep 2026)",
    ],
    stack: [
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "Stripe",
      "Claude API",
      "Vitest",
      "Sentry",
      "Cloudflare Turnstile",
    ],
    links: [{ label: "cowork.esthejob.fr", href: "https://cowork.esthejob.fr", kind: "live" }],
    sourceNote: PRIVATE_CLIENT,
    shots: [
      {
        src: cwLoginDesktop,
        alt: "esthéJob Cowork public sign-in page on desktop: 'Connexion, accédez à votre espace coworking' with email and password fields",
        device: "desktop",
        url: "cowork.esthejob.fr",
        caption: "Public sign-in page (desktop)",
      },
      {
        src: cwLoginMobile,
        alt: "esthéJob Cowork public sign-in page on a phone",
        device: "mobile",
        url: "cowork.esthejob.fr",
        caption: "Public sign-in page (mobile)",
      },
      {
        src: ejOfferDesktop,
        alt: "Public esthéJob offer page for coworking spaces, with a free directory listing, a paid visibility pack and a paid software plan",
        device: "desktop",
        url: "esthejob.fr/offres/coworking",
        caption: "Public offer page for coworking spaces on esthejob.fr",
      },
    ],
  },
  {
    slug: "multi-store-pos",
    name: "Multi-Store POS",
    tagline: "POS and factory management system for a clothing factory",
    label: "Freelance full-stack developer",
    period: "Jan 2024 – Jun 2025",
    role: "Freelance Full-Stack Developer (sole developer)",
    status: "Used daily",
    size: "standard",
    summary:
      "POS and factory management system used daily across 4 stores and 1 production facility. Billing, inventory and cross-store statistics.",
    context: [
      "A clothing factory with several stores needed one system for sales, stock and production, and a clear view of what was happening across all locations.",
    ],
    myRole: [
      "Freelance full-stack developer, working remotely and on my own.",
      "Owned the full architecture, client requirements, iterations and production deployment.",
    ],
    built: [
      "POS and factory management system used daily across 4 stores and 1 production facility",
      "Billing and inventory flows",
      "Cross-store statistics, giving management real-time visibility of operations",
    ],
    highlights: [
      "Built, deployed and iterated with the client directly, from requirements to production",
      "One system shared by multiple stores and a production facility",
    ],
    stack: ["React", "Node.js", "Express", "MySQL"],
    links: [
      { label: "GitHub repository", href: "https://github.com/Robin-Hmaidan/multi-store-pos", kind: "github" },
    ],
    shots: [
      {
        src: posDashboard,
        alt: "Multi-Store POS dashboard with total sales, customers, cash and credit sales, and a monthly sales trend chart across all branches",
        device: "desktop",
        caption: "Dashboard with combined sales across branches",
      },
      {
        src: posAddProduct,
        alt: "Multi-Store POS add-product form with fields for cost, price, category, fabric, size, colour, quantity and branch",
        device: "desktop",
        caption: "Product creation with sizes, fabric and branch",
      },
    ],
  },
  {
    slug: "warai",
    name: "WarAI",
    tagline: "Bilingual AI survival assistant with an offline fallback, security tested",
    label: "Project · AI + security",
    period: "2026",
    role: "Project (in development)",
    status: "In development",
    size: "standard",
    summary:
      "Arabic/English AI assistant for civilians in conflict zones, with an offline RAG fallback. Black-box pentest found and documented 3 vulnerabilities.",
    context: [
      "WarAI is a bilingual (Arabic/English) AI assistant for civilians in conflict zones.",
      "Internet access cannot be assumed in that setting, so the assistant needs to keep answering when it is offline.",
    ],
    myRole: [
      "Project in development (2026).",
      "Ran a black-box penetration test of the application and wrote the report.",
    ],
    built: [
      "Bilingual (Arabic/English) AI assistant",
      "Offline RAG fallback (TF-IDF) so it works without internet",
    ],
    highlights: [
      "Black-box penetration test with Kali Linux, sqlmap and jwt_tool",
      "Found and documented 3 vulnerabilities: prompt injection, JWT revocation failure, and rate-limit bypass via IP spoofing",
      "Report with proof-of-concept commands and fixes",
    ],
    stack: ["Next.js", "Node.js", "Express", "SQLite", "Groq API (LLaMA 3.3 70B)", "Leaflet"],
    links: [],
    sourceNote: "Source code is private while the project is in development. Happy to walk through it and the pentest report in an interview.",
    shots: [],
    flow: {
      title: "How it answers",
      steps: ["question (AR / EN)", "online: LLM via Groq", "offline: TF-IDF RAG fallback", "answer"],
    },
  },
  {
    slug: "automatedpos",
    name: "AutomatedPOS",
    tagline: "Bridge from delivery-app orders to restaurant POS systems and kitchen printers",
    label: "Solo project · in development",
    period: "2026 · In development",
    role: "Solo developer",
    size: "standard",
    summary:
      "Copies confirmed delivery-app orders (Toters) into restaurant POS systems or straight to the kitchen printer, so cashiers stop retyping orders.",
    context: [
      "Restaurants receiving orders through a delivery app (Toters) had cashiers retyping each confirmed order into their POS.",
      "Retyping is slow and error-prone, and totals must still match at the end of the day.",
    ],
    myRole: ["Solo project: I designed and am building the whole service. Still in development (2026)."],
    built: [
      "Service that copies confirmed delivery-app orders into restaurant POS systems or straight to the kitchen printer",
      "Adapter architecture: one adapter per platform or POS",
      "Zod-validated order model",
    ],
    highlights: [
      "Deduplication that survives restarts",
      "Two-step total verification",
      "Audit log for end-of-day reconciliation",
    ],
    stack: ["TypeScript", "Node.js", "Zod"],
    links: [],
    sourceNote: "Source code is private. Happy to walk through it in an interview.",
    shots: [],
    flow: {
      title: "Order flow",
      steps: ["delivery app (Toters)", "platform adapter", "Zod validation", "dedupe + total check", "POS adapter / kitchen printer", "audit log"],
    },
  },
  {
    slug: "dakdouk-ecommerce",
    name: "Dakdouk Retail E-Commerce",
    tagline: "Live online store for a multi-branch retailer, with storefront and admin dashboard",
    label: "Freelance full-stack developer",
    period: "Jan 2024 – Dec 2024",
    role: "Freelance Full-Stack Developer",
    size: "small",
    summary:
      "Live e-commerce platform for a Lebanese retailer with several branches: storefront, cart, checkout, delivery, messaging and an admin dashboard on a Node.js REST API.",
    context: [
      "A retailer in Lebanon with several branches and product categories needed one online shop.",
      "Customers needed to browse, order and track deliveries; the business needed to manage products, stock, orders and stores in one place.",
    ],
    myRole: ["Freelance full-stack developer, working remotely: storefront, admin dashboard and REST API."],
    built: [
      "Storefront: multi-category catalog, browsing by branch, cart, checkout with payment and delivery, order history",
      "Customer accounts with JWT authentication and in-app messaging with the store",
      "Admin dashboard for products, stock, orders, users and stores, with a sales overview",
      "Node.js/Express REST API on MongoDB",
    ],
    highlights: ["Live in production for an active retail business", "One admin dashboard across all branches"],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    links: [
      { label: "GitHub repository", href: "https://github.com/Robin-Hmaidan/dakdouk-ecommerce", kind: "github" },
    ],
    shots: [
      {
        src: toyHome,
        alt: "E-commerce home page with a purple hero banner reading 'Connecting You to Quality Products Worldwide' and a Shop Now button",
        device: "desktop",
        caption: "Home page",
      },
      {
        src: toyStores,
        alt: "E-commerce 'Our Stores' page listing the store brands",
        device: "desktop",
        caption: "Stores page",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
