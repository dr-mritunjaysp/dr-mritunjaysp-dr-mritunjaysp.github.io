"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Camera,
  Sparkles,
  Key,
  Maximize2,
  Minimize2,
  Video,
  VideoOff,
  Download,
  AlertCircle,
  X,
  Play,
  HelpCircle,
} from "lucide-react";

const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const MODEL_URL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
const DECART_SDK_URL = "https://esm.sh/@decartai/sdk@0.1.17";

export interface EffectItem {
  id: string;
  label: string;
  badge?: string;
  prompt: string | null;
}

export const MSP_EFFECTS: EffectItem[] = [
  {
    id: "movie3d",
    label: "3D Movie",
    prompt:
      "Change the style of the video to a 3D animated movie: stylized CGI animation, the person as an animated character with expressive big eyes and smooth skin, soft cinematic lighting.",
  },
  {
    id: "anime",
    label: "Anime",
    prompt:
      "Change the style of the video to hand-drawn anime: clean black line art, flat cel shading, vibrant colors, large expressive eyes.",
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    prompt:
      "Change the style of the video to neon cyberpunk: glowing pink and cyan neon light on the person and walls, rain-slick reflective surfaces, holographic signs in the background.",
  },
  {
    id: "watercolor",
    label: "Watercolor",
    prompt:
      "Change the style of the video to a watercolor painting: soft loose brushstrokes, gentle color bleeds, visible paper texture, muted pastel palette.",
  },
  {
    id: "lego",
    label: "LEGO",
    prompt:
      "Change the style of the video to a LEGO stop-motion animation: the person is a yellow LEGO minifigure with a cylindrical head, painted face, and claw hands, and the room is built entirely from glossy plastic LEGO bricks with visible round studs on every surface.",
  },
  { id: "custom", label: "Custom ✨", prompt: null },
];

interface Point {
  x: number;
  y: number;
}

