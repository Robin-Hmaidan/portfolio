import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const mono = await readFile(join(process.cwd(), "assets/fonts/JetBrainsMono-Medium.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          borderBottom: "24px solid #0d9488",
          color: "#ffffff",
          fontFamily: "Mono",
          fontSize: 72,
          paddingTop: 20,
        }}
      >
        RH
      </div>
    ),
    { ...size, fonts: [{ name: "Mono", data: mono, weight: 500, style: "normal" }] },
  );
}
