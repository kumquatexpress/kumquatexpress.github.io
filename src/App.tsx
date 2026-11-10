import { useEffect, useRef, useState } from "react";
import { LightStudy } from "./LightStudy";
import { StreamDemo } from "./StreamDemo";

const credits =
  "https://cdn.openai.com/11998be9-5319-4302-bfbf-1167e093f1fb/Native_Image_Generation_System_Card.pdf#page=12";
const stylized =
  "https://www.indiehackers.com/post/show-ih-stylized-professional-product-photos-in-15-seconds-962304946c";
const github = "https://github.com/kumquatexpress";
const socialLinks = [
  { name: "GitHub", href: github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/boyang-niu" },
  { name: "X / Twitter", href: "https://x.com/kumquatexpress" },
];

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

function StillLife() {
  return (
    <div className="still-life" aria-hidden="true">
      <span className="still-label">A VIRTUAL PHOTO STUDIO</span>
      <div className="studio-orbit" />
      <div className="studio-plinth" />
      <div className="studio-vase">
        <div className="vase-neck" />
        <div className="vase-body" />
      </div>
      <div className="studio-ball" />
      <span className="still-word">Stylized.</span>
    </div>
  );
}

export function App() {
  const [paused, setPaused] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const userMotionPreference = useRef<boolean | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    try {
      const saved = window.localStorage.getItem("boyang-motion-paused");
      userMotionPreference.current = saved === null ? null : saved === "true";
    } catch (error) {
      console.warn(
        "MOTION_STORAGE_UNAVAILABLE: Could not read motion preference",
        error,
      );
    }
    setPaused(userMotionPreference.current ?? preference.matches);
    setHydrated(true);
    function followPreference(event: MediaQueryListEvent) {
      if (userMotionPreference.current === null) setPaused(event.matches);
    }
    preference.addEventListener("change", followPreference);
    return () => preference.removeEventListener("change", followPreference);
  }, []);

  function toggleMotion() {
    const next = !paused;
    userMotionPreference.current = next;
    setPaused(next);
    try {
      window.localStorage.setItem("boyang-motion-paused", String(next));
    } catch (error) {
      console.warn(
        "MOTION_STORAGE_UNAVAILABLE: Could not save motion preference",
        error,
      );
    }
  }

  return (
    <div
      className={`site-shell${hydrated ? " is-hydrated" : ""}${paused ? " motion-paused" : ""}`}
    >
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
        <nav className="flex items-center" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact" className="nav-contact">
            Say hello <Arrow diagonal />
          </a>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <section
          className="hero page-width grid items-center lg:grid-cols-2"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="hero-identity">
              Boyang Niu <span>· San Francisco</span>
            </p>
            <h1 id="hero-title">
              Tools for
              <br />
              <em>imagination.</em>
            </h1>
            <p className="hero-intro">
              I’m an engineer at{" "}
              <a
                className="text-link"
                href="https://openai.com/"
                target="_blank"
                rel="noreferrer"
              >
                OpenAI
              </a>
              , working on creative products. Previously, I co-founded{" "}
              <a className="text-link" href="#stylized">
                Stylized
              </a>
              , an AI and 3D photography studio.
            </p>
            <a
              href="#work"
              className="hero-link inline-flex items-center gap-4"
            >
              Selected work{" "}
              <span className="circle-arrow">
                <Arrow />
              </span>
            </a>
          </div>
          <LightStudy
            paused={paused}
            enabled={hydrated}
            onToggleMotion={toggleMotion}
          />
        </section>
        <section
          id="work"
          className="work-section page-width"
          aria-labelledby="work-title"
        >
          <div className="section-heading flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2 id="work-title">Images, video, and the tools between.</h2>
            </div>
          </div>
          <article className="project project-featured">
            <figure>
              <a
                className="art-link sora-art"
                href="https://openai.com/index/sora/"
                target="_blank"
                rel="noreferrer"
                aria-label="View the Sora project archive at OpenAI"
              >
                <img
                  src="/media/sora-tokyo.webp"
                  alt="A frame from OpenAI’s Sora sample: a neon-lit street in Tokyo reflected on wet pavement."
                  width="1440"
                  height="810"
                  loading="lazy"
                  decoding="async"
                />
                <span className="sora-title">Sora</span>
                <span className="project-open">
                  <Arrow diagonal />
                </span>
              </a>
              <figcaption>
                Sora sample, OpenAI · 2024{" "}
                <a
                  href="https://cdn.openai.com/sora/videos/tokyo-walk.mp4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch the original <span aria-hidden="true">↗</span>
                </a>
              </figcaption>
            </figure>
            <div className="project-info grid gap-4 md:grid-cols-[1fr_1fr]">
              <div>
                <p className="project-category">OPENAI · PRODUCT CONTRIBUTOR</p>
                <h3>Sora & image generation</h3>
              </div>
              <div>
                <p>
                  Product contributions across Sora and ChatGPT’s native image
                  generation. Tools that put new ways of creating images and
                  video into people’s hands.
                </p>
                <a
                  className="project-source"
                  href={credits}
                  target="_blank"
                  rel="noreferrer"
                >
                  View product credits <Arrow diagonal />
                </a>
                <p className="archive-note">
                  Sora is archived; the product is no longer available.
                </p>
              </div>
            </div>
          </article>
          <div className="project-pair grid gap-10 md:grid-cols-2">
            <article id="stylized" className="project">
              <a
                className="art-link"
                href={stylized}
                target="_blank"
                rel="noreferrer"
                aria-label="Read Boyang’s Stylized launch story"
              >
                <StillLife />
                <span className="project-open">
                  <Arrow diagonal />
                </span>
              </a>
              <div className="project-info">
                <p className="project-category">
                  STYLIZED · CO-FOUNDER · 2022–2023
                </p>
                <h3>A virtual photo studio</h3>
                <p>
                  I co-founded Stylized to help sellers make product photos
                  without a physical studio. We combined depth extraction,
                  generative AI, and 3D rendering to give people control over
                  their scenes.
                </p>
                <a
                  className="project-source"
                  href={stylized}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the launch story <Arrow diagonal />
                </a>
                <span className="archive-label">
                  Archived project · Illustration above
                </span>
              </div>
            </article>
            <article className="project">
              <StreamDemo paused={paused} enabled={hydrated} />
              <div className="project-info">
                <p className="project-category">
                  OPEN SOURCE · REACT & NEXT.JS
                </p>
                <h3>next-genai-streaming</h3>
                <p>
                  A small library for streaming text and audio into interfaces.
                  Use <code>withStream</code> for text or{" "}
                  <code>withMediaStream</code> for media, and let the component
                  handle the stream.
                </p>
                <a
                  className="project-source"
                  href={`${github}/next-genai-streaming`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore the code <Arrow diagonal />
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
              <p className="eyebrow">A LITTLE BACKGROUND</p>
              <h2 id="about-title">
                Engineer.
                <br />
                Builder.
                <br />
                <em>Toolmaker.</em>
              </h2>
              <div className="about-doodle">
                <Kumquat />
                <a href={github} target="_blank" rel="noreferrer">
                  also: @kumquatexpress
                </a>
              </div>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                I’m Boyang Niu, an engineer in San Francisco. I like making new
                technology useful to the people creating with it.
              </p>
              <p>
                At OpenAI, I’ve contributed to product work across Sora and
                ChatGPT’s native image generation. Before that, I co-founded
                Stylized, where we used AI and 3D to rethink product
                photography.
              </p>
              <p>
                Earlier chapters include Dropbox and computer science at Penn.
                My smaller projects wander through music, word games, and
                language experiments.
              </p>
              <div className="journey" aria-label="A few chapters">
                <div>
                  <strong>OpenAI</strong>
                  <span>Product engineering</span>
                  <span className="journey-time">Now</span>
                </div>
                <div>
                  <strong>Stylized</strong>
                  <span>Co-founder</span>
                  <span className="journey-time">Previously</span>
                </div>
                <div>
                  <strong>Dropbox</strong>
                  <span>Engineering & tech lead</span>
                  <span className="journey-time">Earlier</span>
                </div>
                <div>
                  <strong>Penn</strong>
                  <span>Computer science</span>
                  <span className="journey-time">The start</span>
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
              <p className="eyebrow">SMALLER EXPERIMENTS</p>
              <h2 id="odds-title">Sound, words, and a bit of play.</h2>
            </div>
            <a
              className="text-link inline-flex items-center gap-2"
              href={github}
              target="_blank"
              rel="noreferrer"
            >
              More on GitHub <Arrow diagonal />
            </a>
          </div>
          <div className="side-quests">
            <a
              href={`${github}/visualizer`}
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
                <h3>Visualizer</h3>
                <p>Rhythm and pitch, mapped onto a field of hexagons.</p>
              </div>
              <span className="quest-type">Music × code</span>
              <Arrow diagonal />
            </a>
            <a
              href={`${github}/WordSmith`}
              target="_blank"
              rel="noreferrer"
              className="quest"
            >
              <span className="quest-icon word-icon" aria-hidden="true">
                W
              </span>
              <div>
                <h3>WordSmith</h3>
                <p>A word game built with Unity for web and Android.</p>
              </div>
              <span className="quest-type">Wordplay</span>
              <Arrow diagonal />
            </a>
            <a
              href={`${github}/nGramBabbler`}
              target="_blank"
              rel="noreferrer"
              className="quest"
            >
              <span className="quest-icon babble-icon" aria-hidden="true">
                a<span>b</span>
              </span>
              <div>
                <h3>nGramBabbler</h3>
                <p>
                  A probabilistic experiment in teaching a machine to babble.
                </p>
              </div>
              <span className="quest-type">Language</span>
              <Arrow diagonal />
            </a>
          </div>
          <p className="source-note">
            These are source archives from earlier experiments.
          </p>
        </section>
      </main>
      <footer id="contact" className="contact-section">
        <div className="page-width">
          <p className="eyebrow">KEEP IN TOUCH</p>
          <div className="contact-heading flex flex-wrap items-end justify-between gap-8">
            <h2>
              Have something
              <br />
              <em>in mind?</em>
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
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.name}
                <Arrow diagonal />
              </a>
            ))}
          </div>
          <div className="footer-bottom flex flex-wrap items-center justify-between gap-5">
            <a href="#" className="flex items-center gap-3 footer-signature">
              <Kumquat />
              Boyang Niu
            </a>
            <span className="footer-message">
              A small corner of the internet, made with care.
            </span>
            <a href="#main" className="back-to-top">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
