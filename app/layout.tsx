import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { RevealObserver } from "@/components/motion/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Robin Hmaidan, full-stack developer (Next.js, TypeScript, PostgreSQL) and security-minded engineer. Lead developer of esthéJob and security & integration lead on esthéJob Cowork. Based in Lebanon, open to remote or relocation.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  keywords: [
    "Robin Hmaidan",
    "full-stack developer",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Supabase",
    "web security",
    "Lebanon",
    "remote",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} · ${site.role}`,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

/**
 * Runs in <head> before first paint. Marks <html> so the scroll-reveal styles
 * apply, and removes the mark after 3 s if the reveal observer never started
 * (slow or broken JavaScript), so content can never stay hidden.
 */
const revealBootScript = `(function(){var d=document.documentElement;d.setAttribute("data-js","");setTimeout(function(){if(!window.__revealReady)d.removeAttribute("data-js")},3000)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-ink px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
