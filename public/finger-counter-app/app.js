import { analyzeHand, cameraError, StableValue } from "../vision-pen-studio/static/js/smartVisionCore.mjs";

const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const $ = (id) => document.getElementById(id);
const stage = $("counterStage");
const video = $("cameraVideo");
const countState = new StableValue(240);

let stream = null;
let hands = null;
let processing = false;
let running = false;
let loopTimer = null;
let animationTimer = null;

function setStatus(text, live = false) {
  const status = $("cameraStatus");
  status.classList.toggle("is-live", live);
  status.querySelector("span").textContent = text;
}

function showError(message) {
  const error = $("errorMessage");
  error.textContent = message;
  error.hidden = false;
}

function clearError() {
  $("errorMessage").hidden = true;
}

function replayCountAnimation() {
  clearTimeout(animationTimer);
  stage.classList.remove("is-revealing");
  void stage.offsetWidth;
  stage.classList.add("is-revealing");
  animationTimer = setTimeout(() => stage.classList.remove("is-revealing"), 1250);
}

function showCount(count, handCount) {
  stage.dataset.count = String(count);
  $("countNumber").textContent = String(count);
  $("countWord").textContent = NUMBER_WORDS[count] || String(count);
  $("trackingLabel").textContent = `${handCount} ${handCount === 1 ? "hand" : "hands"} detected`;
  $("countHint").textContent = count === 0 ? "Closed fist" : `${count} raised ${count === 1 ? "finger" : "fingers"}`;
  replayCountAnimation();
}

function clearCount() {
  delete stage.dataset.count;
  $("countNumber").textContent = "—";
  $("countWord").textContent = "Waiting";
  $("trackingLabel").textContent = "Show your hand to the camera";
  $("countHint").textContent = "Raise one or both hands";
}

function onResults(results) {
  if (!running) return;
  const landmarks = results.multiHandLandmarks || [];
  const labels = results.multiHandedness || [];
  const detectedHands = landmarks
    .map((points, index) => analyzeHand(points, labels[index]?.label || "Unknown", labels[index]?.score ?? null))
    .filter(Boolean);
  const total = detectedHands.reduce((sum, hand) => sum + hand.count, 0);
  const now = performance.now();

  if (countState.update(detectedHands.length ? total : null, now)) {
    if (detectedHands.length) showCount(total, detectedHands.length);
    else clearCount();
  }
}

async function prepareHands() {
  if (hands) return;
  if (typeof window.Hands !== "function") throw new Error("The hand-tracking model could not load.");

  hands = new window.Hands({
    locateFile: (file) => `../vision-pen-studio/static/vendor/mediapipe-hands/${file}`,
  });
  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.68,
    minTrackingConfidence: 0.62,
  });
  hands.onResults(onResults);
  await hands.initialize();
}

async function processFrame() {
  if (!running) return;
  if (document.hidden) {
    loopTimer = null;
    return;
  }
  if (!processing && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    processing = true;
    try {
      await hands.send({ image: video });
    } catch (error) {
      console.warn("Finger Counter frame:", error);
    } finally {
      processing = false;
    }
  }
  if (running) loopTimer = setTimeout(processFrame, 70);
}

async function startCamera() {
  const button = $("startButton");
  clearError();
  button.disabled = true;
  button.querySelector("span").textContent = "Preparing…";
  setStatus("Preparing model");

  try {
    if (!window.isSecureContext && location.hostname !== "localhost") {
      throw Object.assign(new Error("Camera access requires HTTPS or localhost."), { name: "InsecureContext" });
    }
    await prepareHands();
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });
    video.srcObject = stream;
    await video.play();
    running = true;
    countState.reset();
    $("cameraGate").hidden = true;
    $("countDisplay").hidden = false;
    $("cameraPreview").hidden = false;
    $("stopButton").hidden = false;
    setStatus("Tracking live", true);
    processFrame();
  } catch (error) {
    const message = error?.name === "InsecureContext" || error?.message === "The hand-tracking model could not load."
      ? error.message
      : cameraError(error, window.isSecureContext || location.hostname === "localhost");
    showError(message);
    setStatus("Camera unavailable");
    button.disabled = false;
    button.querySelector("span").textContent = "Try camera again";
  }
}

function stopCamera() {
  running = false;
  clearTimeout(loopTimer);
  loopTimer = null;
  processing = false;
  stream?.getTracks().forEach((track) => track.stop());
  stream = null;
  video.srcObject = null;
  countState.reset();
  clearCount();
  $("cameraGate").hidden = false;
  $("countDisplay").hidden = true;
  $("cameraPreview").hidden = true;
  $("stopButton").hidden = true;
  const button = $("startButton");
  button.disabled = false;
  button.querySelector("span").textContent = "Start camera";
  setStatus("Camera off");
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    showError("Full-screen mode is unavailable in this browser. The counter will continue in the page.");
  }
}

function syncFullscreenLabel() {
  $("fullscreenButton").textContent = document.fullscreenElement ? "Exit full screen" : "Full screen";
}

$("startButton").addEventListener("click", startCamera);
$("stopButton").addEventListener("click", stopCamera);
$("fullscreenButton").addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", syncFullscreenLabel);
window.addEventListener("pagehide", stopCamera);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && running && !loopTimer) processFrame();
});