export function MSPLiveFrameCanvas() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lucyVidRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [effect, setEffect] = useState<string>("movie3d");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [showKeyPanel, setShowKeyPanel] = useState<boolean>(false);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);

  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [statusState, setStatusState] = useState<"loading" | "ready" | "connecting" | "live" | "error">("loading");
  const [statusText, setStatusText] = useState<string>("Initializing MediaPipe Hand Landmarker...");
  const [liveMode, setLiveMode] = useState<"ai" | "canvas">("canvas");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [handDetected, setHandDetected] = useState<boolean>(false);

  const landmarkerRef = useRef<any>(null);
  const realtimeClientRef = useRef<any>(null);
  const animFrameId = useRef<number | null>(null);

  // Quad tracking state with hysteresis lerp
  const cornersRef = useRef<[Point, Point, Point, Point] | null>(null);
  const presenceRef = useRef<number>(0);
  const lostFramesRef = useRef<number>(0);

  // Load saved Decart API Key and prompt on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("msp-decart-key") || sessionStorage.getItem("msp-decart-key") || "";
      const savedPrompt = localStorage.getItem("msp-lucy-custom") || "";
      setApiKey(savedKey);
      setCustomPrompt(savedPrompt);
      if (savedKey) {
        setLiveMode("ai");
      }
    }
  }, []);

  // Initialize MediaPipe Hand Landmarker from CDN
  useEffect(() => {
    let active = true;

    async function initMediaPipe() {
      try {
        setStatusState("loading");
        setStatusText("Loading MediaPipe Vision WASM...");
        const { HandLandmarker, FilesetResolver } = await new Function(
          "u",
          "return import(u)"
        )("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/+esm");

        const vision = await FilesetResolver.forVisionTasks(WASM_URL);

        if (!active) return;

        setStatusText("Loading Hand Landmarker AI Model...");
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: MODEL_URL,
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 2,
          minHandDetectionConfidence: 0.4,
          minHandPresenceConfidence: 0.4,
          minTrackingConfidence: 0.4,
        });

        if (!active) return;

        landmarkerRef.current = landmarker;
        setStatusState("ready");
        setStatusText("Hold up both hands to frame the scene!");
      } catch (err: any) {
        console.error("MediaPipe initialization error:", err);
        if (active) {
          setStatusState("error");
          setStatusText(`MediaPipe Fallback: Built-in Canvas Engine active (${err.message || "WASM load fallback"})`);
        }
      }
    }

    initMediaPipe();

    return () => {
      active = false;
      if (landmarkerRef.current) {
        try {
          landmarkerRef.current.close();
        } catch {}
      }
    };
  }, []);

  // Start Camera
  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
        setStatusState(apiKey ? "connecting" : "ready");
        setStatusText(apiKey ? "Connecting to Decart Lucy 2.5 WebRTC..." : "Camera active — Hold up both hands!");
      }
    } catch (err: any) {
      console.error("Camera access failed:", err);
      setCameraError(err.message || "Failed to access webcam. Please verify browser permissions.");
    }
  }, [apiKey]);

  // Stop Camera
  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setStatusState("ready");
    setStatusText("Camera Stopped");
  }, []);

  // Toggle Camera
  const toggleCamera = () => {
    if (cameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Connect Decart Lucy 2.5 Realtime WebRTC
  const connectLucyAI = useCallback(async () => {
    if (!apiKey.trim() || !videoRef.current || !videoRef.current.srcObject) return;

    try {
      setStatusState("connecting");
      setStatusText("CONNECTING TO DECART LUCY 2.5…");

      const { createDecartClient, models } = await import(/* webpackIgnore: true */ DECART_SDK_URL);
      const model = models.realtime("lucy-2.5");
      const client = createDecartClient({ apiKey: apiKey.trim() });

      const effectObj = MSP_EFFECTS.find((e) => e.id === effect);
      const promptText = effectObj?.prompt || customPrompt || "Transform the style inside the hand frame.";

      const realtimeClient = await client.realtime.connect(videoRef.current.srcObject, {
        model,
        initialState: { prompt: { text: promptText, enhance: true } },
        onRemoteStream: (remoteStream: MediaStream) => {
          if (lucyVidRef.current) {
            lucyVidRef.current.srcObject = remoteStream;
            lucyVidRef.current.play().catch(() => {});
            setStatusState("live");
            setStatusText("LIVE");
            setLiveMode("ai");
          }
        },
      });

      realtimeClientRef.current = realtimeClient;
    } catch (err: any) {
      console.error("Decart connection error:", err);
      setStatusState("error");
      setStatusText(`AI OFFLINE — ${err.message || "connect failed"}`);
      setLiveMode("canvas");
    }
  }, [apiKey, effect, customPrompt]);

  // Update prompt on active Decart session
  const pushPromptToLucy = useCallback(async () => {
    if (!realtimeClientRef.current) return;
    const effectObj = MSP_EFFECTS.find((e) => e.id === effect);
    const promptText = effectObj?.prompt || customPrompt || "Transform style inside frame.";
    try {
      await realtimeClientRef.current.set({ prompt: { text: promptText }, enhance: true });
    } catch {
      try {
        await realtimeClientRef.current.set({ prompt: promptText, enhance: true });
      } catch (err) {
        console.warn("Prompt update attempt failed:", err);
      }
    }
  }, [effect, customPrompt]);

  useEffect(() => {
    pushPromptToLucy();
  }, [effect, customPrompt, pushPromptToLucy]);

  // Main Render & Landmark Tracking Loop
  useEffect(() => {
    let lastTime = -1;

    const renderLoop = () => {
      animFrameId.current = requestAnimationFrame(renderLoop);

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || video.readyState < 2) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;
      }

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Mirrored background webcam frame
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-w, 0);
      ctx.drawImage(video, 0, 0, w, h);
      ctx.restore();

      // Hand Landmarker
      let detectedQuad: [Point, Point, Point, Point] | null = null;

      if (landmarkerRef.current && video.currentTime !== lastTime) {
        lastTime = video.currentTime;
        try {
          const results = landmarkerRef.current.detectForVideo(video, performance.now());
          if (results && results.landmarks && results.landmarks.length >= 1) {
            const handPoints: Point[] = [];
            results.landmarks.forEach((hand: any) => {
              const thumbTip = hand[4];
              const indexTip = hand[8];
              if (thumbTip && indexTip) {
                handPoints.push({ x: (1 - thumbTip.x) * w, y: thumbTip.y * h });
                handPoints.push({ x: (1 - indexTip.x) * w, y: indexTip.y * h });
              }
            });

            if (handPoints.length >= 4) {
              const sortedByY = [...handPoints].sort((a, b) => a.y - b.y);
              const topTwo = sortedByY.slice(0, 2).sort((a, b) => a.x - b.x);
              const bottomTwo = sortedByY.slice(2, 4).sort((a, b) => b.x - a.x);

              const topLeft = topTwo[0];
              const topRight = topTwo[1];
              const bottomRight = bottomTwo[0];
              const bottomLeft = bottomTwo[1];

              const quadWidth = Math.hypot(topRight.x - topLeft.x, topRight.y - topLeft.y);
              const quadHeight = Math.hypot(bottomLeft.x - topLeft.x, bottomLeft.y - topLeft.y);

              if (quadWidth > 50 && quadHeight > 50) {
                detectedQuad = [topLeft, topRight, bottomRight, bottomLeft];
              }
            }
          }
        } catch (err) {
          // Frame glitch ignore
        }
      }

      // Smooth Quad lerp
      if (detectedQuad) {
        lostFramesRef.current = 0;
        setHandDetected(true);
        if (!cornersRef.current) {
          cornersRef.current = detectedQuad;
        } else {
          const alpha = 0.35;
          cornersRef.current = [
            { x: cornersRef.current[0].x + (detectedQuad[0].x - cornersRef.current[0].x) * alpha, y: cornersRef.current[0].y + (detectedQuad[0].y - cornersRef.current[0].y) * alpha },
            { x: cornersRef.current[1].x + (detectedQuad[1].x - cornersRef.current[1].x) * alpha, y: cornersRef.current[1].y + (detectedQuad[1].y - cornersRef.current[1].y) * alpha },
            { x: cornersRef.current[2].x + (detectedQuad[2].x - cornersRef.current[2].x) * alpha, y: cornersRef.current[2].y + (detectedQuad[2].y - cornersRef.current[2].y) * alpha },
            { x: cornersRef.current[3].x + (detectedQuad[3].x - cornersRef.current[3].x) * alpha, y: cornersRef.current[3].y + (detectedQuad[3].y - cornersRef.current[3].y) * alpha },
          ];
        }
        presenceRef.current = Math.min(1, presenceRef.current + 0.1);
      } else {
        lostFramesRef.current += 1;
        if (lostFramesRef.current > 25) {
          presenceRef.current = Math.max(0, presenceRef.current - 0.08);
          if (presenceRef.current === 0) {
            cornersRef.current = null;
            setHandDetected(false);
          }
        }
      }

      // Render inside finger quad frame
      const quad = cornersRef.current;
      if (quad && presenceRef.current > 0.05) {
        ctx.save();
        ctx.globalAlpha = presenceRef.current;

        ctx.beginPath();
        ctx.moveTo(quad[0].x, quad[0].y);
        ctx.lineTo(quad[1].x, quad[1].y);
        ctx.lineTo(quad[2].x, quad[2].y);
        ctx.lineTo(quad[3].x, quad[3].y);
        ctx.closePath();
        ctx.clip();

        const lucyVid = lucyVidRef.current;
        if (liveMode === "ai" && lucyVid && lucyVid.readyState >= 2) {
          ctx.drawImage(lucyVid, 0, 0, w, h);
        } else {
          drawCanvasEffect(ctx, video, w, h, effect);
        }

        ctx.restore();
        ctx.save();
        ctx.globalAlpha = presenceRef.current;
        ctx.beginPath();
        ctx.moveTo(quad[0].x, quad[0].y);
        ctx.lineTo(quad[1].x, quad[1].y);
        ctx.lineTo(quad[2].x, quad[2].y);
        ctx.lineTo(quad[3].x, quad[3].y);
        ctx.closePath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#10b981";
        ctx.shadowColor = "#10b981";
        ctx.shadowBlur = 15;
        ctx.stroke();

        const cornerColors = ["#ec4899", "#3b82f6", "#8b5cf6", "#10b981"];
        quad.forEach((pt, i) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = cornerColors[i];
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#ffffff";
          ctx.stroke();
        });

        ctx.restore();
      }
    };

    renderLoop();

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [liveMode, effect]);

  // Built-in Canvas Artistic FX
  const drawCanvasEffect = (ctx: CanvasRenderingContext2D, video: HTMLVideoElement, w: number, h: number, effectId: string) => {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-w, 0);

    switch (effectId) {
      case "anime":
        ctx.filter = "contrast(180%) saturate(200%) brightness(110%) hue-rotate(-10deg)";
        ctx.drawImage(video, 0, 0, w, h);
        break;

      case "cyberpunk":
        ctx.filter = "contrast(160%) hue-rotate(180deg) saturate(280%)";
        ctx.drawImage(video, 0, 0, w, h);
        ctx.restore();
        ctx.save();
        ctx.globalCompositeOperation = "color-dodge";
        ctx.fillStyle = "rgba(236, 72, 153, 0.25)";
        ctx.fillRect(0, 0, w, h);
        break;

      case "watercolor":
        ctx.filter = "blur(2px) contrast(140%) saturate(160%) brightness(105%)";
        ctx.drawImage(video, 0, 0, w, h);
        break;

      case "lego":
        ctx.filter = "posterize(4) contrast(150%) saturate(180%)";
        ctx.drawImage(video, 0, 0, w, h);
        break;

      case "movie3d":
      default:
        ctx.filter = "contrast(130%) saturate(150%) brightness(108%)";
        ctx.drawImage(video, 0, 0, w, h);
        ctx.restore();
        ctx.save();
        const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.2, w / 2, h / 2, Math.max(w, h) * 0.7);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.1)");
        grad.addColorStop(1, "rgba(15, 23, 42, 0.4)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        break;
    }
    ctx.restore();
  };

  // Keyboard Shortcuts (1-6, f, k, c, ?)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= MSP_EFFECTS.length) {
        const sel = MSP_EFFECTS[num - 1].id;
        setEffect(sel);
        if (sel === "custom" && !apiKey) {
          setShowKeyPanel(true);
        }
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === "k") {
        setShowKeyPanel((prev) => !prev);
      } else if (e.key.toLowerCase() === "c") {
        toggleCamera();
      } else if (e.key === "?") {
        setShowShortcuts((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [apiKey]);

  const saveKey = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("msp-decart-key", apiKey.trim());
      sessionStorage.setItem("msp-decart-key", apiKey.trim());
      localStorage.setItem("msp-lucy-custom", customPrompt.trim());
    }
    setShowKeyPanel(false);
    if (apiKey.trim() && cameraActive) {
      connectLucyAI();
    }
  };

  const captureSnapshot = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `MSP-Live-Frame-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className={`msp-frame-container ${isFullscreen ? "fullscreen-canvas" : ""}`}
    >
      <video ref={videoRef} playsInline muted style={{ display: "none" }} />
      <video ref={lucyVidRef} playsInline muted style={{ display: "none" }} />

      <canvas ref={canvasRef} className="msp-frame-canvas" />

      {/* Floating Status Pill (Matches sophiamyang live site) */}
      <div className={`msp-live-pill ${statusState} ${cameraActive ? "on" : ""}`}>
        <span className="live-dot" />
        <span className="live-pill-text">
          {statusState === "live" ? "LIVE" : statusText}
        </span>
        {handDetected && <span className="hand-badge">✋ Hands Frame</span>}
      </div>

      {/* Floating Hint Text (Matches sophiamyang live site) */}
      {cameraActive && (
        <div className={`msp-floating-hint ${handDetected ? "hidden" : ""}`}>
          <div id="hint-text">Hold up both hands to frame the scene</div>
        </div>
      )}

      {/* Camera Starter Card (When Camera is off) */}
      {!cameraActive && (
        <div className="msp-camera-starter-overlay">
          <div className="starter-card">
            <div className="starter-icon-wrap">
              <Camera size={36} color="#10b981" />
            </div>
            <h2>MSP Live Frame AI</h2>
            <p style={{ color: "var(--muted)", fontSize: "0.92rem", maxWidth: "420px", margin: "8px auto 20px" }}>
              Hold up both hands and frame a box with your fingers — experience a live AI transformed world inside your hand frame! Created by <strong>Dr. Mritunjay Shall Peelam</strong>.
            </p>
            <button className="btn-sort-primary" onClick={startCamera} style={{ fontSize: "1rem", padding: "12px 28px" }}>
              <Play size={18} /> Launch Live Camera & Hand Frame
            </button>
          </div>
        </div>
      )}

      {/* Camera Error Banner */}
      {cameraError && (
        <div className="msp-alert-banner">
          <AlertCircle size={18} /> {cameraError}
        </div>
      )}

      {/* Bottom Floating Glass Toolbar (Matches sophiamyang live site) */}
      <div className="msp-toolbar-glass">
        <div className="effect-pills-row">
          {MSP_EFFECTS.map((eff, index) => (
            <button
              key={eff.id}
              className={`effect-pill-btn ${effect === eff.id ? "active" : ""}`}
              onClick={() => {
                setEffect(eff.id);
                if (eff.id === "custom" && !apiKey) {
                  setShowKeyPanel(true);
                }
              }}
            >
              <span className="key-number">{index + 1}</span>
              {eff.label}
            </button>
          ))}
        </div>

        <div className="msp-utility-row">
          <button className={`btn-util ${cameraActive ? "active" : ""}`} onClick={toggleCamera} title="Toggle Camera (C)">
            {cameraActive ? <Video size={16} /> : <VideoOff size={16} />}
            <span>{cameraActive ? "Stop Camera" : "Start Camera"}</span>
          </button>

          <button className={`btn-util ${apiKey ? "configured" : ""}`} onClick={() => setShowKeyPanel(true)} title="Decart AI API Key (K)">
            <Key size={16} />
            <span>{apiKey ? "Decart AI Active" : "Decart AI Key"}</span>
          </button>

          <button className="btn-util" onClick={captureSnapshot} title="Download Snapshot">
            <Download size={16} />
            <span>Snapshot</span>
          </button>

          <button className="btn-util" onClick={() => setShowShortcuts(true)} title="Shortcuts (?)">
            <HelpCircle size={16} />
            <span>Shortcuts</span>
          </button>

          <button className="btn-util" onClick={toggleFullscreen} title="Fullscreen (F)">
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Decart Key Drawer Modal */}
      {showKeyPanel && (
        <div className="msp-modal-backdrop" onClick={() => setShowKeyPanel(false)}>
          <div className="msp-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="msp-modal-header">
              <h3><Key size={18} color="#10b981" /> Decart Lucy 2.5 Realtime AI Key</h3>
              <button className="close-btn" onClick={() => setShowKeyPanel(false)}><X size={18} /></button>
            </div>
            <div className="msp-modal-body">
              <p style={{ fontSize: "0.88rem", color: "var(--muted)", marginBottom: "12px" }}>
                Enter your <strong>Decart AI API Key</strong> to enable 30fps Realtime WebRTC video-to-video AI generation inside your hand frame.
              </p>
              <div className="input-group" style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  DECART API KEY
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="decart_sec_..."
                  className="msp-text-input"
                />
              </div>

              <div className="input-group" style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  CUSTOM STYLE PROMPT (OPTIONAL)
                </label>
                <textarea
                  rows={3}
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Change the style of the video to..."
                  className="msp-text-input"
                />
              </div>
            </div>
            <div className="msp-modal-footer">
              <button className="btn-sort-secondary" onClick={() => setShowKeyPanel(false)}>Cancel</button>
              <button className="btn-sort-primary" onClick={saveKey}>Save & Connect AI</button>
            </div>
          </div>
        </div>
      )}

      {/* Shortcuts Modal */}
      {showShortcuts && (
        <div className="msp-modal-backdrop" onClick={() => setShowShortcuts(false)}>
          <div className="msp-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="msp-modal-header">
              <h3><Sparkles size={18} color="#10b981" /> Keyboard Shortcuts</h3>
              <button className="close-btn" onClick={() => setShowShortcuts(false)}><X size={18} /></button>
            </div>
            <div className="msp-modal-body">
              <div className="shortcut-list">
                <div className="shortcut-item"><kbd>1</kbd> - <kbd>6</kbd> <span>Switch Style Effects</span></div>
                <div className="shortcut-item"><kbd>C</kbd> <span>Toggle Webcam On / Off</span></div>
                <div className="shortcut-item"><kbd>K</kbd> <span>Open Decart AI Key Panel</span></div>
                <div className="shortcut-item"><kbd>F</kbd> <span>Toggle Fullscreen Mode</span></div>
                <div className="shortcut-item"><kbd>?</kbd> <span>Toggle Keyboard Shortcuts</span></div>
              </div>
            </div>
            <div className="msp-modal-footer">
              <button className="btn-sort-primary" onClick={() => setShowShortcuts(false)}>Got It</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
