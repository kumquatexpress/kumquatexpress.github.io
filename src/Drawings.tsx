import { useRef, useState } from "react";
import type { Project } from "./content";

export function Kumquat() {
  const branch = useRef<SVGGElement>(null);
  const [nudges, setNudges] = useState(0);
  function nudge() {
    setNudges((value) => value + 1);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    branch.current!.getAnimations().forEach((animation) => animation.cancel());
    branch.current!.animate(
      [
        { transform: "rotate(0deg)" },
        { transform: "rotate(-9deg)", offset: 0.18 },
        { transform: "rotate(6deg)", offset: 0.4 },
        { transform: "rotate(-3deg)", offset: 0.62 },
        { transform: "rotate(1deg)", offset: 0.8 },
        { transform: "rotate(0deg)" },
      ],
      { duration: 1350, easing: "ease-in-out" },
    );
  }
  return (
    <figure className="citrus-figure">
      <button
        className="citrus-button"
        onClick={nudge}
        aria-label="Give the kumquat branch a nudge"
      >
        <svg viewBox="0 0 460 440" fill="none" aria-hidden="true">
          <defs>
            <pattern
              id="citrus-speckle"
              width="13"
              height="17"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="3" r=".8" fill="#7b3e16" opacity=".28" />
              <circle cx="9" cy="12" r=".6" fill="#fff6cf" opacity=".7" />
            </pattern>
            <pattern
              id="leaf-hatch"
              width="7"
              height="7"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(35)"
            >
              <path
                d="M0 0V7"
                stroke="#faf5df"
                strokeWidth=".8"
                opacity=".25"
              />
            </pattern>
          </defs>
          <ellipse
            cx="234"
            cy="385"
            rx="94"
            ry="8"
            fill="currentColor"
            opacity=".04"
          />
          <g ref={branch} className="citrus-branch">
            <path
              d="M218 367C239 306 225 261 259 209C273 180 291 155 309 122"
              stroke="#655a43"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M240 273C207 245 189 222 161 192M255 219C295 216 319 197 343 173M279 176C258 145 246 118 244 88"
              stroke="#655a43"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M250 125C206 122 186 91 196 53C234 58 260 82 250 125Z"
              fill="#727d4d"
              stroke="#4d5c37"
              strokeWidth="1.2"
            />
            <path
              d="M250 125C206 122 186 91 196 53C234 58 260 82 250 125Z"
              fill="url(#leaf-hatch)"
            />
            <path
              d="M247 121L202 62M244 104L221 100M232 88L229 70"
              stroke="#d2d0a0"
              strokeWidth="1"
            />
            <path
              d="M300 139C300 96 330 73 369 78C360 119 341 145 300 139Z"
              fill="#8b9466"
              stroke="#56623e"
              strokeWidth="1.2"
            />
            <path
              d="M300 139C300 96 330 73 369 78C360 119 341 145 300 139Z"
              fill="url(#leaf-hatch)"
            />
            <path
              d="M303 136L360 84M321 119L323 101M338 103L355 105"
              stroke="#dbd5ad"
              strokeWidth="1"
            />
            <path
              d="M188 220C143 229 109 210 102 174C146 166 180 182 188 220Z"
              fill="#778252"
              stroke="#56623e"
              strokeWidth="1.2"
            />
            <path
              d="M188 220C143 229 109 210 102 174C146 166 180 182 188 220Z"
              fill="url(#leaf-hatch)"
            />
            <path
              d="M183 217L110 180M159 205L139 210M138 192L135 180"
              stroke="#d2d0a0"
              strokeWidth="1"
            />
            <g transform="rotate(-23 161 208)">
              <ellipse
                cx="161"
                cy="208"
                rx="36"
                ry="48"
                fill="#d99035"
                stroke="#af692a"
                strokeWidth="1.2"
              />
              <ellipse
                cx="161"
                cy="208"
                rx="36"
                ry="48"
                fill="url(#citrus-speckle)"
              />
              <path
                d="M143 179C132 189 131 207 134 215"
                stroke="#ffe3a1"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M156 162L161 167L166 163"
                stroke="#65714a"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
            <g transform="rotate(24 332 217)">
              <ellipse
                cx="332"
                cy="217"
                rx="39"
                ry="52"
                fill="#e4a144"
                stroke="#b57730"
                strokeWidth="1.2"
              />
              <ellipse
                cx="332"
                cy="217"
                rx="39"
                ry="52"
                fill="url(#citrus-speckle)"
              />
              <path
                d="M311 185C301 196 300 212 302 220"
                stroke="#ffe6ac"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M326 166L332 172L337 167"
                stroke="#65714a"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
            <g transform="rotate(12 238 300)">
              <ellipse
                cx="238"
                cy="300"
                rx="42"
                ry="55"
                fill="#eaa74b"
                stroke="#b57730"
                strokeWidth="1.2"
              />
              <ellipse
                cx="238"
                cy="300"
                rx="42"
                ry="55"
                fill="url(#citrus-speckle)"
              />
              <path
                d="M214 268C203 280 202 296 205 306"
                stroke="#ffe6ac"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M233 246L238 252L244 247"
                stroke="#65714a"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          </g>
          <path
            d="M100 314C76 298 74 270 91 256M91 256L80 260M91 256L91 269"
            stroke="currentColor"
            strokeWidth="1"
            opacity=".4"
            strokeLinecap="round"
          />
          <text x="44" y="335" className="drawing-note" fill="currentColor">
            a little nudge?
          </text>
        </svg>
      </button>
      <figcaption>
        <span className="mono">FIG. 01</span>
        <span aria-live="polite">
          {nudges === 0
            ? "Citrus japonica, probably."
            : nudges < 4
              ? "A small dose of vitamin C."
              : "The kumquats appreciate the attention."}
        </span>
      </figcaption>
    </figure>
  );
}

