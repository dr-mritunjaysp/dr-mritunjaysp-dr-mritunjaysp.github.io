"use client";

function jumpTo(position: "top" | "bottom") {
  const top =
    position === "top"
      ? 0
      : Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight,
        );

  window.scrollTo({ top, behavior: "smooth" });
}

export function ScrollJumpControls() {
  return (
    <nav className="scroll-jump-controls" aria-label="Page up and down controls">
      <button
        type="button"
        className="scroll-jump-button is-up"
        onClick={() => jumpTo("top")}
        aria-label="Go to the top of the page"
        title="Page up"
      >
        <span className="scroll-jump-arrow" aria-hidden="true">
          ↑
        </span>
        <span>Page up</span>
      </button>
      <button
        type="button"
        className="scroll-jump-button is-down"
        onClick={() => jumpTo("bottom")}
        aria-label="Go to the bottom of the page"
        title="Page down"
      >
        <span className="scroll-jump-arrow" aria-hidden="true">
          ↓
        </span>
        <span>Page down</span>
      </button>
    </nav>
  );
}
