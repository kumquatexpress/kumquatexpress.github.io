import sharp from "sharp";
const art = ["island", "cinema", "still-life", "toys"];
for (const name of art) {
  await sharp(`source-art/${name}-original.png`)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`public/art/${name}.webp`);
  if (name === "island")
    await sharp(`source-art/${name}-original.png`)
      .resize(800)
      .webp({ quality: 78 })
      .toFile("public/art/island-small.webp");
}
await sharp("source-art/island-original.png")
  .resize(1200, 630)
  .png()
  .toFile("public/social.png");
