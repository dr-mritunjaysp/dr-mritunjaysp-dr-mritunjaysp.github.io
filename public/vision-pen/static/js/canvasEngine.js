/** Persistent canvas renderer with cover-correct camera mapping and history. */
class CanvasEngine {
    constructor(canvasElement, onHistoryChange = null) {
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        this.drawingCanvas = document.createElement('canvas');
        this.drawingCtx = this.drawingCanvas.getContext('2d');
        this.strokes = [];
        this.redoStack = [];
        this.currentStroke = null;
        this.lastPoint = null;
        this.activeTool = 'pen';
        this.activeColor = '#00f3ff';
        this.activeSize = 6;
        this.isMirrorMode = true;
        this.videoWidth = 1280;
        this.videoHeight = 720;
        this.onHistoryChange = onHistoryChange;
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(this.canvas.parentElement);
        this.resize();
    }

    resize() {
        const container = this.canvas.parentElement;
        const width = Math.max(1, Math.round(container.clientWidth));
        const height = Math.max(1, Math.round(container.clientHeight));
        if (this.canvas.width === width && this.canvas.height === height) return;

        const oldWidth = this.drawingCanvas.width;
        const oldHeight = this.drawingCanvas.height;
        const scaleX = oldWidth ? width / oldWidth : 1;
        const scaleY = oldHeight ? height / oldHeight : 1;
        if (oldWidth && oldHeight) {
            for (const stroke of [...this.strokes, ...this.redoStack]) {
                for (const point of stroke.points) {
                    point.x *= scaleX;
                    point.y *= scaleY;
                }
                stroke.size *= Math.min(scaleX, scaleY);
            }
        }

        this.canvas.width = width;
        this.canvas.height = height;
        this.drawingCanvas.width = width;
        this.drawingCanvas.height = height;
        this.redrawAll();
    }

    setVideoDimensions(width, height) {
        if (width > 0 && height > 0) {
            this.videoWidth = width;
            this.videoHeight = height;
        }
    }

