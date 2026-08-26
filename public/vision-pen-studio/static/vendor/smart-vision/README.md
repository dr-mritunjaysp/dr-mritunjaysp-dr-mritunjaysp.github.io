# Smart Vision models and limitations

All inference runs in the browser. Camera frames are not recorded, stored or uploaded. Model files are served by this site; no AI API key or Python service is required. Camera permission and HTTPS (or localhost) are required.

## Bundled models

- **COCO-SSD 2.2.3, SSDLite MobileNet v2**: 80 common COCO object categories, not an arbitrary-object recognizer. Uses a 45% detection threshold. [Official model documentation](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd). Apache 2.0.
- **@vladmandic/face-api 1.7.15**: Tiny Face Detector, tiny 68-point face alignment, and apparent-age network, with its bundled TensorFlow.js runtime. Apparent age is stabilized with a rolling median of up to nine aligned frames and is withheld during the first three-frame calibration. The age/gender network has a shared output; this application discards gender and does not load identity, face recognition or emotion models. [Official documentation](https://github.com/vladmandic/face-api). MIT; TensorFlow.js Apache 2.0.
- **MediaPipe Hands**: existing local Vision Pen assets. Up to two hands with 21 landmarks each. Raised fingers and gestures are geometric estimates, not separately calibrated classification probabilities. Hand confidence is the model's handedness confidence, not finger or gesture confidence. [Official hand tracking documentation](https://chuoling.github.io/mediapipe/solutions/hands.html).

Model and library licenses are included in this directory. `assets.json` records original URLs, sizes and SHA-256 checksums. Maintainers can reproduce downloads with `node scripts/prepare-smart-vision.mjs` or verify assets with `node scripts/prepare-smart-vision.mjs --check`.

## Honest interpretation

- Apparent age is an approximate visual estimate. Face alignment and temporal stabilization reduce frame-to-frame noise but cannot reveal actual age. It can still be substantially wrong, especially for children, unusual poses, low light, or people unlike the training data. It is not verified identity or a basis for age restrictions. Ranges are displayed instead of exact ages. No age confidence score is invented.
- Objects in a photograph, poster or display can be detected by the same model. Automatic source classification is only a tentative containment heuristic for detected screens. It cannot establish that an image is live, identify all paper photographs, or prove liveness. Use the source selector for known photographs or live scenes.
- Tracking IDs use category, overlap and proximity. They survive short detection gaps (1.5 seconds for objects/faces, 0.9 seconds for hands), but are not persistent identities. Occlusions, rapid movement and crossing objects may change or swap IDs. Stop, resume and camera changes begin a new tracking session.
- Raised fingers are estimated from landmark angles and palm-relative distances. Unusual hand poses, overlap or occlusion may be miscounted. The animated count is debounced, sums both hands (0–10), and triggers only when the count changes. Gestures are debounced separately.
- Analysis runs serially on a scaled frame to bound memory usage. Face analysis is throttled to about once per second. Analysis FPS measures completed multi-model cycles, not display refresh rate; it depends on hardware. The CPU fallback is slower than WebGL.
- Pause freezes analysis and the displayed frame, but retains camera permission and the stream. Stop, back, closing the dialog, hiding the page or navigating away releases the stream. Stale results from an earlier session are ignored.

Use good, even lighting and keep the object or hand clearly visible. This is a demonstration of computer vision, not a safety, medical, identity, or surveillance system.
