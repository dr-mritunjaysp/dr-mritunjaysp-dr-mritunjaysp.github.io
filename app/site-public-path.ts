const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const normalizedBasePath = basePath.replace(/\/+$/, "");
const githubPagesProjectUrl = "https://dr-mritunjaysp.github.io/dr-mritunjaysp-dr-mritunjaysp.github.io";

export function sitePublicPath(path: string): string {
  if (!basePath && /^\/downloads\/.*\.(exe|dll|bat)$/i.test(path)) {
    return `${githubPagesProjectUrl}${path}`;
  }

  if (!basePath || !path.startsWith("/") || path.startsWith("//")) {
    return path;
  }

  return `${normalizedBasePath}${path}`;
}

export function stripSiteBasePath(pathname: string): string {
  if (!normalizedBasePath) return pathname;
  if (pathname === normalizedBasePath) return "/";
  if (pathname.startsWith(`${normalizedBasePath}/`)) {
    return pathname.slice(normalizedBasePath.length);
  }
  return pathname;
}
