# Project Rules & Guidelines

## Docker Configuration & Verification
- Whenever making codebase changes, adding/modifying static assets, updating routes, or changing dependencies, always apply and synchronize the changes to Docker setup (`Dockerfile`, `compose.yaml`, `.dockerignore`).
- Ensure static asset directories (such as `public/` containing Lottie files, documents, and media) are explicitly copied into the `runner` stage in `Dockerfile`.
- Always test and verify Docker container builds (`docker build`) or Docker compose execution whenever modifications are made to the codebase.
