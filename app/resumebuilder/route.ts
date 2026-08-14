const scholarResumeHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#020617" />
    <link rel="icon" type="image/gif" href="/ResumeBuilder/favicon-animated-transparent.gif?v=6" />
    <link rel="alternate icon" type="image/x-icon" href="/ResumeBuilder/favicon-transparent.ico?v=6" />
    <link rel="alternate icon" type="image/x-icon" sizes="64x64" href="/ResumeBuilder/favicon-64x64.ico?v=6" />
    <link rel="alternate icon" type="image/svg+xml" href="/ResumeBuilder/favicon.svg" />
    <link rel="shortcut icon" href="/ResumeBuilder/favicon-transparent.ico?v=6" />
    <link rel="manifest" href="/ResumeBuilder/site.webmanifest" />
    <title>ScholarResume</title>
    <script type="module" crossorigin src="/ResumeBuilder/assets/index-BADIOmQT.js"></script>
    <link rel="stylesheet" crossorigin href="/ResumeBuilder/assets/index-JcPN3zOH.css" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

export function GET() {
  return new Response(scholarResumeHtml, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
