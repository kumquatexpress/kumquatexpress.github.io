import { readFile, writeFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
const svg = await readFile(
  new URL("../public/social.svg", import.meta.url),
  "utf8",
);
await writeFile(
  new URL("../public/social.png", import.meta.url),
  new Resvg(svg).render().asPng(),
);
