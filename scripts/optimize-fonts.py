"""Generate the tracked website fonts after npm ci.

Run in an isolated Python environment with fonttools[woff]==4.68.0 and
brotli==1.2.1. Normal builds use the tracked WOFF2 files and need no Python.
"""

from pathlib import Path
from shutil import copyfile

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


root = Path(__file__).resolve().parent.parent
source = root / "node_modules/@fontsource-variable"
destination = root / "src/fonts"
destination.mkdir(exist_ok=True)


def freeze_fraunces(style: str) -> tuple[int, int]:
    original = source / f"fraunces/files/fraunces-latin-full-{style}.woff2"
    output = destination / f"fraunces-latin-soft20-wonk1-{style}.woff2"
    font = TTFont(original, recalcTimestamp=False)
    instantiateVariableFont(font, {"SOFT": 20, "WONK": 1}, inplace=True, optimize=True)
    font.flavor = "woff2"
    font.save(output)
    return original.stat().st_size, output.stat().st_size


sizes = [freeze_fraunces(style) for style in ("normal", "italic")]
manrope = source / "manrope/files/manrope-latin-wght-normal.woff2"
copyfile(manrope, destination / manrope.name)
before = sum(original for original, _ in sizes) + manrope.stat().st_size
after = sum(optimized for _, optimized in sizes) + manrope.stat().st_size
print(f"Latin font payload: {before:,} → {after:,} bytes ({1 - after / before:.1%} smaller)")
