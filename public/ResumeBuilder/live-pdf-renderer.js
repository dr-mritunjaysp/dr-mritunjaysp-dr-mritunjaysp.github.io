(function installScholarResumeLivePdf(global) {
  "use strict";

  var LOCAL_HOSTS = /^(?:localhost|127\.0\.0\.1|::1)$/i;
  var A4_WIDTH_MM = 210;
  var A4_HEIGHT_MM = 297;
  var PAGE_MARGIN_MM = 12;
  var PRINTABLE_WIDTH_MM = A4_WIDTH_MM - PAGE_MARGIN_MM * 2;
  var PRINTABLE_HEIGHT_MM = A4_HEIGHT_MM - PAGE_MARGIN_MM * 2;
  var PRINTABLE_WIDTH_PX = Math.round((PRINTABLE_WIDTH_MM * 96) / 25.4);

  function shouldHandle() {
    return !LOCAL_HOSTS.test(global.location.hostname);
  }

  function waitForFrame(frame) {
    return new Promise(function wait(resolve, reject) {
      var timeout = global.setTimeout(function timedOut() {
        reject(new Error("The live PDF preview did not finish loading."));
      }, 15000);

      frame.addEventListener(
        "load",
        function loaded() {
          global.clearTimeout(timeout);
          resolve();
        },
        { once: true },
      );
    });
  }

  async function waitForDocumentAssets(documentRef) {
    if (documentRef.fonts && documentRef.fonts.ready) {
      await documentRef.fonts.ready.catch(function ignoreFontError() {});
    }

    await Promise.all(
      Array.from(documentRef.images).map(function waitForImage(image) {
        if (image.complete && image.naturalWidth > 0) return Promise.resolve();
        if (typeof image.decode === "function") {
          return image.decode().catch(function ignoreDecodeError() {});
        }
        return new Promise(function wait(resolve) {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      }),
    );

    await new Promise(function nextPaint(resolve) {
      global.requestAnimationFrame(function firstFrame() {
        global.requestAnimationFrame(resolve);
      });
    });
  }

  function addPageNumbers(pdf, settings) {
    var alignment = settings && settings.pageNumberAlign;
    if (!alignment || alignment === "none") return;

    var pages = pdf.getNumberOfPages();
    var x = alignment === "left" ? PAGE_MARGIN_MM : alignment === "right" ? A4_WIDTH_MM - PAGE_MARGIN_MM : A4_WIDTH_MM / 2;
    var textAlignment = alignment === "center" ? "center" : alignment;

    pdf.setFont("times", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(71, 85, 105);
    for (var page = 1; page <= pages; page += 1) {
      pdf.setPage(page);
      pdf.text(String(page), x, A4_HEIGHT_MM - 6, { align: textAlignment });
    }
  }

  function collectProtectedBlocks(documentRef, rootRect, canvasScale) {
    return Array.from(documentRef.body.querySelectorAll("*"))
      .map(function toProtectedBlock(element) {
        var style = documentRef.defaultView.getComputedStyle(element);
        var avoidsBreak =
          style.breakInside === "avoid" ||
          style.breakInside === "avoid-page" ||
          style.pageBreakInside === "avoid";
        if (!avoidsBreak || style.display === "none" || style.visibility === "hidden") return null;

        var rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) return null;
        return {
          top: Math.max(0, Math.floor((rect.top - rootRect.top) * canvasScale)),
          bottom: Math.max(0, Math.ceil((rect.bottom - rootRect.top) * canvasScale)),
        };
      })
      .filter(Boolean)
      .sort(function byTop(a, b) {
        return a.top - b.top;
      });
  }

  function choosePageEnd(start, nominalEnd, canvasHeight, pageHeight, protectedBlocks) {
    var end = Math.min(nominalEnd, canvasHeight);
    var minimumFill = pageHeight * 0.32;
    var candidates = protectedBlocks.filter(function crossesPage(block) {
      return (
        block.top > start + minimumFill &&
        block.top < end &&
        block.bottom > end &&
        block.bottom - block.top < pageHeight * 0.9
      );
    });

    if (candidates.length) end = Math.min.apply(null, candidates.map(function top(block) { return block.top; })) - 4;
    return Math.max(start + Math.min(pageHeight * 0.25, canvasHeight - start), Math.floor(end));
  }

  function appendCanvasPages(pdf, canvas, protectedBlocks) {
    var pageHeight = Math.floor((canvas.width * PRINTABLE_HEIGHT_MM) / PRINTABLE_WIDTH_MM);
    var start = 0;
    var page = 0;

    while (start < canvas.height) {
      var end = choosePageEnd(start, start + pageHeight, canvas.height, pageHeight, protectedBlocks);
      var sliceHeight = Math.min(canvas.height - start, end - start);
      var pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = pageHeight;
      var context = pageCanvas.getContext("2d", { alpha: false });
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      context.drawImage(canvas, 0, start, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

      if (page > 0) pdf.addPage("a4", "portrait");
      pdf.addImage(
        pageCanvas.toDataURL("image/jpeg", 0.96),
        "JPEG",
        PAGE_MARGIN_MM,
        PAGE_MARGIN_MM,
        PRINTABLE_WIDTH_MM,
        PRINTABLE_HEIGHT_MM,
        undefined,
        "FAST",
      );

      start += sliceHeight;
      page += 1;
    }
  }

  async function createPdf(options) {
    if (!global.html2canvas || !global.jspdf || !global.jspdf.jsPDF) {
      throw new Error("The live PDF rendering libraries are unavailable.");
    }
    if (!options || !options.html) {
      throw new Error("The live PDF preview is empty.");
    }

    var frame = document.createElement("iframe");
    frame.title = "ScholarResume PDF rendering frame";
    frame.setAttribute("aria-hidden", "true");
    frame.style.position = "fixed";
    frame.style.left = "-12000px";
    frame.style.top = "0";
    frame.style.width = PRINTABLE_WIDTH_PX + "px";
    frame.style.height = Math.round((A4_HEIGHT_MM * 96) / 25.4) + "px";
    frame.style.border = "0";
    frame.style.pointerEvents = "none";

    var loadPromise = waitForFrame(frame);
    frame.srcdoc = options.html;
    document.body.appendChild(frame);

    try {
      await loadPromise;
      var frameDocument = frame.contentDocument;
      if (!frameDocument || !frameDocument.body) {
        throw new Error("The live PDF rendering frame is unavailable.");
      }

      frameDocument.documentElement.style.background = "#ffffff";
      frameDocument.documentElement.style.width = PRINTABLE_WIDTH_PX + "px";
      frameDocument.body.style.background = "#ffffff";
      frameDocument.body.style.width = PRINTABLE_WIDTH_PX + "px";
      frameDocument.body.style.maxWidth = "none";
      await waitForDocumentAssets(frameDocument);

      var rootRect = frameDocument.body.getBoundingClientRect();
      var canvas = await global.html2canvas(frameDocument.body, {
        allowTaint: false,
        backgroundColor: "#ffffff",
        height: frameDocument.documentElement.scrollHeight,
        imageTimeout: 15000,
        logging: false,
        removeContainer: true,
        scale: 2,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
        width: PRINTABLE_WIDTH_PX,
        windowHeight: frameDocument.documentElement.scrollHeight,
        windowWidth: PRINTABLE_WIDTH_PX,
      });
      var protectedBlocks = collectProtectedBlocks(
        frameDocument,
        rootRect,
        canvas.width / rootRect.width,
      );

      var JsPdf = global.jspdf.jsPDF;
      var pdf = new JsPdf({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
        putOnlyUsedFonts: true,
        precision: 16,
      });

      appendCanvasPages(pdf, canvas, protectedBlocks);

      addPageNumbers(pdf, options.settings || {});
      pdf.setProperties({
        title: String(options.fileName || "ScholarResume") + " Resume",
        creator: "ScholarResume",
      });
      return pdf.output("blob");
    } finally {
      frame.remove();
    }
  }

  global.ScholarResumeLivePdf = Object.freeze({
    createPdf: createPdf,
    shouldHandle: shouldHandle,
  });
})(window);
