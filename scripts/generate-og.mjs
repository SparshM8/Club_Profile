import fs from "fs/promises";
import path from "path";

async function main() {
  const svgPath = path.join(process.cwd(), "public", "og-image.svg");
  const out1200 = path.join(process.cwd(), "public", "og-image-1200x630.png");
  const out600 = path.join(process.cwd(), "public", "og-image-600x315.png");

  try {
    const sharp = await import("sharp");
    const svg = await fs.readFile(svgPath);

    await sharp.default(svg).resize(1200, 630).png({ quality: 90 }).toFile(out1200);
    await sharp.default(svg).resize(600, 315).png({ quality: 90 }).toFile(out600);

    console.log("OG images generated:", out1200, out600);
  } catch (err) {
    console.warn("generate-og: sharp not available or failed — skipping raster generation", err?.message || err);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});