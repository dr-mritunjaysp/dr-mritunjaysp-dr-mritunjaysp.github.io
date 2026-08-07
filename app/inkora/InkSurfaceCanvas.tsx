"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Pen,
  Eraser,
  Highlighter,
  Zap,
  Square,
  Circle,
  ArrowUpRight,
  Minus,
  Type,
  RotateCcw,
  RotateCw,
  Trash2,
  Download,
  Maximize2,
  Minimize2,
  Sparkles,
  HelpCircle,
  Check,
  X,
} from "lucide-react";

export type InkTool =
  | "pen"
  | "laser"
  | "highlighter"
  | "eraser"
  | "line"
  | "arrow"
  | "rectangle"
  | "circle"
  | "text";

export type CanvasMode = "whiteboard" | "blackboard" | "overlay";

interface Point {
  x: number;
  y: number;
  pressure?: number;
}

interface LaserPoint {
  x: number;
  y: number;
  time: number;
}

interface Stroke {
  id: string;
  tool: InkTool;
  color: string;
  size: number;
  points: Point[];
  text?: string;
}

export function InkSurfaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tool, setTool] = useState<InkTool>("pen");
  const [color, setColor] = useState("#10b981");
  const [size, setSize] = useState(4);
  const [canvasMode, setCanvasMode] = useState<CanvasMode>("whiteboard");
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [textInput, setTextInput] = useState("");
  const [textPos, setTextPos] = useState<Point | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Dynamic laser pointer trail & dot refs (fades out automatically)
  const laserPointsRef = useRef<LaserPoint[]>([]);
  const laserDotRef = useRef<Point | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Canvas background colors
  const getBgColor = useCallback(() => {
    if (canvasMode === "whiteboard") return "#ffffff";
    if (canvasMode === "blackboard") return "#0f172a";
    return "rgba(15, 23, 42, 0.85)"; // Glass Overlay Mode
  }, [canvasMode]);

  // Main canvas render function
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw background
    ctx.fillStyle = getBgColor();
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Grid pattern for whiteboard / blackboard
    if (canvasMode !== "overlay") {
      ctx.strokeStyle =
        canvasMode === "whiteboard"
          ? "rgba(0, 0, 0, 0.04)"
          : "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < rect.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
        ctx.stroke();
      }
      for (let y = 0; y < rect.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }
    }

    // Render saved strokes
    strokes.forEach((s) => renderStroke(ctx, s));

    // Render current active stroke in progress (non-laser)
    if (isDrawing && currentStroke.length > 0 && tool !== "laser") {
      renderStroke(ctx, {
        id: "temp",
        tool,
        color,
        size,
        points: currentStroke,
      });
    }

    // Render smooth presentation Laser Pointer & Fading Trail
    const now = Date.now();
    const laserDuration = 800; // Trail fades over 800ms

    // Filter out expired laser points
    laserPointsRef.current = laserPointsRef.current.filter(
      (pt) => now - pt.time < laserDuration
    );

    const laserPts = laserPointsRef.current;
    if (laserPts.length > 1) {
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "#ef4444";
      ctx.shadowBlur = 14;

      for (let i = 1; i < laserPts.length; i++) {
        const p1 = laserPts[i - 1];
        const p2 = laserPts[i];
        const age = now - p2.time;
        const alpha = Math.max(0, 1 - age / laserDuration);

        ctx.beginPath();
        ctx.globalAlpha = alpha * 0.85;
        ctx.strokeStyle = "#ff3333";
        ctx.lineWidth = Math.max(2, size * 2) * alpha;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Render glowing red Laser Pointer Dot at current pointer position
    if (tool === "laser" && laserDotRef.current) {
      const { x, y } = laserDotRef.current;
      ctx.save();
      
      // Outer glowing halo
      const grad = ctx.createRadialGradient(x, y, 2, x, y, 16);
      grad.addColorStop(0, "rgba(239, 68, 68, 0.9)");
      grad.addColorStop(0.5, "rgba(239, 68, 68, 0.4)");
      grad.addColorStop(1, "rgba(239, 68, 68, 0)");
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();

      // Middle bright red dot
      ctx.fillStyle = "#ef4444";
      ctx.shadowColor = "#ef4444";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();

      // Core white spot
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  }, [getBgColor, strokes, isDrawing, currentStroke, tool, color, size, canvasMode]);

  // Animation Loop for Laser Pointer smooth fade
  useEffect(() => {
    let animId: number;

    const loop = () => {
      renderCanvas();
      // If laser tool active or trail fading, keep looping
      if (tool === "laser" || laserPointsRef.current.length > 0) {
        animId = requestAnimationFrame(loop);
      }
    };

    animId = requestAnimationFrame(loop);
    animFrameRef.current = animId;

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [renderCanvas, tool]);

  // Stroke Rendering
  const renderStroke = (ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    if (stroke.points.length === 0) return;

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (stroke.tool === "highlighter") {
      ctx.globalAlpha = 0.45;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size * 3;
    } else if (stroke.tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = stroke.size * 4;
    } else {
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
    }

    const pts = stroke.points;

    if (stroke.tool === "line" && pts.length >= 2) {
      const p1 = pts[0];
      const p2 = pts[pts.length - 1];
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    } else if (stroke.tool === "arrow" && pts.length >= 2) {
      const p1 = pts[0];
      const p2 = pts[pts.length - 1];
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      const headLen = stroke.size * 3;
      ctx.beginPath();
      ctx.moveTo(p2.x, p2.y);
      ctx.lineTo(
        p2.x - headLen * Math.cos(angle - Math.PI / 6),
        p2.y - headLen * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(p2.x, p2.y);
      ctx.lineTo(
        p2.x - headLen * Math.cos(angle + Math.PI / 6),
        p2.y - headLen * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    } else if (stroke.tool === "rectangle" && pts.length >= 2) {
      const p1 = pts[0];
      const p2 = pts[pts.length - 1];
      ctx.strokeRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    } else if (stroke.tool === "circle" && pts.length >= 2) {
      const p1 = pts[0];
      const p2 = pts[pts.length - 1];
      const radius = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (stroke.tool === "text" && stroke.text) {
      ctx.font = `${Math.max(14, stroke.size * 4)}px sans-serif`;
      ctx.fillStyle = stroke.color;
      ctx.fillText(stroke.text, pts[0].x, pts[0].y);
    } else {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);

      if (pts.length < 3) {
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
      } else {
        for (let i = 1; i < pts.length - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
      }
      ctx.stroke();
    }

    ctx.restore();
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pt = getCanvasCoords(e);
    if (tool === "text") {
      setTextPos(pt);
      return;
    }
    setIsDrawing(true);

    if (tool === "laser") {
      laserDotRef.current = pt;
      laserPointsRef.current.push({ x: pt.x, y: pt.y, time: Date.now() });
    } else {
      setCurrentStroke([pt]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pt = getCanvasCoords(e);

    if (tool === "laser") {
      laserDotRef.current = pt;
      // Laser leaves a trailing laser line while mouse moves or holds down
      laserPointsRef.current.push({ x: pt.x, y: pt.y, time: Date.now() });
      renderCanvas();
      return;
    }

    if (!isDrawing) return;
    setCurrentStroke((prev) => [...prev, pt]);
  };

  const handleMouseUp = () => {
    if (tool === "laser") {
      setIsDrawing(false);
      return;
    }

    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentStroke.length > 0) {
      const newStroke: Stroke = {
        id: Date.now().toString(),
        tool,
        color,
        size,
        points: currentStroke,
      };
      setStrokes((prev) => [...prev, newStroke]);
      setRedoStack([]);
    }
    setCurrentStroke([]);
  };

  const handleMouseLeave = () => {
    laserDotRef.current = null;
    if (isDrawing && tool !== "laser") {
      handleMouseUp();
    }
  };

  const handleAddText = () => {
    if (!textPos || !textInput.trim()) {
      setTextPos(null);
      setTextInput("");
      return;
    }
    const newStroke: Stroke = {
      id: Date.now().toString(),
      tool: "text",
      color,
      size,
      points: [textPos],
      text: textInput,
    };
    setStrokes((prev) => [...prev, newStroke]);
    setTextPos(null);
    setTextInput("");
  };

  const handleUndo = () => {
    if (strokes.length === 0) return;
    const last = strokes[strokes.length - 1];
    setStrokes((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, last]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setStrokes((prev) => [...prev, next]);
  };

  const handleClear = () => {
    setStrokes([]);
    setRedoStack([]);
    laserPointsRef.current = [];
  };

  const exportAsImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `inkora-annotation-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className={`inkora-canvas-card ${isFullscreen ? "fullscreen-canvas" : ""}`}>
      {/* Floating Glass Control Toolbar */}
      <div className="inkora-toolbar-glass">
        <div className="toolbar-section">
          <button
            className={`ink-tool-btn ${tool === "pen" ? "active" : ""}`}
            onClick={() => setTool("pen")}
            title="Pen (Ctrl+Alt+P)"
          >
            <Pen size={16} />
            <span>Pen</span>
          </button>

          <button
            className={`ink-tool-btn ${tool === "laser" ? "active" : ""}`}
            onClick={() => setTool("laser")}
            title="Presentation Laser Pointer (Fading Trail)"
          >
            <Zap size={16} color="#ef4444" />
            <span>Laser</span>
          </button>

          <button
            className={`ink-tool-btn ${tool === "highlighter" ? "active" : ""}`}
            onClick={() => setTool("highlighter")}
            title="Highlighter (Ctrl+Alt+H)"
          >
            <Highlighter size={16} color="#f59e0b" />
            <span>Highlight</span>
          </button>

          <button
            className={`ink-tool-btn ${tool === "eraser" ? "active" : ""}`}
            onClick={() => setTool("eraser")}
            title="Eraser (Ctrl+Alt+E)"
          >
            <Eraser size={16} />
            <span>Eraser</span>
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Shapes & Text */}
        <div className="toolbar-section">
          <button
            className={`ink-tool-btn ${tool === "line" ? "active" : ""}`}
            onClick={() => setTool("line")}
            title="Line (Ctrl+Alt+L)"
          >
            <Minus size={16} />
          </button>
          <button
            className={`ink-tool-btn ${tool === "arrow" ? "active" : ""}`}
            onClick={() => setTool("arrow")}
            title="Arrow (Ctrl+Alt+A)"
          >
            <ArrowUpRight size={16} />
          </button>
          <button
            className={`ink-tool-btn ${tool === "rectangle" ? "active" : ""}`}
            onClick={() => setTool("rectangle")}
            title="Rectangle (Ctrl+Alt+R)"
          >
            <Square size={16} />
          </button>
          <button
            className={`ink-tool-btn ${tool === "circle" ? "active" : ""}`}
            onClick={() => setTool("circle")}
            title="Circle (Ctrl+Alt+C)"
          >
            <Circle size={16} />
          </button>
          <button
            className={`ink-tool-btn ${tool === "text" ? "active" : ""}`}
            onClick={() => setTool("text")}
            title="Text Note (Ctrl+Alt+T)"
          >
            <Type size={16} />
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Color Palette & Stroke Width */}
        <div className="toolbar-section">
          <div className="color-swatches-wrap">
            {["#10b981", "#3b82f6", "#ef4444", "#f59e0b", "#a855f7", "#ec4899", "#ffffff", "#000000"].map(
              (c) => (
                <button
                  key={c}
                  className={`color-swatch-dot ${color === c ? "selected" : ""}`}
                  style={{ background: c }}
                  onClick={() => setColor(c)}
                />
              )
            )}
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="color-custom-picker"
              title="Custom stroke color"
            />
          </div>

          <div className="size-slider-wrap">
            <span className="size-preview-dot" style={{ width: Math.max(4, size), height: Math.max(4, size), background: color }} />
            <input
              type="range"
              min={1}
              max={28}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="ink-slider"
              title={`Stroke Size: ${size}px`}
            />
          </div>
        </div>

        <div className="toolbar-divider" />

        {/* Background Mode Swapper */}
        <div className="toolbar-section">
          <button
            className={`mode-pill-btn ${canvasMode === "whiteboard" ? "active" : ""}`}
            onClick={() => setCanvasMode("whiteboard")}
            title="Whiteboard Canvas (Ctrl+Alt+W)"
          >
            Whiteboard
          </button>
          <button
            className={`mode-pill-btn ${canvasMode === "blackboard" ? "active" : ""}`}
            onClick={() => setCanvasMode("blackboard")}
            title="Blackboard Canvas (Ctrl+Alt+B)"
          >
            Blackboard
          </button>
          <button
            className={`mode-pill-btn ${canvasMode === "overlay" ? "active" : ""}`}
            onClick={() => setCanvasMode("overlay")}
            title="Transparent Multi-Monitor Glass Overlay (Ctrl+Alt+O)"
          >
            Glass Overlay
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Canvas History & Actions */}
        <div className="toolbar-section">
          <button
            className="action-icon-btn"
            onClick={handleUndo}
            disabled={strokes.length === 0}
            title="Undo (Ctrl+Alt+Z)"
          >
            <RotateCcw size={15} />
          </button>
          <button
            className="action-icon-btn"
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            title="Redo (Ctrl+Alt+Y)"
          >
            <RotateCw size={15} />
          </button>
          <button
            className="action-icon-btn danger"
            onClick={handleClear}
            disabled={strokes.length === 0}
            title="Clear Canvas (Ctrl+Alt+X)"
          >
            <Trash2 size={15} />
          </button>
          <button
            className="action-icon-btn primary"
            onClick={exportAsImage}
            title="Export Canvas PNG (Ctrl+Alt+S)"
          >
            <Download size={15} />
          </button>
          <button
            className="action-icon-btn"
            onClick={() => setShowShortcuts(!showShortcuts)}
            title="Desktop Shortcut Keys"
          >
            <HelpCircle size={15} />
          </button>
          <button
            className="action-icon-btn"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Canvas Mode"}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>

      {/* Main Canvas Drawing Surface */}
      <div className="canvas-wrapper-box">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={`inkora-canvas-surface ${tool}`}
        />

        {/* Text Input Popup */}
        {textPos && (
          <div
            className="canvas-text-popup"
            style={{ left: textPos.x, top: textPos.y }}
          >
            <input
              type="text"
              autoFocus
              placeholder="Type annotation text..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddText()}
              style={{ color, fontSize: `${Math.max(14, size * 4)}px` }}
            />
            <button onClick={handleAddText} className="btn-add-text">
              <Check size={14} />
            </button>
            <button onClick={() => setTextPos(null)} className="btn-cancel-text">
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="inkora-shortcuts-modal">
          <div className="shortcuts-card-inner">
            <div className="shortcuts-header">
              <h3><Sparkles size={16} color="#10b981" /> Inkora Windows Desktop & Web Shortcuts</h3>
              <button onClick={() => setShowShortcuts(false)} className="btn-close-modal">
                <X size={16} />
              </button>
            </div>
            <div className="shortcuts-grid">
              <div className="shortcut-row"><kbd>Ctrl+Alt+P</kbd> <span>Pen Tool</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+K</kbd> <span>Laser Pointer</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+H</kbd> <span>Highlighter</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+E</kbd> <span>Eraser</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+L</kbd> <span>Line Shape</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+A</kbd> <span>Arrow Pointer</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+R</kbd> <span>Rectangle</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+C</kbd> <span>Circle / Ellipse</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+T</kbd> <span>Text Annotation</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+Z</kbd> <span>Undo Stroke</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+Y</kbd> <span>Redo Stroke</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+X</kbd> <span>Clear Annotations</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+W</kbd> <span>Whiteboard Mode</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+B</kbd> <span>Blackboard Mode</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+O</kbd> <span>Transparent Glass Overlay</span></div>
              <div className="shortcut-row"><kbd>Ctrl+Alt+S</kbd> <span>Export Canvas / Screenshot</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
