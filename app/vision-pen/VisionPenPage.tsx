export function VisionPenPage() {
  return (
    <section className="vision-pen-page" aria-label="Vision Pen studio">
      <div className="vision-pen-frame-shell">
        <iframe
          className="vision-pen-frame"
          src="/vision-pen-studio/index.html"
          title="Vision Pen air-writing studio"
          allow="camera; fullscreen"
          allowFullScreen
        />
      </div>
    </section>
  );
}
