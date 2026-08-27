export type ConceptCard = {
  title: string;
  text: string;
  tag?: string;
};

export type FormulaCard = {
  label: string;
  expression: string;
  note: string;
};

export type LessonTable = {
  caption: string;
  headers: string[];
  rows: string[][];
};

export type UnitLesson = {
  id: string;
  label: string;
  nav: string;
  slides: string;
  eyebrow: string;
  title: string;
  intro: string;
  concepts: ConceptCard[];
  formulas?: FormulaCard[];
  steps?: { title: string; text: string }[];
  table?: LessonTable;
  takeaways: string[];
};

export const unitLessons: UnitLesson[] = [
  {
    id: "overview",
    label: "Overview",
    nav: "Your Unit 1 route",
    slides: "10–226",
    eyebrow: "Computer Vision · Unit 1",
    title: "From pixels to visual intelligence",
    intro:
      "A guided learning path through computer vision, digital image formation, enhancement, histograms and neighborhood filtering. The material is reorganized for the web so each idea builds naturally on the previous one.",
    concepts: [
      {
        tag: "01",
        title: "Understand vision",
        text: "Begin with how machines acquire, represent and interpret visual information—and how that process relates to human perception.",
      },
      {
        tag: "02",
        title: "Build a digital image",
        text: "Follow light through an imaging system, then study pixels, bit depth, frame rate, sampling and quantization.",
      },
      {
        tag: "03",
        title: "Improve information",
        text: "Use intensity transforms and histograms to reveal useful structure without pretending to recover detail that was never captured.",
      },
      {
        tag: "04",
        title: "Work with neighborhoods",
        text: "Finish with masks, boundary handling, correlation and convolution—the foundation of spatial filtering and modern vision models.",
      },
    ],
    steps: [
      { title: "Acquire", text: "Capture energy reflected, emitted or transmitted by a scene." },
      { title: "Represent", text: "Sample coordinates and quantize intensity into a pixel matrix." },
      { title: "Enhance", text: "Transform intensities or neighborhoods to make evidence easier to use." },
      { title: "Interpret", text: "Detect, classify, segment or measure what the image contains." },
    ],
    takeaways: [
      "217 source slides distilled into 13 connected lessons",
      "Definitions, formulas, corrected terminology and worked examples",
      "Original web-first explanations rather than pasted slide text",
    ],
  },
  {
    id: "cv-foundations",
    label: "Computer Vision",
    nav: "Ideas, workflow and tasks",
    slides: "10–32",
    eyebrow: "Foundations",
    title: "Teaching computers to interpret scenes",
    intro:
      "Computer vision turns visual measurements into useful decisions. It combines optics and image processing with machine learning, geometry, domain knowledge and—in embodied systems—robotics.",
    concepts: [
      {
        tag: "Scope",
        title: "More than image recognition",
        text: "A vision system may identify an object, locate it, separate every pixel belonging to it, estimate motion or depth, read text, or follow a body pose.",
      },
      {
        tag: "Data",
        title: "Useful data is representative",
        text: "Datasets such as ImageNet, COCO and Open Images help train models, but quality, diversity, labeling, augmentation and synthetic examples determine how well a system generalizes.",
      },
      {
        tag: "Models",
        title: "Choose a model for the structure",
        text: "CNNs learn local spatial patterns, recurrent models can handle ordered visual sequences, and Vision Transformers connect information across image patches using attention.",
      },
      {
        tag: "Tools",
        title: "A practical ecosystem",
        text: "OpenCV and scikit-image support classical processing; TensorFlow, Keras and torchvision support learned models; MATLAB and GPU platforms help with analysis and acceleration.",
      },
    ],
    steps: [
      { title: "Gather", text: "Collect examples that cover the real operating conditions." },
      { title: "Prepare", text: "Clean, resize, normalize and augment the visual data." },
      { title: "Select", text: "Match the architecture and objective to the task." },
      { title: "Train and assess", text: "Optimize against ground truth, then evaluate on unseen data." },
    ],
    takeaways: [
      "Classification answers what; detection adds where; segmentation assigns pixels",
      "Edge, pattern, feature and optical-flow methods expose different kinds of structure",
      "Training quality depends on the data and evaluation design as much as the architecture",
    ],
  },
  {
    id: "applications-ethics",
    label: "Applications & Ethics",
    nav: "Use cases and responsibility",
    slides: "31–42",
    eyebrow: "Vision in the world",
    title: "Capability must travel with responsibility",
    intro:
      "Vision systems now assist healthcare, autonomous mobility, unmanned aircraft, surveillance and robotic surgery. Their value depends on reliable operation in the real environment and careful treatment of the people they observe.",
    concepts: [
      {
        tag: "Mobility",
        title: "Road-scene understanding",
        text: "Vehicles must combine object detection, lane and free-space estimation, motion cues and depth. Unstructured traffic, weather and mixed road users make deployment harder than a clean benchmark.",
      },
      {
        tag: "Aerial",
        title: "UAV perception",
        text: "Drones use tracking and scene analysis for navigation, traffic monitoring, emergency response, surveillance and data collection, often under strict compute and power limits.",
      },
      {
        tag: "Health",
        title: "Medical and surgical support",
        text: "Visual analysis can highlight anatomy or abnormalities, while robotic systems can improve precision. Clinical decisions still require validated performance and human oversight.",
      },
      {
        tag: "Risk",
        title: "Responsible deployment",
        text: "Privacy, consent, bias, cultural context, transparency, dual use, child protection, energy cost and clear accountability belong in the system design—not in an afterthought.",
      },
    ],
    steps: [
      { title: "Define impact", text: "Identify who benefits, who may be observed and who could be harmed." },
      { title: "Measure fairness", text: "Test across relevant people, environments, devices and edge cases." },
      { title: "Protect data", text: "Minimize collection, control access and state retention clearly." },
      { title: "Keep oversight", text: "Provide explanations, escalation paths and a responsible human owner." },
    ],
    takeaways: [
      "Structured test scenes rarely capture the full difficulty of deployment",
      "Accuracy alone cannot answer questions of consent, fairness or appropriate use",
      "High-stakes predictions should support accountable decisions, not silently replace them",
    ],
  },
  {
    id: "image-formation",
    label: "Image Formation",
    nav: "Light, sensors and modalities",
    slides: "43–86",
    eyebrow: "Acquisition",
    title: "Every image begins as measured energy",
    intro:
      "An imaging system measures radiation after it interacts with an object. A lens or other projection system directs that energy to a sensor, which converts it into an electrical signal and finally a digital image.",
    concepts: [
      {
        tag: "Pipeline",
        title: "Source → object → sensor",
        text: "The source may illuminate the scene, or the object may emit energy itself. Reflection, transmission and absorption shape the signal that reaches the detector.",
      },
      {
        tag: "Sensors",
        title: "Single, line and array capture",
        text: "A single detector scans positions, a line sensor captures one strip at a time, and a 2D array records a full image plane. Each arrangement trades speed, hardware and motion requirements.",
      },
      {
        tag: "Spectrum",
        title: "Visible light is one narrow band",
        text: "Visible wavelengths occupy roughly 400–750 nm. Ultraviolet, infrared, millimeter-wave, X-ray, ultrasound and MRI systems reveal properties that ordinary cameras cannot see.",
      },
      {
        tag: "Perception",
        title: "The eye is a biological imaging system",
        text: "The iris controls incoming light, the lens forms an inverted retinal image, rods support low-light sensitivity, and three cone classes enable color and fine central vision.",
      },
    ],
    formulas: [
      {
        label: "Thin projection estimate",
        expression: "image height / focal distance = object height / object distance",
        note: "With a 17 mm eye distance, a 15 m object at 100 m forms an image about 2.55 mm high on the retina.",
      },
    ],
    takeaways: [
      "A modality should be selected for the physical property that must be measured",
      "Exposure, blur, noise, color imbalance and compression artifacts enter before interpretation",
      "Image formation explains both the information available and the limits of later processing",
    ],
  },
  {
    id: "digital-image",
    label: "Digital Image Model",
    nav: "Pixels, channels and pipelines",
    slides: "43–59, 84–86",
    eyebrow: "Representation",
    title: "An image is a sampled function",
    intro:
      "A digital image stores measurements on a discrete spatial grid. Each grid location is a pixel; its value can be a single intensity or a vector of channel values such as RGB or HSV.",
    concepts: [
      {
        tag: "Scalar",
        title: "Grayscale image",
        text: "I(m,n) returns one brightness value at row m and column n. In an 8-bit image, that value typically ranges from 0 for black to 255 for white.",
      },
      {
        tag: "Vector",
        title: "Color image",
        text: "A color pixel contains multiple components. RGB describes emitted red, green and blue energy; HSV separates hue and saturation from a brightness-like value.",
      },
      {
        tag: "Pipeline",
        title: "Processing stages have different jobs",
        text: "Acquisition captures the scene; enhancement and restoration improve usability; morphology and segmentation organize regions; description and recognition turn them into meaning.",
      },
      {
        tag: "Storage",
        title: "Compression changes the representation",
        text: "Compression reduces storage or transmission cost. Lossy methods may introduce blocking, ringing or missing fine detail that later algorithms can mistake for scene structure.",
      },
    ],
    formulas: [
      {
        label: "Discrete image",
        expression: "I[m, n] ∈ {0, …, L − 1}",
        note: "m and n index position; L is the number of representable intensity levels.",
      },
    ],
    takeaways: [
      "The matrix is the measurement; displayed appearance also depends on scaling and color mapping",
      "Processing can expose captured information but cannot recreate evidence that never reached the sensor",
      "A clear pipeline keeps enhancement, segmentation and recognition goals separate",
    ],
  },
  {
    id: "resolution",
    label: "Resolution",
    nav: "Spatial, intensity and time",
    slides: "87–92",
    eyebrow: "Image quality",
    title: "Where, how precisely, and when",
    intro:
      "Resolution has three independent dimensions. Spatial resolution describes the grid, intensity resolution describes available value levels, and temporal resolution describes how often the scene is sampled in time.",
    concepts: [
      {
        tag: "Where",
        title: "Spatial resolution",
        text: "Width × height gives the pixel count. More samples can preserve finer structure only when the optics and sensor actually capture it.",
      },
      {
        tag: "Precision",
        title: "Intensity resolution",
        text: "Bit depth controls how many values a pixel can represent. More levels produce smoother gradients and more room for tonal processing.",
      },
      {
        tag: "When",
        title: "Temporal resolution",
        text: "Frames per second sets the time between observations. Faster capture represents rapid motion more faithfully, with added bandwidth and light requirements.",
      },
    ],
    formulas: [
      { label: "Pixel count", expression: "Npixels = width × height", note: "1920 × 1080 contains 2,073,600 pixel locations." },
      { label: "Intensity levels", expression: "L = 2ᵇ", note: "An 8-bit channel provides 256 discrete values; 10-bit provides 1,024." },
      { label: "Frame interval", expression: "Δt = 1 / FPS", note: "At 30 FPS, adjacent frames are about 33.3 ms apart." },
    ],
    table: {
      caption: "Bit depth and available intensity levels",
      headers: ["Bits", "Levels", "Typical implication"],
      rows: [
        ["1", "2", "Binary mask"],
        ["4", "16", "Visible tonal steps"],
        ["8", "256", "Common display and image channel"],
        ["10", "1,024", "Finer capture and grading"],
        ["12", "4,096", "Higher measurement precision"],
      ],
    },
    takeaways: [
      "More pixels do not repair weak optics or motion blur",
      "Higher bit depth reduces banding but increases data size",
      "Frame rate, exposure time and available light must be balanced together",
    ],
  },
  {
    id: "sampling-quantization",
    label: "Sampling & Quantization",
    nav: "Turning signals into pixels",
    slides: "93–119",
    eyebrow: "Digitization",
    title: "Coordinates are sampled; intensities are quantized",
    intro:
      "Digitization makes two different choices. Sampling selects discrete spatial or temporal locations. Quantization assigns each measured value to one of a finite set of intensity levels.",
    concepts: [
      {
        tag: "Sampling",
        title: "Choose measurement locations",
        text: "A finer grid follows rapid spatial changes more closely. If the grid is too coarse, different scene patterns can produce the same samples—an ambiguity called aliasing.",
      },
      {
        tag: "Quantization",
        title: "Choose representable values",
        text: "Each continuous measurement is rounded to an available level. Too few levels create false contours in otherwise smooth regions.",
      },
      {
        tag: "Scaling",
        title: "Zooming needs interpolation",
        text: "Nearest-neighbor repeats samples, bilinear interpolation blends four nearby values, and bicubic interpolation uses a wider neighborhood for smoother estimates.",
      },
      {
        tag: "Trade-off",
        title: "Content determines what matters",
        text: "A crowded scene often benefits from spatial detail, while smooth facial shading may benefit more from intensity levels. One resolution budget does not fit every image.",
      },
    ],
    formulas: [
      {
        label: "Nyquist condition",
        expression: "sampling frequency ≥ 2 × highest signal frequency",
        note: "An anti-aliasing low-pass filter is commonly applied before reducing the sampling rate.",
      },
    ],
    steps: [
      { title: "Low-pass", text: "Remove detail that the target grid cannot represent." },
      { title: "Sample", text: "Measure the filtered signal at discrete coordinates." },
      { title: "Quantize", text: "Map each measurement to an available level." },
      { title: "Encode", text: "Store the resulting numeric array and metadata." },
    ],
    takeaways: [
      "Undersampling causes aliasing; coarse intensity quantization causes false contouring",
      "Interpolation estimates missing sample locations—it does not create new measured detail",
      "Inspect image shape, channel order and data type before processing in OpenCV",
    ],
  },
  {
    id: "enhancement",
    label: "Image Enhancement",
    nav: "Goals, domains and limits",
    slides: "120–127",
    eyebrow: "Enhancement",
    title: "Make useful evidence easier to see",
    intro:
      "Enhancement modifies an image for a particular viewer or task. It can improve contrast, emphasize boundaries or suppress noise, but the best result depends on the purpose and the captured information.",
    concepts: [
      {
        tag: "Spatial",
        title: "Operate on pixels",
        text: "Spatial-domain methods work directly with image values. Point operations use one pixel, local operations use a neighborhood, and global operations use image-wide statistics.",
      },
      {
        tag: "Transform",
        title: "Operate on components",
        text: "Transform-domain methods first represent the image using components such as spatial frequencies, modify selected components, and then reconstruct the image.",
      },
      {
        tag: "Purpose",
        title: "Enhancement is task-dependent",
        text: "A radiologist, document scanner and autonomous vehicle may need very different outputs from the same input because each is searching for different evidence.",
      },
      {
        tag: "Limit",
        title: "Processing is not recovery by default",
        text: "A pleasing image is not automatically more accurate. Aggressive contrast, denoising or sharpening can hide weak structures or create misleading artifacts.",
      },
    ],
    formulas: [
      {
        label: "General spatial operation",
        expression: "g(x, y) = T[f(x, y)]",
        note: "T may use only f(x,y), a neighborhood around it, or statistics from the full image.",
      },
    ],
    takeaways: [
      "Start by defining what information the output should reveal",
      "Compare against the unprocessed image to catch lost or invented structure",
      "Point, neighborhood and global methods solve different enhancement problems",
    ],
  },
  {
    id: "point-operations",
    label: "Point Operations",
    nav: "Intensity transformations",
    slides: "128–164",
    eyebrow: "Intensity mapping",
    title: "Transform each pixel with a deliberate curve",
    intro:
      "A point operation maps an input intensity r to an output s without consulting neighboring pixels. The shape of the mapping decides which tonal range expands, compresses or separates.",
    concepts: [
      {
        tag: "Invert",
        title: "Negative",
        text: "Reverses the intensity scale. It can make pale detail on a dark background easier to inspect, especially in monochrome scientific or medical images.",
      },
      {
        tag: "Shift",
        title: "Brightness",
        text: "Adds an offset to every value. Results must be clipped or computed in a wider type to avoid wrap-around at the numeric limits.",
      },
      {
        tag: "Separate",
        title: "Thresholding",
        text: "Splits pixels using a decision level. It supports document cleanup, OCR, part inspection and segmentation when foreground and background intensities are separable.",
      },
      {
        tag: "Shape",
        title: "Log, gamma and piecewise curves",
        text: "Log mapping expands dark values; gamma controls mid-tone brightness; contrast stretching, gray-level slicing and bit-plane slicing target selected ranges or information layers.",
      },
    ],
    formulas: [
      { label: "Negative", expression: "s = (L − 1) − r", note: "For 8-bit data: s = 255 − r." },
      { label: "Brightness", expression: "s = clip(r + β, 0, L − 1)", note: "β is a positive or negative offset." },
      { label: "Binary threshold", expression: "s = L − 1 if r > T; otherwise 0", note: "The threshold T may be fixed, data-driven or local." },
      { label: "Gamma", expression: "s = c · rᵞ", note: "After normalization, γ < 1 brightens mid-tones and γ > 1 darkens them." },
      { label: "Log", expression: "s = c · log(1 + r)", note: "The +1 keeps the mapping defined at r = 0." },
    ],
    takeaways: [
      "Use floating-point or a wider integer type during arithmetic, then clip and convert",
      "The same transform can help one intensity range while compressing another",
      "Threshold selection should be validated against the downstream task",
    ],
  },
  {
    id: "histograms",
    label: "Histograms",
    nav: "Read intensity distributions",
    slides: "165–191",
    eyebrow: "Global statistics",
    title: "Count how an image uses its tonal range",
    intro:
      "A grayscale histogram counts pixels at each intensity. Its shape quickly reveals overall exposure and contrast, but it does not record where any pixel appears.",
    concepts: [
      {
        tag: "Dark",
        title: "Mass toward the left",
        text: "Many low values often indicate a dark image or a scene dominated by dark material. Context is necessary before calling the exposure incorrect.",
      },
      {
        tag: "Bright",
        title: "Mass toward the right",
        text: "Many high values often indicate a bright image. A spike at the maximum can warn of clipped highlights and lost detail.",
      },
      {
        tag: "Contrast",
        title: "Spread matters",
        text: "A narrow cluster suggests a limited tonal range; a wider distribution usually corresponds to stronger global contrast.",
      },
      {
        tag: "Caution",
        title: "A histogram has no geometry",
        text: "Shuffling every pixel leaves the histogram unchanged. Two images can therefore share identical counts while showing completely different scenes.",
      },
    ],
    formulas: [
      { label: "Count histogram", expression: "h(rₖ) = nₖ", note: "nₖ is the number of pixels at gray level rₖ." },
      { label: "Normalized histogram", expression: "p(rₖ) = nₖ / (M · N)", note: "The probabilities across all L levels sum to 1." },
    ],
    table: {
      caption: "Worked 3-bit histogram for a 4 × 4 image",
      headers: ["Gray level", "0", "1", "2", "3", "4", "5", "6", "7"],
      rows: [
        ["Pixel count", "2", "2", "4", "4", "2", "1", "0", "1"],
        ["Probability", ".125", ".125", ".25", ".25", ".125", ".0625", "0", ".0625"],
        ["CDF", ".125", ".25", ".50", ".75", ".875", ".9375", ".9375", "1"],
      ],
    },
    takeaways: [
      "Normalize when comparing images with different pixel counts",
      "Use the cumulative distribution when building monotonic intensity mappings",
      "Combine histogram evidence with spatial analysis before drawing scene-level conclusions",
    ],
  },
  {
    id: "equalization",
    label: "Histogram Equalization",
    nav: "CDF-based contrast mapping",
    slides: "192–208",
    eyebrow: "Global contrast",
    title: "Redistribute intensities with the CDF",
    intro:
      "Histogram equalization uses the cumulative distribution of the input to build a monotonic mapping across the available output range. In discrete images, the result is usually more spread out—not perfectly uniform.",
    concepts: [
      {
        tag: "CDF",
        title: "Accumulate probability",
        text: "At level rₖ, add the probabilities of all levels up to k. The CDF never decreases, so brighter inputs cannot map below darker inputs.",
      },
      {
        tag: "Map",
        title: "Scale to the output range",
        text: "Multiply the CDF by L−1 and choose an integer output level using a stated rounding convention.",
      },
      {
        tag: "Merge",
        title: "Several inputs may share an output",
        text: "When multiple gray levels round to the same result, their pixel counts combine in the equalized histogram.",
      },
      {
        tag: "Use",
        title: "Best for weak global contrast",
        text: "Equalization can expose structure in a compressed tonal range, but it can over-amplify noise or produce an unnatural appearance when illumination varies locally.",
      },
    ],
    formulas: [
      { label: "Discrete CDF", expression: "CDF(rₖ) = Σⱼ₌₀ᵏ p(rⱼ)", note: "The final cumulative value equals 1." },
      { label: "Equalization map", expression: "sₖ = round[(L − 1) · CDF(rₖ)]", note: "Flooring is another convention; use one rule consistently." },
    ],
    steps: [
      { title: "Count", text: "Create the L-bin histogram." },
      { title: "Normalize", text: "Divide every bin by the total number of pixels." },
      { title: "Accumulate", text: "Compute the CDF from dark to bright." },
      { title: "Remap", text: "Scale, round and replace each input level with its mapped level." },
    ],
    table: {
      caption: "Compact four-level example",
      headers: ["Input rₖ", "0", "1", "2", "3"],
      rows: [
        ["Probability", ".25", ".25", ".25", ".25"],
        ["CDF", ".25", ".50", ".75", "1.00"],
        ["Rounded sₖ", "1", "2", "2", "3"],
      ],
    },
    takeaways: [
      "The mapping preserves intensity order because the CDF is monotonic",
      "Discrete output bins can be empty, and merged bins can become tall",
      "Local methods such as CLAHE are often better when illumination changes across the image",
    ],
  },
  {
    id: "histogram-matching",
    label: "Histogram Matching",
    nav: "Match a desired distribution",
    slides: "209–216",
    eyebrow: "Histogram specification",
    title: "Choose the target tonal distribution",
    intro:
      "Histogram matching transforms an image so its histogram approximates a chosen distribution. Equalization is the special case that targets a broadly spread distribution; matching lets the designer specify the shape.",
    concepts: [
      {
        tag: "Input",
        title: "Equalize the source conceptually",
        text: "Use the input CDF T(r) to map every source level r to an intermediate cumulative value s.",
      },
      {
        tag: "Target",
        title: "Build the desired CDF",
        text: "Use the specified histogram to compute G(z), the cumulative probability at each desired output level z.",
      },
      {
        tag: "Inverse",
        title: "Find the closest target level",
        text: "For every intermediate value s, select the z whose target CDF is equal or nearest. Discrete levels make this an approximation.",
      },
      {
        tag: "Use",
        title: "Standardize appearance",
        text: "Matching is useful when images from different sensors or conditions should share a reference tone distribution, provided the reference is appropriate for the content.",
      },
    ],
    formulas: [
      { label: "Input transform", expression: "s = T(r) = CDFinput(r)", note: "The input level is mapped into cumulative-probability space." },
      { label: "Target transform", expression: "s = G(z) = CDFtarget(z)", note: "G describes the desired intensity distribution." },
      { label: "Combined mapping", expression: "z = G⁻¹[T(r)]", note: "For discrete data, use the nearest available target CDF value." },
    ],
    steps: [
      { title: "Input CDF", text: "Normalize and accumulate the source histogram." },
      { title: "Target CDF", text: "Normalize and accumulate the desired histogram." },
      { title: "Nearest match", text: "Pair each input CDF value with the closest target CDF value." },
      { title: "Apply", text: "Replace source levels using the resulting lookup table." },
    ],
    takeaways: [
      "The target histogram is a design choice and should represent a meaningful reference",
      "Discrete matching is approximate because available levels and counts are finite",
      "A lookup table makes the final per-pixel operation efficient",
    ],
  },
  {
    id: "spatial-filtering",
    label: "Spatial Filtering",
    nav: "Masks, correlation and convolution",
    slides: "217–226",
    eyebrow: "Neighborhood processing",
    title: "Let nearby pixels influence the result",
    intro:
      "A spatial filter moves a small mask across an image. At every location it combines neighboring pixel values with mask coefficients to produce a new center value.",
    concepts: [
      {
        tag: "Mask",
        title: "A local weighted operation",
        text: "A 3×3 mask covers a pixel and its eight immediate neighbors. Smoothing, sharpening and edge detection come from different coefficient patterns.",
      },
      {
        tag: "Correlation",
        title: "Slide the mask as written",
        text: "Correlation computes a sum of products with the original mask orientation. It is natural for template and pattern matching.",
      },
      {
        tag: "Convolution",
        title: "Rotate, then slide",
        text: "Convolution rotates the mask by 180° before the same sum-of-products operation. Symmetric masks produce the same numeric result in both operations.",
      },
      {
        tag: "Boundary",
        title: "Edges need a policy",
        text: "Zero padding, replication, reflection, circular wrapping or valid-only output decide what the mask sees when it extends beyond the image.",
      },
    ],
    formulas: [
      { label: "Correlation", expression: "g(x,y) = Σₛ Σₜ w(s,t) · f(x+s, y+t)", note: "The mask w is used in its original orientation." },
      { label: "Convolution", expression: "g(x,y) = Σₛ Σₜ w(s,t) · f(x−s, y−t)", note: "Equivalent to correlating with the mask rotated by 180°." },
    ],
    steps: [
      { title: "Center", text: "Place the mask center over the current input pixel." },
      { title: "Multiply", text: "Multiply each covered pixel by its mask coefficient." },
      { title: "Sum", text: "Add the products to obtain the output value." },
      { title: "Move", text: "Repeat at every position using a consistent boundary rule." },
    ],
    takeaways: [
      "Odd-sized masks provide a natural center pixel",
      "Normalization often keeps smoothing filters from changing constant-region brightness",
      "The frequency-domain path is introduced in this unit; the supplied slides conclude with spatial mechanics",
    ],
  },
];

export const workspaceMenus = [
  ["upload", "Image Upload", "Choose an image"],
  ["explorer", "Filter Explorer", "Browse filters"],
  ["live-lab", "Live Lab", "Interactive workspace"],
  ["compare", "Compare Filters", "Compare results"],
  ["mind-map", "Mind Map", "Explore concepts"],
  ["mathematics", "Mathematics", "Learn the theory"],
  ["numerical", "Numerical Lab", "Work through values"],
  ["custom-kernel", "Custom Kernel", "Design a kernel"],
  ["pipeline", "Pipeline", "Arrange processing steps"],
  ["analysis", "Image Analysis", "Inspect image data"],
  ["learning", "Learning Center", "Study and practice"],
] as const;
