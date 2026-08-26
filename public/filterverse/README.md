# FilterVerse — Image Processing Filter Laboratory

Open `/filterverse` through **More → FilterVerse**, directly above Vision Pen. Vision Pen also has a top shortcut. The desktop and mobile website use the same responsive React interface.

## Runtime and privacy

- 75 installed classical operations and explicitly marked reference-only methods. Several entries are intentionally documented aliases or variants, not 75 independent algorithm families.
- Processing takes place in a module Web Worker. Parameter changes are debounced; superseded workers are terminated, and stale results cannot replace current results.
- JPG/JPEG, PNG, BMP, WebP: browser decoding. TIFF: local UTIF decoder in a separate bundled worker; first page only. Unsupported TIFF encodings produce an error.
- Files are limited to 20 MB and 16 megapixels. Working copies are at most 640 pixels on their longest side. Transparent pixels are composited on white. All processing, numerical measurements, and PNG exports use that working copy, not the full-resolution source.
- No image is uploaded to a server. Session history is in memory. Only the light/dark preference is stored locally.
- Up to 8 pipeline stages, 4 independent filter comparisons, and 24 history configurations. New images clear history. PNG export is disabled while results are updating.

## Numerical conventions

Spatial kernels use **correlation**, not a flipped mathematical convolution. The default reflection excludes the repeated edge pixel. Replicate, zero, and wrap borders are also available where the method samples outside the image.

Processing uses floating-point intermediates and clips/rounds each completed stage to 8-bit RGB. Alpha is preserved (uploaded working copies have opaque alpha). Gaussian uses normalized finite separable kernels. Binomial and weighted mean use explicit normalized coefficients. The bilateral implementation weights each RGB channel independently; the guided filter is self-guided per channel. Canny uses Gaussian smoothing, fixed 3×3 Sobel, four-direction thinning, and 8-connected hysteresis. Frangi is a single-scale bright-ridge demonstration; Hessian trace is a diagnostic, not a vessel classifier. Haar denoising is one-level soft thresholding, preserving unmatched last rows/columns. Richardson–Lucy assumes the selected symmetric Gaussian PSF, not an unknown blur.

Frequency filters process luminance, pad to powers of two using the selected border rule, and apply a 2D radix-2 FFT. High-pass, band-pass, and notch-pass outputs display absolute response multiplied by gain. Spectra are centered and use normalized log magnitude. Masks use linear magnitude. These display conventions are not raw Fourier coefficients.

Metrics:

- MAE, MSE, RMSE and PSNR compare RGB working pixels. PSNR is infinite for identical images, using peak value 255.
- SSIM averages **7×7 uniform-window luminance** scores, population covariance, reflected borders, K1 = 0.01, K2 = 0.03. This is an explicit local SSIM variant, not a claim of bit-for-bit equivalence to the original 11×11 Gaussian-window implementation.
- Changed pixels have at least one nonzero RGB difference. Difference maps are absolute RGB differences; the optional heatmap enhances maximum-channel change fourfold.
- Edge strength is mean adjacent luminance difference. Residual is median absolute deviation from a 3×3 median. Neither is an objective edge-preservation or noise-removal score.
- Recommendations are labeled heuristics. Noise type and image quality cannot be diagnosed perfectly from these statistics.

**Similarity to a deliberately filtered input does not establish that the output is better.** There is no known clean reference image unless a researcher supplies one independently.

## Educational scope

Knowledge panels contain definitions, explicit formulas, actual live kernels where appropriate, original-image numerical examples, uses, limitations, complexity notes, and primary references. Historical dates/authors are provided only where verified; uncertain origins are not invented. Python/OpenCV/SciPy/NumPy examples are provided for supported variants and reflect current parameters. Missing equivalents are labeled rather than substituted.

Daubechies/Symlets/Coiflets, BM3D, non-local means, TV, joint-guidance methods, some ridge methods, and neural restoration are reference-only. No neural model weights are shipped or trained. The catalog does not mislabel a simpler filter as one of these algorithms.

## References

- [OpenCV filtering](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [OpenCV Canny](https://docs.opencv.org/4.x/da/d22/tutorial_py_canny.html)
- [OpenCV morphology](https://docs.opencv.org/4.x/d9/d61/tutorial_py_morphological_ops.html)
- [scikit-image filters](https://scikit-image.org/docs/stable/api/skimage.filters.html)
- [scikit-image restoration](https://scikit-image.org/docs/stable/api/skimage.restoration.html)
- [SSIM authors' reference](https://ece.uwaterloo.ca/~z70wang/research/ssim/)
- [UTIF](https://github.com/photopea/UTIF.js) and [KaTeX](https://katex.org/)

Designed and developed by **Dr. Mritunjay Shall Peelam**.
