# Boyang Niu

A personal website built with React, TypeScript, Tailwind CSS, and Vite. “Tools for imagination” connects Boyang’s work in creative products with a small interactive kumquat light study, selected projects, and earlier experiments.

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

The build type-checks the source, bundles the application, and prerenders the complete page into `dist/index.html`. React hydrates the static document in production. The biography, projects, images, navigation, and links remain available without JavaScript; the light control and local streaming example become available after hydration.

The adjacent motion control saves the visitor’s preference locally. Without a saved preference, the site follows the operating system’s reduced-motion setting. Ambient animation starts only after hydration, and the streaming sketch runs only on request.

## Deploy

Every push to `main` runs the tests, builds the site, and deploys `dist/` to GitHub Pages through `.github/workflows/deploy.yml`. Pull requests run the same validation without deploying. Pages is configured to use GitHub Actions.

Live URL: https://kumquatexpress.github.io/

The Vite base is `/` because this is the account's root Pages repository. To deploy under a repository subpath instead, update `base` in `vite.config.ts` and the canonical, Open Graph, robots, and sitemap URLs.

## Content and design

- Page content: `src/App.tsx`
- Interactive light study: `src/LightStudy.tsx`
- Local text-stream sketch: `src/StreamDemo.tsx`
- Typography, responsive layout, and motion: `src/styles.css`
- Self-hosted fonts and regeneration notes: `src/fonts/README.md`
- Research and factual sources: `docs/research.md`

The Sora image is a self-hosted WebP frame from OpenAI’s official Tokyo-walk sample, with visible attribution and a link to the original video. Sora and Stylized are presented as archived projects. The kumquat study and Stylized still life are original SVG/CSS illustrations, not authentic product output. The streaming sketch is an explicitly labeled local illustration; it uses no external endpoint or AI model.

The three tracked Latin WOFF2 fonts derive from Fontsource. Fixed Fraunces design axes reduce the compared Latin font payload by 40.6% while retaining variable weight and optical size; see the font notes for measurements, licenses, and the optional regeneration workflow. Normal builds need no Python font processing.

No third-party scripts, analytics, tracking, external font requests, or API keys are required. The current swarm-reviewed candidate’s browser visual review is pending; the research notes distinguish completed evidence from unresolved verification.
