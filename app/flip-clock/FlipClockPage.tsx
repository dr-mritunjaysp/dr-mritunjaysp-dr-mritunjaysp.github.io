"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { sitePublicPath } from "../site-public-path";
import { ClockCustomizer, SignatureFooter } from "./ClockCustomizer";
import { ArrowDown, ArrowDownToLine, Clock3, Monitor, Moon, Settings2, ShieldCheck, Sparkles, Sun } from "lucide-react";

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
  const [lightMode, setLightMode] = useState(true);
  const [themeReady, setThemeReady] = useState(false);
  useEffect(() => {
    if (window.localStorage.getItem("flip-clock-page-theme") !== "dark") setLightMode(true);
    setThemeReady(true);
  }, []);
  useEffect(() => {
    if (themeReady) window.localStorage.setItem("flip-clock-page-theme", lightMode ? "light" : "dark");
  }, [lightMode, themeReady]);
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-fc-step]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.fcStep));
    }, { rootMargin: "-20% 0px -20% 0px", threshold: [0.1, 0.35, 0.6] });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <main className={`fc-page${lightMode ? " fc-page--light" : ""}`}>
    <button className="fc-theme-toggle" type="button" onClick={() => setLightMode((current) => !current)} aria-pressed={lightMode} aria-label={lightMode ? "Switch to dark mode" : "Switch to light mode"}>
      {lightMode ? <Moon size={16} /> : <Sun size={16} />}<span>{lightMode ? "Dark mode" : "Light mode"}</span>
    </button>
    <section className="fc-hero" id="top">
      <div className="fc-hero-copy"><div className="fc-app-brand"><span className="fc-app-icon-frame"><Image src={sitePublicPath("/downloads/flip-clock/Flip%20Clock.ico")} alt="Flip Clock app icon" width={54} height={54} unoptimized /></span><span><strong>Flip Clock</strong><small>WINDOWS SCREENSAVER</small></span></div><span className="fc-eyebrow"><span /> MADE FOR A CALMER DESKTOP</span><h1>Make time<br /><em>flip.</em></h1><p>A calm, customizable flip clock that lives on your Windows screen saver. Choose the look, settle into the moment, and let the seconds fall into place.</p><div className="fc-hero-actions"><a className="fc-download-primary" href={sitePublicPath("/downloads/flip-clock/Flip%20Clock%20Setup.exe")} download="Flip-Clock-Setup.exe"><ArrowDownToLine size={17} /> Download for Windows <span>· 177 KB</span></a></div><span className="fc-requirements">Windows screen saver · No extra runtime required</span><span className="fc-author-credit">Designed and developed by <strong>Dr. Mritunjay Shall Peelam</strong></span></div>
      <div className="fc-hero-art"><div className="fc-orbit fc-orbit-one"/><div className="fc-orbit fc-orbit-two"/><div className="fc-clock-window"><div className="fc-window-bar"><span><i/> FLIP CLOCK <small>SCREENSAVER</small></span><span>−　□　×</span></div><ClockPreview/><div className="fc-window-bottom"><span><Sparkles size={13}/> A quieter way to watch time</span><span>24H · LANDSCAPE</span></div></div><div className="fc-float-tag"><span className="fc-float-dot"/> Live clock</div></div>
      <a className="fc-scroll-cue" href="#customize"><span><ArrowDown size={15}/></span> CUSTOMIZE THE CLOCK</a>
    </section>

    <section className="fc-screenshots" id="screenshots" aria-labelledby="fc-screenshots-title"><div className="fc-screenshots-heading"><span className="fc-section-kicker">A LOOK INSIDE</span><h2 id="fc-screenshots-title">Made to feel <em>at home.</em></h2><p>Real screenshots from Flip Clock on Windows. Set up your display, then enjoy a quiet, full-screen clock.</p></div><div className="fc-screenshot-grid"><figure className="fc-screenshot-card"><div className="fc-screenshot-label"><span>01 / PERSONALIZE</span><span>SETTINGS</span></div><a className="fc-screenshot-image" href={sitePublicPath("/downloads/flip-clock/settings-preview.png")} target="_blank" rel="noreferrer" aria-label="Open the full-size Flip Clock settings screenshot"><Image src={sitePublicPath("/downloads/flip-clock/settings-preview.png")} alt="Flip Clock settings window with options for time format, orientation, brightness, clock size, date, name, and quote" width={1280} height={720} unoptimized /></a><figcaption><span className="fc-screenshot-icon"><Settings2 size={18}/></span><span><strong>Your clock, your settings.</strong><small>Choose the format, orientation, brightness, and details you want to see.</small></span></figcaption></figure><figure className="fc-screenshot-card"><div className="fc-screenshot-label"><span>02 / ON YOUR SCREEN</span><span>SCREENSAVER</span></div><a className="fc-screenshot-image fc-screenshot-live" href={sitePublicPath("/downloads/flip-clock/preview.png")} target="_blank" rel="noreferrer" aria-label="Open the full-size Flip Clock screen saver screenshot"><Image src={sitePublicPath("/downloads/flip-clock/preview.png")} alt="Flip Clock screen saver showing a live flip clock, date, display name, and quote on a black background" width={1280} height={900} unoptimized /></a><figcaption><span className="fc-screenshot-icon"><Clock3 size={18}/></span><span><strong>A clean view of time.</strong><small>Keep the display minimal, or show the date, your name, and a daily quote.</small></span></figcaption></figure></div></section>

    <ClockCustomizer />

    <section className="fc-intro" id="features"><span className="fc-section-kicker">A CLOSER LOOK</span><h2>Every detail has<br/>a <em>purpose.</em></h2><p>Scroll through the features. The preview follows along.</p></section>
    <section className="fc-story" aria-label="Flip Clock features"><div className="fc-story-stage"><div className="fc-stage-top"><span><i/> FLIP CLOCK / FEATURES</span><span>0{active + 1} <b>/</b> 04</span></div><FeatureVisual screen={features[active].screen}/><div className="fc-stage-bottom"><span>{features[active].label.toUpperCase()}</span><span className="fc-stage-progress"><i style={{ width: `${((active + 1) / features.length) * 100}%` }}/></span></div></div><div className="fc-feature-list">{features.map((feature, i) => { const Icon = feature.icon; return <article className={`fc-feature-step${active === i ? " active" : ""}`} data-fc-step={i} key={feature.number}><div className="fc-step-meta"><span>{feature.number} / 04</span><Icon size={18}/></div><span className="fc-step-label">{feature.label}</span><h3>{feature.title}</h3><p>{feature.body}</p></article>; })}</div></section>

    <section className="fc-install" id="install"><div className="fc-install-heading"><span className="fc-section-kicker">UP AND RUNNING</span><h2>Ready in <em>a minute.</em></h2><p>The installer handles the setup. You choose the look.</p></div><div className="fc-install-grid"><article><span>01</span><h3>Run setup</h3><p>Open <strong>Flip Clock Setup.exe</strong> and choose an optional display name.</p></article><article><span>02</span><h3>Choose the saver</h3><p>The installer adds desktop shortcuts and opens Windows Screen Saver Settings. Select Flip Clock and click Apply.</p></article><article><span>03</span><h3>Make it yours</h3><p>Open Flip Clock Settings to choose orientation, brightness, time format, displays, and what appears on screen.</p></article></div><div className="fc-install-bottom"><ShieldCheck size={18}/><span><strong>Designed for Windows.</strong> Self-contained installation, with your display preferences saved in your Windows user profile.</span></div></section>

    <SignatureFooter />

  </main>;
}
