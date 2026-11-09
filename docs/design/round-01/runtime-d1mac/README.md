# Independent runtime audit on d1mac

This evidence records the first independent visual judgment of candidate `df8113e2822bcd5595801b389f54c3cc78e674ec`, formed from a local production build before exposure to stored critiques or comparison images. The candidate was reviewed on its own. The [original verdict](original-verdict.md) is preserved separately from this evidence index. These judgments do not establish Boyang's approval or aesthetic preferences.

## Environment

| Item | Observed value |
| --- | --- |
| Candidate | `df8113e2822bcd5595801b389f54c3cc78e674ec` |
| Audit branch | `audit/visual-df8113e-d1mac` |
| Machine | d1mac, macOS 26.6.2 (25G83), arm64 |
| Isolated checkout | `/private/tmp/boyang-quiet-run` |
| Node | `v25.8.2` |
| npm | `11.11.1` |
| Build | `npm ci --no-audit --no-fund`, then `npm run build`, both passed |
| Server | `npm run preview -- --port 4187 --strictPort` |
| Audit URL | `http://127.0.0.1:4187/` |
| Browser | Headed Google Chrome `156.0.0.0`, controlled through Playwright CLI `0.1.23` |
| Desktop viewport | 1440 × 1000 CSS pixels |
| Phone viewport | Initially 390 × 664, then explicitly normalized and re-inspected at 390 × 844 CSS pixels |
| Phone emulation | iPhone 13 preset, DPR 3, touch enabled, Safari user agent inside Chrome |
| Capture window | November 9, 2026, approximately 22:39–22:45 UTC |
| Final runtime state | Both owned audit browsers closed and the preview stopped. Port 4187 had no listener. |

The phone evidence is browser emulation. Physical iPhone and Safari behavior were outside this run.

## Actions and observations

- Scrolled the desktop and phone page through the footer. The island poster, three work artworks, lavender arcade, experiments, circular toy artwork, biography, writing, and footer rendered.
- Entered the WebGL scene on both layouts and observed the procedural island, portal, arcade, and citrus. Exercised rotation, launch, pause, and return.
- Used desktop Tab and Enter across scene controls. Return restored focus to Enter 3D. Enter re-entry transferred focus to the first scene control.
- Used phone taps for rotation, launch, pause, return, and two arcade catches.
- Scored two desktop arcade catches with Enter. The round ended naturally with two points and the replay button focused.
- Used normal Tab navigation from Skip to content through the header, then Enter on Work. Navigation reached `#work` with its section visible.
- Observed no horizontal overflow at the normalized phone viewport and no browser errors during the exercised flows.
- Three.js logged a shadow-map deprecation warning on scene entry. It reported fallback from `PCFSoftShadowMap` to `PCFShadowMap`.

These are runtime observations from interactive inspection. The repository's browser test suite was not rerun for this audit.

## Representative screenshots

The six WebP files below are compressed copies of this machine's original PNG captures. Compression used Sharp with quality 90 and effort 6. Pixel dimensions were preserved. Originals remain under `/private/tmp/boyang-quiet-run/output/playwright/`. The [artifact manifest](artifacts.json) records source paths, dimensions, byte sizes, and SHA-256 hashes.

| Screenshot | Frame and purpose |
| --- | --- |
| [Desktop top](desktop-top.webp) | 1440 × 1000, initial name and island composition |
| [Desktop full page](desktop-full.webp) | 1440 × 4583, section rhythm and repeated toy artwork |
| [Phone top](phone-390x844-top.webp) | 390 × 844, normalized phone crop and Enter 3D visibility |
| [Phone full page](phone-390x844-full.webp) | 390 × 4587, stacked work images and repeated About artwork |
| [Desktop 3D scene](desktop-3d-initial.webp) | 1328 × 699, actual WebGL companion after entry |
| [Desktop game playing](desktop-game-playing.webp) | 692 × 424, active round with two points and keyboard focus |

Additional PNG originals include the ended game with replay focus, phone 3D interaction, phone game, footer, and keyboard Work navigation. Their paths are retained in the original verdict. The six files above form the representative published selection.

## Scope

This branch adds audit documentation and screenshot copies under this directory. The original verdict remains the first judgment, with no subsequent design discussion folded into it.
