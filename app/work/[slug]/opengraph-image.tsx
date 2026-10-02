import { ogSize, renderOgCard } from "@/lib/og";
import { getProject, projects } from "@/lib/projects";

export const alt = "Case study by Robin Hmaidan";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgCard({
    eyebrow: "case study",
    title: project?.name ?? "Case study",
    subtitle: project?.tagline ?? "",
    footer: `Robin Hmaidan · ${project?.label ?? "Full-Stack Developer"}`,
  });
}
