import { useEffect, useState } from "react";
import { experiments, projects, writings } from "./content";
import { Kumquat, ProjectDrawing } from "./Drawings";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M6 18L18 6M6 6H18V18" : "M4 12H20M13 5L20 12L13 19"}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);
  function toggleTheme() {
    const next = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = next ? "dark" : "light";
    setDark(next);
    try {
      localStorage.setItem("boyang-theme", next ? "dark" : "light");
    } catch (error) {
      console.warn("[theme] Preference could not be saved:", error);
    }
  }
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="site-shell mx-auto max-w-[1120px] px-6 sm:px-10">
        <header className="site-header flex items-center justify-between">
          <a href="#" className="wordmark" aria-label="Boyang Niu, home">
            bn<span className="accent">.</span>
          </a>
          <nav
            aria-label="Main navigation"
            className="flex items-center gap-5 sm:gap-8"
          >
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#connect">
              Say hello <span aria-hidden="true">↗</span>
            </a>
            <button
              className="theme-button"
              onClick={toggleTheme}
              aria-label="Toggle light and dark appearance"
              aria-pressed={dark}
              title="A change of scenery"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle
                  cx="12"
                  cy="12"
                  r="6.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path d="M12 5.5A6.5 6.5 0 0112 18.5Z" fill="currentColor" />
              </svg>
              <span className="sr-only" aria-live="polite">
                {dark ? "Dark appearance" : ""}
              </span>
            </button>
          </nav>
        </header>
        <main id="main">
          <section
            className="hero grid md:grid-cols-[1.2fr_1fr] items-center"
            aria-labelledby="hero-title"
          >
            <div className="hero-copy">
              <p className="eyebrow flex items-center gap-2.5">
                <span className="status-dot" /> ENGINEER & BUILDER · SAN
                FRANCISCO
              </p>
              <h1 id="hero-title">
                Boyang Niu<span className="accent">.</span>
              </h1>
              <p className="hero-lede">
                A little curiosity.
                <br />A lot of <em>making.</em>
              </p>
              <p className="hero-description">
                I build things at{" "}
                <a href="https://openai.com/" className="inline-link">
                  OpenAI
                </a>
                .<br />
                Tools to create, things to play with,
                <br className="hidden sm:block" /> and whatever comes next.
              </p>
              <a
                className="text-link hero-cta inline-flex items-center gap-3"
                href="#work"
              >
                A few things I’ve worked on <Arrow />
              </a>
            </div>
            <Kumquat />
          </section>
          <div className="hero-foot flex flex-wrap items-center justify-between gap-3">
            <span className="mono">ON THE INTERNET, @KUMQUATEXPRESS</span>
            <span className="small-note">
              Equal parts considered & curious.
            </span>
          </div>
          <section
            id="work"
            className="section work-section"
            aria-labelledby="work-title"
          >
            <div className="section-heading grid sm:grid-cols-[1fr_2fr] gap-5">
              <p className="eyebrow">01 / SELECTED WORK</p>
              <div>
                <h2 id="work-title">
                  From an idea
                  <br />
                  to <em>out in the world.</em>
                </h2>
                <p className="section-intro">
                  Some of the products I’ve contributed to at OpenAI.
                </p>
              </div>
            </div>
            <div className="project-list">
              {projects.map((project) => (
                <a
                  href={project.href}
                  key={project.number}
                  className="project-row group grid items-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="mono project-number">{project.number}</span>
                  <ProjectDrawing kind={project.drawing} />
                  <div className="project-copy">
                    <p className="eyebrow">{project.category}</p>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                  </div>
                  <span className="project-arrow">
                    <Arrow diagonal />
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </section>
          <section
            id="about"
            className="section about-section grid sm:grid-cols-[1fr_2fr] gap-7"
            aria-labelledby="about-title"
          >
            <div>
              <p className="eyebrow">02 / A LITTLE CONTEXT</p>
              <svg
                className="asterisk"
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M49 5L52 94M8 28L89 72M10 76L88 23"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <h2 id="about-title">
                A winding path.
                <br />
                <em>A common thread.</em>
              </h2>
              <div className="about-copy">
                <p>
                  I’m an engineer in San Francisco, working at the intersection
                  of useful tools and creative possibility.
                </p>
                <p>
                  Before OpenAI, I built Stylized, a generative AI product
                  photography tool, as a founder at South Park Commons. Before
                  that: engineering at Square, Baton, Dropbox, and Hive.
                </p>
                <p>
                  There’s a thread through it all: software that gives people a
                  little more room to make things.
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/boyang-niu"
                className="text-link inline-flex items-center gap-3"
              >
                The longer version <Arrow diagonal />
              </a>
            </div>
          </section>
          <section
            className="section experiments-section"
            aria-labelledby="experiments-title"
          >
            <div className="section-heading flex flex-wrap justify-between items-end gap-5">
              <div>
                <p className="eyebrow">03 / SIDE QUESTS</p>
                <h2 id="experiments-title">
                  Made out of <em>curiosity.</em>
                </h2>
              </div>
              <a
                href="https://github.com/kumquatexpress"
                className="text-link inline-flex items-center gap-2"
              >
                More on GitHub <Arrow diagonal />
              </a>
            </div>
            <div className="experiment-grid grid md:grid-cols-3 gap-8 md:gap-10">
              {experiments.map((item, index) => (
                <a className="experiment" href={item.href} key={item.name}>
                  <div className="experiment-symbol" aria-hidden="true">
                    {index === 0 ? (
                      <span className="stream-symbol">
                        Aa
                        <span className="stream-cursor" />
                      </span>
                    ) : index === 1 ? (
                      <span className="tile-symbol">
                        <span>W</span>
                        <span>O</span>
                        <span>R</span>
                        <span>D</span>
                      </span>
                    ) : (
                      <svg viewBox="0 0 120 60" fill="none">
                        <path
                          d="M20 43L42 14L63 42L98 17M20 43L63 42L98 17L42 14"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                        {[
                          [20, 43],
                          [42, 14],
                          [63, 42],
                          [98, 17],
                        ].map(([x, y]) => (
                          <circle
                            key={x}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="var(--paper)"
                            stroke="currentColor"
                          />
                        ))}
                      </svg>
                    )}
                  </div>
                  <p className="eyebrow">{item.tag}</p>
                  <h3 className="flex justify-between items-center gap-2">
                    {item.name}
                    <Arrow diagonal />
                  </h3>
                  <p className="experiment-description">{item.description}</p>
                </a>
              ))}
            </div>
          </section>
          <section
            className="section writing-section grid sm:grid-cols-[1fr_2fr] gap-7"
            aria-labelledby="writing-title"
          >
            <div>
              <p className="eyebrow">04 / OCCASIONAL WORDS</p>
              <h2 id="writing-title">
                Other
                <br />
                <em>musings.</em>
              </h2>
            </div>
            <div>
              {writings.map((item) => (
                <a className="writing-row" href={item.href} key={item.name}>
                  <div className="flex justify-between gap-4 items-center">
                    <h3>{item.name}</h3>
                    <Arrow diagonal />
                  </div>
                  <p>{item.topic}</p>
                  <span className="mono">{item.date}</span>
                </a>
              ))}
            </div>
          </section>
          <section
            id="connect"
            className="connect-section"
            aria-labelledby="connect-title"
          >
            <p className="eyebrow">GOOD THINGS START WITH A CONVERSATION</p>
            <div className="flex flex-wrap justify-between items-end gap-8">
              <h2 id="connect-title">
                Say <em>hello.</em>
                <span className="accent">↗</span>
              </h2>
              <div className="social-links flex flex-wrap gap-6">
                <a href="https://x.com/kumquatexpress">
                  X / Twitter <Arrow diagonal />
                </a>
                <a href="https://github.com/kumquatexpress">
                  GitHub <Arrow diagonal />
                </a>
                <a href="https://www.linkedin.com/in/boyang-niu">
                  LinkedIn <Arrow diagonal />
                </a>
              </div>
            </div>
          </section>
        </main>
        <footer className="site-footer flex flex-wrap justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} Boyang Niu</span>
          <span className="footer-note">
            A small corner of a very big internet.
          </span>
          <a href="#">Back to top ↑</a>
        </footer>
      </div>
    </>
  );
}
