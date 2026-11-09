# Independent machine runtime reviews

The candidate application was run on all three machines at the same source commit, `df8113e2822bcd5595801b389f54c3cc78e674ec`. Peer reviewers formed their initial runtime opinions before reading stored design critiques or comparison images. Each used its own checkout, server, browser, input actions, and captures. Both peer reports are preserved on evidence-only branches pinned directly to that source. The author's corroborating run is identified separately.

| Run          | Actual environment                                                             | Scope                                                                                                 | Evidence                                                                                                                                                                                                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows peer | Chromium 158, headless; 1440×1000 desktop; 390×844 DPR1 touch emulation        | Full scroll, real WebGL controls, keyboard/touch arcade, skip link, no-JS poster                      | [Original report and captures](https://github.com/kumquatexpress/kumquatexpress.github.io/blob/15ed249270d41e080a2b0c9f169f924500d2fe07/docs/design/round-01/runtime-windows/README.md)                                                                                                                                                                             |
| d1 Mac peer  | Headed Chrome 156; 1440×1000 desktop; normalized 390×844 DPR3 iPhone emulation | Full scroll, real WebGL controls, keyboard/touch arcade, focus restoration, header anchors            | [Evidence index](https://github.com/kumquatexpress/kumquatexpress.github.io/blob/5e89d29477ac6447287ed74b3c12c483acd5b753/docs/design/round-01/runtime-d1mac/README.md) · [verbatim first verdict](https://github.com/kumquatexpress/kumquatexpress.github.io/blob/5e89d29477ac6447287ed74b3c12c483acd5b753/docs/design/round-01/runtime-d1mac/original-verdict.md) |
| Author's Mac | Isolated headless Chromium 158; 1440×1000 and 390×844 DPR1                     | Fresh production captures and actual-duration arcade/scene actions; author already knew peer findings | [Run, limits, and captures](runtime-author/README.md)                                                                                                                                                                                                                                                                                                               |

Phone layouts were emulated, not physical iPhone/Safari runs. These are three actual browser executions, two independent initial peer verdicts, and one author-run corroboration. The engines are Chromium variants; this is not cross-engine validation or human preference testing.

## Where the independent opinions agree

- The candidate's opening has a clear portal focal point and expressive color. The phone crop preserves it.
- Repetition is a concrete concern: hero and Sora share water/stepping-stone/celestial motifs, and the exact toy cast recurs in work and About. The phone journey makes this especially apparent.
- The large landscape → two tiles → game/cards → About → oversized close still reads as a familiar portfolio sequence. Further small-label deletion alone will not change that structure.
- The remaining identity, project names, contribution context, and factual biography are useful. Generic oversized section introductions command more space while adding less information.
- Real interaction revealed an abrupt arcade ending: points are visible, remaining time is not. Both peers independently noticed it after playing a naturally timed round.

## Differences worth preserving

- The Windows peer explicitly did **not** find the candidate globally chaotic; it described it as colorful, composed, and friendly. This does not invalidate Boyang's rejection of the prior version.
- Windows highlighted the sharp visual-fidelity/scale change from poster to 3D. The d1 Mac report emphasized repetitive phone hierarchy and generic section introductions. The author corroborated the scene discontinuity and also noticed the desktop entry control falling partly below the first viewport.
- All agreed that removing the repeated About illustration is a useful small hypothesis. Agreement selects an experiment to discuss; it does not establish Boyang's preference or prove that the result will be sufficiently creative.

## Bounded next hypothesis

Remove only the duplicated About toy artwork and its reserved image column, preserving biography/writing, hero/work images, palette, and typography. Compare the phone scroll and the remaining image hierarchy. Column collapse is a deliberate component reflow and must be named as part of the change. This does not solve the larger section-stack problem or 3D art-direction mismatch; those need separate experiments.

No application changes or deployments were made for this audit. The live root remains unchanged. This round supplies actual runtime evidence to the existing before/after review.
