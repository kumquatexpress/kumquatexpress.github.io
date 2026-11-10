import { useState, type CSSProperties } from "react";

const palettes = [
  {
    name: "Ultramarine",
    petal: "#254ad8",
    edge: "#142a96",
    center: "#f5a13c",
    background: "#e6e8ed",
  },
  {
    name: "Persimmon",
    petal: "#ed623c",
    edge: "#a83b28",
    center: "#d9e88b",
    background: "#eee2d7",
  },
  {
    name: "Moss",
    petal: "#466c54",
    edge: "#244332",
    center: "#eeb365",
    background: "#e0e6d8",
  },
];

export function Sculpture({ paused }: { paused: boolean }) {
  const [palette, setPalette] = useState(0);
  const [turn, setTurn] = useState(0);
  const colors = palettes[palette];

  return (
    <div
      className="sculpture"
      style={
        {
          "--petal": colors.petal,
          "--edge": colors.edge,
          "--seed": colors.center,
          "--halo": colors.background,
        } as CSSProperties
      }
    >
      <span className="sculpture-note" aria-hidden="true">
        a little room for play
      </span>
      <svg
        className="note-arrow"
        viewBox="0 0 95 70"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 7C72-8 90 22 51 57m-1-15 0 17 17-5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="sculpture-halo" />
      <button
        className="sculpture-stage"
        onClick={() => setTurn(turn + 100)}
        aria-label="Spin the paper sculpture"
        title="Give it a spin"
      >
        <svg
          viewBox="0 0 520 520"
          fill="none"
          className="sculpture-art"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="petal-light"
              x1="260"
              y1="55"
              x2="300"
              y2="280"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--petal)" />
              <stop offset="1" stopColor="var(--edge)" />
            </linearGradient>
            <radialGradient id="seed-light" cx=".35" cy=".25" r=".8">
              <stop stopColor="#ffda85" />
              <stop offset=".5" stopColor="var(--seed)" />
              <stop offset="1" stopColor="#ce7130" />
            </radialGradient>
            <filter
              id="paper-shadow"
              x="-40%"
              y="-40%"
              width="180%"
              height="190%"
            >
              <feDropShadow
                dx="0"
                dy="14"
                stdDeviation="9"
                floodColor="#172948"
                floodOpacity=".16"
              />
            </filter>
          </defs>
          <ellipse
            cx="260"
            cy="456"
            rx="119"
            ry="12"
            fill="#2c3752"
            opacity=".08"
          />
          <g
            style={{
              transform: `rotate(${turn}deg)`,
              transformOrigin: "260px 260px",
              transition: paused
                ? "none"
                : "transform 1.5s cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <g className="petal-wheel" filter="url(#paper-shadow)">
              {Array.from({ length: 18 }, (_, i) => (
                <g key={i} transform={`rotate(${i * 20} 260 260)`}>
                  <path
                    d="M260 260C199 232 187 123 218 64C259 82 300 187 260 260Z"
                    fill="url(#petal-light)"
                  />
                  <path
                    d="M218 64C249 130 261 196 260 260"
                    stroke="white"
                    strokeOpacity=".22"
                    strokeWidth=".9"
                  />
                </g>
              ))}
            </g>
            <circle
              cx="260"
              cy="260"
              r="52"
              fill="url(#seed-light)"
              filter="url(#paper-shadow)"
            />
            <path
              d="M247 232C250 223 259 218 270 218"
              stroke="#fff1c7"
              strokeWidth="2"
              strokeLinecap="round"
              opacity=".6"
            />
            <circle cx="260" cy="260" r="4" fill="#a65d31" opacity=".5" />
          </g>
          <path
            d="m439 115 6 10 12 1-9 8 2 12-11-6-11 6 3-12-9-8 12-1Z"
            fill="var(--seed)"
          />
          <circle cx="78" cy="356" r="5" fill="var(--petal)" />
          <path
            d="M93 106v18m-9-9h18"
            stroke="var(--petal)"
            strokeWidth="1.2"
          />
        </svg>
      </button>
      <div className="sculpture-caption flex items-center justify-between gap-4">
        <span className="micro">FIG. 01 — A WORK IN PLAY</span>
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Sculpture color"
        >
          {palettes.map((item, index) => (
            <button
              key={item.name}
              className="palette-dot"
              aria-label={`${item.name} palette`}
              aria-pressed={palette === index}
              style={{ background: item.petal }}
              onClick={() => setPalette(index)}
            />
          ))}
        </div>
      </div>
      <p className="spin-hint">Tap the flower. Follow your curiosity.</p>
    </div>
  );
}
