import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { StudioScene } from "../src/LightStudy";

const scene = renderToStaticMarkup(<StudioScene />).replace(
  "<svg ",
  '<svg x="650" y="100" width="520" height="410" ',
);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f6f4ed"/>
<path d="M65 95H1135M65 548H1135" stroke="#d9d9cf"/>
<text x="65" y="64" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="600" fill="#292e2b">Boyang Niu</text>
<text x="1135" y="64" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#536348">ENGINEER &amp; BUILDER</text>
<text x="65" y="247" font-family="Georgia,serif" font-size="88" letter-spacing="-5" fill="#292e2b">Tools for</text>
<text x="65" y="353" font-family="Georgia,serif" font-size="87" font-style="italic" letter-spacing="-5" fill="#254ad8">imagination.</text>
<text x="68" y="435" font-family="Helvetica,Arial,sans-serif" font-size="19" fill="#536348">Engineer at OpenAI. Previously co-founded Stylized.</text>
${scene}
<text x="65" y="588" font-family="Helvetica,Arial,sans-serif" font-size="13" fill="#536348">SAN FRANCISCO / @KUMQUATEXPRESS</text>
<text x="1135" y="588" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#536348">kumquatexpress.github.io</text>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/social.png");
console.log("Generated public/social.png (1200 × 630).");

if (process.argv.includes("--proof")) {
  const pieces = await Promise.all(
    [-100, 0, 100].map(async (light) =>
      sharp(
        Buffer.from(
          renderToStaticMarkup(<StudioScene light={light} />).replace(
            "<svg ",
            '<svg xmlns="http://www.w3.org/2000/svg" ',
          ),
        ),
      )
        .resize(390, 308)
        .png()
        .toBuffer(),
    ),
  );
  await sharp({
    create: { width: 1170, height: 308, channels: 4, background: "#f6f4ed" },
  })
    .composite(pieces.map((input, i) => ({ input, top: 0, left: i * 390 })))
    .png()
    .toFile("/private/tmp/boyang-light-proof.png");
}
