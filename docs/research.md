# Research and design rationale

Researched November 9, 2026. The original repository implementation was removed without using its layout, content, or artwork as a design reference. An initial replacement was then challenged through independent swarm review; the current candidate responds to that review.

## Personal website references

- [Paco Coursey](https://paco.me/): concise introduction, carefully selected projects, and direct paths into work. Applied the compact information structure and short descriptions.
- [Rauno Freiberg](https://rauno.me/): a personal identity organized around craft and interaction. Applied the idea of a distinctive, interactive object as a demonstration of care.
- [Emil Kowalski](https://emilkowal.ski/): focused hierarchy and deliberate attention to motion. Applied restrained interaction timing, native controls, and clear project links.
- [Brittany Chiang](https://brittanychiang.com/): accessible navigation and direct professional context. Applied a skip link, semantic sections, visible keyboard focus, and straightforward work descriptions.
- [Nicky Case](https://ncase.me/): playful work is itself the attraction. Applied the principle that an interaction should express the subject rather than sit beside generic branding copy.

The current direction is a small digital studio organized around **Tools for imagination**. Boyang’s full name and concrete introduction lead into his work across creative products. Warm paper, Fraunces and Manrope, a kumquat signature, and muted green secondary sections preserve a handcrafted visual identity. The references inform principles, not copied layouts or code.

A compact original kumquat light study replaces the initial rotating flower. Moving the range control moves the lamp and highlight while casting the shadow in the opposite direction. Its visible caption connects it to the virtual photo studio Boyang co-founded. It is an illustration inspired by the idea of controllable lighting, not a recreation of Stylized or an example of its output.

The project section uses an authentic, attributed Sora sample frame, an explicitly labeled Stylized still-life illustration, and a local text-stream sketch. The latter demonstrates pacing without contacting an API or running the published library: the displayed `withStream` and `withMediaStream` names describe the actual library interface, while the sample itself is identified as local. Smaller projects retain their literal names and are identified as source archives.

## Swarm decisions and remaining judgment

Independent content research found that **useful control over creative technology** is more specific to Boyang’s public work than the initial repeated language about curiosity. The revision therefore favors concrete media, mechanisms, project names, and contribution scope over marketing phrases.

The initial flower offered abstract play and a strong visual silhouette. The selected light study trades that abstraction for a direct connection between the kumquat handle, lighting, and the work in creative tools. This is a design judgment, not proof that a studio illustration is inherently more elegant; the interaction must earn its space through clarity and restraint. An external reviewer instead preferred a new pitch-to-light instrument inspired by the earlier twelve-hexagon music visualizer, arguing that playable personal history would express more character. The site owner chose the smaller light study for its coherent visual language and its specific, verified connection to controllable product lighting. That disagreement is preserved; the choice was not unanimous.

The revision also increases text readability and interaction targets, makes the pause control adjacent to the study, and stores the visitor’s motion preference. Ambient animation begins only after hydration. A visitor without a saved preference starts with the operating system’s reduced-motion choice; the static document contains the full information and no running ambient motion.

Acceptance criteria for this revision:

- Visitors can identify Boyang, his role, and the nature of his work before exploring the illustration.
- Each featured project has a concrete name, bounded contribution wording, and a useful destination; archived work is clearly labeled.
- Authentic media has attribution and provenance. Original illustrations and local samples do not imply authentic product output or remote model execution.
- The light control visibly and coherently changes illumination, works with a keyboard, and exposes an understandable value. The pause setting persists and respects reduced-motion preferences.
- Desktop and phone layouts preserve readable text, usable controls, clear hierarchy, and access to all content without horizontal overflow.
- Production prerendering, hydration, interaction checks, and deployment succeed. Browser visual evidence is required to assess the experiential criteria; a build alone cannot establish them.

## Factual sources

- [GitHub profile](https://github.com/kumquatexpress), also verified through GitHub's public API: name, handle, San Francisco location, projects, and their descriptions.
- [LinkedIn profile](https://www.linkedin.com/in/boyang-niu): OpenAI and Penn affiliation, public professional identity, and link to the same GitHub handle. Search-indexed public profile was readable; direct LinkedIn retrieval is restricted.
- [OpenAI native image generation system card](https://cdn.openai.com/11998be9-5319-4302-bfbf-1167e093f1fb/Native_Image_Generation_System_Card.pdf), page 12: Boyang Niu appears under both ChatGPT and Sora product credits. This supports the deliberately limited contributor wording. No individual ownership of the products or model research is claimed.
- [OpenAI’s Sora archive](https://openai.com/index/sora/): source context for the official sample and the notice that Sora became unavailable on April 26, 2026. The site therefore describes Sora as archived rather than offering it as a currently available product.
- [Official Tokyo-walk video](https://cdn.openai.com/sora/videos/tokyo-walk.mp4): the page’s `public/media/sora-tokyo.webp` is a frame extracted at approximately five seconds, converted to WebP, and self-hosted. Its visible caption credits OpenAI and links to the original video. The sample is not attributed to Boyang personally.
- [Boyang's Stylized launch post](https://www.indiehackers.com/post/show-ih-stylized-professional-product-photos-in-15-seconds-962304946c): co-founding and product description, combining depth extraction, generative AI, and 3D rendering.
- [Boyang's Stylized post on LinkedIn](https://www.linkedin.com/posts/boyang-niu_ai-photography-activity-7044410594728259585-5tfP): 3D and controllable product imagery.
- [Boyang’s AI Product Creators interview](https://podcasts.apple.com/tr/podcast/this-former-dropbox-engineer-built-an-ai-product-to/id1677082722?i=1000607153218), April 3, 2023: first-person account of product staging, adjustable lighting, materials, and backdrops. The transcript is also indexed on the [show page](https://podcasts.apple.com/tr/podcast/ai-product-creators/id1677082722). This grounds the light study’s conceptual connection without claiming it implements Stylized’s technology.
- [Stylized founder profile](https://www.crunchbase.com/person/boyang-niu-34d7): co-founder, former Dropbox technical lead, and Penn education. Stylized is presented as archived work; its closed product is not advertised as currently available.
- [next-genai-streaming repository](https://github.com/kumquatexpress/next-genai-streaming): React/Next.js component library with streaming text and audio support. Source read directly using the GitHub API.
- [Visualizer](https://github.com/kumquatexpress/visualizer), [WordSmith](https://github.com/kumquatexpress/WordSmith), and [nGramBabbler](https://github.com/kumquatexpress/nGramBabbler): descriptions verified from public repository metadata.

Public GitHub and LinkedIn links are the contact routes. No personal phone number, address, inferred email, unverified hobbies, client metrics, testimonials, or invented writing are included.

## Implementation references

- [Vite GitHub Pages deployment](https://vite.dev/guide/static-deploy.html#github-pages)
- [Tailwind CSS Vite integration](https://tailwindcss.com/docs/installation/using-vite)

The site self-hosts three Latin WOFF2 files. Fraunces softness and wonk are fixed to the selected design values, retaining variable weight and optical size. The compared Latin font payload is **295,572 → 175,536 bytes**, a **40.6% reduction**. This compares the fonts normally requested for English text, not every unused subset previously present in the build. Regeneration instructions, coverage limitations, and measurement details are in `src/fonts/README.md`; font licenses remain in `public/licenses/`.

## Verification

The initial replacement passed TypeScript, production bundling, prerendering, four DOM/hydration tests, GitHub deployment, and live asset checks. Its local browser automation host was unavailable, including a native Chrome fallback, so those checks did not establish visual quality.

The swarm revision passed seven interaction/hydration tests and production builds on the owner’s machine and an independent browser reviewer’s machine. The final runtime revision is `efd3f31`; later changes record evidence only. An external reviewer captured actual baseline and candidate desktop/phone views, inspected the complete page, and accepted the final revision after checking widths 320, 390, 639, 640, 768, 1023, 1024, and 1440. No document overflow or browser console errors were found.

Direct browser checks verified keyboard and touch lighting control, opposite highlight/shadow directions, visible focus, persisted pause after reload, operating-system reduced motion, and full content without JavaScript. The no-JavaScript page rendered all 11 headings, projects, and footer, with zero running animations and all three interactive controls disabled. The final navigation targets measured at least 44×44 pixels. The final slider rail contrast is 3.35:1 against the paper background.

The owner retrieved and inspected the external reviewer’s screenshots. The local browser connection remained unavailable; direct browser evidence came from the swarm reviewer. See [the review record](review/swarm-20261110/review.md) for exact revisions, evidence, decisions, and preserved disagreement. Production HTTP checks cover the generated HTML, JavaScript, CSS, fonts, Sora still, social image, and favicon. GitHub Pages deploys the same verified runtime from `main`.
