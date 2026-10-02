import type { MetadataRoute } from "next";

import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: p.size === "featured" ? 0.9 : 0.7,
    })),
  ];
}
