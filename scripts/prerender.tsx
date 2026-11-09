import { readFile, writeFile } from "node:fs/promises";
import { renderToString } from "react-dom/server";
import App from "../src/App";

const path = new URL("../dist/index.html", import.meta.url);
const html = await readFile(path, "utf8");
await writeFile(
  path,
  html.replace(
    '<div id="root"></div>',
    `<div id="root">${renderToString(<App />)}</div>`,
  ),
);
console.log("Prerendered the complete page to static HTML.");
