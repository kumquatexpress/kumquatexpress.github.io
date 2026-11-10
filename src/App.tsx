import { useState } from "react";
import { Sculpture } from "./Sculpture";

const credits =
  "https://cdn.openai.com/11998be9-5319-4302-bfbf-1167e093f1fb/Native_Image_Generation_System_Card.pdf#page=12";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="arrow"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Kumquat() {
  return (
    <svg viewBox="0 0 32 38" className="kumquat" fill="none" aria-hidden="true">
      <ellipse cx="15" cy="24" rx="11" ry="13" fill="#f56636" />
      <path d="M15 12C15 3 23 0 30 4c-1 9-10 11-15 8Z" fill="#345942" />
      <path
        d="m15 13-2-7"
        stroke="#345942"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 20c-2 3-2 6-1 8"
        stroke="#ffc89e"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SoraArt() {
  return (
    <div className="sora-art" aria-hidden="true">
      <div className="sora-art-top micro">
        <span>OPENAI / SORA</span>
        <span>A WORLD IN MOTION</span>
      </div>
      <div className="filmstrip">
        <div className="film-frame frame-one">
          <div className="film-sun" />
          <div className="film-arch" />
          <div className="film-floor" />
        </div>
        <div className="film-frame frame-two">
          <div className="film-sun" />
          <div className="film-arch" />
          <div className="film-floor" />
        </div>
        <div className="film-frame frame-three">
          <div className="film-sun" />
          <div className="film-arch" />
          <div className="film-floor" />
        </div>
      </div>
      <div className="sora-title">
        Sora<span>Imagination, in motion.</span>
      </div>
      <div className="sora-art-bottom micro">
        <span>WORDS → WORLDS</span>
        <span className="film-timer">
          00:00:08 <span className="record-dot" />
        </span>
      </div>
    </div>
  );
}

function StillLife() {
  return (
    <div className="still-life" aria-hidden="true">
      <span className="micro still-label">A SMALL VIRTUAL STUDIO</span>
      <div className="studio-orbit" />
      <div className="studio-plinth" />
      <div className="studio-vase">
        <div className="vase-neck" />
        <div className="vase-body" />
      </div>
      <div className="studio-ball" />
      <span className="still-word">Stylized.</span>
      <span className="micro still-bottom">A NEW LIGHT ON EVERYDAY THINGS</span>
    </div>
  );
}

function StreamArt() {
  return (
    <div className="stream-art" aria-hidden="true">
      <span className="micro">SMALL TOOLS, NEW POSSIBILITIES</span>
      <div className="stream-window">
        <div className="window-bar">
          <i />
          <i />
          <i />
          <span>hello, stream</span>
        </div>
        <div className="stream-code">
          <span className="code-purple">const</span> idea ={" "}
          <span className="code-green">withStream</span>(<br />
          <span className="code-indent">
            YourComponent, {"{"} request {"}"}
          </span>
          <br />
          );
          <div className="code-divider" />
          <span className="stream-output">One word at a time.</span>
          <span className="stream-caret">▎</span>
        </div>
      </div>
      <div className="stream-waves">
        {Array.from({ length: 37 }, (_, i) => (
          <i
            key={i}
            style={{
              height: `${12 + Math.sin(i * 0.55) ** 2 * 42}px`,
              animationDelay: `${i * -0.07}s`,
            }}
          />
        ))}
      </div>
      <span className="micro stream-bottom">TEXT / AUDIO / IN REAL TIME</span>
    </div>
  );
}

export function App() {
  const [paused, setPaused] = useState(false);

  return (
    <div className={`site-shell${paused ? " motion-paused" : ""}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header page-width flex items-center justify-between">
        <a
          href="#"
          className="wordmark flex items-center gap-3"
          aria-label="Boyang Niu, back to top"
        >
          <Kumquat />
          <span>
            Boyang Niu<span className="wordmark-sub">Engineer & builder</span>
          </span>
        </a>
        <nav
          className="flex items-center gap-6 sm:gap-9"
          aria-label="Main navigation"
        >
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact" className="nav-contact">
            Say hello <Arrow diagonal />
          </a>
        </nav>
      </header>

      <main id="main">
        <section
          className="hero page-width grid items-center lg:grid-cols-2"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow flex items-center gap-2">
              <span className="status-dot" /> BASED IN SAN FRANCISCO
            </p>
            <h1 id="hero-title">
              A little
              <br />
              <em>curiosity.</em>
              <br />A long way.
            </h1>
            <p className="hero-intro">
              Hi, I’m <strong>Boyang.</strong> I build things that turn
              <br className="desktop-break" /> new possibilities into everyday
              experiences.
              <br className="desktop-break" /> Currently making things at{" "}
              <a
                className="text-link"
                href="https://openai.com/"
                target="_blank"
                rel="noreferrer"
              >
                OpenAI <span aria-hidden="true">↗</span>
              </a>
              .
            </p>
            <a
              href="#work"
              className="hero-link inline-flex items-center gap-5"
            >
              A few things I’ve worked on{" "}
              <span className="circle-arrow">
                <Arrow />
              </span>
            </a>
          </div>
          <Sculpture paused={paused} />
          <div className="hero-foot flex items-center justify-between gap-4">
            <span className="micro">A PERSONAL CORNER OF THE INTERNET</span>
            <a href="#work" className="micro flex items-center gap-3">
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section
          id="work"
          className="work-section page-width"
          aria-labelledby="work-title"
        >
          <div className="section-heading flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">01 / SELECTED WORK</p>
              <h2 id="work-title">Ideas, made real.</h2>
            </div>
            <p className="section-aside">
              A few stops along the way.
              <br />
              Always more to explore.
            </p>
          </div>

          <article className="project project-featured">
            <a
              href="https://openai.com/index/sora/"
              target="_blank"
              rel="noreferrer"
              className="art-link"
              aria-label="Explore Sora at OpenAI"
            >
              <SoraArt />
              <span className="project-open">
                <Arrow diagonal />
              </span>
            </a>
            <div className="project-info grid gap-4 md:grid-cols-[1fr_1fr]">
              <div>
                <p className="micro project-category">
                  OPENAI / PRODUCT ENGINEERING
                </p>
                <h3>
                  <a
                    href="https://openai.com/index/sora/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Sora <Arrow diagonal />
                  </a>
                </h3>
              </div>
              <div>
                <p>
                  Helping turn generative video into a creative tool. I
                  contributed to Sora’s product work at OpenAI.
                </p>
                <a
                  className="project-source"
                  href={credits}
                  target="_blank"
                  rel="noreferrer"
                >
                  Product credits <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>

          <div className="project-pair grid gap-10 md:grid-cols-2">
            <article className="project">
              <a
                className="art-link"
                href="https://www.indiehackers.com/post/show-ih-stylized-professional-product-photos-in-15-seconds-962304946c"
                target="_blank"
                rel="noreferrer"
                aria-label="Read Boyang’s introduction to Stylized"
              >
                <StillLife />
                <span className="project-open">
                  <Arrow diagonal />
                </span>
              </a>
              <div className="project-info">
                <p className="micro project-category">STYLIZED / CO-FOUNDER</p>
                <h3>
                  <a
                    href="https://www.indiehackers.com/post/show-ih-stylized-professional-product-photos-in-15-seconds-962304946c"
                    target="_blank"
                    rel="noreferrer"
                  >
                    A studio in your pocket <Arrow diagonal />
                  </a>
                </h3>
                <p>
                  I co-founded Stylized to make product photography more
                  accessible, combining generative AI, depth, and 3D rendering.
                </p>
                <span className="project-year micro">2022–2023 · ARCHIVE</span>
              </div>
            </article>
            <article className="project">
              <a
                className="art-link"
                href="https://github.com/kumquatexpress/next-genai-streaming"
                target="_blank"
                rel="noreferrer"
                aria-label="Explore next-genai-streaming on GitHub"
              >
                <StreamArt />
                <span className="project-open">
                  <Arrow diagonal />
                </span>
              </a>
              <div className="project-info">
                <p className="micro project-category">
                  OPEN SOURCE / REACT & NEXT.JS
                </p>
                <h3>
                  <a
                    href="https://github.com/kumquatexpress/next-genai-streaming"
                    target="_blank"
                    rel="noreferrer"
                  >
                    A little less friction <Arrow diagonal />
                  </a>
                </h3>
                <p>
                  A small component library for streaming text and audio into
                  interfaces. Built to make real-time experiences easier to get
                  started with.
                </p>
                <a
                  className="project-source"
                  href="https://github.com/kumquatexpress/next-genai-streaming"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore the code <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </div>
        </section>

        <section
          id="about"
          className="about-section"
          aria-labelledby="about-title"
        >
          <div className="page-width about-grid grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div className="about-heading">
              <p className="eyebrow">02 / THE PERSON BEHIND THE PIXELS</p>
              <h2 id="about-title">
                Engineer.
                <br />
                Builder.
                <br />
                <em>Still curious.</em>
              </h2>
              <div className="about-doodle" aria-hidden="true">
                <Kumquat />
                <span>also: @kumquatexpress</span>
                <svg viewBox="0 0 180 35" fill="none">
                  <path
                    d="M4 18c43 14 103 17 166-2m-12-5 14 4-8 12"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                I’m Boyang Niu, an engineer in San Francisco. My work lives
                where technology meets the things people can actually use.
              </p>
              <p>
                At OpenAI, I’ve contributed to product work across Sora and
                ChatGPT’s native image generation. Before that, I co-founded
                Stylized, a virtual photography studio built around AI and 3D.
              </p>
              <p>
                Earlier chapters took me through Dropbox and the University of
                Pennsylvania. Along the way, I’ve made word games, music
                visualizers, and tools for fellow builders. The common thread is
                a reason to try something new.
              </p>
              <div className="journey" aria-label="A few chapters">
                <div>
                  <span className="journey-dot" />
                  <strong>OpenAI</strong>
                  <span>Product engineering</span>
                  <span className="micro">NOW</span>
                </div>
                <div>
                  <span className="journey-dot" />
                  <strong>Stylized</strong>
                  <span>Co-founder</span>
                  <span className="micro">BEFORE</span>
                </div>
                <div>
                  <span className="journey-dot" />
                  <strong>Dropbox</strong>
                  <span>Engineering & tech lead</span>
                  <span className="micro">EARLIER</span>
                </div>
                <div>
                  <span className="journey-dot" />
                  <strong>Penn</strong>
                  <span>Computer science</span>
                  <span className="micro">THE START</span>
                </div>
              </div>
              <a
                className="text-link inline-flex items-center gap-2"
                href="https://www.linkedin.com/in/boyang-niu"
                target="_blank"
                rel="noreferrer"
              >
                The longer version on LinkedIn <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>

        <section
          className="odds-section page-width"
          aria-labelledby="odds-title"
        >
          <div className="section-heading flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">03 / THE SIDE QUESTS</p>
              <h2 id="odds-title">Made out of curiosity.</h2>
            </div>
            <a
              className="text-link inline-flex items-center gap-2"
              href="https://github.com/kumquatexpress"
              target="_blank"
              rel="noreferrer"
            >
              More on GitHub <Arrow diagonal />
            </a>
          </div>
          <div className="side-quests">
            <a
              href="https://github.com/kumquatexpress/visualizer"
              target="_blank"
              rel="noreferrer"
              className="quest"
            >
              <span className="quest-icon sound-icon" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
              <div>
                <h3>Seeing sound</h3>
                <p>A hexagonal playground for rhythm and pitch.</p>
              </div>
              <span className="quest-type micro">MUSIC × CODE</span>
              <Arrow diagonal />
            </a>
            <a
              href="https://github.com/kumquatexpress/WordSmith"
              target="_blank"
              rel="noreferrer"
              className="quest"
            >
              <span className="quest-icon word-icon" aria-hidden="true">
                W
              </span>
              <div>
                <h3>Playing with words</h3>
                <p>A word game built with Unity for web and Android.</p>
              </div>
              <span className="quest-type micro">A LITTLE PLAY</span>
              <Arrow diagonal />
            </a>
            <a
              href="https://github.com/kumquatexpress/nGramBabbler"
              target="_blank"
              rel="noreferrer"
              className="quest"
            >
              <span className="quest-icon babble-icon" aria-hidden="true">
                a<span>b</span>
              </span>
              <div>
                <h3>Teaching a machine to babble</h3>
                <p>A probabilistic experiment with language.</p>
              </div>
              <span className="quest-type micro">EARLY EXPERIMENTS</span>
              <Arrow diagonal />
            </a>
          </div>
        </section>
      </main>
      <footer id="contact" className="contact-section">
        <div className="page-width">
          <p className="eyebrow">04 / KEEP IN TOUCH</p>
          <div className="contact-heading flex flex-wrap items-end justify-between gap-8">
            <h2>
              Good things start
              <br />
              with a <em>hello.</em>
            </h2>
            <a
              className="contact-button inline-flex items-center gap-7"
              href="https://www.linkedin.com/in/boyang-niu"
              target="_blank"
              rel="noreferrer"
            >
              Say hello <Arrow diagonal />
            </a>
          </div>
          <div className="contact-links flex flex-wrap gap-7">
            <a
              href="https://github.com/kumquatexpress"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <Arrow diagonal />
            </a>
            <a
              href="https://www.linkedin.com/in/boyang-niu"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <Arrow diagonal />
            </a>
            <a
              href="https://x.com/kumquatexpress"
              target="_blank"
              rel="noreferrer"
            >
              X / Twitter <Arrow diagonal />
            </a>
          </div>
          <div className="footer-bottom flex flex-wrap items-center justify-between gap-5">
            <a href="#" className="flex items-center gap-3 footer-signature">
              <Kumquat /> Boyang Niu <span>© {new Date().getFullYear()}</span>
            </a>
            <span className="footer-message">
              Made with care. And a little curiosity.
            </span>
            <button
              onClick={() => setPaused(!paused)}
              className="motion-toggle"
              aria-pressed={paused}
            >
              <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{" "}
              {paused ? "Resume motion" : "Pause motion"}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
