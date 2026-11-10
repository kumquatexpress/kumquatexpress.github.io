# Research and design rationale

Researched November 9, 2026. The previous implementation was removed without using its layout, content, or artwork as a design reference.

## Personal website references

- [Paco Coursey](https://paco.me/): concise introduction, carefully selected projects, and direct paths into work. Applied the compact information structure and short descriptions.
- [Rauno Freiberg](https://rauno.me/): a personal identity organized around craft and interaction. Applied the idea of a distinctive, interactive object as a demonstration of care.
- [Emil Kowalski](https://emilkowal.ski/): focused hierarchy and deliberate attention to motion. Applied restrained interaction timing, native controls, and clear project links.
- [Brittany Chiang](https://brittanychiang.com/): accessible navigation and direct professional context. Applied a skip link, semantic sections, visible keyboard focus, and straightforward work descriptions.

The visual direction is an original small digital studio: warm paper, Fraunces and Manrope, an ultramarine folded-paper flower, a kumquat signature, generous spacing, muted green secondary sections, and bespoke CSS illustrations. It borrows principles from the references, not their layouts or code.

The flower has 18 shaded petals, slow ambient rotation, click/keyboard activation to turn it, and three color palettes. It is an ornament that visitors can explore without blocking access to any content. Project illustrations use cinematic arches, a miniature still life, and a streaming code window to explain the three projects visually.

## Factual sources

- [GitHub profile](https://github.com/kumquatexpress), also verified through GitHub's public API: name, handle, San Francisco location, projects, and their descriptions.
- [LinkedIn profile](https://www.linkedin.com/in/boyang-niu): OpenAI and Penn affiliation, public professional identity, and link to the same GitHub handle. Search-indexed public profile was readable; direct LinkedIn retrieval is restricted.
- [OpenAI native image generation system card](https://cdn.openai.com/11998be9-5319-4302-bfbf-1167e093f1fb/Native_Image_Generation_System_Card.pdf), page 12: Boyang Niu appears under both ChatGPT and Sora product credits. This supports the deliberately limited contributor wording. No individual ownership of the products or model research is claimed.
- [Boyang's Stylized launch post](https://www.indiehackers.com/post/show-ih-stylized-professional-product-photos-in-15-seconds-962304946c): co-founding and product description, combining depth extraction, generative AI, and 3D rendering.
- [Boyang's Stylized post on LinkedIn](https://www.linkedin.com/posts/boyang-niu_ai-photography-activity-7044410594728259585-5tfP): 3D and controllable product imagery.
- [Stylized founder profile](https://www.crunchbase.com/person/boyang-niu-34d7): co-founder, former Dropbox technical lead, and Penn education. Stylized is presented as archived work; its closed product is not advertised as currently available.
- [next-genai-streaming repository](https://github.com/kumquatexpress/next-genai-streaming): React/Next.js component library with streaming text and audio support. Source read directly using the GitHub API.
- [Visualizer](https://github.com/kumquatexpress/visualizer), [WordSmith](https://github.com/kumquatexpress/WordSmith), and [nGramBabbler](https://github.com/kumquatexpress/nGramBabbler): descriptions verified from public repository metadata.

Public GitHub and LinkedIn links are the contact routes. No personal phone number, address, inferred email, unverified hobbies, client metrics, testimonials, or invented writing are included.

## Implementation references

- [Vite GitHub Pages deployment](https://vite.dev/guide/static-deploy.html#github-pages)
- [Tailwind CSS Vite integration](https://tailwindcss.com/docs/installation/using-vite)

## Verification

TypeScript, production bundling, prerendering, and DOM interaction tests are run before deployment. The browser automation host was unavailable during this build, including the native Chrome fallback, so a browser screenshot and visual layout review could not be completed. This limitation is not a passing visual review.
