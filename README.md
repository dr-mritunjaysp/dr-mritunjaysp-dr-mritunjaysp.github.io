# Dr. Mritunjay Shall Peelam — Academic Portfolio

An independent academic portfolio built with Next.js, React, TypeScript, and
vinext. It does not depend on Jekyll or the al-folio theme.

## Live local development with Docker

Docker Desktop must be running. Start the live development site with:

```bash
docker compose up --build -d portfolio
```

Open:

```text
http://localhost:3000
```

Changes in `app/` and `public/` are detected automatically and update this
address without rebuilding the container. Follow the development output with:

```bash
docker compose logs -f portfolio
```

Stop the site:

```bash
docker compose down
```

The same commands are available through npm:

```bash
npm run docker:up
npm run docker:logs
npm run docker:down
```

## Production container preview

To build the production image separately:

```bash
npm run docker:prod
```

Open `http://localhost:3002`. The live development site remains available at
`http://localhost:3000`.

## Open locally without Docker

Node.js 22.13 or newer is required:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify a production build

```bash
npm run build
npm test
```
