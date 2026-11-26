"use client";

import { useEffect, useState } from "react";
import { sitePublicPath } from "../site-public-path";
import { ArrowDown, ArrowDownToLine, ArrowLeft, ArrowRight, Clock3, Monitor, Moon, Settings2, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

const features = [
  { number: "01", label: "The clock", title: "Time, with a little motion.", body: "Hours, minutes and seconds appear on animated flip cards. The seconds card cycles through accent colors, while the date, display name and an hourly quote add a personal touch.", icon: Clock3, screen: "clock" },
  { number: "02", label: "Make it yours", title: "A screen saver that fits your screen.", body: "Choose 12 or 24-hour time, portrait or landscape orientation, brightness, card style and clock size. Adjust digit and text sizes to suit your display.", icon: Settings2, screen: "settings" },
  { number: "03", label: "Your displays", title: "Designed for your setup.", body: "Choose which connected displays show the clock. Optional date, name and quote controls let you keep the screen as minimal or personal as you like.", icon: Monitor, screen: "display" },
  { number: "04", label: "Quiet by design", title: "Native on Windows. No runtime to install.", body: "Flip Clock is a self-contained Windows screensaver with no Python runtime or extra packages. Preferences stay in your Windows user profile.", icon: ShieldCheck, screen: "native" },
];

function ClockPreview({ compact = false }: { compact?: boolean }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <div className={`fc-clock-preview${compact ? " compact" : ""}`} aria-label="Live Flip Clock preview">
    <div className="fc-clock-date">{time.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</div>
    <div className="fc-clock-digits"><span>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }).slice(0, 2)}</span><i>:</i><span>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }).slice(3, 5)}</span><i>:</i><span className="fc-seconds">{String(time.getSeconds()).padStart(2, "0")}</span></div>
    {!compact && <div className="fc-clock-quote">“The secret of getting ahead is getting started.”</div>}
  </div>;
}

function FeatureVisual({ screen }: { screen: string }) {
  if (screen === "clock") return <div className="fc-visual fc-visual-clock"><ClockPreview /></div>;
  if (screen === "settings") return <div className="fc-visual fc-settings-mock"><div className="fc-mock-title"><span>◷</span> Flip Clock Settings</div><div className="fc-mock-row"><span>Time format</span><b>24-hour　⌄</b></div><div className="fc-mock-row"><span>Orientation</span><b>Landscape　⌄</b></div><div className="fc-mock-row"><span>Brightness</span><b>━━━━━━●━</b></div><div className="fc-mock-row"><span>Flip cards</span><b className="fc-toggle">ON</b></div><div className="fc-mock-note">Customize the clock to your display</div></div>;
  if (screen === "display") return <div className="fc-visual fc-display-mock"><div className="fc-monitor"><div className="fc-monitor-screen"><ClockPreview compact /></div><div className="fc-monitor-stand" /></div><span className="fc-display-label">Your screen, your clock.</span></div>;
  return <div className="fc-visual fc-native-mock"><div className="fc-native-icon"><Clock3 size={43} /></div><div><strong>Flip Clock.scr</strong><span>Native Windows screen saver</span></div><div className="fc-native-check"><ShieldCheck size={19} /> Self-contained</div></div>;
}

