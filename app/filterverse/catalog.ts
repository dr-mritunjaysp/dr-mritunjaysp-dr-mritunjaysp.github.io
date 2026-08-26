import { LIVE_FILTERS, kernelFor } from '../../public/filterverse/engine.mjs';
export type Filter = {
    id: string;
    name: string;
    category: string;
    purpose: string;
    formula: string;
    note: string;
    controls: string[];
    live: boolean;
    source: string;
    history: string;
    applications: string;
    advantages: string;
    limitations: string;
    complexity: string;
};
export const categories = ['Smoothing', 'Order statistics', 'Sharpening', 'Edges', 'Edge preserving', 'Frequency', 'Morphology', 'Texture', 'Wavelets', 'Restoration', 'Diffusion', 'Ridges', 'Thresholding', 'Modern AI', 'Custom'];
const docs = 'https://docs.opencv.org/4.x/';
const sk = 'https://scikit-image.org/docs/stable/api/';
const categoryInfo: Record<string, {
    controls: string[];
    source: string;
    applications: string;
    advantages: string;
    limitations: string;
    complexity: string;
}> = {
    Smoothing: { controls: ['size'], source: docs + 'd4/d13/tutorial_py_filtering.html', applications: 'Preprocessing, sensor denoising, scale-space analysis.', advantages: 'Simple local operations with understandable parameters.', limitations: 'Small structures and boundaries may blur. Avoid aggressive smoothing when fine details are essential.', complexity: 'N pixels, k×k kernel: direct O(Nk²); separable Gaussian O(Nk).' },
    'Order statistics': { controls: ['size'], source: sk + 'skimage.filters.rank.html', applications: 'Impulse-noise suppression, microscopy, document cleanup.', advantages: 'Local statistics can tolerate outliers better than arithmetic averages.', limitations: 'Results depend on neighborhood size and noise distribution. Avoid large windows on thin structures.', complexity: 'Sorting-based implementation O(Nk² log(k²)); min/max scans O(Nk²).' },
    Sharpening: { controls: ['amount'], source: docs + 'd5/d0f/tutorial_py_gradients.html', applications: 'Detail enhancement, inspection, boundary emphasis.', advantages: 'Makes local intensity changes more visible.', limitations: 'Can amplify noise and produce halos or clipped values. Sharpening cannot recover missing information.', complexity: 'O(Nk²), or O(Nk) for separable blur-based sharpening.' },
    Edges: { controls: ['direction'], source: docs + 'd5/d0f/tutorial_py_gradients.html', applications: 'Object boundaries, OCR preprocessing, industrial inspection.', advantages: 'Separates changes in intensity from uniform regions.', limitations: 'Texture, noise, and illumination changes also create responses. Edge maps are not object recognition.', complexity: 'Fixed stencils O(N); pre-smoothing adds O(Nk).' },
    'Edge preserving': { controls: ['size', 'sigma', 'color'], source: sk + 'skimage.restoration.html#skimage.restoration.denoise_bilateral', applications: 'Denoising with boundaries retained; computational photography.', advantages: 'Reduces mixing across large local intensity differences.', limitations: 'Strong texture may be smoothed; parameters are image-dependent. Per-channel browser variants can change color relationships.', complexity: 'Direct bilateral O(Nk²); this self-guided implementation O(Nk).' },
    Frequency: { controls: ['cutoff', 'order', 'amount', 'band', 'notchX', 'notchY'], source: docs + 'de/dbc/tutorial_py_fourier_transform.html', applications: 'Periodic-noise experiments, scale separation, frequency-selective enhancement.', advantages: 'Makes retained and removed spatial frequencies explicit.', limitations: 'Browser demo operates on luminance and pads to powers of two. Sharp cutoffs may ring. High-pass outputs show absolute response × gain.', complexity: 'P padded pixels: FFT O(P log P), mask multiplication O(P).' },
    Morphology: { controls: ['size'], source: docs + 'd9/d61/tutorial_py_morphological_ops.html', applications: 'Mask cleanup, OCR, small feature extraction.', advantages: 'Works directly with local shapes and extrema.', limitations: 'The structuring element determines what survives. This implementation uses a flat square on each color channel.', complexity: 'Direct square neighborhood O(Nk²) per operation.' },
    Texture: { controls: ['size', 'sigma', 'angle', 'wavelength', 'amount'], source: sk + 'skimage.filters.html#skimage.filters.gabor', applications: 'Texture inspection, orientation analysis, repetitive patterns.', advantages: 'Highlights local frequency, orientation, or variability.', limitations: 'Response is a feature image, not a restored photograph. Avoid interpreting it as a segmentation without validation.', complexity: 'Direct spatial filtering O(Nk²).' },
    Wavelets: { controls: ['noise'], source: 'https://pywavelets.readthedocs.io/en/latest/ref/2d-dwt-and-idwt.html', applications: 'Multiresolution analysis, compression, transform denoising.', advantages: 'Separates coarse approximation from localized detail coefficients.', limitations: 'The live implementation is one-level Haar soft-threshold denoising. Other wavelet families are reference entries; large thresholds erase detail.', complexity: 'One-level Haar transform and inverse O(N).' },
    Restoration: { controls: ['size', 'noise', 'sigma', 'sigmaY', 'iterations'], source: sk + 'skimage.restoration.html', applications: 'Sensor-noise reduction and experiments with a known blur model.', advantages: 'Uses explicit assumptions about degradation.', limitations: 'A wrong noise or blur model can worsen an image. Do not treat similarity to the input as restoration quality.', complexity: 'Wiener O(Nk); Richardson–Lucy with separable Gaussian PSF O(iterations·Nk).' },
    Diffusion: { controls: ['iterations', 'kappa'], source: sk + 'skimage.restoration.html', applications: 'Iterative scale-space smoothing, edge-aware denoising.', advantages: 'Shows smoothing as a gradual local flow.', limitations: 'Explicit step size is fixed at 0.2 for the four-neighbor stencil. Too many iterations remove meaningful features.', complexity: 'O(iterations·N).' },
    Ridges: { controls: ['size', 'sigma', 'sigmaY', 'color'], source: sk + 'skimage.filters.html#skimage.filters.frangi', applications: 'Curvilinear feature research and image inspection; not a clinical diagnostic tool.', advantages: 'Uses local second-order intensity structure.', limitations: 'Single-scale bright-ridge Frangi demo; scale and contrast matter. Texture may also respond.', complexity: 'O(Nk) smoothing plus fixed derivative stencils.' },
    Thresholding: { controls: ['threshold'], source: sk + 'skimage.filters.html', applications: 'Document binarization, foreground mask experiments.', advantages: 'Creates discrete regions with interpretable intensity rules.', limitations: 'A threshold does not understand objects. Shadows and overlapping intensity distributions can defeat it.', complexity: 'Global threshold O(N); local statistics O(Nk); three-class Otsu O(N+256²).' },
    'Modern AI': { controls: [], source: 'https://arxiv.org/abs/1608.03981', applications: 'Learned image restoration, photography, denoising research.', advantages: 'A trained model can learn richer image priors than a small fixed kernel.', limitations: 'Requires appropriate pretrained weights, licensing, and validation. No neural restoration model is downloaded or executed in this laboratory.', complexity: 'Depends on architecture, image dimensions, precision, and hardware.' },
    Custom: { controls: ['offset'], source: docs + 'd4/d13/tutorial_py_filtering.html', applications: 'Designing and understanding a spatial correlation kernel.', advantages: 'Every coefficient is editable and the output is directly observable.', limitations: 'Negative coefficients and offsets may clip the 8-bit display. Zero-sum kernels are not normalized.', complexity: 'Direct implementation O(Nk²), k = 3, 5, or 7.' },
};
type Entry = [
    string,
    string,
    string,
    string,
    string?,
    string[]?
];
const groups: Record<string, Entry[]> = {
    Smoothing: [
        ['mean', 'Mean / Average', 'Replaces each pixel by the average of its square neighborhood.', String.raw `g(x,y)=\frac{1}{k^2}\sum_{(i,j)\in\Omega}f(x+i,y+j)`],
        ['box', 'Box filter', 'A uniform square kernel; mathematically the same normalized operation as the mean filter.', String.raw `K_{ij}=1/k^2`],
        ['weighted-mean', 'Weighted mean', 'Gives the center more influence using a separable triangular weighting.', String.raw `g=\frac{\sum w_{ij}f_{ij}}{\sum w_{ij}}`],
        ['gaussian', 'Gaussian', 'Smooths with a bell-shaped neighborhood that gives nearby pixels more weight.', String.raw `G(x,y)=\frac{e^{-\frac{x^2}{2\sigma_x^2}-\frac{y^2}{2\sigma_y^2}}}{2\pi\sigma_x\sigma_y}`, 'The finite sampled kernel is renormalized to sum to one. Sigma controls spread; kernel size controls support.', ['size', 'sigma', 'sigmaY']],
        ['binomial', 'Binomial', 'Uses Pascal-triangle coefficients as a discrete smoothing kernel.', String.raw `K=\frac{1}{16}\begin{bmatrix}1&2&1\\2&4&2\\1&2&1\end{bmatrix}`, 'The displayed example is 3×3; the live kernel grows with size.'],
    ],
    'Order statistics': [
        ['median', 'Median', 'Replaces a pixel with the middle sorted neighborhood value.', String.raw `g(x,y)=\operatorname{median}\{f_{ij}:(i,j)\in\Omega\}`, 'Useful to test on salt-and-pepper noise; not an average.'],
        ['weighted-median', 'Weighted median', 'Repeats the center sample five times before taking the neighborhood median.', String.raw `g=\operatorname{weightedMedian}(f,w)`, 'This browser variant uses center weight 5 and weight 1 elsewhere.'],
        ['adaptive-median', 'Adaptive median', 'Expands from 3×3 up to the chosen window until the median is not an extreme.', String.raw `z_{\min}<z_{\mathrm{med}}<z_{\max}`, 'If the center is not an extreme, keep it; otherwise use the median.'],
        ['min', 'Minimum', 'Takes the smallest neighborhood intensity.', String.raw `g=\min_{\Omega} f`],
        ['max', 'Maximum', 'Takes the largest neighborhood intensity.', String.raw `g=\max_{\Omega} f`],
        ['midpoint', 'Midpoint', 'Averages the minimum and maximum values.', String.raw `g=(\min_{\Omega}f+\max_{\Omega}f)/2`],
        ['percentile', 'Percentile', 'Chooses the sorted value at the selected percentile.', String.raw `g=Q_p(f_{\Omega})`, 'Nearest order statistic; 50% gives the median for an odd window.', ['size', 'percentile']],
        ['trimmed', 'Alpha-trimmed mean', 'Discards a selected fraction at each end before averaging.', String.raw `g=\frac{1}{n-2d}\sum_{i=d+1}^{n-d}z_{(i)}`, 'Trim percentage is applied independently to each end.', ['size', 'trim']],
        ['geometric', 'Geometric mean', 'Averages in log-intensity space.', String.raw `g=\left(\prod_{i=1}^{n}z_i\right)^{1/n}`, 'Any zero sample makes the geometric mean zero.'],
        ['harmonic', 'Harmonic mean', 'Uses the reciprocal of the average reciprocal intensity.', String.raw `g=n\left(\sum_i 1/z_i\right)^{-1}`, 'A zero sample is handled by the zero-valued limiting result.'],
        ['contra', 'Contra-harmonic mean', 'Weights bright and dark samples differently using order Q.', String.raw `g=\frac{\sum_i z_i^{Q+1}}{\sum_i z_i^Q}`, 'Positive Q suppresses dark impulses; negative Q suppresses bright impulses. Zero cases use limits.', ['size', 'q']],
    ],
    Sharpening: [
        ['laplacian', 'Laplacian', 'Measures second spatial differences; displays their absolute response.', String.raw `\nabla^2f=f_{xx}+f_{yy}`, 'Four-neighbor stencil; absolute response is clipped to 8-bit.'],
        ['high-pass', 'High-pass stencil', 'Subtracts the eight neighbors from eight times the center.', String.raw `K=\begin{bmatrix}-1&-1&-1\\-1&8&-1\\-1&-1&-1\end{bmatrix}`, 'Displays absolute response. This is a spatial stencil, not an ideal FFT high-pass filter.'],
        ['unsharp', 'Unsharp masking', 'Adds back a scaled difference between the original and its blur.', String.raw `g=f+a(f-G_\sigma*f)`, 'Amount a controls enhancement; both sigmas and kernel size control the blur.', ['size', 'sigma', 'sigmaY', 'amount']],
        ['high-boost', 'High-boost', 'Boosts the original and subtracts a blurred component.', String.raw `g=(1+a)f-G_\sigma*f`, 'Here a = 1 produces conventional unsharp masking with unit detail gain.', ['size', 'sigma', 'sigmaY', 'amount']],
        ['laplacian-sharpen', 'Laplacian sharpening', 'Subtracts a scaled Laplacian from the input.', String.raw `g=f-a\nabla^2f`],
    ],
    Edges: [
        ['roberts', 'Roberts cross', 'Measures differences along two diagonals in a 2×2 neighborhood.', String.raw `G_x=f_{00}-f_{11},\quad G_y=f_{10}-f_{01}`],
        ['prewitt', 'Prewitt', 'Combines a first difference with uniform perpendicular smoothing.', String.raw `M=\sqrt{G_x^2+G_y^2}`],
        ['sobel', 'Sobel', 'Combines a first difference with 1–2–1 perpendicular smoothing.', String.raw `G_x=\begin{bmatrix}-1&0&1\\-2&0&2\\-1&0&1\end{bmatrix}\star f`, 'Direction selects |Gx|, |Gy|, or gradient magnitude. Display values are clipped.'],
        ['scharr', 'Scharr', 'A 3×3 gradient stencil with 3–10–3 smoothing weights.', String.raw `G_x=\begin{bmatrix}-3&0&3\\-10&0&10\\-3&0&3\end{bmatrix}\star f`],
        ['farid', 'Farid', 'Uses a five-tap smoothing and derivative pair.', String.raw `G_x=d_x\star s_y\star f`, 'Uses the five-tap Farid–Simoncelli coefficient set.'],
        ['log', 'Laplacian of Gaussian', 'Smooths first, then measures second differences.', String.raw `g=\left|\nabla^2(G_\sigma*f)\right|`, 'Discrete approximation using a Gaussian blur followed by the four-neighbor Laplacian.', ['size', 'sigma', 'sigmaY']],
        ['dog', 'Difference of Gaussians', 'Subtracts two differently blurred versions.', String.raw `g=\left|G_\sigma*f-G_{1.6\sigma}*f\right|`, 'Displays absolute difference × gain; the finite support is shared.', ['size', 'sigma', 'sigmaY', 'amount']],
        ['canny', 'Canny', 'Smooths, finds gradients, thins responses, and links weak edges to strong ones.', String.raw `M=\sqrt{G_x^2+G_y^2},\quad T_\mathrm{low}\le T_\mathrm{high}`, 'Gaussian → fixed 3×3 Sobel → four-direction nonmaximum suppression → 8-connected hysteresis.', ['size', 'sigma', 'sigmaY', 'lower', 'upper']],
        ['marr', 'Marr–Hildreth', 'Detects sign changes in the Laplacian of a smoothed image.', String.raw `\nabla^2(G_\sigma*f)=0`, 'Four-neighbor zero crossings require a difference larger than threshold / 10.', ['size', 'sigma', 'sigmaY', 'threshold']],
        ['deriche', 'Deriche', 'Uses recursive filtering to approximate smooth derivatives.', String.raw `y[n]=\sum_i a_i x[n-i]-\sum_j b_j y[n-j]`, 'Reference only: recursive coefficients and boundary initialization are not implemented.'],
    ],
    'Edge preserving': [
        ['bilateral', 'Bilateral', 'Weights neighbors by both spatial distance and intensity similarity.', String.raw `g_p=\frac{\sum_q G_{\sigma_s}(p-q)G_{\sigma_r}(f_p-f_q)f_q}{\sum_q G_{\sigma_s}(p-q)G_{\sigma_r}(f_p-f_q)}`, 'Live variant processes RGB channels independently; it is not a joint vector-color bilateral filter.'],
        ['guided', 'Guided filter', 'Fits a local linear model of the input and averages model coefficients.', String.raw `a=\frac{\sigma_I^2}{\sigma_I^2+\epsilon},\quad b=\mu_I(1-a),\quad q=\bar a I+\bar b`, 'Self-guided, per-channel variant. Epsilon equals sigma color squared.', ['size', 'color']],
        ['joint-bilateral', 'Joint bilateral', 'Uses a separate guidance image to determine range weights.', String.raw `g_p=\frac{\sum_q w(p,q;I)f_q}{\sum_q w(p,q;I)}`, 'Reference: requires an aligned second image, which this lab does not accept.'],
        ['cross-bilateral', 'Cross bilateral', 'Another name for bilateral filtering controlled by a second image.', String.raw `w=G_{\sigma_s}(p-q)G_{\sigma_r}(I_p-I_q)`, 'Reference: see joint bilateral filtering.'],
        ['adaptive-bilateral', 'Adaptive bilateral', 'Adapts the range kernel or its center to local content.', String.raw `w_{pq}=w_{pq}(\text{local statistics})`, 'Reference: several variants exist; there is no single universal adaptation rule.'],
        ['domain-transform', 'Domain transform', 'Transforms image coordinates to simplify edge-aware smoothing.', String.raw `d(x)=\int_0^x\left(1+\frac{\sigma_s}{\sigma_r}|I'(u)|\right)du`, 'Reference: the 1D formula illustrates the coordinate transform.'],
        ['rolling-guidance', 'Rolling guidance', 'Repeatedly updates guidance to separate structure by scale.', String.raw `J^{t+1}=\operatorname{JointBilateral}(f,J^t)`, 'Reference: initialization and scale parameters determine what details disappear.'],
    ],
    Frequency: [
        ['ideal-lpf', 'Ideal low-pass', 'Retains frequencies inside a disk.', String.raw `H(D)=\mathbf{1}[D\le D_0]`], ['ideal-hpf', 'Ideal high-pass', 'Retains frequencies outside a disk.', String.raw `H(D)=1-\mathbf{1}[D\le D_0]`],
        ['butter-lpf', 'Butterworth low-pass', 'Uses a smooth low-pass amplitude response.', String.raw `H(D)=\frac{1}{1+(D/D_0)^{2n}}`, 'Order controls transition steepness. Frequency units are cycles per pixel.'], ['butter-hpf', 'Butterworth high-pass', 'Complements the Butterworth low-pass response.', String.raw `H_{HP}=1-H_{LP}`],
        ['gaussian-lpf', 'Gaussian low-pass', 'Smoothly suppresses high spatial frequencies.', String.raw `H(D)=e^{-D^2/(2D_0^2)}`], ['gaussian-hpf', 'Gaussian high-pass', 'Removes the low frequencies selected by a Gaussian.', String.raw `H_{HP}(D)=1-e^{-D^2/(2D_0^2)}`],
        ['band-pass', 'Band-pass', 'Retains an ideal radial band around the cutoff.', String.raw `H(D)=\mathbf{1}[D_0-b/2\le D\le D_0+b/2]`], ['band-reject', 'Band-reject', 'Removes an ideal radial band around the cutoff.', String.raw `H_{BR}=1-H_{BP}`],
        ['notch-pass', 'Notch pass', 'Retains two conjugate circular frequency neighborhoods.', String.raw `H_{NP}=1-H_{NR}`], ['notch-reject', 'Notch reject', 'Removes two conjugate circular frequency neighborhoods.', String.raw `H_{NR}=\mathbf{1}[D_+>b/2]\mathbf{1}[D_->b/2]`],
        ['butter-notch', 'Butterworth notch', 'Uses smooth Butterworth rejection around a conjugate pair.', String.raw `H=\prod_{s\in\{+,-\}}\frac{1}{1+(b/(2D_s))^{2n}}`], ['gaussian-notch', 'Gaussian notch', 'Uses Gaussian rejection around a conjugate pair.', String.raw `H=\prod_{s\in\{+,-\}}\left(1-e^{-D_s^2/(2(b/2)^2)}\right)`],
    ],
    Morphology: [
        ['erosion', 'Erosion', 'Shrinks bright regions by taking a neighborhood minimum.', String.raw `f\ominus B=\min_{b\in B} f(x+b)`], ['dilation', 'Dilation', 'Expands bright regions by taking a neighborhood maximum.', String.raw `f\oplus B=\max_{b\in B} f(x-b)`],
        ['opening', 'Opening', 'Erodes then dilates to remove small bright structures.', String.raw `f\circ B=(f\ominus B)\oplus B`], ['closing', 'Closing', 'Dilates then erodes to fill small dark gaps.', String.raw `f\bullet B=(f\oplus B)\ominus B`],
        ['morph-gradient', 'Morphological gradient', 'Subtracts erosion from dilation.', String.raw `g=(f\oplus B)-(f\ominus B)`], ['top-hat', 'Top-hat', 'Subtracts an opening from the input.', String.raw `g=f-(f\circ B)`], ['black-hat', 'Black-hat', 'Subtracts the input from its closing.', String.raw `g=(f\bullet B)-f`],
        ['hit-miss', 'Hit-or-miss', 'Finds a specified binary foreground/background pattern.', String.raw `A\circledast(B_1,B_2)=(A\ominus B_1)\cap(A^c\ominus B_2)`, 'Reference: requires two disjoint pattern masks, not the flat square used by the live morphology filters.'],
        ['reconstruction', 'Morphological reconstruction', 'Iteratively expands a marker under a mask.', String.raw `J_{t+1}=\min(\delta(J_t),M)`, 'Reference: an explicit marker/mask pair is required.'],
    ],
    Texture: [
        ['gabor', 'Gabor', 'Combines a sinusoid with a Gaussian spatial envelope.', String.raw `g(x,y)=e^{-(x'^2+\gamma^2y'^2)/(2\sigma^2)}\cos(2\pi x'/\lambda)`, 'Real component, gamma = 0.5; sampled kernel is centered to zero mean and normalized by absolute sum.'],
        ['gabor-bank', 'Gabor filter bank', 'Combines Gabor responses over several scales and orientations.', String.raw `\{g_{\theta,\lambda}\star f\}_{\theta,\lambda}`, 'Reference: compare individual Gabor settings in the live lab.'],
        ['laws', 'Laws texture (L5E5)', 'Uses a level vector and an edge vector to extract texture response.', String.raw `L_5=(1,4,6,4,1),\quad E_5=(-1,-2,0,2,1)`, 'Live output is |L5ᵀE5 correlation| × gain / 48, not a complete multi-mask Laws energy classifier.', ['amount']],
        ['entropy', 'Local entropy', 'Measures uncertainty of a 16-bin local intensity histogram.', String.raw `H=-\sum_b p_b\log_2 p_b`, 'Luminance quantized to 16 bins; 0–4 bits mapped to 0–255 for display.', ['size']],
        ['steerable', 'Steerable filters', 'Synthesizes oriented responses from a small basis.', String.raw `G_\theta=\cos\theta\,G_x+\sin\theta\,G_y`, 'Reference: the formula is the first-derivative steering relation.'],
    ],
    Wavelets: [
        ['haar', 'Haar', 'Averages and differences adjacent samples, then shrinks detail coefficients.', String.raw `a=(x_0+x_1)/\sqrt2,\quad d=(x_0-x_1)/\sqrt2`, 'One-level 2D orthonormal Haar; odd final rows/columns remain unchanged.'],
        ['daubechies', 'Daubechies wavelets', 'Compactly supported orthogonal wavelets with selectable vanishing moments.', String.raw `\sum_n h[n]h[n-2k]=\delta[k]`, 'Reference: coefficients and boundary extensions depend on the selected family order.'],
        ['symlets', 'Symlets', 'Orthogonal wavelet families designed for increased symmetry.', String.raw `f=\sum_k a_k\phi_k+\sum_{j,k}d_{j,k}\psi_{j,k}`, 'Reference: not interchangeable with Haar coefficients.'],
        ['coiflets', 'Coiflets', 'Wavelet families with moment conditions on both wavelet and scaling functions.', String.raw `\int x^m\psi(x)\,dx=0`, 'Reference: moment count depends on the chosen order.'],
        ['biorthogonal', 'Biorthogonal wavelets', 'Uses separate analysis and synthesis filter pairs.', String.raw `\langle\psi_{j,k},\widetilde\psi_{l,m}\rangle=\delta_{jl}\delta_{km}`, 'Reference: exact coefficients must match the chosen pair.'],
        ['wavelet-threshold', 'Wavelet threshold denoising', 'Soft-thresholds detail coefficients and reconstructs the image.', String.raw `\widehat d=\operatorname{sgn}(d)\max(|d|-T,0)`, 'The installed transform is one-level Haar, not a selectable wavelet family.'],
    ],
    Restoration: [
        ['wiener', 'Local Wiener', 'Balances the local mean against the center using local variance and noise variance.', String.raw `g=\mu+\frac{\max(\sigma^2-\nu^2,0)}{\max(\sigma^2,\epsilon)}(f-\mu)`, 'Noise control is the assumed standard deviation in 8-bit intensity units.', ['size', 'noise']],
        ['inverse', 'Inverse filtering', 'Divides an observation spectrum by a known blur response.', String.raw `\widehat F=G/H`, 'Reference: requires a known transfer function and treatment of zeros. Naive division amplifies noise.'],
        ['regularized-inverse', 'Regularized inverse', 'Stabilizes deconvolution with a regularization term.', String.raw `\widehat F=\frac{H^*G}{|H|^2+\lambda|P|^2}`, 'Reference: the blur H, penalty P, and lambda must be chosen explicitly.'],
        ['nlm', 'Non-local means', 'Averages pixels with weights based on patch similarity.', String.raw `g_p=\frac{\sum_q e^{-\|P_p-P_q\|^2/h^2}f_q}{\sum_q e^{-\|P_p-P_q\|^2/h^2}}`, 'Reference: patch search is not installed in this browser engine.'],
        ['bm3d', 'BM3D', 'Groups similar patches for collaborative transform-domain denoising.', String.raw `\widehat f=\operatorname{Aggregate}(\operatorname{Shrink}(\operatorname{Group}(f)))`, 'Reference schematic, not a complete BM3D equation or implementation.'],
        ['tv', 'Total variation', 'Balances fidelity to the input against a gradient-magnitude penalty.', String.raw `\widehat u=\arg\min_u\frac12\|u-f\|_2^2+\lambda\|\nabla u\|_1`, 'Reference: an iterative optimizer is required; it is not installed here.'],
        ['richardson-lucy', 'Richardson–Lucy', 'Iteratively estimates an image under a known convolution blur and Poisson model.', String.raw `f^{t+1}=f^t\left[H^*\star\frac{g}{H\star f^t+\epsilon}\right]`, 'Live demonstration assumes a symmetric Gaussian PSF. It is not blind deconvolution.', ['size', 'sigma', 'sigmaY', 'iterations']],
    ],
    Diffusion: [
        ['isotropic', 'Isotropic diffusion', 'Smooths equally in four grid directions.', String.raw `u^{t+1}=u^t+0.2\sum_{q\in N_4}(u_q^t-u_p^t)`, 'A four-neighbor explicit heat-equation step.', ['iterations']],
        ['anisotropic', 'Anisotropic diffusion', 'Reduces diffusion across large intensity differences.', String.raw `\partial_tu=\nabla\cdot(c(|\nabla u|)\nabla u)`, 'This live entry uses the exponential Perona–Malik conductance.'],
        ['perona-malik', 'Perona–Malik', 'Uses contrast-dependent conductance for edge-aware diffusion.', String.raw `c(s)=e^{-(s/\kappa)^2}`, 'Same implemented variant as Anisotropic diffusion; kappa is the edge sensitivity.'],
        ['curvature', 'Curvature diffusion', 'Evolves level sets according to their curvature.', String.raw `\partial_tu=|\nabla u|\,\nabla\cdot\left(\frac{\nabla u}{|\nabla u|}\right)`, 'Reference: stable discretization near zero gradient is required.'],
    ],
    Ridges: [
        ['frangi', 'Frangi vesselness', 'Scores Hessian eigenvalues for bright line-like structure.', String.raw `V=e^{-R_B^2/(2\beta^2)}(1-e^{-S^2/(2c^2)})`, 'Single scale; beta = 0.5. Response is zero when the larger-magnitude eigenvalue is positive.'],
        ['sato', 'Sato', 'Uses multiscale second derivatives to enhance line structures.', String.raw `H_\sigma=\sigma^2\nabla^2(G_\sigma*f)`, 'Reference: the Hessian is a matrix of second derivatives; a complete Sato scoring rule is not installed.'],
        ['meijering', 'Meijering', 'Enhances neurite-like structures using adjusted Hessian eigenvalues.', String.raw `H_\sigma=\sigma^2\begin{bmatrix}f_{xx}&f_{xy}\\f_{xy}&f_{yy}\end{bmatrix}`, 'Reference: this is the underlying Hessian, not the complete enhancement formula.'],
        ['hessian', 'Hessian trace', 'Shows the absolute trace of the smoothed intensity Hessian.', String.raw `|\operatorname{tr}H|=|f_{xx}+f_{yy}|`, 'This live diagnostic is a Laplacian trace, not a multiscale vesselness classifier.'],
        ['vesselness', 'Vesselness methods', 'A family of ridge-enhancement measures rather than a unique filter.', String.raw `V=\Phi(\lambda_1,\lambda_2,\sigma)`, 'Reference: use the live Frangi entry for one explicit scoring function.'],
    ],
    Thresholding: [
        ['global', 'Global threshold', 'Separates intensities above and below a chosen level.', String.raw `g=255\,\mathbf1[f>T]`],
        ['adaptive', 'Adaptive mean threshold', 'Compares each pixel to its local mean minus a bias.', String.raw `g_p=255\,\mathbf1[f_p>\mu_{\Omega_p}-C]`, 'Same live operation as Local threshold.', ['size', 'bias']],
        ['local', 'Local threshold', 'Uses a neighborhood-specific threshold instead of one image-wide value.', String.raw `T_p=\mu_{\Omega_p}-C`, 'This lab implements the local mean-minus-bias variant.', ['size', 'bias']],
        ['otsu', 'Otsu', 'Chooses a threshold maximizing between-class histogram variance.', String.raw `T=\arg\max_t w_0(t)w_1(t)(\mu_0(t)-\mu_1(t))^2`, 'No manual threshold parameter; works best when classes have separable intensities.', []],
        ['multi-otsu', 'Multi-Otsu', 'Finds two thresholds for three histogram classes.', String.raw `(T_1,T_2)=\arg\max\sum_{j=0}^{2}w_j(\mu_j-\mu)^2`, 'Three classes displayed at 0, 127, and 255.', []],
        ['niblack', 'Niblack', 'Combines local mean and standard deviation.', String.raw `T=\mu+k\sigma`, 'k can be positive or negative.', ['size', 'sauvola']],
        ['sauvola', 'Sauvola', 'Adapts the threshold to local mean and contrast.', String.raw `T=\mu\left[1+k\left(\frac{\sigma}{128}-1\right)\right]`, 'The dynamic-range constant is fixed at 128 for 8-bit luminance.', ['size', 'sauvola']],
        ['li', 'Li minimum cross-entropy', 'Iteratively updates a two-class threshold from class means.', String.raw `T_{t+1}=\frac{\mu_0-\mu_1}{\ln\mu_0-\ln\mu_1}`, 'Zero class-mean cases use a finite mean midpoint fallback.', []],
        ['yen', 'Yen', 'Selects a threshold using an entropy-based criterion.', String.raw `T=\arg\max_t J_{\mathrm{Yen}}(t)`, 'Reference schematic: consult the linked implementation for the complete criterion.', []],
        ['triangle', 'Triangle', 'Finds the histogram bin farthest from a peak-to-tail line.', String.raw `T=\arg\max_i d((i,h_i),\ell_{\mathrm{peak,tail}})`, 'The longer histogram tail determines the baseline.', []],
        ['isodata', 'ISODATA', 'Iterates the midpoint of the two class means.', String.raw `T_{t+1}=(\mu_0(T_t)+\mu_1(T_t))/2`, 'Stops at a change below 0.5 intensity levels or after 80 iterations.', []],
        ['hysteresis', 'Hysteresis threshold', 'Keeps low-threshold pixels connected to a high-threshold seed.', String.raw `g=\operatorname{Reach}_{f\ge T_l}(f\ge T_h)`, '8-connected flood fill; unlike Canny this does not compute gradients first.', ['lower', 'upper']],
    ],
    Custom: [['custom', 'Custom kernel', 'Build a spatial filter by editing each coefficient.', String.raw `g(x,y)=\sum_{i,j}K_{ij}f(x+i,y+j)+b`, 'Correlation is used: the kernel is not flipped. Optional normalization divides by the nonzero kernel sum.']],
};
const ai: Entry[] = [
    ['cnn', 'CNN denoising', 'Learns a mapping or noise residual from convolutional feature hierarchies.', String.raw `\widehat x=f_\theta(y)`],
    ['dncnn', 'DnCNN', 'Learns a residual noise estimate with a deep convolutional network.', String.raw `\widehat x=y-R_\theta(y)`, 'https://arxiv.org/abs/1608.03981'],
    ['ffdnet', 'FFDNet', 'Conditions denoising on an explicit noise-level map.', String.raw `\widehat x=f_\theta(y,\sigma)`, 'https://arxiv.org/abs/1710.04026'],
    ['noise2noise', 'Noise2Noise', 'Trains with pairs of independently corrupted observations under suitable noise assumptions.', String.raw `\min_\theta\mathbb E\|f_\theta(y_1)-y_2\|^2`, 'https://arxiv.org/abs/1803.04189'],
    ['noise2void', 'Noise2Void', 'Predicts held-out pixels from surrounding context using a blind-spot training strategy.', String.raw `\min_\theta\sum_{i\in M}|f_\theta(y_{\setminus M})_i-y_i|^2`, 'https://arxiv.org/abs/1811.10980'],
    ['noise2self', 'Noise2Self', 'Uses a self-supervised loss with information held out from each prediction.', String.raw `\mathbb E\|f_\theta(y)_J-y_J\|^2`, 'https://arxiv.org/abs/1901.11365'],
    ['swinir', 'SwinIR', 'Uses shifted-window transformer blocks for image restoration.', String.raw `\widehat x=f_\theta(y)`, 'https://arxiv.org/abs/2108.10257'],
    ['restormer', 'Restormer', 'Uses an efficient transformer architecture for high-resolution restoration.', String.raw `\widehat x=f_\theta(y)`, 'https://arxiv.org/abs/2111.09881'],
    ['nafnet', 'NAFNet', 'Studies a simple restoration architecture without conventional nonlinear activation functions.', String.raw `\widehat x=y+R_\theta(y)`, 'https://arxiv.org/abs/2204.04676'],
];
groups['Modern AI'] = ai;
export const filters: Filter[] = Object.entries(groups).flatMap(([category, entries]) => entries.map(([id, name, purpose, formula, note = '', controls]) => {
    const info = categoryInfo[category];
    return { ...info, id, name, category, purpose, formula, note: category === 'Modern AI' ? 'Educational overview only. Training data, model weights, and suitable inference infrastructure are required.' : note, controls: controls ?? info.controls, live: LIVE_FILTERS.includes(id), source: note.startsWith('https://') ? note : info.source, history: 'This entry summarizes the mathematical method rather than assigning an unverified inventor or date. Follow the primary documentation or paper below for attribution and development.' };
}));
export const byId = Object.fromEntries(filters.map(f => [f.id, f]));
// Only show controls used by the installed variant.
for (const f of filters) {
    if (['laplacian', 'high-pass'].includes(f.id))
        f.controls = [];
    if (f.id === 'hessian')
        f.controls = ['size', 'sigma', 'sigmaY'];
    if (f.category === 'Frequency') {
        f.controls = f.id.includes('notch') ? ['notchX', 'notchY', 'band'] : ['cutoff'];
        if (f.id.startsWith('band'))
            f.controls.push('band');
        if (f.id.startsWith('butter'))
            f.controls.push('order');
        if (f.id.endsWith('hpf') || ['band-pass', 'notch-pass'].includes(f.id))
            f.controls.push('amount');
    }
}
const histories: Record<string, string> = {
    gaussian: 'The Gaussian connects probability, linear diffusion, and scale-space analysis. Image smoothing uses a sampled, finite approximation of this continuous kernel; no single inventor of the modern image operation is assigned here.',
    canny: 'John Canny introduced the multi-stage detector in 1986, seeking a balance between detection, localization, and a single response per edge. This version uses discrete smoothing and thinning followed by hysteresis.',
    median: 'Median filtering brings a robust order statistic into a moving neighborhood. It is a standard alternative to averaging when isolated extreme samples dominate; the first image-processing use is not attributed here.',
    dncnn: 'Zhang and colleagues introduced DnCNN in a 2016 preprint, followed by a 2017 journal paper. Residual prediction estimates a noise component rather than directly reconstructing every clean pixel.',
    ffdnet: 'Zhang, Zuo, and Zhang presented FFDNet in a 2017 preprint and a 2018 journal paper, adding explicit noise-level conditioning to convolutional denoising.',
    noise2noise: 'Lehtinen and colleagues presented Noise2Noise in 2018. Suitable independently corrupted training pairs can replace clean targets under the assumptions analyzed in their paper.',
    noise2void: 'Krull, Buchholz, and Jug introduced Noise2Void in a 2018 preprint. Blind-spot training avoids directly copying the noisy pixel being predicted.',
    noise2self: 'Batson and Royer introduced Noise2Self in 2019, using information isolation and a self-supervised objective under suitable noise assumptions.',
    swinir: 'Liang and colleagues presented SwinIR in 2021, adapting shifted-window transformer features to image restoration.',
    restormer: 'Zamir and colleagues introduced Restormer in a 2021 preprint, targeting efficient high-resolution restoration with a specialized attention and feed-forward design.',
    nafnet: 'Chen and colleagues presented Simple Baselines for Image Restoration in 2022, studying simplified blocks and introducing NAFNet.',
};
for (const f of filters)
    if (histories[f.id])
        f.history = histories[f.id];
