export function FingerCounterPage() {
  return (
    <section className="finger-counter-page" aria-label="Animated finger counter">
      <div className="finger-counter-frame-shell">
        <iframe
          className="finger-counter-frame"
          src="/finger-counter-app/index.html?v=20260909-animated-count"
          title="Animated finger counter"
          allow="camera; fullscreen"
          allowFullScreen
          scrolling="no"
        />
      </div>
    </section>
  );
}
