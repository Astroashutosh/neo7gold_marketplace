/**
 * Dashboard URL configuration.
 *
 * The storefront and the dashboard are deployed separately, so the dashboard
 * base URL is supplied at build time through NEXT_PUBLIC_DASHBOARD_BASE_URL.
 *
 * There is deliberately no localhost fallback here: when the variable is
 * missing or invalid the checkout action stays disabled instead of sending
 * customers to a hard-coded host.
 */

const DASHBOARD_LOGIN_PATH = "/login/";

export function getDashboardLoginUrl(): string | null {
  const configuredBaseUrl =
    process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL?.trim();

  if (!configuredBaseUrl) {
    return null;
  }

  try {
    const baseUrl = new URL(configuredBaseUrl);

    if (
      baseUrl.protocol !== "http:" &&
      baseUrl.protocol !== "https:"
    ) {
      return null;
    }

    return `${baseUrl.href.replace(/\/+$/, "")}${DASHBOARD_LOGIN_PATH}`;
  } catch {
    return null;
  }
}
