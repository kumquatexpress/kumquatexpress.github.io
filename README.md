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

`npm run build` produces `dist/`. A build-time React render writes the full page to `index.html`; the browser hydrates that same React tree. Reading, navigation, and external links work without JavaScript. React adds the kumquat interaction and appearance control.

The Playwright suite checks the production artifact: JavaScript-free content/navigation, keyboard activation, saved theme and hydration, narrow/tablet/desktop overflow, light/dark WCAG accessibility checks, and reduced-motion behavior.

## Deploy to GitHub Pages

The included workflow builds and tests on pull requests and pushes to `main`, and deploys `main` through the official Pages actions. The repository's Pages source must be **GitHub Actions**. No API keys or application server are needed.

Asset paths are relative, so `dist/` also works under a project subpath. If moving to another URL, update canonical, Open Graph, `robots.txt`, and `sitemap.xml`. No custom domain is configured by this project.

## Edit

- `src/content.ts`: selected work, experiments, and essay links.
- `src/App.tsx`: introduction, biography, sections, social links.
- `src/Drawings.tsx`: original SVG illustrations and kumquat interaction.
- `src/styles.css`: typography, palette, layout, motion.
- `public/social.svg`: sharing artwork. Regenerate its PNG with `npx tsx scripts/social.ts`.

Fonts are self-hosted Latin subsets via Fontsource (DM Sans and Instrument Serif, SIL Open Font License). Their licenses are included in `public/licenses/`. No analytics, third-party runtime requests, or animation library. Illustrations are decorative original compositions, not product screenshots.

See [the research and design notes](docs/research.md) for factual sources, inspiration, and provisional decisions to review.
