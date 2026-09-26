"use client";

import {
  ChevronLeft,
  ChevronRight,
  FileText,
  LoaderCircle,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type {
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
  RenderTask,
} from "pdfjs-dist";

type CoursePdfViewerProps = {
  src: string;
  title: string;
  detail?: string;
  onClose: () => void;
};

type ReaderStatus = "loading" | "ready" | "error";

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 1.5;
const ZOOM_STEP = 0.25;

export function CoursePdfViewer({
  src,
  title,
  detail,
  onClose,
}: CoursePdfViewerProps) {
  const readerPageRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadingTaskRef = useRef<PDFDocumentLoadingTask | null>(null);
  const documentRef = useRef<PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const [status, setStatus] = useState<ReaderStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [availableWidth, setAvailableWidth] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.getElementById("unit-1-reader")?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateWidth = () => {
      setAvailableWidth(Math.max(240, stage.clientWidth - 36));
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isActive = true;

    setStatus("loading");
    setErrorMessage("");
    setPageNumber(1);
    setPageCount(0);

    const loadDocument = async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc =
          "/vendor/pdfjs/pdf.worker.min.mjs";

        const loadingTask = pdfjs.getDocument({ url: src });
        loadingTaskRef.current = loadingTask;
        const document = await loadingTask.promise;

        if (!isActive) {
          await loadingTask.destroy();
          return;
        }

        documentRef.current = document;
        setPageCount(document.numPages);
        setStatus("ready");
      } catch (error) {
        if (!isActive) return;
        console.error("Unable to open course PDF", error);
        setErrorMessage(
          "The course reader could not open this file. Please try again.",
        );
        setStatus("error");
      }
    };

    void loadDocument();

    return () => {
      isActive = false;
      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;
      void loadingTaskRef.current?.destroy();
      loadingTaskRef.current = null;
      documentRef.current = null;
    };
  }, [retryKey, src]);

  useEffect(() => {
    const document = documentRef.current;
    const canvas = canvasRef.current;

    if (
      status !== "ready" ||
      !document ||
      !canvas ||
      availableWidth < 100
    ) {
      return;
    }

    let isActive = true;
    let currentTask: RenderTask | null = null;

    const renderPage = async () => {
      setIsRendering(true);

      try {
        const page = await document.getPage(pageNumber);
        if (!isActive) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const fittedWidth = Math.min(availableWidth, 980);
        const fittedScale = fittedWidth / baseViewport.width;
        const viewport = page.getViewport({ scale: fittedScale * zoom });
        const outputScale = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        currentTask = page.render({
          canvas,
          viewport,
          transform:
            outputScale === 1
              ? undefined
              : [outputScale, 0, 0, outputScale, 0, 0],
          background: "#ffffff",
        });
        renderTaskRef.current = currentTask;
        await currentTask.promise;
      } catch (error) {
        if (
          isActive &&
          !(error instanceof Error && error.name === "RenderingCancelledException")
        ) {
          console.error("Unable to render course PDF page", error);
          setErrorMessage(
            "This page could not be displayed. Please retry the reader.",
          );
          setStatus("error");
        }
      } finally {
        if (isActive) setIsRendering(false);
      }
    };

    void renderPage();

    return () => {
      isActive = false;
      currentTask?.cancel();
      if (renderTaskRef.current === currentTask) {
        renderTaskRef.current = null;
      }
    };
  }, [availableWidth, pageNumber, status, zoom]);

  const changePage = (nextPage: number) => {
    setPageNumber(Math.min(Math.max(nextPage, 1), pageCount || 1));
    readerPageRef.current?.scrollTo({
      top: stageRef.current?.offsetTop ?? 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const changeZoom = (nextZoom: number) => {
    setZoom(Math.min(Math.max(nextZoom, MIN_ZOOM), MAX_ZOOM));
  };

  return createPortal(
    <div
      className="course-pdf-reader-page"
      ref={readerPageRef}
      role="presentation"
    >
      <section
        className="course-pdf-reader course-pdf-reader-fullpage"
        id="unit-1-reader"
        role="dialog"
        aria-modal="true"
        aria-labelledby="unit-1-reader-title"
        tabIndex={-1}
      >
      <header className="course-pdf-reader-header">
        <div>
          <p className="course-pdf-reader-kicker">
            <FileText size={15} aria-hidden="true" /> Course reader
          </p>
          <h2 id="unit-1-reader-title">{title}</h2>
          <span>{detail ?? "PDF course material"}</span>
        </div>
        <button
          type="button"
          className="course-pdf-reader-close"
          onClick={onClose}
          aria-label={`Close ${title} reader`}
        >
          <X size={18} aria-hidden="true" />
        </button>
      </header>

      <div className="course-pdf-toolbar" aria-label="PDF reader controls">
        <div className="course-pdf-control-group">
          <button
            type="button"
            onClick={() => changePage(pageNumber - 1)}
            disabled={status !== "ready" || pageNumber <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={17} aria-hidden="true" />
            <span>Previous</span>
          </button>
          <p aria-live="polite">
            Page <strong>{pageNumber}</strong> of {pageCount || "-"}
          </p>
          <button
            type="button"
            onClick={() => changePage(pageNumber + 1)}
            disabled={status !== "ready" || pageNumber >= pageCount}
            aria-label="Next page"
          >
            <span>Next</span>
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="course-pdf-control-group course-pdf-zoom-controls">
          <button
            type="button"
            onClick={() => changeZoom(zoom - ZOOM_STEP)}
            disabled={status !== "ready" || zoom <= MIN_ZOOM}
            aria-label="Zoom out"
          >
            <Minus size={16} aria-hidden="true" />
          </button>
          <span aria-live="polite">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={() => changeZoom(zoom + ZOOM_STEP)}
            disabled={status !== "ready" || zoom >= MAX_ZOOM}
            aria-label="Zoom in"
          >
            <Plus size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="course-pdf-stage" ref={stageRef}>
        {status === "loading" ? (
          <div className="course-pdf-status" role="status">
            <LoaderCircle className="course-pdf-spinner" aria-hidden="true" />
            <strong>Opening {title}</strong>
            <span>Preparing the in-page reader...</span>
          </div>
        ) : null}

        {status === "error" ? (
          <div className="course-pdf-status course-pdf-error" role="alert">
            <FileText aria-hidden="true" />
            <strong>Reader unavailable</strong>
            <span>{errorMessage}</span>
            <button type="button" onClick={() => setRetryKey((key) => key + 1)}>
              <RotateCcw size={16} aria-hidden="true" /> Try again
            </button>
          </div>
        ) : null}

        <canvas
          ref={canvasRef}
          className={`course-pdf-canvas${isRendering ? " is-rendering" : ""}`}
          aria-label={`${title}, page ${pageNumber} of ${pageCount || 47}`}
          hidden={status !== "ready"}
        />
        {status === "ready" && isRendering ? (
          <span className="course-pdf-rendering" role="status">
            Rendering page {pageNumber}...
          </span>
        ) : null}
      </div>
      </section>
    </div>,
    document.body,
  );
}