    getCoverRect() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const scale = Math.max(width / this.videoWidth, height / this.videoHeight);
        const drawWidth = this.videoWidth * scale;
        const drawHeight = this.videoHeight * scale;
        return { x: (width - drawWidth) / 2, y: (height - drawHeight) / 2, width: drawWidth, height: drawHeight };
    }

    setTool(tool) { this.activeTool = tool; }
    setColor(color) { this.activeColor = color; }
    setSize(size) { this.activeSize = Number.parseInt(size, 10); }
    setMirror(isMirror) { this.isMirrorMode = isMirror; }
    canUndo() { return this.strokes.length > 0; }
    canRedo() { return this.redoStack.length > 0; }

    notifyHistory() {
        this.onHistoryChange?.({ canUndo: this.canUndo(), canRedo: this.canRedo() });
    }

    startStroke(x, y, toolOverride = null) {
        const point = { x, y };
        this.currentStroke = {
            tool: toolOverride || this.activeTool,
            color: this.activeColor,
            size: this.activeSize,
            points: [point]
        };
        this.lastPoint = point;
    }

    continueStroke(x, y) {
        if (!this.currentStroke) {
            this.startStroke(x, y);
            return;
        }
        const point = { x, y };
        const distance = Math.hypot(point.x - this.lastPoint.x, point.y - this.lastPoint.y);
        if (distance < 1.2) return;
        this.currentStroke.points.push(point);
        this.drawSegment(this.drawingCtx, this.lastPoint, point, this.currentStroke);
        this.lastPoint = point;
    }

    endStroke() {
        if (this.currentStroke?.points.length > 1) {
            this.strokes.push(this.currentStroke);
            this.redoStack = [];
        }
        this.currentStroke = null;
        this.lastPoint = null;
        this.notifyHistory();
    }

    drawSegment(ctx, from, to, stroke) {
        if (!from || !to) return;
        const { tool, color, size } = stroke;
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(from.x, from.y, (from.x + to.x) / 2, (from.y + to.y) / 2);

        if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = size * 4;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = color;
            ctx.lineWidth = tool === 'marker' ? size * 1.8 : tool === 'highlighter' ? size * 2.5 : size;
            ctx.globalAlpha = tool === 'highlighter' ? 0.35 : 1;
            ctx.shadowColor = color;
            ctx.shadowBlur = tool === 'highlighter' ? 10 : tool === 'marker' ? 8 : 12;
        }
        ctx.stroke();
        ctx.restore();
    }

    clear() {
        this.drawingCtx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
        this.strokes = [];
        this.redoStack = [];
        this.currentStroke = null;
        this.lastPoint = null;
        this.notifyHistory();
    }

    undo() {
        if (!this.canUndo()) return;
        this.redoStack.push(this.strokes.pop());
        this.redrawAll();
        this.notifyHistory();
    }

    redo() {
        if (!this.canRedo()) return;
        this.strokes.push(this.redoStack.pop());
        this.redrawAll();
        this.notifyHistory();
    }

    redrawAll() {
        this.drawingCtx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
        for (const stroke of this.strokes) {
            for (let index = 1; index < stroke.points.length; index += 1) {
                this.drawSegment(this.drawingCtx, stroke.points[index - 1], stroke.points[index], stroke);
            }
        }
    }

    renderFrame(videoElement, handLandmarks = null, showSkeleton = true, activeGesture = 'NONE', cursorPt = null) {
        const width = this.canvas.width;
        const height = this.canvas.height;
        this.ctx.fillStyle = '#05070d';
        this.ctx.fillRect(0, 0, width, height);

        if (videoElement?.readyState >= 2) {
            this.setVideoDimensions(videoElement.videoWidth, videoElement.videoHeight);
            const rect = this.getCoverRect();
            this.ctx.save();
            if (this.isMirrorMode) {
                this.ctx.translate(width, 0);
                this.ctx.scale(-1, 1);
            }
            this.ctx.drawImage(videoElement, rect.x, rect.y, rect.width, rect.height);
            this.ctx.restore();
        }

        this.ctx.drawImage(this.drawingCanvas, 0, 0);
        if (handLandmarks && showSkeleton) this.drawHandSkeleton(handLandmarks);
        if (cursorPt) this.drawPenCursor(cursorPt.x, cursorPt.y, activeGesture);
    }

    drawHandSkeleton(landmarks) {
        const connections = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]];
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(0, 243, 255, 0.5)';
        this.ctx.lineWidth = 2;
        for (const [from, to] of connections) {
            const first = this.transformPoint(landmarks[from]);
            const second = this.transformPoint(landmarks[to]);
            this.ctx.beginPath();
            this.ctx.moveTo(first.x, first.y);
            this.ctx.lineTo(second.x, second.y);
            this.ctx.stroke();
        }
        landmarks.forEach((landmark, index) => {
            const point = this.transformPoint(landmark);
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, index === 8 ? 6 : 3, 0, Math.PI * 2);
            this.ctx.fillStyle = index === 8 ? '#39ff14' : '#00f3ff';
            this.ctx.shadowColor = this.ctx.fillStyle;
            this.ctx.shadowBlur = index === 8 ? 10 : 0;
            this.ctx.fill();
        });
        this.ctx.restore();
    }

    transformPoint(landmark) {
        const rect = this.getCoverRect();
        const rawX = rect.x + landmark.x * rect.width;
        return {
            x: this.isMirrorMode ? this.canvas.width - rawX : rawX,
            y: rect.y + landmark.y * rect.height
        };
    }

    drawPenCursor(x, y, gesture) {
        this.ctx.save();
        this.ctx.beginPath();
        if (gesture === 'DRAW') {
            const isEraser = this.activeTool === 'eraser';
            this.ctx.arc(x, y, isEraser ? this.activeSize * 2 : this.activeSize / 2 + 5, 0, Math.PI * 2);
            this.ctx.strokeStyle = isEraser ? '#ff2f67' : this.activeColor;
            this.ctx.lineWidth = 2.5;
            this.ctx.shadowColor = this.ctx.strokeStyle;
            this.ctx.shadowBlur = 12;
            this.ctx.stroke();
        } else if (gesture === 'HOVER') {
            this.ctx.arc(x, y, 12, 0, Math.PI * 2);
            this.ctx.strokeStyle = 'rgba(255,255,255,.8)';
            this.ctx.lineWidth = 1.5;
            this.ctx.setLineDash([4, 4]);
            this.ctx.stroke();
        } else if (gesture === 'ERASER') {
            this.ctx.arc(x, y, this.activeSize * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255,47,103,.16)';
            this.ctx.strokeStyle = '#ff2f67';
            this.ctx.lineWidth = 2;
            this.ctx.fill();
            this.ctx.stroke();
        }
        this.ctx.restore();
    }

    getExportImageBase64() {
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = this.drawingCanvas.width;
        exportCanvas.height = this.drawingCanvas.height;
        const context = exportCanvas.getContext('2d');
        context.fillStyle = '#0a0c14';
        context.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
        context.drawImage(this.drawingCanvas, 0, 0);
        return exportCanvas.toDataURL('image/png');
    }
}
