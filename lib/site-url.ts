const fallbackUrl = "http://localhost:3000";

export function getSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const url = configuredUrl ?? (vercelUrl ? `https://${vercelUrl}` : fallbackUrl);

  return url.replace(/\/$/, "");
}