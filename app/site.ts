/**
 * The storefront base path is driven by NEXT_PUBLIC_BASE_PATH in .env.local.
 * - In development: '/neos7gold_marketplace'
 * - In production: '' (empty string, running on root domain)
 * This ensures zero code changes are needed when deploying to the live main domain.
 */
const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").trim();
export const SITE_BASE_PATH = rawBasePath
  ? (rawBasePath.startsWith("/") ? rawBasePath : `/${rawBasePath}`).replace(/\/+$/, "")
  : "";

/**
 * Resolve public assets (images, 3D models, textures, icons).
 */
export function siteAsset(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("//")) {
    return path;
  }
  const clean = path.replace(/^\/+/, "");
  return SITE_BASE_PATH ? `${SITE_BASE_PATH}/${clean}` : `/${clean}`;
}

/**
 * Resolve client-side internal URLs if needed outside Next <Link>.
 */
export function siteLink(path: string): string {
  if (!path) return "/";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("//")) {
    return path;
  }
  const clean = path.replace(/^\/+/, "");
  return SITE_BASE_PATH ? `${SITE_BASE_PATH}/${clean}` : `/${clean}`;
}
