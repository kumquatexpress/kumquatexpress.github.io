import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import "./fonts.css";
import "./styles.css";

const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
