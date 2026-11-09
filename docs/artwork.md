# Artwork and production prompts

Original conceptual artwork generated with the built-in imagegen tool for Boyang's personal site. These images illustrate the site's themes. They are not product screenshots, samples of Sora/ChatGPT outputs, or claims that Boyang individually authored the depicted work.

High-resolution originals are tracked in `source-art/`. Compressed, self-hosted WebP versions live in `public/art/`. `node scripts/optimize-art.mjs` regenerates deployable versions, a smaller phone hero, and the sharing PNG. The originals are excluded from the deployment because Vite only copies `public/`.

## Island

Original: `source-art/island-original.png`. Site: `public/art/island.webp` and `public/art/island-small.webp`.

> Use case: stylized-concept. Create an original cinematic surreal landscape artwork for a playful personal website about software, games, generative art and video. No typography, no lettering, no logos, no UI. Wide horizontal landscape 16:9. A sculptural ivory doorway/portal standing on a small floating moss-covered stone island above a luminous turquoise sea; through the portal is a glowing tangerine sun with a little orbit ring. Stepping stones lead to the portal, a tiny indigo arcade cabinet and two orange citrus spheres beside it. Large distant lavender mountain silhouettes, peach clouds and soft mint sky, hints of wildflowers in yellow and coral. Entire scene is a beautifully crafted stylized 3D miniature / dreamlike video-game concept art, tactile clay/stone with fine realistic detail, art-directed vibrant yet harmonious colors, physically plausible warm afternoon lighting and soft shadows, rich composition with atmospheric depth. No human characters. The portal and island sit in the middle of image with plentiful sky around, landscape fills the frame, close enough to see details. Sophisticated independent-game aesthetic, gallery-quality art, avoid corporate stock illustration or generic glossy abstract blobs.

## Cinema

Original: `source-art/cinema-original.png`. Site: `public/art/cinema.webp`.

> Use case: stylized-concept. Original cinematic still for a personal website project tile about video and world-building. Wide horizontal 16:9 composition. A single tiny tangerine-orange astronaut with a white helmet stands on a glossy dark violet shoreline in the lower left, looking across a vast luminous turquoise ocean toward an enormous pink moon rising from the sea. A small impossible stairway of pale lavender floating stones arcs across the water toward the moon, glowing peach clouds drift overhead. Dreamlike beautiful independent sci-fi film still, art-directed 3D render with realistic water reflections and subtle fine grain, rich saturated teal, deep blue and coral palette, strong sense of scale and wonder. The astronaut is small relative to landscape, no text, no logos, no UI, no watermarks. This is original conceptual website art, not a claimed sample of any product.

## Still life

Original: `source-art/still-life-original.png`. Site: `public/art/still-life.webp`.

> Use case: stylized-concept. Original artwork for an art-focused personal website, an editorial illustration representing generative image tools. Square composition. A surreal still life of a translucent cobalt blue glass pear, a matte tangerine orange sphere with a green leaf, a folded lavender ribbon and a tiny chrome star, on a vivid pale butter-yellow stepped pedestal. Dreamlike studio space, coral-pink background, dramatic hard sunlight from upper right casting expressive violet shadows. Extremely beautiful tactile 3D render, playful independent art gallery aesthetic, subtle grain, beautifully composed, sculptural and surprising. Camera low three-quarter angle, objects fill most of frame. No text, no logos, no watermarks, no UI. This is conceptual site art, not a product screenshot.

## Characters

Original: `source-art/toys-original.png`. Site: `public/art/toys.webp`.

> Use case: stylized-concept. Original playful 3D editorial artwork for an art-focused personal website, illustrating customizable digital tools as a small cast of toy characters. Square composition. Three sculptural designer vinyl toy creatures with tiny black dot eyes: a tall lavender rounded rectangular robot with two little antennae, a squat tangerine orange round character, and a mint-green scalloped star character with little feet. Standing together asymmetrically on a soft periwinkle platform, peach background, a couple small floating colorful geometric blocks. Distinct personality, hand-crafted clay imperfections, beautifully rendered soft vinyl and ceramic texture, delightful sophisticated independent game/contemporary toy art. Strong silhouettes, studio shadows, luminous palette. No text, no logos, no watermarks, no UI. Not an existing franchise or known mascot. Framing characters fully inside image with margin.

## Interactive scene

`src/world-scene.ts` builds an original real-time miniature from Three.js geometry, materials, shadows, a locally drawn arcade-screen texture, and the cinema artwork. It is a playful companion to the painted world, rather than a pixel-identical reconstruction. Drag or use the arrow buttons to rotate; launch the citrus character for a small visual reward. DOM controls remain keyboard accessible. The image-led page works before this optional scene loads.
