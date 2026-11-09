# Research and design record

Researched November 9, 2026. Two hivemind peers independently researched public biography and respected site references, then critiqued attribution, scope, accessibility, motion, and prerender boundaries. Their advice informed the implementation; they did not visually inspect the final page.

## Explicit user brief

React and Tailwind. Minimalist, elegant, animated, handcrafted, creative, fun, informative, engaging. Snappy performance and smooth perceived loading. A git repository that builds as a GitHub Pages static site. Consult the swarm and wait for user judgment before learning broader preferences.

## Public content sources

- [Boyang's existing first-person site](https://www.boyangniu.me/): OpenAI, San Francisco, selected contributions (Sora 1/2, imagegen, custom GPTs), founder at SPC, earlier roles at Square, Baton, Dropbox, Hive. This supports contribution-level language; it does not establish sole authorship, ownership, impact metrics, exact team, or project dates.
- [First-person Stylized launch, Jan 23 2023](https://www.indiehackers.com/post/show-ih-stylized-professional-product-photos-in-15-seconds-962304946c): historical product-photography work using generative AI, depth extraction, and 3D rendering.
- [Public GitHub profile](https://github.com/kumquatexpress) and repositories [next-genai-streaming](https://github.com/kumquatexpress/next-genai-streaming), [WordSmith](https://github.com/kumquatexpress/WordSmith), [Clairvoyance](https://github.com/kumquatexpress/clairvoyance-app): public experiments. No claim that these are currently maintained products.
- [Medium profile](https://medium.com/@boyangniu): exact essay titles and May 2020 publication dates. Teasers are short editorial descriptions rather than quotations.
- [LinkedIn](https://www.linkedin.com/in/boyang-niu): current public professional profile and contact destination. No exact degrees or scraped contact details used.

Work links go to official OpenAI launch pages; their descriptions summarize the products and do not claim a specific individually owned implementation. The work-section introduction explicitly describes contributions. Editorial biography and taglines should be reviewed by Boyang for voice and current accuracy.

## References studied

- [Paco Coursey](https://paco.me/) and [his redesign essay](https://paco.me/writing/redesign-2021): editorial restraint, concise introduction, useful link groups, typography, performance.
- [Rauno Freiberg](https://rauno.me/): carefully considered interaction details and strong hierarchy.
- [Anthony Fu](https://antfu.me/): personal signature and playful details alongside real work.
- [Brittany Chiang](https://brittanychiang.com/): clear professional context and concrete project descriptions. Avoid reproducing her recognizable portfolio composition.
- [Josh W. Comeau](https://www.joshwcomeau.com/blog/how-i-built-my-blog/): purposeful custom interactions with keyboard alternatives. The linked essay is explicitly his historical 2021 stack, not current architecture guidance.
- [Bruno Simon](https://bruno-simon.com/): portfolio as playful experience. The first draft borrowed little of its visual experience; the revision makes room for an interactive miniature world.

No reference site’s code or artwork was copied. Version 1 used original botanical and project SVGs; version 2 replaces them with original generated artwork and an original interactive Three.js scene.

## Version 1 direction — rejected by user

Warm paper, charcoal, olive and ochre; serif typography; a botanical kumquat as hero; editorial hierarchy. The user rejected this draft as too textual, too professional/clean, and lacking color and the aesthetics of 3D, gaming, video, and art. The explicit correction is scoped to this site: prioritize character and visual discovery. Do not interpret minimalist/elegant as an editorial résumé layout here.

## Implementation decisions

Vite + React + Tailwind's Vite plugin. Native anchor links; complete build-time rendered HTML; hydration from the same component tree. Self-hosted Latin fonts, no third-party runtime scripts, an art-first poster with an on-demand Three.js companion, a small arcade game, and reduced-motion support. No artificial wait or full-screen loader. DOM navigation and content remain available without JavaScript or WebGL.

Primary technical references: [Tailwind Vite setup](https://tailwindcss.com/docs/installation/using-vite), [Vite GitHub Pages deployment](https://vite.dev/guide/static-deploy.html#github-pages).

## Version 2 response to explicit feedback

The new visual proposal uses a violet backdrop, cinematic landscape, sculptural artwork, peach/lime accents, a miniature 3D island, and a playable citrus-catching arcade. Copy and biography are shorter. This exact art direction awaits user judgment; the accepted learning is the explicit rejection of the earlier text/professional-clean emphasis.

Swarm collaboration continued with two independent critiques. Primary references shifted toward [Bruno Simon](https://bruno-simon.com/) (discovery and play as the portfolio experience) and [Jesse Zhou](https://www.jesse-zhou.com/) / [his case study](https://jesse-zhou.medium.com/jesses-ramen-case-study-77bae77ab5f0) (coherent environments and meaningful props). The new composition, models, and artwork are original.

The official [Sora 2 launch page](https://openai.com/index/sora-2/) explicitly credits Boyang in Product. The page is an archived launch story, not a promise of present product availability. Artwork tiles lead to official stories and identify site artwork as conceptual illustrations.

Technical critique informed the poster-first approach, explicit scene activation, failure/context-loss restoration, DOM controls, reduced-motion event handling, pixel-ratio cap, limited ambient rendering, offscreen/hidden suspension, cleanup, and expanded browser checks. No device-level FPS claim is made. See [art provenance and production prompts](artwork.md).

Swarm source review caught a focus handoff defect in version 2: the initial tests explicitly focused newly mounted scene/game controls, masking loss of focus when replacing their entry buttons. The correction conditionally transfers focus on entry and game completion, preserves focus when visitors move elsewhere, and tests the ordinary Enter/Tab path.
