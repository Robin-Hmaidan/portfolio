import { ogSize, renderOgCard } from "@/lib/og";

export const alt = "Robin Hmaidan, Full-Stack Developer";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgCard({
    eyebrow: "full-stack developer · security-minded",
    title: "Robin Hmaidan",
    subtitle: "Builds and ships production software. Next.js · TypeScript · PostgreSQL · Web security.",
    footer: "Lebanon · Open to remote or relocation",
  });
}
