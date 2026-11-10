# Website fonts

The site uses three self-hosted Latin WOFF2 files. `fonts.css` includes only
these files, so English pages do not ship CSS for unused Cyrillic, Greek,
Vietnamese, or extended Latin subsets.

Fraunces retains variable weight (100–900) and optical size (9–144). Its
softness and wonk axes are fixed at `SOFT=20` and `WONK=1`, matching the
intentional heading treatment. The same softness now applies consistently to
smaller decorative serif text, which previously used the font's default
`SOFT=0`. Manrope retains its original variable weight (200–800).

The files preserve Fontsource's Latin character repertoire: basic Latin,
Latin-1, selected additional Latin letters, common combining accents,
typographic punctuation, and selected symbols. Unsupported writing systems
and symbols use the visitor's system font fallback. Add the appropriate
self-hosted subset before introducing substantial non-Latin content.

To regenerate after updating the Fontsource packages:

```sh
python3 -m venv /tmp/boyang-font-tools
/tmp/boyang-font-tools/bin/python -m pip install 'fonttools[woff]==4.68.0' 'brotli==1.2.1'
/tmp/boyang-font-tools/bin/python scripts/optimize-fonts.py
```

Normal CI builds need no Python or font processing; the optimized files are
tracked. Font licenses remain in `public/licenses/Fraunces-OFL.txt` and
`public/licenses/Manrope-OFL.txt`.

Measured Latin font payload: **295,572 → 175,536 bytes**, a **40.6% reduction**.
The generated files' sizes are printed by the script. The total dist directory
previously contained eleven font files, while only the Latin files were
normally requested for English text; compare the three Latin files when
measuring the actual request reduction.

Font QA confirmed identical Unicode coverage and retained weight/optical-size
axes. Sampled outlines and advance widths at the site's heading, illustration,
and label sizes differed by at most 1.3 font units after axis instancing
(under 0.2 CSS pixels even at the largest heading size).
