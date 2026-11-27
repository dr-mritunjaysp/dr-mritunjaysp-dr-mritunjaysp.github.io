"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { CalendarDays, Clock3, Palette, Quote, UserRound } from "lucide-react";

type ClockSettings = {
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  displayName: string;
  quote: string;
  customQuote: string;
  timeFormat: "12" | "24";
  showSeconds: boolean;
  showDate: boolean;
  showName: boolean;
  showQuote: boolean;
  flipCards: boolean;
};

const defaultSettings: ClockSettings = {
  accentColor: "#ff635f",
  textColor: "#f4f2ef",
  backgroundColor: "#08090b",
  displayName: "Dr. Mritunjay Shall Peelam",
  quote: "Keep making the life you want to live.",
  customQuote: "",
  timeFormat: "24",
  showSeconds: true,
  showDate: true,
  showName: true,
  showQuote: true,
  flipCards: true,
};

const quoteChoices = [
  "Keep making the life you want to live.",
  "Begin where you are. Use what you have.",
  "One moment at a time.",
  "Great things are done one step at a time.",
];

function ClockPreview({ settings }: { settings: ClockSettings }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const parts = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: settings.timeFormat === "12",
  }).formatToParts(now);
  const hour = parts.find((part) => part.type === "hour")?.value ?? "00";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";
  const period = parts.find((part) => part.type === "dayPeriod")?.value;
  const style = {
    backgroundColor: settings.backgroundColor,
    "--fc-custom-accent": settings.accentColor,
    "--fc-custom-text": settings.textColor,
  } as CSSProperties;

  return <div className={`fc-custom-preview${settings.flipCards ? " has-flip-cards" : ""}`} style={style}>
    {settings.showDate && <div className="fc-custom-date"><CalendarDays size={13} />{now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</div>}
    <div className="fc-custom-digits" aria-label="Current time">
      <span>{hour}</span><i>:</i><span>{minute}</span>
      {settings.showSeconds && <><i>:</i><span className="fc-custom-seconds">{String(now.getSeconds()).padStart(2, "0")}</span></>}
      {period && <small>{period}</small>}
    </div>
    {settings.showName && settings.displayName.trim() && <div className="fc-custom-name">{settings.displayName}</div>}
    {settings.showQuote && (settings.quote === "custom" ? settings.customQuote : settings.quote).trim() && <div className="fc-custom-quote"><Quote size={14} />{settings.quote === "custom" ? settings.customQuote : settings.quote}</div>}
  </div>;
}

export function ClockCustomizer() {
  const [settings, setSettings] = useState(defaultSettings);
  const [settingsReady, setSettingsReady] = useState(false);
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("flip-clock-web-preview-settings");
      if (stored) setSettings({ ...defaultSettings, ...JSON.parse(stored) });
    } catch {
      // Keep the default preview if saved browser settings cannot be read.
    }
    setSettingsReady(true);
  }, []);
  useEffect(() => {
    if (settingsReady) window.localStorage.setItem("flip-clock-web-preview-settings", JSON.stringify(settings));
  }, [settings, settingsReady]);

  function update<K extends keyof ClockSettings>(key: K, value: ClockSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  return <section className="fc-customizer" id="customize" aria-labelledby="fc-customizer-title">
    <div className="fc-customizer-heading"><span className="fc-section-kicker">MAKE IT YOURS</span><h2 id="fc-customizer-title">Set the mood.<br /><em>Keep your time.</em></h2><p>Try the settings and watch the clock update as you make each change.</p></div>
    <div className="fc-customizer-grid">
      <div className="fc-customizer-controls">
        <div className="fc-customizer-card-title"><span><Palette size={17} /> DISPLAY SETTINGS</span><Clock3 size={17} /></div>
        <div className="fc-color-fields">
          <label className="fc-customizer-field"><span>Accent color</span><span className="fc-color-input"><input aria-label="Clock accent color" type="color" value={settings.accentColor} onChange={(event) => update("accentColor", event.target.value)} /><code>{settings.accentColor.toUpperCase()}</code></span></label>
          <label className="fc-customizer-field"><span>Text color</span><span className="fc-color-input"><input aria-label="Clock text color" type="color" value={settings.textColor} onChange={(event) => update("textColor", event.target.value)} /><code>{settings.textColor.toUpperCase()}</code></span></label>
          <label className="fc-customizer-field"><span>Background</span><span className="fc-color-input"><input aria-label="Clock background color" type="color" value={settings.backgroundColor} onChange={(event) => update("backgroundColor", event.target.value)} /><code>{settings.backgroundColor.toUpperCase()}</code></span></label>
        </div>
        <label className="fc-customizer-field fc-field-full"><span><UserRound size={14} /> Display name</span><input type="text" maxLength={64} value={settings.displayName} onChange={(event) => update("displayName", event.target.value)} placeholder="Add your name" /></label>
        <label className="fc-customizer-field fc-field-full"><span><Quote size={14} /> Quote</span><select value={settings.quote} onChange={(event) => update("quote", event.target.value)}>{quoteChoices.map((quote) => <option key={quote} value={quote}>{quote}</option>)}<option value="custom">Write your own…</option></select></label>
        {settings.quote === "custom" && <label className="fc-customizer-field fc-field-full"><span>Your quote</span><textarea rows={2} maxLength={120} value={settings.customQuote} onChange={(event) => update("customQuote", event.target.value)} placeholder="Write a short quote" />{settings.customQuote.length}/120</label>}
        <label className="fc-customizer-field fc-format-field"><span>Time format</span><select value={settings.timeFormat} onChange={(event) => update("timeFormat", event.target.value as "12" | "24")}><option value="12">12-hour</option><option value="24">24-hour</option></select></label>
        <div className="fc-customizer-toggles" aria-label="Clock display options">
          <label><input type="checkbox" checked={settings.showSeconds} onChange={(event) => update("showSeconds", event.target.checked)} /> Seconds</label>
          <label><input type="checkbox" checked={settings.showDate} onChange={(event) => update("showDate", event.target.checked)} /> Date</label>
          <label><input type="checkbox" checked={settings.showName} onChange={(event) => update("showName", event.target.checked)} /> Name</label>
          <label><input type="checkbox" checked={settings.showQuote} onChange={(event) => update("showQuote", event.target.checked)} /> Quote</label>
          <label><input type="checkbox" checked={settings.flipCards} onChange={(event) => update("flipCards", event.target.checked)} /> Flip cards</label>
        </div>
        <p className="fc-customizer-note">Your choices are saved in this browser for the preview. The downloadable Windows clock has its own settings in Windows Screen Saver Settings.</p>
      </div>
      <div className="fc-customizer-live"><div className="fc-customizer-live-heading"><span>LIVE PREVIEW</span><span><i /> UPDATING</span></div><ClockPreview settings={settings} /><p>Adjust any setting to preview your clock instantly.</p></div>
    </div>
  </section>;
}

export function SignatureFooter() {
  return <footer className="fc-footer fc-signature-footer">
    <div className="fc-footer-credit"><span className="fc-section-kicker">MADE WITH CARE</span><p>Designed and developed by</p><span className="developer-credit">Dr. Mritunjay Shall Peelam</span></div>
  </footer>;
}