export const controlInfo: Record<string, {
    label: string;
    min: number;
    max: number;
    step: number;
    hint: string;
}> = {
    size: { label: 'Kernel size', min: 3, max: 9, step: 2, hint: 'Odd square neighborhood, in pixels.' }, sigma: { label: 'Sigma X / spatial sigma', min: .3, max: 5, step: .1, hint: 'Gaussian spread in pixels.' }, sigmaY: { label: 'Sigma Y', min: .3, max: 5, step: .1, hint: 'Vertical Gaussian spread in pixels.' }, amount: { label: 'Amount / display gain', min: 0, max: 5, step: .1, hint: 'Detail multiplier; see the selected filter’s formula.' }, threshold: { label: 'Threshold', min: 0, max: 255, step: 1, hint: '8-bit intensity level; zero crossings use T / 10.' }, lower: { label: 'Lower threshold', min: 0, max: 255, step: 1, hint: 'Weak responses are kept only when linked to strong responses.' }, upper: { label: 'Upper threshold', min: 0, max: 255, step: 1, hint: 'Strong-edge seed level; cannot be below the lower threshold.' }, percentile: { label: 'Percentile', min: 0, max: 100, step: 1, hint: 'Position in the sorted neighborhood.' }, trim: { label: 'Trim from each end (%)', min: 0, max: 45, step: 1, hint: 'Fraction removed at both ends before averaging.' }, q: { label: 'Order Q', min: -2, max: 2, step: .1, hint: 'Positive: dark-impulse suppression. Negative: bright-impulse suppression.' }, color: { label: 'Sigma color / contrast scale', min: 1, max: 100, step: 1, hint: 'Intensity scale; self-guided epsilon = this value squared.' }, cutoff: { label: 'Cutoff (cycles/pixel)', min: .01, max: .45, step: .01, hint: 'Radial cutoff; the axis Nyquist frequency is 0.5.' }, order: { label: 'Filter order', min: 1, max: 8, step: 1, hint: 'Higher Butterworth order gives a steeper transition.' }, band: { label: 'Band / notch width', min: .02, max: .4, step: .01, hint: 'Cycles per pixel. Notch radius is half this value.' }, notchX: { label: 'Notch X frequency', min: 0, max: .45, step: .01, hint: 'A conjugate notch at the negative frequency is also applied.' }, notchY: { label: 'Notch Y frequency', min: 0, max: .45, step: .01, hint: 'Location of the conjugate frequency pair.' }, angle: { label: 'Orientation (degrees)', min: 0, max: 180, step: 5, hint: 'Gabor sinusoid orientation.' }, wavelength: { label: 'Wavelength (pixels)', min: 2, max: 12, step: .5, hint: 'Distance between Gabor oscillations.' }, noise: { label: 'Noise sigma / coefficient threshold', min: 0, max: 60, step: 1, hint: 'Wiener: assumed noise sigma. Haar: soft threshold of detail coefficients.' }, iterations: { label: 'Iterations', min: 1, max: 20, step: 1, hint: 'Number of processing passes.' }, kappa: { label: 'Edge sensitivity κ', min: 1, max: 100, step: 1, hint: 'Larger values allow more smoothing across intensity differences.' }, bias: { label: 'Local bias C', min: -30, max: 30, step: 1, hint: 'Threshold = neighborhood mean − C.' }, sauvola: { label: 'Local coefficient k', min: -1, max: 1, step: .05, hint: 'Controls the contribution of local contrast.' }, offset: { label: 'Output offset', min: -128, max: 128, step: 1, hint: 'Added after applying the custom kernel.' },
};
export function pythonCode(filter: Filter, p: Record<string, number | string | boolean | number[]>, library = 'OpenCV') {
    const k = p.size, sx = Number(p.sigma).toFixed(2), sy = Number(p.sigmaY).toFixed(2), border = ({ reflect: 'cv.BORDER_REFLECT_101', replicate: 'cv.BORDER_REPLICATE', zero: 'cv.BORDER_CONSTANT', wrap: 'cv.BORDER_WRAP' } as Record<string, string>)[String(p.border)];
    if (!filter.live)
        return '# Reference method — not executed in this browser.\n# See the linked primary paper/documentation for a validated implementation.\n# ' + filter.source;
    const kernel = kernelFor(filter.id, p);
    if (library === 'NumPy' && kernel) {
        const n = Math.sqrt(kernel.length), rows = Array.from({ length: n }, (_, i) => kernel.slice(i * n, (i + 1) * n).map((v: number) => Number(v.toFixed(8)))), mode = ({ reflect: 'reflect', replicate: 'edge', zero: 'constant', wrap: 'wrap' } as Record<string, string>)[String(p.border)];
        const mapping = ['gabor', 'laws'].includes(filter.id) ? `np.abs(response) * ${Number(p.amount)}` : filter.id === 'custom' ? `response + ${Number(p.offset)}` : filter.id === 'laplacian-sharpen' ? `img - ${Number(p.amount)} * response` : ['laplacian', 'high-pass'].includes(filter.id) ? 'np.abs(response)' : 'response';
        const derivative = ['sobel', 'prewitt', 'scharr'].includes(filter.id);
        return `import numpy as np\nfrom PIL import Image\nfrom numpy.lib.stride_tricks import sliding_window_view\n\nimg = np.asarray(Image.open("input.png").convert("RGB"), dtype=float)\n${derivative ? 'img = (img @ np.array([0.299, 0.587, 0.114]))[..., None]\n' : ''}kernel = np.array(${JSON.stringify(rows)})\npadded = np.pad(img, ((${n >> 1}, ${n >> 1}), (${n >> 1}, ${n >> 1}), (0, 0)), mode="${mode}")\nwindows = sliding_window_view(padded, (${n}, ${n}), axis=(0, 1))\nresponse = np.einsum("hwcij,ij->hwc", windows, kernel)\n${derivative ? `gy = np.einsum("hwcij,ij->hwc", windows, kernel.T)\nresponse = ${p.direction === 'x' ? 'np.abs(response)' : p.direction === 'y' ? 'np.abs(gy)' : 'np.hypot(response, gy)'}\n` : ''}out = np.clip(np.rint(${mapping}), 0, 255).astype(np.uint8)\n# Finite sampled kernel; correlation rather than flipped convolution.\n# Very small image boundaries may differ from this browser implementation.`;
    }
    const head = 'import cv2 as cv\nimport numpy as np\n\nimg = cv.imread("input.png")\nassert img is not None\ngray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)\n';
    const cv: Record<string, string> = { gaussian: `out = cv.GaussianBlur(img, (${k}, ${k}), ${sx}, sigmaY=${sy}, borderType=${border})`, mean: `out = cv.blur(img, (${k}, ${k}), borderType=${border})`, box: `out = cv.boxFilter(img, -1, (${k}, ${k}), normalize=True, borderType=${border})`, median: `out = cv.medianBlur(img, ${k}) # OpenCV uses replicated borders`, bilateral: `out = cv.bilateralFilter(img, ${k}, ${p.color}, ${sx})\n# OpenCV jointly weights color; the browser variant is per-channel.`, canny: `smooth = cv.GaussianBlur(gray, (${k}, ${k}), ${sx}, sigmaY=${sy})\nout = cv.Canny(smooth, ${p.lower}, ${p.upper}, apertureSize=3, L2gradient=True)`, global: `_, out = cv.threshold(gray, ${p.threshold}, 255, cv.THRESH_BINARY)`, otsu: '_, out = cv.threshold(gray, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)', unsharp: `smooth = cv.GaussianBlur(img, (${k}, ${k}), ${sx}, sigmaY=${sy})\nout = cv.addWeighted(img, ${1 + Number(p.amount)}, smooth, -${p.amount}, 0)` };
    if (['sobel', 'scharr', 'prewitt', 'laplacian'].includes(filter.id))
        cv[filter.id] = filter.id === 'laplacian' ? `signed = cv.Laplacian(gray, cv.CV_64F, ksize=1, borderType=${border})\nout = np.clip(np.abs(signed), 0, 255).astype(np.uint8)` : `gx = cv.Sobel(gray, cv.CV_64F, 1, 0, ksize=3)\ngy = cv.Sobel(gray, cv.CV_64F, 0, 1, ksize=3)\nout = np.clip(${p.direction === 'x' ? 'np.abs(gx)' : p.direction === 'y' ? 'np.abs(gy)' : 'np.hypot(gx, gy)'}, 0, 255).astype(np.uint8)`;
    const morph: Record<string, string> = { erosion: 'ERODE', dilation: 'DILATE', opening: 'OPEN', closing: 'CLOSE', 'morph-gradient': 'GRADIENT', 'top-hat': 'TOPHAT', 'black-hat': 'BLACKHAT' };
    if (morph[filter.id])
        cv[filter.id] = `kernel = np.ones((${k}, ${k}), np.uint8)\nout = cv.morphologyEx(img, cv.MORPH_${morph[filter.id]}, kernel, borderType=${border})`;
    if (library === 'OpenCV' && cv[filter.id] && !(p.border === 'wrap') && !['prewitt', 'scharr'].includes(filter.id))
        return head + cv[filter.id] + '\n# Reference library example; rounding and boundary details may differ.';
    const funcs: Record<string, string> = { median: `ndimage.median_filter(img, size=(${k}, ${k}, 1), mode=mode)`, min: `ndimage.minimum_filter(img, size=(${k}, ${k}, 1), mode=mode)`, max: `ndimage.maximum_filter(img, size=(${k}, ${k}, 1), mode=mode)`, percentile: `ndimage.percentile_filter(img, ${p.percentile}, size=(${k}, ${k}, 1), mode=mode)` };
    if (library === 'SciPy' && funcs[filter.id])
        return `import numpy as np\nfrom scipy import ndimage\nfrom PIL import Image\nimg = np.asarray(Image.open("input.png").convert("RGB"))\nmode = "${({ reflect: 'mirror', replicate: 'nearest', zero: 'constant', wrap: 'wrap' } as Record<string, string>)[String(p.border)]}"\nout = ${funcs[filter.id]}`;
    return '# Exact browser implementation (parameters shown below):\n# /filterverse/engine.mjs → applyFilter\n# No equivalent ' + library + ' snippet is supplied for this variant.\n# Do not substitute a different algorithm under the same label.\n\nparameters = ' + JSON.stringify(p, null, 2).replaceAll('true', 'True').replaceAll('false', 'False') + '\n# Primary reference: ' + filter.source;
}
