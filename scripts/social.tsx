import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { Sculpture } from "../src/Sculpture";

const flower = renderToStaticMarkup(<Sculpture paused />)
  .match(/<svg viewBox="0 0 520 520"[\s\S]*?<\/svg>/)![0]
  .replace("<svg ", '<svg x="660" y="30" width="520" height="520" ')
  .replaceAll("var(--petal)", "#254ad8")
  .replaceAll("var(--edge)", "#142a96")
  .replaceAll("var(--seed)", "#f5a13c");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f6f4ed"/>
  <path d="M65 95H1135M65 548H1135" stroke="#d9d9cf"/>
  <text x="65" y="64" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="600" fill="#292e2b">Boyang Niu</text>
  <text x="1135" y="64" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#666d5d">ENGINEER &amp; BUILDER</text>
  <text x="65" y="216" font-family="Georgia,serif" font-size="85" letter-spacing="-5" fill="#292e2b">A little</text>
  <text x="65" y="309" font-family="Georgia,serif" font-size="99" font-style="italic" letter-spacing="-5" fill="#254ad8">curiosity.</text>
  <text x="65" y="402" font-family="Georgia,serif" font-size="85" letter-spacing="-5" fill="#292e2b">A long way.</text>
  <text x="68" y="478" font-family="Helvetica,Arial,sans-serif" font-size="18" fill="#666d5d">Building things at OpenAI. Based in San Francisco.</text>
  ${flower}
  <text x="65" y="588" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#666d5d">A PERSONAL CORNER OF THE INTERNET</text>
  <text x="1135" y="588" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#666d5d">kumquatexpress.github.io</text>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/social.png");
console.log("Generated public/social.png (1200 × 630).");
