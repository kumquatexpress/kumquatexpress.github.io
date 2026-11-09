import { useEffect, useRef, useState } from "react";
import type { IslandScene } from "./world-scene";

type SceneState = "poster" | "loading" | "playing" | "failed";

export default function World() {
  const host = useRef<HTMLDivElement>(null);
  const island = useRef<IslandScene | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [requested, setRequested] = useState(false);
  const [state, setState] = useState<SceneState>("poster");
  const [paused, setPaused] = useState(false);
  const [launches, setLaunches] = useState(0);
  const enterButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!requested) return;
    setState("loading");
    let cancelled = false;
    function fail(error: unknown) {
      console.error(
        "[island] Could not render the 3D scene; keeping the artwork.",
        error,
      );
      island.current?.dispose();
      island.current = null;
      if (!cancelled) setState("failed");
    }
    import("./world-scene")
      .then((module) =>
        cancelled
          ? null
          : module.createIsland(host.current!, () =>
              fail(new Error("WebGL context was lost")),
            ),
      )
      .then((scene) => {
        if (!scene) return;
        if (cancelled) {
          scene.dispose();
          return;
        }
        island.current = scene;
        setState("playing");
      })
      .catch(fail);
    return () => {
      cancelled = true;
      island.current?.dispose();
      island.current = null;
    };
  }, [requested]);
  function launch() {
    island.current?.launch();
    setLaunches((value) => value + 1);
  }
  function togglePause() {
    const next = !paused;
    island.current?.setPaused(next);
    setPaused(next);
  }
  function returnToArtwork() {
    setRequested(false);
    setState("poster");
    setPaused(false);
    setLaunches(0);
    requestAnimationFrame(() => enterButton.current?.focus());
  }
  return (
    <figure className={`world-stage scene-${state}`}>
      <picture className="world-poster">
        <source media="(max-width: 640px)" srcSet="./art/island-small.webp" />
        <img
          src="./art/island.webp"
          width="1672"
          height="941"
          alt="A dreamlike turquoise island with a glowing citrus portal, tiny arcade, and peach clouds."
          fetchPriority="high"
        />
      </picture>
      <div className="world-canvas" ref={host} />
      <div className="world-topline">
        <span className="world-tag">✳ A SMALL WORLD BY BOYANG</span>
        <span className="world-coordinates">37.77° N / 122.42° W</span>
      </div>
      <div className="world-bottomline">
        <div className="world-caption">
          <span className="world-dot" />
          <span aria-live="polite">
            {launches
              ? "A tiny leap for citrus-kind."
              : state === "playing"
                ? "Look around. Make yourself at home."
                : "A place for ideas to get a little weird."}
          </span>
        </div>
        {hydrated && (
          <div className="world-controls">
            {state === "poster" && (
              <button
                ref={enterButton}
                className="enter-button"
                onClick={() => setRequested(true)}
              >
                Enter 3D <span aria-hidden="true">↗</span>
              </button>
            )}
            {state === "loading" && (
              <span role="status" className="world-loading">
                Opening the playground…
              </span>
            )}
            {state === "failed" && (
              <span role="status" className="world-loading">
                Enjoy the still life.
              </span>
            )}
            {state === "playing" && (
              <>
                <button
                  onClick={() => island.current?.rotate(-1)}
                  aria-label="Rotate island left"
                >
                  ←
                </button>
                <button
                  onClick={() => island.current?.rotate(1)}
                  aria-label="Rotate island right"
                >
                  →
                </button>
                <button className="launch-button" onClick={launch}>
                  Launch citrus ✦
                </button>
                <button
                  onClick={togglePause}
                  aria-label={
                    paused
                      ? "Resume island animation"
                      : "Pause island animation"
                  }
                  aria-pressed={paused}
                >
                  {paused ? "▶" : "Ⅱ"}
                </button>
                <button
                  onClick={returnToArtwork}
                  aria-label="Return to the artwork"
                >
                  ↩
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </figure>
  );
}