export function ProjectDrawing({ kind }: { kind: Project["drawing"] }) {
  return (
    <svg
      className={`project-drawing drawing-${kind}`}
      viewBox="0 0 180 130"
      fill="none"
      aria-hidden="true"
    >
      {kind === "sora" && (
        <>
          <rect
            x="30"
            y="16"
            width="117"
            height="87"
            rx="4"
            transform="rotate(-7 30 16)"
            fill="var(--art-paper)"
            stroke="currentColor"
            strokeWidth=".8"
          />
          <rect
            x="26"
            y="26"
            width="126"
            height="84"
            rx="3"
            fill="var(--art-paper)"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <path
            d="M27 84L61 61L83 76L113 46L152 80V109H27Z"
            fill="var(--art-fill)"
          />
          <circle
            cx="59"
            cy="47"
            r="9"
            stroke="currentColor"
            strokeWidth=".9"
          />
          <path
            d="M27 90C54 75 82 105 110 87C130 74 140 90 152 88"
            stroke="currentColor"
            strokeWidth=".8"
          />
          <circle
            cx="93"
            cy="69"
            r="18"
            fill="var(--art-paper)"
            stroke="currentColor"
            strokeWidth=".9"
          />
          <path d="M90 62L101 69L90 76V62Z" fill="currentColor" />
        </>
      )}
      {kind === "image" && (
        <>
          <rect
            x="43"
            y="14"
            width="92"
            height="106"
            rx="2"
            transform="rotate(7 43 14)"
            fill="var(--art-paper)"
            stroke="currentColor"
            strokeWidth=".8"
          />
          <rect
            x="38"
            y="18"
            width="96"
            height="102"
            rx="2"
            fill="var(--art-paper)"
            stroke="currentColor"
          />
          <path
            d="M86 47C81 25 57 35 68 53C46 55 47 79 69 76C59 99 83 108 90 85C104 105 122 87 105 73C129 65 117 43 99 55C105 34 84 28 86 47Z"
            fill="var(--art-fill)"
            stroke="currentColor"
            strokeWidth=".9"
          />
          <circle
            cx="87"
            cy="67"
            r="9"
            fill="var(--art-paper)"
            stroke="currentColor"
            strokeWidth=".9"
          />
          <path
            d="M124 27L142 9M133 27L143 27M124 18V8"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </>
      )}
      {kind === "gpts" && (
        <>
          <rect
            x="29"
            y="29"
            width="66"
            height="71"
            rx="8"
            transform="rotate(-11 29 29)"
            fill="var(--art-fill)"
            stroke="currentColor"
            strokeWidth=".8"
          />
          <rect
            x="87"
            y="21"
            width="66"
            height="71"
            rx="8"
            transform="rotate(9 87 21)"
            fill="var(--art-fill)"
            stroke="currentColor"
            strokeWidth=".8"
          />
          <rect
            x="54"
            y="42"
            width="72"
            height="70"
            rx="8"
            fill="var(--art-paper)"
            stroke="currentColor"
          />
          <path
            d="M72 70L81 61M72 61L81 70M100 62V70"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M76 86Q90 99 105 85"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
