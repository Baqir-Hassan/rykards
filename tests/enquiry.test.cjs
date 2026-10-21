/* eslint-disable @typescript-eslint/no-require-imports -- Native CommonJS test harness compiles the TypeScript server modules without another test dependency. */
const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const ts = require("typescript");
// Compile the small server modules with the project's existing TypeScript dev dependency.
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  module._compile(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
};
const { createEnquiryHandler } = require("../lib/enquiry-handler.ts");
const { validateEnquiry } = require("../lib/enquiry.ts");

const valid = {
  name: "Website Test", email: "visitor@example.com", company: "Example Clinic",
  interest: "dental", message: "Please show us the appointment and billing workflow.",
  website: "", submissionId: "12345678-1234-4234-8234-123456789012",
};
const configured = { apiKey: "test-only-not-a-real-key", from: "Website <sender@example.com>" };
function request(payload = valid, headers = {}) {
  return new Request("https://www.rykards.com/api/enquiry", {
    method: "POST", headers: { origin: "https://www.rykards.com", "content-type": "application/json", ...headers },
    body: typeof payload === "string" ? payload : JSON.stringify(payload),
  });
}
function setup(send, config = configured, now) {
  return createEnquiryHandler({ config: () => config, send, now });
}

test("accepts documented product context and trims visitor input", () => {
  const result = validateEnquiry({ ...valid, name: "  Website Test  ", company: "  " });
  assert.equal(result.data.name, "Website Test");
  assert.equal(result.data.interest, "dental");
  assert.equal(result.data.company, "");
});

test("retains each overseas enquiry type in delivery and rejects unknown market types", async () => {
  for (const [interest, label] of [["uk-partnership", "UK agency partnership"], ["uae-wholesale", "UAE wholesale demo"], ["overseas", "Overseas software project"]]) {
    const post = setup(async (_url, options) => {
      const payload = JSON.parse(options.body);
      assert.ok(payload.subject.includes(label));
      assert.ok(payload.text.includes(label));
      return Response.json({ id: "accepted-market-test" });
    });
    assert.equal((await post(request({ ...valid, interest }))).status, 200);
  }
  assert.ok(validateEnquiry({ ...valid, interest: "unknown-market" }).errors.interest);
});

test("rejects missing fields, unknown products, header controls, and excessive messages", () => {
  assert.deepEqual(Object.keys(validateEnquiry(null).errors).sort(), ["email", "interest", "message", "name"]);
  for (const [field, value] of [["name", "A\r\nBcc: other@example.com"], ["email", "visitor@example.com\n" + "Bcc: bad@example.com"], ["interest", "forged-product"], ["message", "x".repeat(4001)]]) {
    assert.ok(validateEnquiry({ ...valid, [field]: value }).errors[field]);
  }
});

test("sends only to the configured inbox with visitor Reply-To and retained product context", async () => {
  const sent = [];
  const post = setup(async (url, options) => {
    sent.push({ url, options, payload: JSON.parse(options.body) });
    return Response.json({ id: "accepted-test-email" });
  });
  const response = await post(request({ ...valid, to: "attacker@example.com", from: "spoof@example.com" }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(sent[0].url, "https://api.resend.com/emails");
  assert.deepEqual(sent[0].payload.to, ["contact@rykards.com"]);
  assert.equal(sent[0].payload.from, configured.from);
  assert.equal(sent[0].payload.reply_to, valid.email);
  assert.match(sent[0].payload.subject, /Dental POS/);
  assert.match(sent[0].payload.text, /Example Clinic/);
  assert.match(sent[0].payload.text, /appointment and billing/);
});

test("uses the same provider idempotency key for a retry", async () => {
  const keys = [];
  const post = setup(async (_url, options) => {
    keys.push(options.headers["Idempotency-Key"]);
    return Response.json({ id: "same-email" });
  });
  await post(request()); await post(request());
  assert.equal(keys[0], `website-enquiry/${valid.submissionId}`);
  assert.equal(keys[0], keys[1]);
});

test("fails honestly when delivery is unconfigured, without calling the provider", async () => {
  const post = setup(() => assert.fail("Provider must not be called"), {});
  const response = await post(request());
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, undefined);
});

test("does not claim success for provider rejection, timeout, or missing receipt", async () => {
  for (const send of [
    async () => Response.json({ message: "private provider detail" }, { status: 403 }),
    async () => { throw new Error("private credential or network detail"); },
    async () => Response.json({}),
  ]) {
    const response = await setup(send)(request());
    assert.equal(response.status, 502);
    const text = await response.text();
    assert.doesNotMatch(text, /private|credential/);
    assert.doesNotMatch(text, /"ok":true/);
  }
});

test("rejects third-party origins, wrong content types, malformed JSON, bots, and forged submissions", async () => {
  const post = setup(() => assert.fail("Provider must not be called"));
  assert.equal((await post(request(valid, { origin: "https://other.example.com" }))).status, 403);
  assert.equal((await post(request(valid, { "content-type": "text/plain" }))).status, 415);
  assert.equal((await post(request("{broken"))).status, 400);
  assert.equal((await post(request({ ...valid, website: "https://spam.example.com" }))).status, 400);
  assert.equal((await post(request({ ...valid, submissionId: "forged" }))).status, 400);
  assert.equal((await post(request({ ...valid, interest: "forged" }))).status, 422);
});

test("caps streamed request bodies even without a Content-Length header", async () => {
  const post = setup(() => assert.fail("Provider must not be called"));
  assert.equal((await post(request("x".repeat(24001)))).status, 413);
});

test("accepts the public Host when Next uses a different internal request URL", async () => {
  const post = setup(async () => Response.json({ id: "accepted" }));
  const response = await post(new Request("http://localhost:3006/api/enquiry", {
    method: "POST", headers: { origin: "http://127.0.0.1:3006", host: "127.0.0.1:3006", "content-type": "application/json" },
    body: JSON.stringify(valid),
  }));
  assert.equal(response.status, 200);
});

test("limits repeated sends per instance and allows requests after the window expires", async () => {
  let time = 100000;
  const post = setup(async () => Response.json({ id: "accepted" }), configured, () => time);
  for (let i = 0; i < 5; i++) assert.equal((await post(request())).status, 200);
  const limited = await post(request());
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get("retry-after")) > 0);
  time += 600001;
  assert.equal((await post(request())).status, 200);
});

test("supports a configured preview inbox without accepting a visitor override", async () => {
  const post = setup(async (_url, options) => {
    assert.deepEqual(JSON.parse(options.body).to, ["preview@example.com"]);
    return Response.json({ id: "preview" });
  }, { ...configured, to: "preview@example.com" });
  assert.equal((await post(request({ ...valid, to: "other@example.com" }))).status, 200);
});
