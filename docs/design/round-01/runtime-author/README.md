# Author-run local runtime inspection

Source: `df8113e2822bcd5595801b389f54c3cc78e674ec`. Production build served at `http://127.0.0.1:4186/` on the author's Mac. Chromium 158.0.8127.18, headless, isolated Playwright contexts. Desktop 1440×1000; emulated touch phone 390×844, DPR 1. See [environment](environment.json) and [actual actions/results](audit-results.json).

This corroborating audit is not a blind independent opinion: the author built the site and had already received the peer runtime reports. Native browser-host access was unavailable, Chrome supplied no usable window, and Finder fallback was not approved. An isolated browser test run produced fresh captures and recordings without controlling the user's Chrome session.

## Actual run

Opened the candidate; scrolled through work, play, about, and footer; waited for their images to decode. Entered WebGL, rotated left/right, launched citrus, paused, and returned to artwork. Return focus was restored. Started the arcade, caught two citrus using keyboard/tap, and waited through the real 15-second round rather than advancing a fake clock; replay received focus. Both profiles completed with no page errors or horizontal overflow. These two audit tests passed in 64 seconds. Raw videos/PNGs are retained locally; representative compressed screenshots follow.

## Author observations

1. **Opening hierarchy:** the portal is a clear visual destination, and the phone crop retains arcade and stepping stones. On the 1440×1000 initial view, however, the entry button is partly below the viewport edge: the large name/header and image ask for most of the opening screen before interaction. That is a scale/rhythm observation, not horizontal clipping or a broken button.
2. **Repeated About artwork:** the same toy cast takes a substantial phone area immediately before the factual biography. It supplies no new subject and does not tell a visitor more about Boyang. This supports testing the duplicated component's removal while holding the rest fixed.
3. **3D transition:** the full-bleed textured poster changes into a comparatively small, sparse procedural toy scene. The toy is readable and functional, but the change in material language, scale, and occupied space weakens continuity. This deserves a separate art-direction experiment; more explanatory copy would not repair the visual handoff.
4. **Arcade:** catch feedback and focus rings are visible; playing shows score but no remaining-time/progress cue. The real-time ending consequently arrives with little visual anticipation. This is an observed interaction limitation, not evidence that the controls fail.

## Captures

- [Desktop opening](desktop-initial.webp) · [full page](desktop-full.webp)
- [Phone opening](phone-initial.webp) · [phone About](phone-about.webp)
- [Actual 3D after launch/pause](desktop-3d-paused.webp)
- [Active arcade](desktop-arcade-playing.webp) · [round ending](desktop-arcade-ended.webp)

The author would retain the current app while testing one image-hierarchy hypothesis next. The 3D style/scale handoff is a distinct unresolved problem. No new user preference or approval is inferred.
