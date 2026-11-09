import { useEffect, useRef, useState } from "react";
import { projects, experiments, writings } from "./content";
import World from "./World";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function TinyArcade() {
  const [score, setScore] = useState(0);
  const [active, setActive] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const entryButton = useRef<HTMLButtonElement>(null);
  const fruitButton = useRef<HTMLButtonElement>(null);
  const transferFocus = useRef(false);
  useEffect(() => {
    setHydrated(true);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (transferFocus.current && document.activeElement === document.body) {
      (active ? fruitButton : entryButton).current?.focus({
        preventScroll: true,
      });
    }
    transferFocus.current = false;
  }, [active]);
  function start() {
    transferFocus.current = document.activeElement === entryButton.current;
    if (timer.current) clearTimeout(timer.current);
    setScore(0);
    setPosition({ x: 50, y: 50 });
    setActive(true);
    timer.current = setTimeout(() => {
      transferFocus.current = document.activeElement === fruitButton.current;
      setActive(false);
    }, 15000);
  }
  function catchCitrus() {
    setScore((value) => value + 1);
    setPosition({ x: 14 + Math.random() * 72, y: 18 + Math.random() * 58 });
  }
  return (
    <div className="tiny-arcade">
      <div className="arcade-top">
        <span>01 / CITRUS CATCH</span>
        <span aria-live="polite">{String(score).padStart(2, "0")} PTS</span>
      </div>
      <div className={`arcade-screen ${active ? "is-playing" : ""}`}>
        <div className="pixel-stars" aria-hidden="true">
          ✦ <span>+</span> · <span>✧</span> +
        </div>
        {active ? (
          <button
            ref={fruitButton}
            className="catch-citrus"
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            onClick={catchCitrus}
            aria-label="Catch the citrus"
          >
            ●<span aria-hidden="true">✦</span>
          </button>
        ) : (
          <div className="arcade-idle">
            <span className="arcade-orange" aria-hidden="true">
              ✳
            </span>
            <h3>{score ? "Nice side quest." : "One tiny distraction."}</h3>
            <p>
              {score
                ? `${score} citrus caught. Not bad, human.`
                : "15 seconds. Catch as many as you can."}
            </p>
            {hydrated ? (
              <button ref={entryButton} onClick={start}>
                {score ? "One more round?" : "Let’s play"}{" "}
                <span aria-hidden="true">→</span>
              </button>
            ) : (
              <a
                className="arcade-fallback"
                href="https://github.com/kumquatexpress"
              >
                Explore the other side quests →
              </a>
            )}
          </div>
        )}
      </div>
      <div className="arcade-bottom">
        <span>
          {active
            ? "Click, tap, or press Enter. Go go go."
            : "A little game made for this corner of the internet."}
        </span>
        <span aria-hidden="true">● ●</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="site-shell mx-auto max-w-[1520px] px-5 sm:px-9 lg:px-14">
        <header className="site-header flex items-center justify-between gap-5">
          <a className="wordmark" href="#world" aria-label="Boyang Niu, home">
            <span className="brand-star" aria-hidden="true">
              ✳
            </span>
            <span>kumquatexpress</span>
          </a>
          <nav
            aria-label="Main navigation"
            className="flex items-center gap-5 sm:gap-8"
          >
            <a href="#work">Work</a>
            <a href="#play">Play</a>
            <a href="#about">About</a>
            <a className="nav-hello" href="#connect">
              Say hello <Arrow />
            </a>
          </nav>
        </header>
        <main id="main">
          <section id="world" className="hero" aria-labelledby="hero-title">
            <div className="hero-heading flex flex-wrap justify-between items-end gap-5">
              <div>
                <p className="eyebrow">ENGINEER @ OPENAI · SAN FRANCISCO</p>
                <h1 id="hero-title">
                  Boyang Niu
                  <span className="name-spark" aria-hidden="true">
                    ✳
                  </span>
                </h1>
              </div>
              <div className="hero-aside">
                <p>
                  Building things.
                  <br />
                  Getting pleasantly sidetracked.
                </p>
              </div>
            </div>
            <World />
          </section>
          <section
            id="work"
            className="work-section section"
            aria-labelledby="work-title"
          >
            <div className="section-heading flex flex-wrap justify-between items-end gap-5">
              <div>
                <h2 id="work-title">
                  Ideas, <em>made real.</em>
                </h2>
              </div>
              <p className="section-note">Contributions at OpenAI.</p>
            </div>
            <div className="work-mosaic grid md:grid-cols-2 gap-5 sm:gap-7">
              {projects.map((project, index) => (
                <a
                  className={`art-project project-${project.drawing} ${index === 0 ? "md:col-span-2" : ""}`}
                  href={project.href}
                  key={project.number}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="art-project-image">
                    <img
                      src={`./art/${index === 0 ? "cinema" : index === 1 ? "still-life" : "toys"}.webp`}
                      alt={
                        index === 0
                          ? "An imagined astronaut looking across turquoise water at a giant coral moon."
                          : index === 1
                            ? "A sculptural still life in cobalt, orange, and lilac."
                            : "An original cast of playful clay characters."
                      }
                      width={index === 0 ? 1672 : 1254}
                      height={index === 0 ? 941 : 1254}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="project-caption">
                    <div>
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                    </div>
                    <span className="project-open" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                  <span className="sr-only">
                    Official launch story (opens in a new tab).
                  </span>
                </a>
              ))}
            </div>
          </section>
          <section
            id="play"
            className="play-section section"
            aria-labelledby="play-title"
          >
            <div className="section-heading flex flex-wrap justify-between items-end gap-5">
              <div>
                <h2 id="play-title">
                  Take a <em>side quest.</em>
                </h2>
              </div>
            </div>
            <div className="play-grid grid lg:grid-cols-[1.15fr_1fr] gap-6 sm:gap-9">
              <TinyArcade />
              <div className="experiment-list">
                {experiments.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`experiment experiment-${index}`}
                  >
                    <span className="experiment-icon" aria-hidden="true">
                      {index === 0 ? "Aa↟" : index === 1 ? "W" : "⌘"}
                    </span>
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </div>
                    <Arrow />
                  </a>
                ))}
              </div>
            </div>
          </section>
          <section
            id="about"
            className="about-section section grid md:grid-cols-[0.8fr_1.2fr] gap-10 sm:gap-16"
            aria-labelledby="about-title"
          >
            <div className="about-art">
              <img
                src="./art/toys.webp"
                alt="Three friendly sculptural characters: lavender robot, orange citrus, and mint star."
                width="1254"
                height="1254"
                loading="lazy"
              />
            </div>
            <div className="about-copy">
              <h2 id="about-title">
                Hi, I’m <em>Boyang.</em>
              </h2>
              <p>
                I build software at OpenAI in San Francisco. I’ve worked on
                Sora, image generation, custom GPTs, and whatever else needs
                doing.
              </p>
              <p>
                Before that: a founder at South Park Commons building Stylized,
                and engineering at Square, Baton, Dropbox, and Hive.
              </p>
              <a
                className="text-link"
                href="https://www.linkedin.com/in/boyang-niu"
              >
                The longer story <Arrow />
              </a>
              <div className="writing-links">
                <span className="eyebrow">WRITING / 2020</span>
                {writings.map((item) => (
                  <a href={item.href} key={item.name}>
                    {item.name} <Arrow />
                  </a>
                ))}
              </div>
            </div>
          </section>
          <section
            id="connect"
            className="connect-section"
            aria-labelledby="connect-title"
          >
            <div className="flex flex-wrap justify-between items-end gap-8">
              <h2 id="connect-title">
                Let’s make
                <br />
                <em>something.</em>
                <span aria-hidden="true">✳</span>
              </h2>
              <div className="social-links flex flex-col gap-3">
                <a href="https://x.com/kumquatexpress">
                  X / Twitter <Arrow />
                </a>
                <a href="https://github.com/kumquatexpress">
                  GitHub <Arrow />
                </a>
                <a href="https://www.linkedin.com/in/boyang-niu">
                  LinkedIn <Arrow />
                </a>
              </div>
            </div>
          </section>
        </main>
        <footer className="site-footer flex flex-wrap justify-between items-center gap-3">
          <span>© {new Date().getFullYear()} Boyang Niu</span>
          <a href="#world">Back to the world ↑</a>
        </footer>
      </div>
    </>
  );
}
