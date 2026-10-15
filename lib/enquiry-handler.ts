import { createHmac, randomBytes } from "node:crypto";
import { getEnquiryOption, validateEnquiry } from "./enquiry";

type Config = { apiKey?: string; from?: string; to?: string; siteUrl?: string };
type Dependencies = { config: () => Config; send?: typeof fetch; now?: () => number };
const bodyLimit = 24000;
const windowMs = 10 * 60 * 1000;

function respond(status: number, payload: object, headers?: Record<string, string>) {
  return Response.json(payload, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > bodyLimit) {
        await reader.cancel();
        throw new Error("too-large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const buffer = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { buffer.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(buffer));
}

export function createEnquiryHandler({ config, send = fetch, now = Date.now }: Dependencies) {
  // Best-effort, bounded protection per server instance; not a shared serverless quota.
  // The ephemeral HMAC key avoids retaining raw visitor IP addresses.
  const salt = randomBytes(32);
  const attempts = new Map<string, { count: number; expires: number }>();

  return async function POST(request: Request) {
    const settings = config();
    const origin = request.headers.get("origin");
    const requestUrl = new URL(request.url);
    const allowed = new Set([requestUrl.origin]);
    // Next may expose an internal request URL; the browser still uses the public Host.
    const host = request.headers.get("host");
    if (host && /^[a-z0-9.:[\]-]+$/i.test(host)) allowed.add(`${requestUrl.protocol}//${host}`);
    if (settings.siteUrl) {
      try { allowed.add(new URL(settings.siteUrl).origin); } catch { /* Invalid configuration is not an allowed origin. */ }
    }
    if (!origin || !allowed.has(origin)) return respond(403, { message: "Please send your enquiry from this website." });
    if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
      return respond(415, { message: "Please use the enquiry form to send your message." });
    }

    let input: unknown;
    try { input = await readBody(request); }
    catch (error) {
      return respond(error instanceof Error && error.message === "too-large" ? 413 : 400, { message: "We couldn't read your enquiry. Please check its length and try again." });
    }
    if (!input || typeof input !== "object" || Array.isArray(input)) return respond(400, { message: "Please check your enquiry details." });
    const values = input as Record<string, unknown>;
    if (values.website) return respond(400, { message: "We couldn't accept this enquiry. Please email us directly." });
    const result = validateEnquiry(values);
    if (!result.data) return respond(422, { errors: result.errors, message: "Please check the highlighted fields." });
    if (typeof values.submissionId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(values.submissionId)) {
      return respond(400, { message: "Please refresh the form and try again." });
    }
    if (!settings.apiKey?.trim() || !settings.from?.trim()) {
      return respond(503, { message: "The enquiry form is temporarily unavailable. Please email contact@rykards.com." });
    }

    const time = now();
    for (const [key, value] of attempts) if (value.expires <= time) attempts.delete(key);
    const address = request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for") ?? "unknown";
    const bucket = createHmac("sha256", salt).update(address.split(",")[0].trim()).digest("hex");
    const attempt = attempts.get(bucket) ?? { count: 0, expires: time + windowMs };
    if (attempt.count >= 5 || (!attempts.has(bucket) && attempts.size >= 10000)) {
      return respond(429, { message: "Please wait a few minutes before trying again, or email us directly." }, { "Retry-After": String(Math.ceil((attempt.expires - time) / 1000)) });
    }
    attempt.count += 1;
    attempts.set(bucket, attempt);

    const { name, email, company, interest, message } = result.data;
    const label = getEnquiryOption(interest)!.label;
    try {
      const response = await send("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${settings.apiKey.trim()}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `website-enquiry/${values.submissionId}`,
        },
        body: JSON.stringify({
          from: settings.from.trim(),
          to: [settings.to?.trim() || "contact@rykards.com"],
          reply_to: email,
          subject: `${label} enquiry — ${name}`,
          text: [`Website enquiry: ${label}`, "", `Name: ${name}`, `Email: ${email}`, `Business: ${company || "Not provided"}`, "", message].join("\n"),
        }),
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) return respond(502, { message: "We couldn't confirm your enquiry was sent. Please try again or email us directly." });
      const receipt = await response.json();
      if (typeof receipt?.id !== "string" || !receipt.id) throw new Error("Missing email receipt");
      return respond(200, { ok: true });
    } catch {
      // Never return provider errors, credentials, or enquiry contents to logs or clients.
      return respond(502, { message: "We couldn't confirm your enquiry was sent. Please try again or email us directly." });
    }
  };
}
