# Round 01 — reduce decorative commentary

Baseline: `104708995bfa88c4f2c5bff1e391f1465b159c77`.
Candidate branch: `design/round-01-quiet-copy`.

## Predeclared hypothesis

Removing redundant visible commentary will let existing imagery and project names carry more of the experience. This should reduce label noise while retaining character and understandable destinations. It does not directly test image count, the assets themselves, or the underlying section-stack layout.

## Allowed change

Delete decorative badges, coordinates, categories/indices on art, image slogans, redundant exploration invitations, numbered section eyebrows, stickers, and explanatory art-credit prose. Retain identity, real project titles and descriptions, one concise contribution-scope line, biography, useful navigation, functional game instructions/state, accessible names and keyboard behavior. Keep existing images, palette, typefaces, layout classes, and features. A single alignment rule may preserve the scene controls' original position after neighboring commentary is removed.

## Acceptance rule

At least two of three fresh paired judges must independently prefer the candidate specifically for reduced verbal/label noise, with visible evidence. No unresolved functional/factual regression. Preserve disagreement; do not convert judge agreement into user approval. If unclear, retain the baseline. Even a provisional win does not mean the remaining layout/image complaints are solved.

## Initial independent critique

Three screenshot reviewers used art/restraint, spatial-composition, and visitor-clarity lenses. All identified decorative annotation as a problem. Spatial composition and art/restraint reviewers also flagged repeated illustration and the predictable sequence of rectangular panels; visitor clarity distinguished necessary identity/action text from narration. One suggested a later bounded asymmetry test for the two work tiles. That is a future hypothesis, not part of this pass.

Two hivemind peers audited the protocol and interpretation: retain ambiguity about image count versus competition, use paired evidence rather than composite scores, state screenshot-only limits, avoid steering judges toward an intended winner, and reserve acceptance for the user.

## Capture settings

Desktop 1440×1000, phone 360×1000. Default poster view, fonts and all still images loaded, no active game or WebGL scene. Full-page plus first viewport. The baseline is captured before changes; candidate uses the same settings. Anonymous A/B mappings are varied by reviewer; existing baseline judges are not reused for paired voting.

## Results

Pending candidate and paired critique.

### Paired critique, pass A

Fresh reviewers viewed all eight captures: full page and first viewport, desktop and phone. Neutral mappings were P1/P3: A=baseline, B=candidate; P2: A=candidate, B=baseline. They were not told the mapping or intended winner. These reviewers had not participated in the initial critique. The screenshots themselves make the deletion visible, so this is a framing control, not a claim of perfect blinding.

- **Art/restraint:** preferred candidate; unannotated images breathe, character survives in the imagery/type/color. Tradeoff: lost brief personal introduction. Overall image competition/repeated robot remains.
- **Spatial composition:** preferred candidate; fewer layers between hero and work. Tradeoff: desktop name area becomes emptier and loses personal context. Section-stack organization remains.
- **Visitor clarity:** preferred candidate; identity, names and functions remain readable. Tradeoff: less personal introduction; product summaries still do not specify Boyang's individual contributions. Image count and repeated artwork remain.

All explicitly judged **neither version sufficient for the full feedback**. This is a narrow provisional improvement, not overall acceptance or a user preference.

### Refinement hypothesis, pass B

Restore only the original short personal line (“Building things. Getting pleasantly sidetracked.”), without its handwritten invitation. Keep all other deletions. This tests whether voice/context can be recovered without reintroducing the annotation layer. Same assets, palette, features and layout. Prefer the refinement only if at least two reviewers independently identify recovered voice/context without material clutter regression. Otherwise retain pass A for user comparison. The first pass's unresolved layout/image issues remain outside this hypothesis.

### Paired critique, pass B result

Mappings were Q1/Q3: A=refinement, B=pass A; Q2: A=pass A, B=refinement. All eight captures were viewed per reviewer.

- **Art/restraint:** preferred refinement narrowly. The short line supplies a human cue without restoring annotation. It is broad and delays the mobile work section.
- **Spatial composition:** preferred refinement. It balances the desktop name row. Mobile reaches the work later; the wording conveys attitude rather than concrete context.
- **Visitor clarity:** preferred refinement. It connects work and play with less explanation. The line remains generic, and the product summaries do not explain individual contribution details.

All three again said the full image/layout complaint remains. The predefined selection rule provisionally favors the refinement **for user comparison only**. Shared model taste limits the significance of agreement. No new aesthetic preference is learned from these votes.

## Validation and capture limits

TypeScript and production build pass. Candidate at 360/768/1440 passes overflow and Axe checks. The earlier full run passed all eight functional/noJS/scene tests plus the phone layout check; two screenshot checks exposed an offscreen live-region child rectangle, fixed by placing the existing live text directly on one `sr-only` span. Rechecked all three widths. The complete pull-request suite subsequently passed all eleven checks on df8113e (run 42711825020); deployment was skipped. Game/scene logic, artwork, palette, and dimensions remain unchanged. Functional checks are evidence of behavior, not aesthetic success.

Deleting text shortened the page and moved following content upward; preserving markup classes/CSS does not preserve absolute rendered positions. Restoring the short intro then makes the phone hero about a short paragraph taller than pass A. Screenshots are published as identically compressed WebP copies; original PNGs were used for judging. First-viewport captures are equal-size; full pages retain their actual differing lengths.

## Next decision

Await Boyang's comparison before promotion. The live root remains the baseline. If this quieter treatment is accepted, the next experiment should address image hierarchy or structural composition as its own bounded hypothesis. The repeated robot in About and the generic sequence of image panels are candidate targets, not accepted remedies.

## Subsequent independent machine runtime review

At Boyang’s request, each machine ran the pinned candidate itself. Two peers preserved their first runtime verdict before consulting stored critiques; the author performed a separate corroborating headless-browser audit after native UI access failed. The independent captures and actual input observations are linked in [the runtime review](runtime-review.md). No application or deployment change was made. This evidence supplies additional hypotheses, not user acceptance.
