import { useEffect, useState } from "react";

const sample = "Small tools. A little less friction. More room to make things.";

export function StreamDemo({
  paused,
  enabled,
}: {
  paused: boolean;
  enabled: boolean;
}) {
  const [cursor, setCursor] = useState(sample.length);
  const [playing, setPlaying] = useState(false);
  const active = playing && cursor < sample.length;

  useEffect(() => {
    if (!active || paused) return;
    const timeout = window.setTimeout(() => setCursor(cursor + 1), 45);
    return () => window.clearTimeout(timeout);
  }, [active, cursor, paused]);

  function toggleExample() {
    if (paused) {
      setCursor(sample.length);
      setPlaying(false);
    } else if (active) setPlaying(false);
    else {
      setCursor(0);
      setPlaying(true);
    }
  }

  return (
    <div className="stream-demo">
      <div className="demo-heading">
        <span>next-genai-streaming</span>
        <span aria-hidden="true">↳</span>
      </div>
      <pre>
        <code>
          <span className="code-purple">withStream</span>(YourComponent, {"{"}{" "}
          request {"}"})
        </code>
      </pre>
      <div
        className="demo-output"
        role="region"
        aria-label="Local streaming example"
      >
        {sample.slice(0, cursor)}
        <span className="stream-caret" aria-hidden="true">
          ▎
        </span>
      </div>
      <div className="demo-footer">
        <span>A local text-stream sketch</span>
        <button disabled={!enabled} onClick={toggleExample}>
          {active ? "Pause example" : "Replay example"}
          <span aria-hidden="true">{active ? "Ⅱ" : "↻"}</span>
        </button>
      </div>
    </div>
  );
}
