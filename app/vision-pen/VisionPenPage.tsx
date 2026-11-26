import { sitePublicPath } from "../site-public-path";

export function VisionPenPage() {
  return (
    <section className="vision-pen-page" aria-label="Vision Pen studio">
      <div className="vision-pen-frame-shell">
        <iframe
          className="vision-pen-frame"
          src={sitePublicPath("/vision-pen-studio/index.html?v=20260909-hand-precision")}
          title="Vision Pen air-writing studio"
          allow="camera; fullscreen"
          allowFullScreen
          scrolling="no"
        />
      </div>
    </section>
  );
}
