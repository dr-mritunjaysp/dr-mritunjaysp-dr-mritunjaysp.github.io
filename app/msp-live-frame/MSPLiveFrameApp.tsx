"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Camera,
  Layers,
  Zap,
  Shield,
  Sliders,
  Maximize2,
  ExternalLink,
  ChevronRight,
  Award,
  Video,
  Download,
  Info,
  Check,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { MSPLiveFrameCanvas } from "./MSPLiveFrameCanvas";

export function MSPLiveFrameApp() {
  const subdomainUrl = "https://dr-mritunjaysp.com/msp-live-frame";
  const [copiedBadge, setCopiedBadge] = useState(false);

  const handleCopyBadge = () => {
    navigator.clipboard.writeText(subdomainUrl);
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2000);
  };

  return (
    <section className="sorting-page msp-frame-page">
      {/* Top Breadcrumb & Subdomain Header */}
      <div className="sorting-header-box">
        <div className="sorting-badge-pill">
          <Sparkles size={14} color="#10b981" /> Subdomain Application · AI Vision & Gesture
        </div>
        <h1 className="sorting-title">
          MSP Live Frame — Realtime Hand-Gesture AI Vision Studio
        </h1>
        <p className="sorting-subtitle">
          Hold up both hands and frame a box with your fingers — experience a live, real-time AI transformed world inside your hand frame at 30fps. Created by <strong>Dr. Mritunjay Shall Peelam</strong>.
        </p>

        {/* Subdomain Badge Link Box */}
        <div className="subdomain-badge-banner">
          <span className="subdomain-badge-link">{subdomainUrl}</span>
          <button className="subdomain-copy-btn" onClick={handleCopyBadge}>
            {copiedBadge ? <Check size={14} /> : "Copy Link"}
          </button>
        </div>

        {/* Quick Highlights Row */}
        <div className="pub-attributes-row" style={{ marginTop: "16px", justifyContent: "center" }}>
          <span className="attribute-pill">MediaPipe Hand Tracking</span>
          <span className="attribute-pill">Decart Lucy 2.5 Realtime WebRTC</span>
          <span className="attribute-pill">Zero-Latency Canvas Fallback</span>
          <span className="attribute-pill">Perspective Hysteresis lerp</span>
        </div>
      </div>

      {/* Main Interactive Live Application Box */}
      <div className="sorting-app-card" style={{ padding: "16px", marginBottom: "40px" }}>
        <MSPLiveFrameCanvas />
      </div>

      {/* Gesture Guide & Features Showcase */}
      <div style={{ maxWidth: "1100px", margin: "0 auto 40px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <Layers size={22} color="#10b981" /> How MSP Live Frame Operates
        </h2>

        <div className="sorting-features-grid">
          <div className="sorting-feature-card">
            <div className="feature-icon" style={{ background: "rgba(16, 185, 129, 0.12)", color: "#10b981" }}>
              <Camera size={22} />
            </div>
            <h3>1. Dual Hand Tracking</h3>
            <p>
              Uses MediaPipe Hand Landmarker GPU model to detect both left and right hand landmarks in real time, tracking your index and thumb tips.
            </p>
          </div>

          <div className="sorting-feature-card">
            <div className="feature-icon" style={{ background: "rgba(59, 130, 246, 0.12)", color: "#3b82f6" }}>
              <Zap size={22} />
            </div>
            <h3>2. Dynamic Quad Warp</h3>
            <p>
              Calculates smoothed 4-corner perspective quadrilaterals with exponential lerp motion and hysteresis filtering to eliminate video flicker.
            </p>
          </div>

          <div className="sorting-feature-card">
            <div className="feature-icon" style={{ background: "rgba(236, 72, 153, 0.12)", color: "#ec4899" }}>
              <Sparkles size={22} />
            </div>
            <h3>3. Decart Lucy 2.5 AI</h3>
            <p>
              Streams live WebRTC video-to-video style transformations using Decart Lucy 2.5 AI with tens of milliseconds latency at 30 frames per second.
            </p>
          </div>

          <div className="sorting-feature-card">
            <div className="feature-icon" style={{ background: "rgba(139, 92, 246, 0.12)", color: "#8b5cf6" }}>
              <Shield size={22} />
            </div>
            <h3>4. Zero-Latency Fallback</h3>
            <p>
              Includes 6 built-in GPU canvas artistic filters (3D CGI, Anime Cel, Cyberpunk Neon, Watercolor, Thermal IR, Matrix Code) working offline instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Research & Author Credits Box */}
      <div className="sorting-algorithm-details-card" style={{ marginTop: "30px" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Award size={20} color="#10b981" /> Academic & Open-Source Foundation
        </h3>
        <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: "1.7" }}>
          MSP Live Frame is built by <strong>Dr. Mritunjay Shall Peelam</strong>, synthesizing vision landmarker pose estimation algorithms and sub-100ms generative WebRTC streams. Inspired by open-source research on finger-frame gestures.
        </p>
        <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a
            href="https://github.com/sophiamyang/finger-frame-effect-lucy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sort-secondary"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <SiGithub size={16} /> Reference GitHub Repo <ExternalLink size={14} />
          </a>
          <Link href="/projects" className="btn-sort-primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            Explore All Projects <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