export function FlipClockPage() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-fc-step]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.fcStep));
    }, { rootMargin: "-20% 0px -20% 0px", threshold: [0.1, 0.35, 0.6] });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <main className="fc-page">
    <section className="fc-hero" id="top">
      <div className="fc-hero-copy"><Link className="fc-back" href="/projects"><ArrowLeft size={15} /> All projects</Link><span className="fc-eyebrow"><span /> A WINDOWS DESKTOP PROJECT</span><h1>Make time<br /><em>flip.</em></h1><p>A calm, customizable flip clock that lives on your Windows screen saver. Native, lightweight, and ready to make your idle screen feel a little more intentional.</p><div className="fc-hero-actions"><a className="fc-download-primary" href={sitePublicPath("/downloads/flip-clock/Flip%20Clock%20Setup.exe")} download><ArrowDownToLine size={17} /> Download setup <span>· 177 KB</span></a><a className="fc-download-secondary" href={sitePublicPath("/downloads/flip-clock.zip")} download>Complete folder <ArrowDownToLine size={15} /></a></div><span className="fc-requirements">Windows screen saver · No extra runtime required</span></div>
      <div className="fc-hero-art"><div className="fc-orbit fc-orbit-one"/><div className="fc-orbit fc-orbit-two"/><div className="fc-clock-window"><div className="fc-window-bar"><span><i/> FLIP CLOCK <small>SCREENSAVER</small></span><span>−　□　×</span></div><ClockPreview/><div className="fc-window-bottom"><span><Sparkles size={13}/> A quieter way to watch time</span><span>24H · LANDSCAPE</span></div></div><div className="fc-float-tag"><span className="fc-float-dot"/> Live clock</div></div>
      <a className="fc-scroll-cue" href="#features"><span><ArrowDown size={15}/></span> SCROLL TO EXPLORE</a>
    </section>

    <section className="fc-intro" id="features"><span className="fc-section-kicker">A CLOSER LOOK</span><h2>Every detail has<br/>a <em>purpose.</em></h2><p>Scroll through the features. The preview follows along.</p></section>
    <section className="fc-story" aria-label="Flip Clock features"><div className="fc-story-stage"><div className="fc-stage-top"><span><i/> FLIP CLOCK / FEATURES</span><span>0{active + 1} <b>/</b> 04</span></div><FeatureVisual screen={features[active].screen}/><div className="fc-stage-bottom"><span>{features[active].label.toUpperCase()}</span><span className="fc-stage-progress"><i style={{ width: `${((active + 1) / features.length) * 100}%` }}/></span></div></div><div className="fc-feature-list">{features.map((feature, i) => { const Icon = feature.icon; return <article className={`fc-feature-step${active === i ? " active" : ""}`} data-fc-step={i} key={feature.number}><div className="fc-step-meta"><span>{feature.number} / 04</span><Icon size={18}/></div><span className="fc-step-label">{feature.label}</span><h3>{feature.title}</h3><p>{feature.body}</p></article>; })}</div></section>

    <section className="fc-install" id="install"><div className="fc-install-heading"><span className="fc-section-kicker">UP AND RUNNING</span><h2>Ready in <em>a minute.</em></h2><p>The installer handles the setup. You choose the look.</p></div><div className="fc-install-grid"><article><span>01</span><h3>Run setup</h3><p>Download and open <strong>Flip Clock Setup.exe</strong>. Choose an optional display name.</p></article><article><span>02</span><h3>Choose the saver</h3><p>The installer adds desktop shortcuts and opens Windows Screen Saver Settings. Select Flip Clock and click Apply.</p></article><article><span>03</span><h3>Make it yours</h3><p>Open Flip Clock Settings to choose orientation, brightness, time format, displays, and what appears on screen.</p></article></div><div className="fc-install-bottom"><div><ShieldCheck size={18}/><span><strong>Want the full package?</strong> The folder download includes the screensaver, settings helpers, previews, license, terms, and uninstall script.</span></div><a href={sitePublicPath("/downloads/flip-clock.zip")} download>Download complete folder <ArrowRight size={15}/></a></div></section>

    <footer className="fc-footer"><div><span className="fc-section-kicker">FLIP CLOCK FOR WINDOWS</span><h2>Let the seconds<br/><em>fall into place.</em></h2></div><div className="fc-footer-actions"><a className="fc-download-primary" href={sitePublicPath("/downloads/flip-clock/Flip%20Clock%20Setup.exe")} download><ArrowDownToLine size={17}/> Download setup</a><a className="fc-footer-back" href="#top">Back to top ↑</a></div><p className="fc-footer-note">Independent implementation. Fliqlo executable is not modified or redistributed.</p></footer>
  </main>;
}
