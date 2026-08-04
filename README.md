# Dr. Mritunjay Shall Peelam — Academic Portfolio

An independent academic portfolio built with Next.js, React, TypeScript, and
vinext. It does not depend on Jekyll or the al-folio theme.

## Open locally with Docker

Docker Desktop must be running. From this folder, use:

```bash
docker compose up --build -d portfolio
```

Then open:

```text
http://localhost:3000
```

Follow the container output:

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

## Live development in Docker

For automatic browser updates while editing files:

```bash
docker compose --profile dev up --build portfolio-dev
```

Open `http://localhost:3001`. Stop it with `Ctrl+C`, followed by
`docker compose down`.

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
