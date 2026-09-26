"use client";

import {
  Activity,
  Camera,
  CameraOff,
  Dumbbell,
  FlipHorizontal2,
  Gauge,
  Maximize2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const TASKS_VISION_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/+esm";
const WASM_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";

type ExerciseMode = "squat" | "pushup" | "posture";
type FacingMode = "user" | "environment";
type MovementPhase = "ready" | "lowering" | "down" | "rising";

type Landmark = {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
};

type PoseResult = {
  landmarks?: Landmark[][];
};

type PoseLandmarkerInstance = {
  detectForVideo: (video: HTMLVideoElement, timestamp: number) => PoseResult;
  close: () => void;
};

type LiveMetrics = {
  primary: number;
  secondary: number;
  score: number;
  confidence: number;
  fps: number;
};

const POSE_CONNECTIONS: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 7],
  [0, 4], [4, 5], [5, 6], [6, 8],
  [9, 10], [11, 12], [11, 13], [13, 15],
  [15, 17], [15, 19], [15, 21], [17, 19],
  [12, 14], [14, 16], [16, 18], [16, 20],
  [16, 22], [18, 20], [11, 23], [12, 24],
  [23, 24], [23, 25], [25, 27], [27, 29],
  [29, 31], [27, 31], [24, 26], [26, 28],
  [28, 30], [30, 32], [28, 32],
];

const EXERCISES: Array<{
  id: ExerciseMode;
  label: string;
  shortLabel: string;
  instruction: string;
}> = [
  {
    id: "squat",
    label: "Squat trainer",
    shortLabel: "Squat",
    instruction: "Stand side-on with your full body visible.",
  },
  {
    id: "pushup",
    label: "Push-up trainer",
    shortLabel: "Push-up",
    instruction: "Place the camera side-on and keep your full body in frame.",
  },
  {
    id: "posture",
    label: "Posture scan",
    shortLabel: "Posture",
    instruction: "Face the camera naturally with both shoulders visible.",
  },
];

const DEFAULT_METRICS: LiveMetrics = {
  primary: 0,
  secondary: 0,
  score: 0,
  confidence: 0,
  fps: 0,
};

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function angle(a: Landmark, b: Landmark, c: Landmark) {
  const ab = Math.atan2(a.y - b.y, a.x - b.x);
  const cb = Math.atan2(c.y - b.y, c.x - b.x);
  let degrees = Math.abs(((ab - cb) * 180) / Math.PI);
  if (degrees > 180) degrees = 360 - degrees;
  return degrees;
}

