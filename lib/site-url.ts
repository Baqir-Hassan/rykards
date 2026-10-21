const fallbackUrl = "https://www.rykards.com";

export function getSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  // Search/social URLs should use the public domain even on a Preview build.
  const url = configuredUrl?.trim() || fallbackUrl;

  return url.replace(/\/$/, "");
}
