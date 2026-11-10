# Boyang Niu

A personal website built with React, TypeScript, Tailwind CSS, and Vite. Warm paper, sculptural color, a custom kinetic flower, and a small collection of real work.

## Develop

Use Node.js 24 or newer.

```sh
npm ci
npm run dev
```

## Check and build

```sh
npm test
npm run build
npm run preview
```

The build type-checks the source, bundles the application, and prerenders the complete page into `dist/index.html`. React hydrates the static document in production. JavaScript is needed only for the flower controls and motion toggle; the biography, projects, navigation, and links are available without it.

## Deploy

Every push to `main` runs the tests, builds the site, and deploys `dist/` to GitHub Pages through `.github/workflows/deploy.yml`. Pull requests run the same validation without deploying. Pages is configured to use GitHub Actions.

Live URL: https://kumquatexpress.github.io/

The Vite base is `/` because this is the account's root Pages repository. To deploy under a repository subpath instead, update `base` in `vite.config.ts` and the canonical, Open Graph, robots, and sitemap URLs.

## Content and design

- Page content: `src/App.tsx`
- Interactive sculpture: `src/Sculpture.tsx`
- Typography, responsive layout, and motion: `src/styles.css`
- Research and factual sources: `docs/research.md`

All project artwork is original CSS/SVG illustration, not product screenshots. Fonts are self-hosted via Fontsource. No third-party scripts, analytics, tracking, external font requests, or API keys are required. All continuous animations honor the operating system's reduced-motion setting and the page's Pause motion control.