function lineTilt(a: Landmark, b: Landmark) {
  return Math.abs((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI);
}

function visible(point?: Landmark, threshold = 0.45) {
  return Boolean(point && (point.visibility ?? 1) >= threshold);
}

function chooseSide(points: Landmark[]) {
  const left = [11, 13, 15, 23, 25, 27].reduce(
    (sum, index) => sum + (points[index]?.visibility ?? 0),
    0,
  );
  const right = [12, 14, 16, 24, 26, 28].reduce(
    (sum, index) => sum + (points[index]?.visibility ?? 0),
    0,
  );
  return left >= right
    ? { shoulder: 11, elbow: 13, wrist: 15, hip: 23, knee: 25, ankle: 27 }
    : { shoulder: 12, elbow: 14, wrist: 16, hip: 24, knee: 26, ankle: 28 };
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}

function cameraMessage(error: unknown) {
  const name = error instanceof DOMException ? error.name : "";
  if (name === "NotAllowedError" || name === "SecurityError") {
    return "Camera permission is blocked. Allow access in your browser settings and try again.";
  }
  if (name === "NotFoundError") return "No camera was found on this device.";
  if (name === "NotReadableError") {
    return "The camera is already in use by another application.";
  }
  return "The camera could not start. Check the connection and try again.";
}

export function PostureCoachApp() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const landmarkerRef = useRef<PoseLandmarkerInstance | null>(null);
  const animationRef = useRef<number | null>(null);
  const exerciseRef = useRef<ExerciseMode>("squat");
  const phaseRef = useRef<MovementPhase>("ready");
  const repCountRef = useRef(0);
  const lastUiUpdateRef = useRef(0);
  const lastFrameRef = useRef(0);
  const smoothedPointsRef = useRef<Landmark[] | null>(null);

  const [exercise, setExercise] = useState<ExerciseMode>("squat");
  const [facingMode, setFacingMode] = useState<FacingMode>("user");
  const [modelStatus, setModelStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");
  const [isLive, setIsLive] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(
    "Start the camera and position your full body inside the frame.",
  );
  const [phase, setPhase] = useState<MovementPhase>("ready");
  const [repCount, setRepCount] = useState(0);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [metrics, setMetrics] = useState<LiveMetrics>(DEFAULT_METRICS);

  const resetSession = useCallback(() => {
    repCountRef.current = 0;
    phaseRef.current = "ready";
    smoothedPointsRef.current = null;
    setRepCount(0);
    setPhase("ready");
    setSessionSeconds(0);
    setMetrics(DEFAULT_METRICS);
    setFeedback(
      isLive
        ? EXERCISES.find((item) => item.id === exerciseRef.current)?.instruction ??
            "Move into position."
        : "Start the camera and position your full body inside the frame.",
    );
  }, [isLive]);

  const stopCamera = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsLive(false);
    setIsStarting(false);
    setFeedback("Session ended. Your camera stream has been released.");
  }, []);

  useEffect(() => {
    let active = true;

    async function loadPoseModel() {
      try {
        const module = await new Function("url", "return import(url)")(
          TASKS_VISION_URL,
        );
        const vision = await module.FilesetResolver.forVisionTasks(WASM_URL);
        const landmarker = await module.PoseLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
          runningMode: "VIDEO",
          numPoses: 1,
          minPoseDetectionConfidence: 0.55,
          minPosePresenceConfidence: 0.55,
          minTrackingConfidence: 0.55,
          outputSegmentationMasks: false,
        });

        if (!active) {
          landmarker.close();
          return;
        }
        landmarkerRef.current = landmarker;
        setModelStatus("ready");
      } catch (loadError) {
        console.error("Pose model failed to load", loadError);
        if (active) {
          setModelStatus("error");
          setError(
            "The posture model could not load. Check your internet connection and refresh the page.",
          );
        }
      }
    }

    loadPoseModel();
    return () => {
      active = false;
      landmarkerRef.current?.close();
      landmarkerRef.current = null;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLive) return;
    const timer = window.setInterval(
      () => setSessionSeconds((value) => value + 1),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [isLive]);

  useEffect(() => {
    exerciseRef.current = exercise;
    resetSession();
  }, [exercise, resetSession]);

  const analyze = useCallback((rawPoints: Landmark[], now: number) => {
    const previous = smoothedPointsRef.current;
    const points = rawPoints.map((point, index) => {
      const old = previous?.[index];
      if (!old) return point;
      const weight = 0.68;
      return {
        ...point,
        x: old.x * weight + point.x * (1 - weight),
        y: old.y * weight + point.y * (1 - weight),
        z: (old.z ?? 0) * weight + (point.z ?? 0) * (1 - weight),
      };
    });
    smoothedPointsRef.current = points;

    const required = [11, 12, 23, 24, 25, 26, 27, 28];
    const confidence = clamp(
      (required.reduce(
        (sum, index) => sum + (points[index]?.visibility ?? 0),
        0,
      ) /
        required.length) *
        100,
    );
    const fps = lastFrameRef.current
      ? Math.min(60, 1000 / Math.max(1, now - lastFrameRef.current))
      : 0;
    lastFrameRef.current = now;

    const mode = exerciseRef.current;
    const side = chooseSide(points);
    const allSidePoints = Object.values(side).every((index) =>
      visible(points[index]),
    );

    let primary = 0;
    let secondary = 0;
    let score = 0;
    let message = "Keep your full body visible to begin tracking.";
    let nextPhase = phaseRef.current;

    if (mode === "squat" && allSidePoints) {
      primary = angle(points[side.hip], points[side.knee], points[side.ankle]);
      secondary = angle(
        points[side.shoulder],
        points[side.hip],
        points[side.knee],
      );
      const torsoLean = Math.abs(
        90 - lineTilt(points[side.shoulder], points[side.hip]),
      );
      score = clamp(100 - Math.max(0, torsoLean - 12) * 2.5);

      if (primary < 105) {
        nextPhase = "down";
        message =
          torsoLean > 35
            ? "Lift your chest and keep your spine neutral."
            : "Good depth. Drive through your feet to stand.";
      } else if (phaseRef.current === "down" && primary > 157) {
        repCountRef.current += 1;
        nextPhase = "ready";
        message = "Rep complete. Reset tall before the next descent.";
      } else if (primary < 155) {
        nextPhase = phaseRef.current === "down" ? "rising" : "lowering";
        message =
          torsoLean > 35
            ? "Keep your chest lifted as you lower."
            : "Lower with control—aim for a deeper knee bend.";
      } else {
        nextPhase = "ready";
        message = "Ready. Brace your core and begin the squat.";
      }
    } else if (mode === "pushup" && allSidePoints) {
      primary = angle(
        points[side.shoulder],
        points[side.elbow],
        points[side.wrist],
      );
      secondary = angle(
        points[side.shoulder],
        points[side.hip],
        points[side.ankle],
      );
      score = clamp(100 - Math.abs(180 - secondary) * 2.2);

      if (secondary < 158) {
        message = "Keep shoulders, hips and ankles in one straight line.";
      } else if (primary < 92) {
        nextPhase = "down";
        message = "Good depth. Press evenly away from the floor.";
      } else if (phaseRef.current === "down" && primary > 158) {
        repCountRef.current += 1;
        nextPhase = "ready";
        message = "Rep complete. Maintain a firm plank position.";
      } else if (primary < 155) {
        nextPhase = phaseRef.current === "down" ? "rising" : "lowering";
        message = "Lower with control and keep elbows tracking naturally.";
      } else {
        nextPhase = "ready";
        message = "Ready. Keep your body aligned and begin the push-up.";
      }
    } else if (
      mode === "posture" &&
      [0, 11, 12, 23, 24].every((index) => visible(points[index]))
    ) {
      primary = Math.min(
        lineTilt(points[11], points[12]),
        Math.abs(180 - lineTilt(points[11], points[12])),
      );
      secondary = Math.min(
        lineTilt(points[23], points[24]),
        Math.abs(180 - lineTilt(points[23], points[24])),
      );
      const shoulderCenter = (points[11].x + points[12].x) / 2;
      const headOffset = Math.abs(points[0].x - shoulderCenter);
      score = clamp(100 - primary * 5 - secondary * 4 - headOffset * 180);
      nextPhase = "ready";

      if (headOffset > 0.055) message = "Center your head gently over your shoulders.";
      else if (primary > 5) message = "Relax and level your shoulders.";
      else if (secondary > 5) message = "Balance your weight evenly through both feet.";
      else message = "Balanced posture detected. Breathe naturally and hold.";
    }

    phaseRef.current = nextPhase;
    if (now - lastUiUpdateRef.current > 110) {
      lastUiUpdateRef.current = now;
      setPhase(nextPhase);
      setRepCount(repCountRef.current);
      setFeedback(message);
      setMetrics({ primary, secondary, score, confidence, fps });
    }

    return points;
  }, []);

  const drawPose = useCallback(
    (context: CanvasRenderingContext2D, points: Landmark[], width: number, height: number) => {
      const mode = exerciseRef.current;
      const side = chooseSide(points);
      const active = new Set<number>(
        mode === "squat"
          ? [side.shoulder, side.hip, side.knee, side.ankle]
          : mode === "pushup"
            ? [side.shoulder, side.elbow, side.wrist, side.hip, side.ankle]
            : [0, 11, 12, 23, 24],
      );

      context.save();
      context.lineCap = "round";
      context.lineJoin = "round";
      context.shadowColor = "rgba(34, 211, 238, 0.32)";
      context.shadowBlur = Math.max(5, width * 0.006);

      for (const [from, to] of POSE_CONNECTIONS) {
        const first = points[from];
        const second = points[to];
        if (!visible(first) || !visible(second)) continue;
        const highlighted = active.has(from) && active.has(to);
        context.beginPath();
        context.moveTo(first.x * width, first.y * height);
        context.lineTo(second.x * width, second.y * height);
        context.strokeStyle = highlighted
          ? "rgba(45, 212, 191, 0.98)"
          : "rgba(226, 232, 240, 0.68)";
        context.lineWidth = highlighted
          ? Math.max(4, width * 0.0042)
          : Math.max(2, width * 0.0022);
        context.stroke();
      }

      points.forEach((point, index) => {
        if (!visible(point)) return;
        const highlighted = active.has(index);
        context.beginPath();
        context.arc(
          point.x * width,
          point.y * height,
          highlighted ? Math.max(5, width * 0.006) : Math.max(3, width * 0.0035),
          0,
          Math.PI * 2,
        );
        context.fillStyle = highlighted ? "#5eead4" : "#f8fafc";
        context.fill();
        if (highlighted) {
          context.lineWidth = Math.max(2, width * 0.002);
          context.strokeStyle = "rgba(8, 47, 73, 0.9)";
          context.stroke();
        }
      });
      context.restore();
    },
    [],
  );

  useEffect(() => {
    if (!isLive) return;

    const render = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const landmarker = landmarkerRef.current;
      if (!video || !canvas || !landmarker || video.readyState < 2) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }

      const width = video.videoWidth || 1280;
      const height = video.videoHeight || 720;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      const context = canvas.getContext("2d");
      if (!context) return;

      context.save();
      context.translate(width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, width, height);
      context.restore();

      try {
        const now = performance.now();
        const result = landmarker.detectForVideo(video, now);
        const rawPoints = result.landmarks?.[0];
        if (rawPoints) {
          const points = analyze(rawPoints, now);
          context.save();
          context.translate(width, 0);
          context.scale(-1, 1);
          drawPose(context, points, width, height);
          context.restore();
        } else if (now - lastUiUpdateRef.current > 500) {
          lastUiUpdateRef.current = now;
          setFeedback("No full-body pose detected. Step back and improve the lighting.");
          setMetrics((current) => ({ ...current, confidence: 0 }));
        }
      } catch (detectError) {
        console.error("Pose frame failed", detectError);
      }

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [analyze, drawPose, isLive]);

  const startCamera = useCallback(
    async (requestedFacingMode: FacingMode = facingMode) => {
      if (!landmarkerRef.current || isStarting) return;
      setIsStarting(true);
      setError("");
      streamRef.current?.getTracks().forEach((track) => track.stop());

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: requestedFacingMode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30, max: 60 },
          },
          audio: false,
        });
        streamRef.current = stream;
        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setFacingMode(requestedFacingMode);
        setIsLive(true);
        setIsStarting(false);
        setFeedback(
          EXERCISES.find((item) => item.id === exerciseRef.current)?.instruction ??
            "Move into position.",
        );
      } catch (cameraErrorValue) {
        setError(cameraMessage(cameraErrorValue));
        setIsStarting(false);
        setIsLive(false);
      }
    },
    [facingMode, isStarting],
  );

  const switchCamera = async () => {
    const next: FacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(next);
    if (isLive) await startCamera(next);
  };

  const toggleFullscreen = async () => {
    if (!stageRef.current) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await stageRef.current.requestFullscreen();
  };

  const currentExercise =
    EXERCISES.find((item) => item.id === exercise) ?? EXERCISES[0];
  const primaryLabel =
    exercise === "squat"
      ? "Knee angle"
      : exercise === "pushup"
        ? "Elbow angle"
        : "Shoulder tilt";
  const secondaryLabel =
    exercise === "squat"
      ? "Hip angle"
      : exercise === "pushup"
        ? "Body line"
        : "Hip tilt";

  return (
    <section className="pc-page">
      <div className="pc-shell">
        <header className="pc-hero">
          <div>
            <div className="pc-eyebrow">
              <span className="pc-live-dot" /> On-device movement intelligence
            </div>
            <h1>Posture Coach</h1>
            <p>
              Real-time form guidance, joint-angle analysis and repetition tracking—
              processed privately in your browser.
            </p>
          </div>
          <div className="pc-privacy-pill">
            <ShieldCheck size={18} />
            <span>
              <strong>Private by design</strong>
              Video is never uploaded
            </span>
          </div>
        </header>

        <div className="pc-mode-bar" aria-label="Choose training mode">
          {EXERCISES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={exercise === item.id ? "active" : ""}
              onClick={() => setExercise(item.id)}
              aria-pressed={exercise === item.id}
            >
              {item.id === "posture" ? <Activity size={17} /> : <Dumbbell size={17} />}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="pc-workspace">
          <div className="pc-stage-column">
            <div ref={stageRef} className={`pc-camera-stage ${isLive ? "is-live" : ""}`}>
              <video ref={videoRef} playsInline muted className="pc-source-video" />
              <canvas ref={canvasRef} className="pc-pose-canvas" />

              {!isLive && (
                <div className="pc-camera-empty">
                  <div className="pc-camera-mark">
                    {modelStatus === "loading" ? (
                      <RefreshCw size={34} className="pc-spin" />
                    ) : (
                      <Camera size={38} />
                    )}
                  </div>
                  <h2>
                    {modelStatus === "loading"
                      ? "Preparing the movement engine"
                      : "Your training space is ready"}
                  </h2>
                  <p>
                    {modelStatus === "loading"
                      ? "Loading the secure on-device pose model…"
                      : currentExercise.instruction}
                  </p>
                  <button
                    type="button"
                    className="pc-primary-button"
                    onClick={() => startCamera()}
                    disabled={modelStatus !== "ready" || isStarting}
                  >
                    {isStarting ? <RefreshCw size={18} className="pc-spin" /> : <Camera size={18} />}
                    {isStarting ? "Starting camera…" : "Start camera"}
                  </button>
                </div>
              )}

              {isLive && (
                <>
                  <div className="pc-stage-status">
                    <span className="pc-record-dot" /> Live analysis
                  </div>
                  <div className="pc-stage-mode">{currentExercise.shortLabel}</div>
                  <div className="pc-stage-tools">
                    <button type="button" onClick={switchCamera} aria-label="Switch camera">
                      <FlipHorizontal2 size={18} />
                    </button>
                    <button type="button" onClick={toggleFullscreen} aria-label="Enter fullscreen">
                      <Maximize2 size={18} />
                    </button>
                  </div>
                  {exercise !== "posture" && (
                    <div className="pc-rep-overlay">
                      <strong>{repCount}</strong>
                      <span>reps</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {error && <div className="pc-error" role="alert">{error}</div>}

            <div className="pc-coach-strip" aria-live="polite">
              <div className="pc-coach-icon"><Sparkles size={18} /></div>
              <div>
                <span>Coach cue</span>
                <strong>{feedback}</strong>
              </div>
              <div className={`pc-phase pc-phase-${phase}`}>{phase}</div>
            </div>

            <div className="pc-session-actions">
              {isLive ? (
                <button type="button" className="pc-stop-button" onClick={stopCamera}>
                  <CameraOff size={18} /> End session
                </button>
              ) : (
                <button
                  type="button"
                  className="pc-primary-button pc-inline-start"
                  onClick={() => startCamera()}
                  disabled={modelStatus !== "ready" || isStarting}
                >
                  <Camera size={18} /> Start camera
                </button>
              )}
              <button type="button" className="pc-secondary-button" onClick={resetSession}>
                <RefreshCw size={17} /> Reset session
              </button>
            </div>
          </div>

          <aside className="pc-insights" aria-label="Live exercise insights">
            <div className="pc-insight-header">
              <div>
                <span>Session overview</span>
                <h2>Live performance</h2>
              </div>
              <div className={`pc-tracking-state ${metrics.confidence > 45 ? "tracking" : ""}`}>
                {metrics.confidence > 45 ? "Tracking" : "Waiting"}
              </div>
            </div>

            <div className="pc-score-panel">
              <div
                className="pc-score-ring"
                style={{ "--pc-score": `${Math.round(metrics.score) * 3.6}deg` } as React.CSSProperties}
              >
                <div><strong>{Math.round(metrics.score)}</strong><span>/100</span></div>
              </div>
              <div>
                <span>Form quality</span>
                <strong>
                  {metrics.score >= 85
                    ? "Excellent alignment"
                    : metrics.score >= 65
                      ? "Good—keep refining"
                      : metrics.confidence > 0
                        ? "Follow the coach cue"
                        : "Awaiting movement"}
                </strong>
              </div>
            </div>

            <div className="pc-metric-grid">
              <div className="pc-metric-card">
                <Target size={18} />
                <span>{primaryLabel}</span>
                <strong>{metrics.primary ? `${Math.round(metrics.primary)}°` : "—"}</strong>
              </div>
              <div className="pc-metric-card">
                <Activity size={18} />
                <span>{secondaryLabel}</span>
                <strong>{metrics.secondary ? `${Math.round(metrics.secondary)}°` : "—"}</strong>
              </div>
              <div className="pc-metric-card">
                <Timer size={18} />
                <span>Session</span>
                <strong>{formatTime(sessionSeconds)}</strong>
              </div>
              <div className="pc-metric-card">
                <Gauge size={18} />
                <span>Tracking</span>
                <strong>{metrics.confidence ? `${Math.round(metrics.confidence)}%` : "—"}</strong>
              </div>
            </div>

            <div className="pc-rep-card">
              <div>
                <span>{exercise === "posture" ? "Current mode" : "Completed repetitions"}</span>
                <strong>{exercise === "posture" ? "Alignment scan" : repCount}</strong>
              </div>
              <div className="pc-rep-icon"><Dumbbell size={22} /></div>
            </div>

            <div className="pc-setup-card">
              <h3>Camera setup</h3>
              <ol>
                <li><span>1</span>Keep your entire body inside the frame.</li>
                <li><span>2</span>Use even front lighting and a stable camera.</li>
                <li><span>3</span>Leave enough room to move safely.</li>
              </ol>
            </div>

            <p className="pc-disclaimer">
              Movement feedback is educational and is not medical advice. Stop if you feel pain or discomfort.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
