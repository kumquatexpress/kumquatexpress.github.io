import { useState } from "react";

export function StudioScene({ light = -40 }: { light?: number }) {
  const direction = light / 100;
  return (
    <svg
      viewBox="0 0 520 410"
      fill="none"
      className="studio-scene"
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id="fruit-light"
          cx={0.5 + direction * 0.35}
          cy=".25"
          r=".82"
        >
          <stop stopColor="#ffcd70" />
          <stop offset=".42" stopColor="#f78c35" />
          <stop offset=".83" stopColor="#d75b25" />
          <stop offset="1" stopColor="#b94522" />
        </radialGradient>
        <linearGradient
          id="paper-blue"
          x1="307"
          y1="135"
          x2="410"
          y2="292"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4268df" />
          <stop offset="1" stopColor="#2444aa" />
        </linearGradient>
        <linearGradient id="plinth-light">
          <stop stopColor="#e6dcca" />
          <stop offset=".5" stopColor="#f4edde" />
          <stop offset="1" stopColor="#d2c6b2" />
        </linearGradient>
        <filter id="cast-shadow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter
          id="contact-shadow"
          x="-50%"
          y="-100%"
          width="200%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <clipPath id="kumquat-shape">
          <ellipse
            cx="238"
            cy="234"
            rx="65"
            ry="88"
            transform="rotate(-13 238 234)"
          />
        </clipPath>
      </defs>
      <path d="M48 324Q260 283 478 324" stroke="#d7d3c5" strokeWidth="1" />
      <ellipse
        cx="268"
        cy="337"
        rx="156"
        ry="16"
        fill="#8b8168"
        opacity=".08"
        filter="url(#cast-shadow)"
      />
      <path
        d="m123 307 204-24 78 24v26l-204 26-78-25Z"
        fill="url(#plinth-light)"
      />
      <path d="m123 307 201-26 81 26-204 27Z" fill="#f3eddf" />
      <path d="m201 334 204-27v26l-204 26Z" fill="#dcd1be" />
      <path d="m320 132 83 21-12 150-87-22Z" fill="url(#paper-blue)" />
      <path d="m320 132-16 149-18 24 15-149Z" fill="#1b3794" />
      <path d="m320 132 83 21" stroke="#7a91e8" />
      <ellipse
        className="light-shadow"
        cx="247"
        cy="321"
        rx={82 + Math.abs(direction) * 24}
        ry="15"
        fill="#665039"
        opacity=".25"
        filter="url(#cast-shadow)"
        style={{ transform: `translateX(${-direction * 67}px)` }}
      />
      <ellipse
        cx="247"
        cy="321"
        rx="46"
        ry="7"
        fill="#765234"
        opacity=".18"
        filter="url(#contact-shadow)"
      />
      <ellipse
        cx="238"
        cy="234"
        rx="65"
        ry="88"
        transform="rotate(-13 238 234)"
        fill="url(#fruit-light)"
      />
      <g clipPath="url(#kumquat-shape)">
        {Array.from({ length: 100 }, (_, i) => (
          <circle
            key={i}
            cx={175 + ((i * 31.7) % 130)}
            cy={148 + ((i * 23.9) % 178)}
            r={i % 3 === 0 ? 0.85 : 0.5}
            fill={i % 2 === 0 ? "#9c411c" : "#ffdf98"}
            opacity=".19"
          />
        ))}
      </g>
      <path
        d="M222 153q-5-16 2-28"
        stroke="#5f5733"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M224 140q6-48 49-45c-2 34-21 48-49 45Z" fill="#3c6549" />
      <path d="m225 139 31-29" stroke="#98a978" strokeWidth="1" />
      <path d="M221 141q-30-29-49-11c11 21 31 23 49 11Z" fill="#527650" />
      <path d="m220 141-33-8" stroke="#a0ae78" strokeWidth=".8" />
      <g
        className="light-source"
        style={{ transform: `translateX(${direction * 155}px)` }}
      >
        <circle cx="260" cy="52" r="8" fill="#deb565" />
        <circle cx="260" cy="52" r="17" stroke="#d8c493" strokeWidth=".8" />
        <path
          d="M260 24v-6m0 68v-6m28-28h6m-68 0h6m8-20-4-4m44 48 4 4m-44-4-4 4m44-48 4-4"
          stroke="#bd9a55"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M92 52h336"
        stroke="#bdbba9"
        strokeWidth=".7"
        strokeDasharray="2 6"
        opacity=".55"
      />
    </svg>
  );
}

export function LightStudy({
  paused,
  enabled,
  onToggleMotion,
}: {
  paused: boolean;
  enabled: boolean;
  onToggleMotion: () => void;
}) {
  const [light, setLight] = useState(-40);
  return (
    <div className="light-study">
      <div className="study-note" aria-hidden="true">
        a kumquat, in a different light.
      </div>
      <StudioScene light={light} />
      <div className="light-control">
        <label htmlFor="studio-light">
          Move the light <span aria-hidden="true">↔</span>
        </label>
        <input
          id="studio-light"
          type="range"
          min="-100"
          max="100"
          value={light}
          disabled={!enabled}
          onChange={(event) => setLight(Number(event.target.value))}
          aria-valuetext={
            light === 0
              ? "Light directly above"
              : `${Math.abs(light)}% to the ${light < 0 ? "left" : "right"}`
          }
        />
      </div>
      <div className="study-caption">
        <p>
          Inspired by{" "}
          <a href="#stylized">Stylized, a virtual photo studio I co-founded.</a>
        </p>
        <button
          onClick={onToggleMotion}
          className="motion-toggle"
          disabled={!enabled}
          aria-pressed={paused}
        >
          <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      </div>
    </div>
  );
}
