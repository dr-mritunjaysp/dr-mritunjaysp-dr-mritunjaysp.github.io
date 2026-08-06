import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

async function prerender() {
  console.log("Starting static pre-rendering for GitHub Pages...");

  const serverBundlePath = path.join(projectRoot, "dist", "server", "index.js");
  const serverUrl = new URL(`file:///${serverBundlePath.replace(/\\/g, "/")}`);
  serverUrl.searchParams.set("prerender", Date.now().toString());

  const { default: worker } = await import(serverUrl.href);

  const routes = [
    "/",
    "/blog",
    "/publications",
    "/projects",
    "/sorting-visualizer",
    "/cv",
    "/teaching",
    "/people",
    "/award-fdp",
    "/game",
    "/daily-mantra",
    "/bhagwatgita",
    "/ramayan",
    "/quantum-computation",
    "/blockchain",
    "/poems",
    "/motivations",
  ];

  const distDir = path.join(projectRoot, "dist");

  // Copy dist/client contents into dist/
  const clientDir = path.join(distDir, "client");
  if (fs.existsSync(clientDir)) {
    fs.cpSync(clientDir, distDir, { recursive: true });
    console.log("Copied dist/client assets into dist/");
  }

  // Copy public/ files into dist/
  const publicDir = path.join(projectRoot, "public");
  if (fs.existsSync(publicDir)) {
    fs.cpSync(publicDir, distDir, { recursive: true });
    console.log("Copied public/ assets into dist/");
  }

  for (const route of routes) {
    const res = await worker.fetch(
      new Request(`http://localhost${route}`, {
        headers: { accept: "text/html" },
      }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} }
    );

    let html = await res.text();
    if (html.includes("</head>")) {
      html = html.replace("</head>", `<meta name="build-id" content="${Date.now()}" /></head>`);
    }

    let targetFile;
    if (route === "/") {
      targetFile = path.join(distDir, "index.html");
    } else {
      const routeSubdir = path.join(distDir, route.slice(1));
      fs.mkdirSync(routeSubdir, { recursive: true });
      targetFile = path.join(routeSubdir, "index.html");
    }

    fs.writeFileSync(targetFile, html, "utf8");
    console.log(`Pre-rendered ${route} -> ${path.relative(projectRoot, targetFile)}`);

    if (route === "/") {
      const fallback404 = path.join(distDir, "404.html");
      fs.writeFileSync(fallback404, html, "utf8");
      console.log(`Created 404 fallback -> ${path.relative(projectRoot, fallback404)}`);
    }
  }

  // Copy CNAME into dist/
  const cnameSrc = path.join(projectRoot, "CNAME");
  if (fs.existsSync(cnameSrc)) {
    fs.copyFileSync(cnameSrc, path.join(distDir, "CNAME"));
  }

  // Create .nojekyll in dist/
  fs.writeFileSync(path.join(distDir, ".nojekyll"), "# Disable Jekyll", "utf8");

  console.log("Static pre-rendering completed successfully!");
}

prerender().catch(err => {
  console.error("Prerender error:", err);
  process.exit(1);
});
