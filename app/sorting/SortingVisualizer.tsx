"use client";

import React, { useState, useEffect, useRef } from "react";
import { ALGORITHMS, CATEGORIES } from "./algorithms";
import type { AlgorithmCategory, VisualizationType, HatchPattern, SortEvent } from "./types";
import { CodeEditorRunner } from "./CodeEditorRunner";
import { ComparisonDashboard } from "./ComparisonDashboard";
import { QuizAndRecommender } from "./QuizAndRecommender";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  BookOpen,
  History,
  Code2,
  BarChart3,
  HelpCircle,
  Maximize2,
  Sliders,
  CheckCircle2,
  Layers,
  Sparkles,
  Palette,
} from "lucide-react";

export function SortingVisualizer() {
  const [category, setCategory] = useState<AlgorithmCategory>("basic");
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>("bubble");
  const [vizType, setVizType] = useState<VisualizationType>("histogram");
  const [hatchPattern, setHatchPattern] = useState<HatchPattern>("none");

  // Professional Color Customizer & Palette Presets
  const [colorTheme, setColorTheme] = useState<"oceanic" | "neon" | "emerald" | "sunset" | "purple" | "custom">("oceanic");
  const [customDefaultColor, setCustomDefaultColor] = useState<string>("#3b82f6");
  const [customCompareColor, setCustomCompareColor] = useState<string>("#f59e0b");
  const [customSwapColor, setCustomSwapColor] = useState<string>("#ef4444");
  const [customSortedColor, setCustomSortedColor] = useState<string>("#10b981");

  // Array inputs & controls
  const [arrayInput, setArrayInput] = useState<string>("64, 34, 25, 12, 22, 11, 90, 45, 78, 5");
  const [arraySize, setArraySize] = useState<number>(10);
  const [speed, setSpeed] = useState<number>(35);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [showValues, setShowValues] = useState<boolean>(true);
  const [showIndices, setShowIndices] = useState<boolean>(true);
  const [isAscending, setIsAscending] = useState<boolean>(true);

  // Playback state
  const [array, setArray] = useState<number[]>([]);
  const [comparedIndices, setComparedIndices] = useState<number[]>([]);
  const [swappedIndices, setSwappedIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);

  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "how" | "complexity" | "applications" | "advantages" | "code" | "execution" | "comparison" | "quiz">("overview");

  // Telemetry
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [writes, setWrites] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [currentStepMessage, setCurrentStepMessage] = useState<string>("Ready to sort.");

  const stepsRef = useRef<SortEvent[]>([]);
  const stepIdxRef = useRef<number>(0);
  const isSortingRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const timerRef = useRef<any>(null);

  const currentAlgo = ALGORITHMS[selectedAlgoId] || ALGORITHMS.bubble;

  const parseArrayInput = (str: string) => {
    const nums = str
      .split(/[\s,]+/)
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x));

    const finalArr = nums.length > 0 ? nums : [64, 34, 25, 12, 22, 11, 90, 45, 78, 5];
    setArray(finalArr);
    setArraySize(finalArr.length);
    resetPlaybackState();
  };

  const resetPlaybackState = () => {
    setComparedIndices([]);
    setSwappedIndices([]);
    setSortedIndices([]);
    setPivotIndex(null);
    setComparisons(0);
    setSwaps(0);
    setWrites(0);
    setElapsedTime(0);
    setCurrentStepMessage("Ready to sort.");
    setIsSorting(false);
    setIsPaused(false);
    isSortingRef.current = false;
    isPausedRef.current = false;
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    parseArrayInput(arrayInput);
  }, []);

  const handlePresetSelect = (type: "default" | "nearly" | "reverse" | "duplicates" | "negative") => {
    let preset = "64, 34, 25, 12, 22, 11, 90, 45, 78, 5";
    if (type === "nearly") preset = "5, 10, 15, 20, 18, 25, 30, 35";
    else if (type === "reverse") preset = "90, 80, 70, 60, 50, 40, 30, 20, 10";
    else if (type === "duplicates") preset = "20, 10, 20, 30, 10, 40, 20, 5";
    else if (type === "negative") preset = "-10, 25, -3, 18, 0, -7, 12";

    setArrayInput(preset);
    parseArrayInput(preset);
  };

  const handleRandomize = (size: number = arraySize) => {
    const arr: number[] = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 260) + 15);
    }
    const str = arr.join(", ");
    setArrayInput(str);
    setArray(arr);
    setArraySize(size);
    resetPlaybackState();
  };

  const generateSortSteps = (): SortEvent[] => {
    const steps: SortEvent[] = [];
    const a = [...array];
    const n = a.length;

    if (selectedAlgoId === "bubble") {
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          const comp = isAscending ? a[j] > a[j + 1] : a[j] < a[j + 1];
          steps.push({
            type: "compare",
            indices: [j, j + 1],
            array: [...a],
            message: `Comparing element ${a[j]} and ${a[j + 1]}`,
          });
          if (comp) {
            [a[j], a[j + 1]] = [a[j + 1], a[j]];
            steps.push({
              type: "swap",
              indices: [j, j + 1],
              array: [...a],
              message: `Swapped ${a[j + 1]} and ${a[j]}`,
            });
          }
        }
        steps.push({
          type: "sorted",
          indices: [n - 1 - i],
          array: [...a],
          message: `Element ${a[n - 1 - i]} locked in final position.`,
        });
      }
      steps.push({ type: "sorted", indices: [0], array: [...a], message: "Array completely sorted!" });
    } else if (selectedAlgoId === "selection") {
      for (let i = 0; i < n - 1; i++) {
        let targetIdx = i;
        for (let j = i + 1; j < n; j++) {
          steps.push({
            type: "compare",
            indices: [targetIdx, j],
            array: [...a],
            message: `Scanning unsorted region: comparing ${a[j]} with current candidate ${a[targetIdx]}`,
          });
          if (isAscending ? a[j] < a[targetIdx] : a[j] > a[targetIdx]) {
            targetIdx = j;
          }
        }
        if (targetIdx !== i) {
          [a[i], a[targetIdx]] = [a[targetIdx], a[i]];
          steps.push({
            type: "swap",
            indices: [i, targetIdx],
            array: [...a],
            message: `Placed element ${a[i]} into position ${i}`,
          });
        }
        steps.push({ type: "sorted", indices: [i], array: [...a], message: `Position ${i} sorted.` });
      }
      steps.push({ type: "sorted", indices: [n - 1], array: [...a], message: "Array completely sorted!" });
    } else {
      // Default step generator for all algorithms
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          const comp = isAscending ? a[j] > a[j + 1] : a[j] < a[j + 1];
          steps.push({ type: "compare", indices: [j, j + 1], array: [...a], message: `Comparing ${a[j]} and ${a[j + 1]}` });
          if (comp) {
            [a[j], a[j + 1]] = [a[j + 1], a[j]];
            steps.push({ type: "swap", indices: [j, j + 1], array: [...a], message: `Swapped ${a[j + 1]} and ${a[j]}` });
          }
        }
        steps.push({ type: "sorted", indices: [n - 1 - i], array: [...a], message: `Sorted element ${a[n - 1 - i]}` });
      }
      steps.push({ type: "sorted", indices: [0], array: [...a], message: "Array completely sorted!" });
    }

    return steps;
  };

  const startVisualization = () => {
    if (isSortingRef.current) return;
    const steps = generateSortSteps();
    stepsRef.current = steps;
    stepIdxRef.current = 0;
    setIsSorting(true);
    setIsPaused(false);
    isSortingRef.current = true;
    isPausedRef.current = false;
    const st = Date.now();

    let compCount = 0;
    let swapCount = 0;

    const runStep = () => {
      if (!isSortingRef.current || isPausedRef.current) return;
      if (stepIdxRef.current >= stepsRef.current.length) {
        setIsSorting(false);
        isSortingRef.current = false;
        setComparedIndices([]);
        setSwappedIndices([]);
        setPivotIndex(null);
        setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
        setCurrentStepMessage("Sorting Complete!");
        return;
      }

      const step = stepsRef.current[stepIdxRef.current];
      stepIdxRef.current++;

      setCurrentStepMessage(step.message);
      if (step.type === "compare") {
        compCount++;
        setComparisons(compCount);
        setComparedIndices(step.indices || []);
        setSwappedIndices([]);
      } else if (step.type === "swap" || step.type === "overwrite") {
        swapCount++;
        setSwaps(swapCount);
        setWrites((w) => w + 1);
        setArray(step.array);
        setSwappedIndices(step.indices || []);
        setComparedIndices([]);
      } else if (step.type === "sorted") {
        setSortedIndices((prev) => [...prev, ...(step.indices || [])]);
      }

      setElapsedTime(Date.now() - st);
      const delay = Math.max(5, 250 - speed * 4.6);
      timerRef.current = setTimeout(runStep, delay);
    };

    runStep();
  };

  const handlePauseResume = () => {
    if (!isSorting) return;
    const nextPaused = !isPaused;
    setIsPaused(nextPaused);
    isPausedRef.current = nextPaused;
  };

  const filteredAlgos = Object.values(ALGORITHMS).filter((a) => a.category === category);
  const maxVal = Math.max(...array.map((x) => Math.abs(x)), 250);

  const getHatchClass = () => {
    if (hatchPattern === "none") return "";
    return `hatch-${hatchPattern}`;
  };

  const getThemeClass = () => {
    return `theme-${colorTheme}`;
  };

  const getCustomStyle = (isSorted: boolean, isSwap: boolean, isComp: boolean, isPivot: boolean) => {
    if (colorTheme !== "custom") return {};
    if (isSorted) return { background: customSortedColor, borderColor: customSortedColor, boxShadow: `0 0 12px ${customSortedColor}` };
    if (isSwap) return { background: customSwapColor, borderColor: customSwapColor, boxShadow: `0 0 14px ${customSwapColor}` };
    if (isComp) return { background: customCompareColor, borderColor: customCompareColor, boxShadow: `0 0 12px ${customCompareColor}` };
    return { background: customDefaultColor, borderColor: customDefaultColor };
  };

  return (
    <section className="sorting-page">
      <div className="page-intro" style={{ marginBottom: "20px" }}>
        <p className="eyebrow">Visualize, Understand, Compare, and Execute</p>
        <div className="title-header-row">
          <h1 className="page-intro-title">Interactive Sorting Algorithm Visualizer</h1>
        </div>
      </div>

      <div className="sorting-workbench">
        <div className="sorting-control-panel">
          <div className="sorting-controls-grid">
            <div className="sorting-select-group">
              <label>1. Select Category</label>
              <select
                className="sorting-select"
                value={category}
                onChange={(e) => {
                  const cat = e.target.value as AlgorithmCategory;
                  setCategory(cat);
                  const firstInCat = Object.values(ALGORITHMS).find((a) => a.category === cat);
                  if (firstInCat) setSelectedAlgoId(firstInCat.id);
                }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="sorting-select-group">
              <label>2. Select Algorithm ({filteredAlgos.length})</label>
              <select className="sorting-select" value={selectedAlgoId} onChange={(e) => setSelectedAlgoId(e.target.value)}>
                {filteredAlgos.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.avgTime})
                  </option>
                ))}
              </select>
            </div>

            <div className="sorting-select-group">
              <label>3. Visualization View</label>
              <select className="sorting-select" value={vizType} onChange={(e) => setVizType(e.target.value as VisualizationType)}>
                <option value="histogram">Vertical Histogram</option>
                <option value="horizontal">Horizontal Bars</option>
                <option value="blocks">Number Blocks</option>
                <option value="scatter">Scatter Dots</option>
                <option value="radial">Circular Radial</option>
                <option value="cells">Array Cells</option>
              </select>
            </div>

            <div className="sorting-select-group">
              <label>4. Bar Hatch Pattern</label>
              <select className="sorting-select" value={hatchPattern} onChange={(e) => setHatchPattern(e.target.value as HatchPattern)}>
                <option value="none">Solid (None)</option>
                <option value="diagonal">Diagonal Lines</option>
                <option value="reverse-diagonal">Reverse Diagonal</option>
                <option value="crosshatch">Crosshatch</option>
                <option value="grid">Grid Pattern</option>
                <option value="dots">Dots Pattern</option>
                <option value="waves">Waves Pattern</option>
                <option value="zigzag">Zigzag Pattern</option>
              </select>
            </div>
          </div>

          {/* Professional Color Palette Customizer */}
          <div style={{ marginTop: "16px", padding: "12px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 750, color: "var(--muted)", display: "flex", alignItems: "center", gap: "6px" }}>
                <Palette size={14} color="var(--accent)" /> Color Palette Theme:
              </span>
              <div className="language-tabs-row" style={{ margin: 0 }}>
                <button className={`lang-tab-btn ${colorTheme === "oceanic" ? "active" : ""}`} onClick={() => setColorTheme("oceanic")}>
                  Oceanic Cyan
                </button>
                <button className={`lang-tab-btn ${colorTheme === "neon" ? "active" : ""}`} onClick={() => setColorTheme("neon")}>
                  Cyberpunk Neon
                </button>
                <button className={`lang-tab-btn ${colorTheme === "emerald" ? "active" : ""}`} onClick={() => setColorTheme("emerald")}>
                  Emerald Mint
                </button>
                <button className={`lang-tab-btn ${colorTheme === "sunset" ? "active" : ""}`} onClick={() => setColorTheme("sunset")}>
                  Sunset Glow
                </button>
                <button className={`lang-tab-btn ${colorTheme === "purple" ? "active" : ""}`} onClick={() => setColorTheme("purple")}>
                  Royal Amethyst
                </button>
                <button className={`lang-tab-btn ${colorTheme === "custom" ? "active" : ""}`} onClick={() => setColorTheme("custom")}>
                  Custom Pick
                </button>
              </div>
            </div>

            {colorTheme === "custom" && (
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", paddingTop: "8px", borderTop: "1px solid var(--border)" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 650 }}>
                  Default: <input type="color" value={customDefaultColor} onChange={(e) => setCustomDefaultColor(e.target.value)} />
                </label>
                <label style={{ fontSize: "0.75rem", fontWeight: 650 }}>
                  Compare: <input type="color" value={customCompareColor} onChange={(e) => setCustomCompareColor(e.target.value)} />
                </label>
                <label style={{ fontSize: "0.75rem", fontWeight: 650 }}>
                  Swap: <input type="color" value={customSwapColor} onChange={(e) => setCustomSwapColor(e.target.value)} />
                </label>
                <label style={{ fontSize: "0.75rem", fontWeight: 650 }}>
                  Sorted: <input type="color" value={customSortedColor} onChange={(e) => setCustomSortedColor(e.target.value)} />
                </label>
              </div>
            )}
          </div>

          <div style={{ marginTop: "16px" }}>
            <label style={{ fontSize: "0.78rem", fontWeight: 750, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)", display: "block", marginBottom: "6px" }}>
              Array Dataset Input (Comma/Space Separated):
            </label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <input
                type="text"
                className="sorting-select"
                style={{ flex: 1, minWidth: "240px" }}
                value={arrayInput}
                onChange={(e) => {
                  setArrayInput(e.target.value);
                  parseArrayInput(e.target.value);
                }}
              />
              <button className="btn-sort-secondary" onClick={() => parseArrayInput(arrayInput)}>
                Apply Array
              </button>
            </div>
          </div>

          <div className="sorting-actions-row" style={{ marginTop: "12px" }}>
            <span style={{ fontSize: "0.76rem", fontWeight: 750, color: "var(--muted)" }}>Preset Datasets:</span>
            <button className="subdomain-copy-btn" onClick={() => handlePresetSelect("default")}>Default (10)</button>
            <button className="subdomain-copy-btn" onClick={() => handlePresetSelect("nearly")}>Nearly Sorted</button>
            <button className="subdomain-copy-btn" onClick={() => handlePresetSelect("reverse")}>Reverse Sorted</button>
            <button className="subdomain-copy-btn" onClick={() => handlePresetSelect("duplicates")}>Duplicates</button>
            <button className="subdomain-copy-btn" onClick={() => handlePresetSelect("negative")}>Negatives</button>
            <button className="subdomain-copy-btn" onClick={() => handleRandomize(20)}>Random 20</button>
            <button className="subdomain-copy-btn" onClick={() => handleRandomize(40)}>Random 40</button>
          </div>

          <div className="sorting-controls-grid" style={{ marginTop: "16px" }}>
            <div className="sorting-slider-group">
              <label>Animation Speed: {speed}%</label>
              <input type="range" className="sorting-slider" min={1} max={50} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
            </div>

            <div className="sorting-actions-row" style={{ margin: 0 }}>
              <button className="btn-sort-primary" onClick={startVisualization} disabled={isSorting && !isPaused}>
                <Play size={16} /> {isSorting ? "Sorting..." : "Start Animation"}
              </button>
              {isSorting && (
                <button className="btn-sort-secondary" onClick={handlePauseResume}>
                  {isPaused ? <Play size={15} /> : <Pause size={15} />}
                  {isPaused ? "Resume" : "Pause"}
                </button>
              )}
              <button className="btn-sort-secondary" onClick={() => resetPlaybackState()}>
                <RotateCcw size={15} /> Reset
              </button>
              <button className="btn-sort-secondary" onClick={() => setIsAscending(!isAscending)}>
                {isAscending ? "Ascending ↑" : "Descending ↓"}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Multi-View Visualization Canvas */}
        <div className={`sorting-canvas-container ${getThemeClass()}`}>
          <div className="sorting-status-bar">
            <div className="sorting-telemetry">
              <span>Comparisons: <strong style={{ color: "#f59e0b" }}>{comparisons}</strong></span>
              <span>Swaps/Writes: <strong style={{ color: "#ef4444" }}>{swaps}</strong></span>
              <span>Time: <strong>{(elapsedTime / 1000).toFixed(2)}s</strong></span>
              <span>Algorithm: <strong style={{ color: "var(--accent)" }}>{currentAlgo.name}</strong></span>
              <span>View: <strong style={{ color: "var(--text)" }}>{vizType.toUpperCase()}</strong></span>
            </div>
            <div style={{ fontSize: "0.84rem", fontWeight: 750, color: "var(--text)" }}>{currentStepMessage}</div>
          </div>

          {/* Render selected Visualization Type */}
          {vizType === "histogram" && (
            <div className="sorting-bars-frame">
              {array.map((val, idx) => {
                const isComp = comparedIndices.includes(idx);
                const isSwap = swappedIndices.includes(idx);
                const isSorted = sortedIndices.includes(idx);
                const isPivot = pivotIndex === idx;

                let barClass = "default";
                if (isSorted) barClass = "sorted";
                else if (isSwap) barClass = "swap";
                else if (isComp) barClass = "compare";
                else if (isPivot) barClass = "pivot";

                const heightPercent = Math.max(8, Math.round((Math.abs(val) / maxVal) * 100));

                return (
                  <div
                    key={idx}
                    className={`sorting-bar ${barClass} ${getHatchClass()}`}
                    style={{ height: `${heightPercent}%`, ...getCustomStyle(isSorted, isSwap, isComp, isPivot) }}
                  >
                    {showValues && array.length <= 40 && val}
                  </div>
                );
              })}
            </div>
          )}

          {vizType === "horizontal" && (
            <div className="viz-horizontal-container">
              {array.map((val, idx) => {
                const isComp = comparedIndices.includes(idx);
                const isSwap = swappedIndices.includes(idx);
                const isSorted = sortedIndices.includes(idx);
                let barClass = "default";
                if (isSorted) barClass = "sorted";
                else if (isSwap) barClass = "swap";
                else if (isComp) barClass = "compare";

                const widthPercent = Math.max(6, Math.round((Math.abs(val) / maxVal) * 100));
                return (
                  <div key={idx} className="viz-horizontal-row">
                    <span className="viz-row-idx">[{idx}]</span>
                    <div
                      className={`viz-horizontal-bar ${barClass} ${getHatchClass()}`}
                      style={{ width: `${widthPercent}%`, ...getCustomStyle(isSorted, isSwap, isComp, false) }}
                    >
                      {val}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {vizType === "blocks" && (
            <div className="viz-blocks-grid">
              {array.map((val, idx) => {
                const isComp = comparedIndices.includes(idx);
                const isSwap = swappedIndices.includes(idx);
                const isSorted = sortedIndices.includes(idx);
                let blockClass = "default";
                if (isSorted) blockClass = "sorted";
                else if (isSwap) blockClass = "swap";
                else if (isComp) blockClass = "compare";

                return (
                  <div
                    key={idx}
                    className={`viz-block-item ${blockClass} ${getHatchClass()}`}
                    style={getCustomStyle(isSorted, isSwap, isComp, false)}
                  >
                    <span className="viz-block-val">{val}</span>
                    <span className="viz-block-idx">#{idx}</span>
                  </div>
                );
              })}
            </div>
          )}

          {vizType === "scatter" && (
            <div className="viz-scatter-frame">
              {array.map((val, idx) => {
                const isComp = comparedIndices.includes(idx);
                const isSwap = swappedIndices.includes(idx);
                const isSorted = sortedIndices.includes(idx);
                let dotClass = "default";
                if (isSorted) dotClass = "sorted";
                else if (isSwap) dotClass = "swap";
                else if (isComp) dotClass = "compare";

                const bottomPercent = Math.max(6, Math.round((Math.abs(val) / maxVal) * 90));
                const leftPercent = Math.round(((idx + 0.5) / array.length) * 100);

                return (
                  <div
                    key={idx}
                    className={`viz-scatter-dot ${dotClass}`}
                    style={{ left: `${leftPercent}%`, bottom: `${bottomPercent}%`, ...getCustomStyle(isSorted, isSwap, isComp, false) }}
                    title={`Index ${idx}: ${val}`}
                  />
                );
              })}
            </div>
          )}

          {vizType === "radial" && (
            <div className="viz-radial-frame">
              {array.map((val, idx) => {
                const isComp = comparedIndices.includes(idx);
                const isSwap = swappedIndices.includes(idx);
                const isSorted = sortedIndices.includes(idx);
                let rClass = "default";
                if (isSorted) rClass = "sorted";
                else if (isSwap) rClass = "swap";
                else if (isComp) rClass = "compare";

                const angle = (idx / array.length) * 360;
                const length = Math.max(20, Math.round((Math.abs(val) / maxVal) * 110));

                return (
                  <div
                    key={idx}
                    className={`viz-radial-line ${rClass}`}
                    style={{
                      transform: `rotate(${angle}deg)`,
                      height: `${length}px`,
                      ...getCustomStyle(isSorted, isSwap, isComp, false),
                    }}
                  />
                );
              })}
            </div>
          )}

          {vizType === "cells" && (
            <div className="viz-cells-row">
              {array.map((val, idx) => {
                const isComp = comparedIndices.includes(idx);
                const isSwap = swappedIndices.includes(idx);
                const isSorted = sortedIndices.includes(idx);
                let cellClass = "default";
                if (isSorted) cellClass = "sorted";
                else if (isSwap) cellClass = "swap";
                else if (isComp) cellClass = "compare";

                return (
                  <div key={idx} className="viz-cell-wrapper">
                    <span className="viz-cell-header">idx {idx}</span>
                    <div
                      className={`viz-cell-box ${cellClass} ${getHatchClass()}`}
                      style={getCustomStyle(isSorted, isSwap, isComp, false)}
                    >
                      {val}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Educational Information Tabs */}
        <div className="algo-info-card">
          <div className="code-runner-header" style={{ marginBottom: "18px" }}>
            <div className="language-tabs-row" style={{ overflowX: "auto" }}>
              <button className={`lang-tab-btn ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
                <BookOpen size={14} style={{ display: "inline", marginRight: "4px" }} /> Deep Overview
              </button>
              <button className={`lang-tab-btn ${activeTab === "history" ? "active" : ""}`} onClick={() => setActiveTab("history")}>
                <History size={14} style={{ display: "inline", marginRight: "4px" }} /> Origin & History
              </button>
              <button className={`lang-tab-btn ${activeTab === "how" ? "active" : ""}`} onClick={() => setActiveTab("how")}>
                <Sparkles size={14} style={{ display: "inline", marginRight: "4px" }} /> Working Principle
              </button>
              <button className={`lang-tab-btn ${activeTab === "complexity" ? "active" : ""}`} onClick={() => setActiveTab("complexity")}>
                <BarChart3 size={14} style={{ display: "inline", marginRight: "4px" }} /> Complexity Matrix
              </button>
              <button className={`lang-tab-btn ${activeTab === "applications" ? "active" : ""}`} onClick={() => setActiveTab("applications")}>
                <Layers size={14} style={{ display: "inline", marginRight: "4px" }} /> Real-World Use Cases
              </button>
              <button className={`lang-tab-btn ${activeTab === "advantages" ? "active" : ""}`} onClick={() => setActiveTab("advantages")}>
                <CheckCircle2 size={14} style={{ display: "inline", marginRight: "4px" }} /> Advantages & Limitations
              </button>
              <button className={`lang-tab-btn ${activeTab === "code" ? "active" : ""}`} onClick={() => setActiveTab("code")}>
                <Code2 size={14} style={{ display: "inline", marginRight: "4px" }} /> Source Code Viewer
              </button>
              <button className={`lang-tab-btn ${activeTab === "execution" ? "active" : ""}`} onClick={() => setActiveTab("execution")}>
                <Sliders size={14} style={{ display: "inline", marginRight: "4px" }} /> Live Execution Sandbox
              </button>
              <button className={`lang-tab-btn ${activeTab === "comparison" ? "active" : ""}`} onClick={() => setActiveTab("comparison")}>
                <Maximize2 size={14} style={{ display: "inline", marginRight: "4px" }} /> Side-by-Side Matrix
              </button>
              <button className={`lang-tab-btn ${activeTab === "quiz" ? "active" : ""}`} onClick={() => setActiveTab("quiz")}>
                <HelpCircle size={14} style={{ display: "inline", marginRight: "4px" }} /> DSA Quiz & Recommender
              </button>
            </div>
          </div>

          {currentAlgo.specialDisclaimer && (
            <div style={{ padding: "10px 14px", background: "rgba(245, 158, 11, 0.12)", border: "1px solid rgba(245, 158, 11, 0.4)", borderRadius: "10px", marginBottom: "16px", fontSize: "0.88rem", color: "#f59e0b" }}>
              <strong>Notice:</strong> {currentAlgo.specialDisclaimer}
            </div>
          )}

          {activeTab === "overview" && (
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "8px" }}>{currentAlgo.name} — Deep Academic Overview</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.94rem", lineHeight: "1.7" }}>{currentAlgo.overview}</p>
              <div className="pub-attributes-row" style={{ marginTop: "14px" }}>
                <span className="attribute-pill">Category: {currentAlgo.categoryName}</span>
                <span className="attribute-pill">Best: {currentAlgo.bestTime}</span>
                <span className="attribute-pill">Worst: {currentAlgo.worstTime}</span>
                <span className="attribute-pill">Space: {currentAlgo.space}</span>
                <span className="attribute-pill">{currentAlgo.stable ? "Stable Sort" : "Unstable Sort"}</span>
                <span className="attribute-pill">{currentAlgo.inPlace ? "In-Place" : "Out-of-Place"}</span>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "8px" }}>Historical Context & Origin</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.94rem", lineHeight: "1.7" }}>{currentAlgo.history}</p>
            </div>
          )}

          {activeTab === "how" && (
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "8px" }}>Detailed Working Principle</h3>
              <ol style={{ paddingLeft: "20px", color: "var(--muted)", fontSize: "0.94rem", lineHeight: "1.75" }}>
                {currentAlgo.howItWorks.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: "8px" }}>{step}</li>
                ))}
              </ol>
              <h4 style={{ fontSize: "1rem", fontWeight: 750, marginTop: "18px", marginBottom: "8px" }}>Language-Neutral Pseudocode</h4>
              <pre className="console-output-area" style={{ background: "var(--bg)", padding: "14px", borderRadius: "10px" }}>{currentAlgo.pseudocode}</pre>
            </div>
          )}

          {activeTab === "complexity" && (
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "12px" }}>Time & Space Complexity Matrix</h3>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Theoretical Value</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 800 }}>Best-case time</td>
                    <td style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{currentAlgo.bestTime}</td>
                    <td>Minimum comparisons required on optimal input.</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 800 }}>Average-case time</td>
                    <td style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{currentAlgo.avgTime}</td>
                    <td>Expected runtime over random input permutations.</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 800 }}>Worst-case time</td>
                    <td style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{currentAlgo.worstTime}</td>
                    <td>Upper bound time limit on adversarial input.</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 800 }}>Auxiliary space</td>
                    <td style={{ fontFamily: "var(--font-mono)" }}>{currentAlgo.space}</td>
                    <td>Extra memory required beyond input array.</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 800 }}>Stable Sort</td>
                    <td>{currentAlgo.stable ? "Yes" : "No"}</td>
                    <td>Preserves relative order of duplicate elements.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "applications" && (
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "8px" }}>Real-World Use Cases & Applications</h3>
              <ul style={{ paddingLeft: "20px", color: "var(--muted)", fontSize: "0.94rem", lineHeight: "1.7" }}>
                {currentAlgo.applications.map((app, idx) => (
                  <li key={idx} style={{ marginBottom: "8px" }}>{app}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "advantages" && (
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "12px" }}>Key Advantages & Limitations</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                <div style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "12px", padding: "16px" }}>
                  <h4 style={{ color: "#10b981", fontSize: "1rem", fontWeight: 800, marginBottom: "8px" }}>Advantages</h4>
                  <ul style={{ paddingLeft: "18px", margin: 0, color: "var(--text)", fontSize: "0.9rem", lineHeight: "1.65" }}>
                    {currentAlgo.advantages.map((adv, idx) => (
                      <li key={idx} style={{ marginBottom: "6px" }}>{adv}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "12px", padding: "16px" }}>
                  <h4 style={{ color: "#ef4444", fontSize: "1rem", fontWeight: 800, marginBottom: "8px" }}>Limitations</h4>
                  <ul style={{ paddingLeft: "18px", margin: 0, color: "var(--text)", fontSize: "0.9rem", lineHeight: "1.65" }}>
                    {currentAlgo.limitations.map((lim, idx) => (
                      <li key={idx} style={{ marginBottom: "6px" }}>{lim}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div>
              <CodeEditorRunner initialCode={currentAlgo.code} algorithmName={currentAlgo.name} />
            </div>
          )}

          {activeTab === "execution" && (
            <div>
              <CodeEditorRunner initialCode={currentAlgo.code} algorithmName={currentAlgo.name} />
            </div>
          )}

          {activeTab === "comparison" && <ComparisonDashboard />}

          {activeTab === "quiz" && <QuizAndRecommender />}
        </div>
      </div>
    </section>
  );
}
