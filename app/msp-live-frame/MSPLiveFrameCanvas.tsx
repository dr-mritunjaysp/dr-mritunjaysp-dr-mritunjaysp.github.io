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
  Zap,
  Sliders,
  Cpu,
  Layers,
  CheckCircle2,
  Flame,
  Wand2,
} from "lucide-react";

const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const MODEL_URL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
const DECART_SDK_URL = "https://esm.sh/@decartai/sdk@0.1.17";

export interface EffectItem {
  id: string;
  label: string;
  badge: string;
  iconName: string;
  prompt: string | null;
  description: string;
}

export const MSP_EFFECTS: EffectItem[] = [
  {
    id: "movie3d",
    label: "3D Movie",
    badge: "CGI AI",
    iconName: "Wand2",
    prompt:
      "Change the style of the video to a 3D animated movie: stylized CGI animation, the person as an animated character with expressive big eyes and smooth skin, soft cinematic lighting.",
    description: "Stylized CGI movie character with warm cinematic lighting",
  },
  {
    id: "anime",
    label: "Anime",
    badge: "Cel Shaded",
    iconName: "Sparkles",
    prompt:
      "Change the style of the video to hand-drawn anime: clean black line art, flat cel shading, vibrant colors, large expressive eyes.",
    description: "Hand-drawn line art and vibrant cel-shaded Japanese anime",
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    badge: "Neon 2077",
    iconName: "Zap",
    prompt:
      "Change the style of the video to neon cyberpunk: glowing pink and cyan neon light on the person and walls, rain-slick reflective surfaces, holographic signs in the background.",
    description: "Neon cyan & magenta lighting with futuristic holographic reflections",
  },
  {
    id: "watercolor",
    label: "Watercolor",
    badge: "Impressionist",
    iconName: "Layers",
    prompt:
      "Change the style of the video to a watercolor painting: soft loose brushstrokes, gentle color bleeds, visible paper texture, muted pastel palette.",
    description: "Soft fluid brushstrokes with subtle watercolor paper canvas texture",
  },
  {
    id: "lego",
    label: "LEGO",
    badge: "Stop Motion",
    iconName: "Flame",
    prompt:
      "Change the style of the video to a LEGO stop-motion animation: the person is a yellow LEGO minifigure with a cylindrical head, painted face, and claw hands, and the room is built entirely from glossy plastic LEGO bricks with visible round studs on every surface.",
    description: "Yellow LEGO minifigure and plastic stud brick architecture",
  },
  {
    id: "matrix",
    label: "Matrix Rain",
    badge: "Cyber HUD",
    iconName: "Cpu",
    prompt:
      "Change the style of the video to a futuristic Matrix computer code simulation: glowing green digital characters cascading down the screen, cyberpunk terminal HUD overlay, high-contrast dark green aesthetics.",
    description: "Digital green code rain with futuristic cyberpunk terminal overlay",
  },
  {
    id: "thermal",
    label: "Thermal IR",
    badge: "Heatmap",
    iconName: "Zap",
    prompt:
      "Change the style of the video to a thermal infrared camera heatmap: vibrant rainbow heat signature colors ranging from deep blue cold tones to glowing yellow and red high-temperature highlights.",
    description: "Infrared thermal vision spectrum with vibrant heat signature highlights",
  },
  {
    id: "comic",
    label: "Comic Pop Art",
    badge: "Vintage",
    iconName: "Sparkles",
    prompt:
      "Change the style of the video to a vintage superhero comic book illustration: bold thick black ink outlines, dotted halftone print texture, bright primary pop art colors.",
    description: "Bold black ink outlines with vintage pop art halftone dot textures",
  },
  {
    id: "oil",
    label: "Oil Painting",
    badge: "Renaissance",
    iconName: "Layers",
    prompt:
      "Change the style of the video to a classic Renaissance oil painting: thick textured impasto oil brushstrokes, rich warm amber lighting, dramatic chiaroscuro shadows.",
    description: "Textured impasto oil brushstrokes with warm amber Renaissance lighting",
  },
  {
    id: "custom",
    label: "Custom ✨",
    badge: "User Pro",
    iconName: "Sliders",
    prompt: null,
    description: "Write your own custom Decart Lucy 2.5 realtime prompt",
  },
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
  const [statusText, setStatusText] = useState<string>("Initializing MediaPipe Vision Model...");
  const [liveMode, setLiveMode] = useState<"ai" | "canvas">("canvas");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [handDetected, setHandDetected] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(30);

  const landmarkerRef = useRef<any>(null);
  const realtimeClientRef = useRef<any>(null);
  const animFrameId = useRef<number | null>(null);

  // Quad tracking state with lerp & hysteresis
  const cornersRef = useRef<[Point, Point, Point, Point] | null>(null);
  const presenceRef = useRef<number>(0);
  const lostFramesRef = useRef<number>(0);

  // Load saved API Key & prompt
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

  // Initialize MediaPipe Hand Landmarker
  useEffect(() => {
    let active = true;

    async function initMediaPipe() {
      try {
        setStatusState("loading");
        setStatusText("Initializing MediaPipe WASM...");
        const { HandLandmarker, FilesetResolver } = await new Function(
          "u",
          "return import(u)"
        )("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/+esm");

        const vision = await FilesetResolver.forVisionTasks(WASM_URL);

        if (!active) return;

        setStatusText("Loading Hand Landmarker GPU Model...");
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
        setStatusText("Camera Ready — Frame your hands!");
      } catch (err: any) {
        console.error("MediaPipe load error:", err);
        if (active) {
          setStatusState("error");
          setStatusText(`Canvas FX Engine Active (${err.message || "WASM fallback"})`);
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
        setStatusText(apiKey ? "Connecting Decart Lucy 2.5 WebRTC..." : "Camera Active — Make a finger frame!");
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError(err.message || "Unable to access camera. Check browser permissions.");
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

  // Connect Decart Lucy 2.5 Realtime AI
  const connectLucyAI = useCallback(async () => {
    if (!apiKey.trim() || !videoRef.current || !videoRef.current.srcObject) return;

    try {
      setStatusState("connecting");
      setStatusText("CONNECTING TO DECART LUCY 2.5…");

      const { createDecartClient, models } = await import(/* webpackIgnore: true */ DECART_SDK_URL);
      const model = models.realtime("lucy-2.5");
      const client = createDecartClient({ apiKey: apiKey.trim() });

      const effectObj = MSP_EFFECTS.find((e) => e.id === effect);
      const promptText = effectObj?.prompt || customPrompt || "Transform the video style inside the hand frame.";

      const realtimeClient = await client.realtime.connect(videoRef.current.srcObject, {
        model,
        initialState: { prompt: { text: promptText, enhance: true } },
        onRemoteStream: (remoteStream: MediaStream) => {
          if (lucyVidRef.current) {
            lucyVidRef.current.srcObject = remoteStream;
            lucyVidRef.current.play().catch(() => {});
            setStatusState("live");
            setStatusText("LIVE AI — 30 FPS");
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
        console.warn("Prompt update error:", err);
      }
    }
  }, [effect, customPrompt]);

  useEffect(() => {
    pushPromptToLucy();
  }, [effect, customPrompt, pushPromptToLucy]);

  // FPS Counter & Render Loop
  useEffect(() => {
    let lastTime = -1;
    let frameCount = 0;
    let lastFpsCalc = performance.now();

    const renderLoop = () => {
      animFrameId.current = requestAnimationFrame(renderLoop);

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || video.readyState < 2) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Calculate FPS
      frameCount++;
      const now = performance.now();
      if (now - lastFpsCalc >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsCalc)));
        frameCount = 0;
        lastFpsCalc = now;
      }

      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;
      }

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Mirrored video background
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-w, 0);
      ctx.drawImage(video, 0, 0, w, h);
      ctx.restore();

      // Hand Landmarker Detection
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
          // Ignore transient detection glitch
        }
      }

      // Lerp Quad smoothing
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

      // Render inside framed quad
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

        // Glowing Quad Border
        ctx.beginPath();
        ctx.moveTo(quad[0].x, quad[0].y);
        ctx.lineTo(quad[1].x, quad[1].y);
        ctx.lineTo(quad[2].x, quad[2].y);
        ctx.lineTo(quad[3].x, quad[3].y);
        ctx.closePath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#10b981";
        ctx.shadowColor = "#10b981";
        ctx.shadowBlur = 18;
        ctx.stroke();

        // Corner target markers
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

  // Built-in GPU Canvas FX Engine
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
        ctx.filter = "contrast(150%) saturate(180%)";
        ctx.drawImage(video, 0, 0, w, h);
        break;

      case "matrix":
        ctx.filter = "contrast(220%) hue-rotate(90deg) saturate(320%) brightness(90%)";
        ctx.drawImage(video, 0, 0, w, h);
        ctx.restore();
        ctx.save();
        ctx.globalCompositeOperation = "color-dodge";
        ctx.fillStyle = "rgba(16, 185, 129, 0.35)";
        ctx.fillRect(0, 0, w, h);
        break;

      case "thermal":
        ctx.filter = "invert(100%) hue-rotate(180deg) saturate(450%) contrast(160%)";
        ctx.drawImage(video, 0, 0, w, h);
        break;

      case "comic":
        ctx.filter = "contrast(260%) saturate(220%) brightness(105%)";
        ctx.drawImage(video, 0, 0, w, h);
        break;

      case "oil":
        ctx.filter = "sepia(35%) contrast(145%) saturate(180%) brightness(105%)";
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

  // Fullscreen sync
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`msp-pro-stage ${isFullscreen ? "fullscreen-canvas" : ""}`}
    >
      <video ref={videoRef} playsInline muted style={{ display: "none" }} />
      <video ref={lucyVidRef} playsInline muted style={{ display: "none" }} />

      <canvas ref={canvasRef} className="msp-pro-canvas" />

      {/* Pro Telemetry Floating Dock (Top Left) */}
      <div className={`msp-pro-telemetry ${statusState} ${cameraActive ? "on" : ""}`}>
        <div className="telemetry-badge">
          <span className="live-pulse-dot" />
          <span className="telemetry-text">{statusState === "live" ? "LIVE AI STUDIO" : statusText}</span>
        </div>
        {cameraActive && (
          <div className="telemetry-sub">
            <span className="fps-pill">{fps} FPS</span>
            {handDetected ? (
              <span className="hand-active-tag"><CheckCircle2 size={12} /> ✋ Frame Lock</span>
            ) : (
              <span className="hand-searching-tag">Searching Hands</span>
            )}
          </div>
        )}
      </div>

      {/* Pro Quick Controls (Top Right) */}
      <div className="msp-top-actions">
        <button
          className={`pro-action-btn ${cameraActive ? "active" : ""}`}
          onClick={toggleCamera}
          title="Toggle Camera (C)"
        >
          {cameraActive ? <Video size={16} /> : <VideoOff size={16} />}
        </button>
        <button
          className={`pro-action-btn ${apiKey ? "configured" : ""}`}
          onClick={() => setShowKeyPanel(true)}
          title="Decart AI API Key (K)"
        >
          <Key size={16} />
        </button>
        <button className="pro-action-btn" onClick={captureSnapshot} title="Capture Snapshot">
          <Download size={16} />
        </button>
        <button className="pro-action-btn" onClick={toggleFullscreen} title="Fullscreen (F)">
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {/* Pro Floating Gesture Hint Banner */}
      {cameraActive && (
        <div className={`msp-pro-floating-hint ${handDetected ? "hidden" : ""}`}>
          <div className="hint-pill">
            <Sparkles size={16} color="#10b981" className="hint-icon" />
            <span>Hold up both hands to frame the scene</span>
          </div>
        </div>
      )}

      {/* Pro Camera Starter Hero (When camera is stopped) */}
      {!cameraActive && (
        <div className="msp-pro-starter-hero">
          <div className="pro-starter-card">
            <div className="starter-glow-halo" />
            <div className="starter-icon-ring">
              <Camera size={40} color="#10b981" />
            </div>
            <h1 className="pro-hero-title">MSP Live Frame AI</h1>
            <p className="pro-hero-sub">
              Real-time video-to-video AI world transformation framed directly inside your hands gesture box. Created by <strong>Dr. Mritunjay Shall Peelam</strong>.
            </p>
            <div className="starter-features-row">
              <span className="mini-feature-tag"><Cpu size={12} /> MediaPipe Vision</span>
              <span className="mini-feature-tag"><Zap size={12} /> Decart Lucy 2.5</span>
              <span className="mini-feature-tag"><Layers size={12} /> 30 FPS Realtime</span>
            </div>
            <button className="pro-launch-btn" onClick={startCamera}>
              <Play size={18} /> Launch Live AI Studio
            </button>
          </div>
        </div>
      )}

      {/* Camera Error Banner */}
      {cameraError && (
        <div className="msp-pro-error-banner">
          <AlertCircle size={18} /> {cameraError}
        </div>
      )}

      {/* Pro Floating Style Dock (Bottom Centered) */}
      <div className="msp-pro-dock">
        <div className="dock-effects-row">
          {MSP_EFFECTS.map((eff) => (
            <button
              key={eff.id}
              className={`pro-dock-card ${effect === eff.id ? "active" : ""}`}
              onClick={() => {
                setEffect(eff.id);
                if (eff.id === "custom" && !apiKey) {
                  setShowKeyPanel(true);
                }
              }}
            >
              <span className="dock-card-label">{eff.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Decart API Key Modal Drawer */}
      {showKeyPanel && (
        <div className="msp-modal-backdrop" onClick={() => setShowKeyPanel(false)}>
          <div className="msp-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="msp-modal-header">
              <h3><Key size={18} color="#10b981" /> Decart Lucy 2.5 Realtime AI Key</h3>
              <button className="close-btn" onClick={() => setShowKeyPanel(false)}><X size={18} /></button>
            </div>
            <div className="msp-modal-body">
              <p style={{ fontSize: "0.88rem", color: "var(--muted)", marginBottom: "16px", lineHeight: "1.6" }}>
                Enter your <strong>Decart AI API Key</strong> to activate 30fps Realtime WebRTC video-to-video AI rendering inside your hand frame.
              </p>
              <div className="input-group" style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, display: "block", marginBottom: "6px" }}>
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
                <label style={{ fontSize: "0.78rem", fontWeight: 700, display: "block", marginBottom: "6px" }}>
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
    </div>
  );
}
