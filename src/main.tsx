import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import "@fontsource-variable/manrope";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "./styles.css";

const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
