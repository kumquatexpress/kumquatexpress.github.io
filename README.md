# Boyang Niu

A small personal website built with React, TypeScript, Tailwind CSS, and Vite.

**Live:** https://kumquatexpress.github.io/

## Develop

Use Node.js 24 or newer.

```sh
npm ci
npm run dev
```

## Build and verify

```sh
npm run check
npx playwright install chromium
npm test
npm run preview
```

`npm run build` produces `dist/`. A build-time React render writes the full page to `index.html`; the browser hydrates that same React tree. Reading, navigation, and external links work without JavaScript. React adds a small keyboard-accessible arcade game and an optional interactive Three.js island. The Three.js scene is fetched only after choosing **Enter 3D**; its artwork remains visible during loading and on failure.

The Playwright suite checks production HTML/art without JavaScript, phone/tablet/desktop layout and Axe accessibility checks, keyboard-operated arcade scoring, lazy scene loading, camera/action controls, pause, initial and changing reduced-motion preferences, offscreen suspension, failed chunk loading, and WebGL context loss. It also saves visual review screenshots.

## Deploy to GitHub Pages

The included workflow builds and tests on pull requests and pushes to `main`, and deploys `main` through the official Pages actions. The repository's Pages source must be **GitHub Actions**. No API keys or application server are needed.

Asset paths are relative, so `dist/` also works under a project subpath. If moving to another URL, update canonical, Open Graph, `robots.txt`, and `sitemap.xml`. No custom domain is configured by this project.

## Edit

- `src/content.ts`: selected work, experiments, and essay links.
- `src/App.tsx`: introduction, biography, sections, social links.
- `src/World.tsx` and `src/world-scene.ts`: progressive scene loading, 3D island, rendering lifecycle, and controls.
- `src/styles.css`: typography, palette, layout, motion.
- `source-art/` and `public/art/`: original and compressed artwork. Run `node scripts/optimize-art.mjs` after changing source assets.
- `docs/artwork.md`: complete imagegen prompts and asset provenance.

Fonts are self-hosted Latin subsets via Fontsource (DM Sans and Instrument Serif, SIL Open Font License). Their licenses are included in `public/licenses/`. No analytics or third-party runtime requests. The optional Three.js renderer caps pixel ratio and ambient rendering, stops offscreen/hidden/paused or for reduced motion, and releases its resources. Artwork is original conceptual site art, not product screenshots. The phone hero is about 73 kB; all site artwork is served locally as WebP.

See [the research and design notes](docs/research.md) for factual sources, inspiration, and provisional decisions to review.
