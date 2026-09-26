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
import { useCallback, useEffect, useRef, useState } from "react";
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

type CoursePdfPageProps = {
  availableWidth: number;
  document: PDFDocumentProxy;
  pageNumber: number;
  scrollRootRef: { current: HTMLDivElement | null };
  title: string;
  totalPages: number;
  zoom: number;
  onRenderError: (pageNumber: number, error: unknown) => void;
  registerElement: (element: HTMLDivElement | null) => void;
};

function CoursePdfPage({
  availableWidth,
  document,
  pageNumber,
  scrollRootRef,
  title,
  totalPages,
  zoom,
  onRenderError,
  registerElement,
}: CoursePdfPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [pageRatio, setPageRatio] = useState(612 / 792);
  const pageWidth = Math.max(240, Math.min(availableWidth, 980) * zoom);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      {
        root: scrollRootRef.current,
        rootMargin: "120% 0px",
        threshold: 0.01,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [scrollRootRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!isNearViewport || availableWidth < 100) {
      canvas.width = 0;
      canvas.height = 0;
      setIsRendering(false);
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
        setPageRatio(baseViewport.width / baseViewport.height);

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
        await currentTask.promise;
      } catch (error) {
        if (
          isActive &&
          !(error instanceof Error && error.name === "RenderingCancelledException")
        ) {
          onRenderError(pageNumber, error);
        }
      } finally {
        if (isActive) setIsRendering(false);
      }
    };

    void renderPage();

    return () => {
      isActive = false;
      currentTask?.cancel();
    };
  }, [availableWidth, document, isNearViewport, onRenderError, pageNumber, zoom]);

  return (
    <div
      className="course-pdf-page"
      ref={(element) => {
        containerRef.current = element;
        registerElement(element);
      }}
      role="group"
      aria-label={`Page ${pageNumber} of ${totalPages}`}
      style={{ width: `${pageWidth}px`, aspectRatio: pageRatio }}
    >
      {!isNearViewport ? (
        <div className="course-pdf-page-placeholder" aria-hidden="true">
          <FileText size={20} />
          <span>Page {pageNumber}</span>
        </div>
      ) : null}
      <canvas
        ref={canvasRef}
        className={`course-pdf-canvas${isRendering ? " is-rendering" : ""}`}
        aria-label={`${title}, page ${pageNumber} of ${totalPages}`}
        hidden={!isNearViewport}
      />
      {isNearViewport && isRendering ? (
        <span className="course-pdf-rendering" role="status">
          Rendering page {pageNumber}...
        </span>
      ) : null}
      <span className="course-pdf-page-number" aria-hidden="true">
        {pageNumber}
      </span>
    </div>
  );
}

export function CoursePdfViewer({
  src,
  title,
  detail,
  onClose,
}: CoursePdfViewerProps) {
  const readerPageRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pageElementsRef = useRef<Array<HTMLDivElement | null>>([]);
  const loadingTaskRef = useRef<PDFDocumentLoadingTask | null>(null);
  const documentRef = useRef<PDFDocumentProxy | null>(null);
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);
  const [status, setStatus] = useState<ReaderStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [availableWidth, setAvailableWidth] = useState(0);
  const [retryKey, setRetryKey] = useState(0);

  const handlePageRenderError = useCallback(
    (failedPage: number, error: unknown) => {
      console.error(`Unable to render course PDF page ${failedPage}`, error);
      setErrorMessage(
        `Page ${failedPage} could not be displayed. Please retry the reader.`,
      );
      setStatus("error");
    },
    [],
  );

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
    setPdfDocument(null);
    pageElementsRef.current = [];

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
        setPdfDocument(document);
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
      void loadingTaskRef.current?.destroy();
      loadingTaskRef.current = null;
      documentRef.current = null;
    };
  }, [retryKey, src]);

  useEffect(() => {
    const readerPage = readerPageRef.current;
    if (!readerPage || status !== "ready" || pageCount === 0) return;

    let frameId = 0;

    const updateCurrentPage = () => {
      frameId = 0;
      const readerTop = readerPage.getBoundingClientRect().top;
      const marker = readerTop + Math.min(readerPage.clientHeight * 0.35, 280);
      let closestPage = 1;
      let closestDistance = Number.POSITIVE_INFINITY;

      pageElementsRef.current.forEach((page, index) => {
        if (!page) return;
        const bounds = page.getBoundingClientRect();

        if (bounds.top <= marker && bounds.bottom > marker) {
          closestPage = index + 1;
          closestDistance = 0;
          return;
        }

        const distance = Math.min(
          Math.abs(bounds.top - marker),
          Math.abs(bounds.bottom - marker),
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestPage = index + 1;
        }
      });

      setPageNumber((current) =>
        current === closestPage ? current : closestPage,
      );
    };

    const queueCurrentPageUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateCurrentPage);
    };

    updateCurrentPage();
    readerPage.addEventListener("scroll", queueCurrentPageUpdate, {
      passive: true,
    });

    return () => {
      readerPage.removeEventListener("scroll", queueCurrentPageUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [pageCount, status]);

  const changePage = (nextPage: number) => {
    const boundedPage = Math.min(Math.max(nextPage, 1), pageCount || 1);
    setPageNumber(boundedPage);
    pageElementsRef.current[boundedPage - 1]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
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

        {status === "ready" && pdfDocument ? (
          <div
            className="course-pdf-pages"
            aria-label={`${title}, ${pageCount} pages`}
          >
            {Array.from({ length: pageCount }, (_, index) => {
              const renderedPageNumber = index + 1;

              return (
                <CoursePdfPage
                  key={renderedPageNumber}
                  availableWidth={availableWidth}
                  document={pdfDocument}
                  pageNumber={renderedPageNumber}
                  scrollRootRef={readerPageRef}
                  title={title}
                  totalPages={pageCount}
                  zoom={zoom}
                  onRenderError={handlePageRenderError}
                  registerElement={(element) => {
                    pageElementsRef.current[index] = element;
                  }}
                />
              );
            })}
          </div>
        ) : null}
      </div>
      </section>
    </div>,
    document.body,
  );
}
