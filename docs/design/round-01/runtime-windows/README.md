# Independent Windows runtime audit

Candidate: [`df8113e2822bcd5595801b389f54c3cc78e674ec`](https://github.com/kumquatexpress/kumquatexpress.github.io/commit/df8113e2822bcd5595801b389f54c3cc78e674ec). This report records the initial independent runtime judgment before reading any other reviewers' stored critiques or comparison images. No baseline was run, so this is not a claim of improvement over the baseline or of user approval.

## Run and scope

- Isolated checkout of the public repository at the pinned candidate.
- Windows; official portable Node 24.22.2 and npm 11.19.1. `npm ci` and `npm run build` succeeded.
- Production preview at `http://127.0.0.1:4187/`, inspected in actual Chromium 158.0.8127.18 through Playwright 1.65.0, headless.
- Desktop: 1440 × 1000 CSS pixels, DPR 1. Phone: 390 × 844 CSS pixels, DPR 1, mobile/touch emulation. This was not a physical-phone test.
- Scrolled the complete page at both sizes. Inspected the real rendered poster, project imagery, arcade, biography, writing links, and footer.
- Preview server and browser contexts were stopped after inspection. This branch adds evidence only; site source was not edited and no deployment was performed.

## Initial judgment

Colorful, composed, and friendly. I do not find this candidate globally chaotic. It still reads as an orderly portfolio sequence decorated with large art, however, and removing labels alone cannot establish a more personal structure. The remaining copy feels mostly short enough; I would retain useful project identification.

### Three visual findings

1. **The first impression has character and a clear focal point.** A quiet dark frame, oversized name, peach/teal/lilac island, and lime Enter 3D button work together. The phone crop retains the portal and stepping stones without visible horizontal clipping. This supports preserving the expressive palette rather than returning to the sterile first version. Evidence: [desktop first view](desktop-initial.jpg), [phone first view](phone-initial.jpg).
2. **Repetition is more persuasive than a blanket objection to image count.** Both the hero and Sora imagery feature turquoise water, stepping stones, and celestial imagery. The exact Custom GPTs character image appears again as the large About circle. That second character block consumes considerable phone scrolling before the biography. The desktop sequence remains predictable: large image, two image tiles, game/cards, About, footer. This is my interpretation of the organization complaint, not a confirmed user preference. Evidence: [full desktop page](desktop-full.jpg).
3. **Entering 3D sharply changes visual fidelity.** The detailed poster gives way to a relatively small low-poly island surrounded by broad, empty pastel space. The controls are clear and the scene has charm, but it feels like a different toy rather than entering the pictured world. The Sora tile itself displayed static artwork linking to its launch story; no on-page video playback was observed. Evidence: [live WebGL scene](desktop-3d.jpg), compared with [the poster](desktop-initial.jpg).

### Interaction observation

Enter 3D, rotate left/right, launch citrus, pause, and return to artwork all worked. Desktop controls were activated with Tab, Enter, and Space; phone controls were tapped. Pause changed to Resume, and returning visibly restored focus to Enter 3D.

The arcade accepted one pointer catch plus three Enter presses for **04 PTS**, then displayed the end screen with four citrus caught. A phone tap scored **01 PTS**. I did not see a clear remaining-time indicator while playing; the 15-second ending felt abrupt. That is a usability observation, not a gameplay failure. Evidence: [playing](desktop-arcade-playing.jpg), [finished](desktop-arcade-finished.jpg).

The skip link was the first Tab stop and moved to `#main`. A separate JavaScript-disabled phone context retained the rich poster and heading. No desktop `pageerror` events were observed. These bounded observations do not establish broad browser compatibility, physical-device performance, or a complete accessibility audit.

### One bounded next hypothesis

Remove only the duplicated character illustration from About and its resulting extra space. Retain the palette, hero, project assets, and essential copy. Compare whether the phone scroll feels less repetitive and the remaining images gain purpose. This does not establish a preferred exact image count or layout. Treat major 3D art-direction changes as a separate hypothesis. Promotion remains the user's decision.

## Evidence files

| Capture | Dimensions | State |
| --- | --- | --- |
| [desktop-initial.jpg](desktop-initial.jpg) | 1440 × 1000 | Initial desktop viewport, poster mode |
| [phone-initial.jpg](phone-initial.jpg) | 390 × 844 | Normalized DPR-1 emulated phone viewport, no scaling or crop |
| [desktop-full.jpg](desktop-full.jpg) | 1440 × 4583 | Full page before entering 3D; original capture includes a visible fixed skip-link overlay near About |
| [desktop-3d.jpg](desktop-3d.jpg) | 1440 × 1000 | Settled WebGL island with controls |
| [desktop-arcade-playing.jpg](desktop-arcade-playing.jpg) | 1440 × 1000 | Arcade running, initial score |
| [desktop-arcade-finished.jpg](desktop-arcade-finished.jpg) | 1440 × 1000 | Arcade finished, four points |

The six shared images total approximately 1.93 MB. They are JPEG quality 88 with 4:4:4 chroma sampling, with no resize or crop. Original PNGs and browser recordings remain locally under `C:\Users\boyan\.muxy\audit-artifacts\df8113e\`; no videos are included in this branch. [metadata.json](metadata.json) records dimensions, checksums of both originals and exports, tool versions, and actions tried.
