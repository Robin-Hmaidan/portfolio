import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const fontsDir = join(process.cwd(), "assets/fonts");

async function loadFonts() {
  const [interMedium, interExtraBold, mono] = await Promise.all([
    readFile(join(fontsDir, "Inter-Medium.ttf")),
    readFile(join(fontsDir, "Inter-ExtraBold.ttf")),
    readFile(join(fontsDir, "JetBrainsMono-Medium.ttf")),
  ]);
  return [
    { name: "Inter", data: interMedium, weight: 500 as const, style: "normal" as const },
    { name: "Inter", data: interExtraBold, weight: 800 as const, style: "normal" as const },
    { name: "Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}

/** Shared Open Graph card layout (1200x630) */
export async function renderOgCard({
  eyebrow,
  title,
  subtitle,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
          fontFamily: "Inter",
          borderTop: "14px solid #0d9488",
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.08) 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "#0f172a",
              color: "#ffffff",
              fontFamily: "Mono",
              fontSize: 26,
            }}
          >
            RH
          </div>
          <div style={{ display: "flex", fontFamily: "Mono", fontSize: 26, color: "#0f766e" }}>{eyebrow}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, color: "#0f172a", letterSpacing: -2, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ marginTop: 22, fontSize: 34, color: "#334155", lineHeight: 1.35, maxWidth: 980 }}>
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Mono",
            fontSize: 22,
            color: "#64748b",
          }}
        >
          <div style={{ display: "flex" }}>{footer}</div>
          <div style={{ display: "flex", color: "#0f172a" }}>github.com/Robin-Hmaidan</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}
