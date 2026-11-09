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
- [Bruno Simon](https://bruno-simon.com/): portfolio as playful experience. The present site borrows the principle of exploration, without the scope of a 3D world.

This is an original composition. No reference site's code or artwork was copied. Original botanical and project SVGs tie the site to Boyang's public handle and creative-tool work.

## Provisional choices awaiting user judgment

Warm paper, charcoal, olive and ochre; Instrument Serif paired with DM Sans; a botanical kumquat as the hero object; editorial rather than résumé-first hierarchy; a short, deliberately casual introduction. These are design hypotheses, not learned user preferences.

## Implementation decisions

Vite + React + Tailwind's Vite plugin. Native anchor links; complete build-time rendered HTML; hydration from the same component tree. Self-hosted Latin fonts, no third-party runtime scripts, CSS-only entrance/hover animation, user-triggered Web Animations for the branch, reduced-motion support. No artificial wait or full-screen loader. Theme preference is local to the visitor's browser.

Primary technical references: [Tailwind Vite setup](https://tailwindcss.com/docs/installation/using-vite), [Vite GitHub Pages deployment](https://vite.dev/guide/static-deploy.html#github-pages).
