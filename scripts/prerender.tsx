import { readFile, writeFile } from "node:fs/promises";
import { renderToString } from "react-dom/server";
import { App } from "../src/App";

const template = await readFile("dist/index.html", "utf8");
if (!template.includes("<!--app-html-->"))
  throw new Error("PRERENDER: Missing application HTML marker");
await writeFile(
  "dist/index.html",
  template.replace("<!--app-html-->", renderToString(<App />)),
);
console.log(
  "Prerendered the complete page for search engines and JavaScript-free reading.",
);
