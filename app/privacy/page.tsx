import type { Metadata } from "next";
import { SiteFooter, SiteNav, contactEmail, legalName } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Privacy Policy — Rykards",
  description: "How Rykards collects, uses, and protects personal information.",
};

const lastUpdated = "3 October 2026";

export default function Privacy() {
  return <main>
    <SiteNav />
    <article className="legal shell">
      <p className="section-label">/ Legal</p>
      <h1>Privacy Policy</h1>
      <p className="legal-meta">Last updated: {lastUpdated}</p>

      <p>This policy explains how {legalName} (&ldquo;Rykards&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal information when you visit rykards.com or contact us. We are a company registered in Pakistan. We apply the same privacy standards to every visitor, wherever you are located.</p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Information you send us.</strong> When you email us, we receive your name, email address, and anything you choose to include in your message.</li>
        <li><strong>Technical information.</strong> Our hosting provider, Vercel, automatically processes standard request data such as IP address, browser type, and pages requested in order to deliver and secure the website.</li>
      </ul>
      <p>We do not currently use analytics or advertising cookies. If we introduce analytics, we will update this policy before doing so and, where required, ask for your consent.</p>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry and discuss potential work together.</li>
        <li>To operate, maintain, and protect the website.</li>
        <li>To meet legal, accounting, or regulatory obligations.</li>
      </ul>
      <p>We do not sell your personal information, and we do not use it for third-party advertising.</p>

      <h2>Sharing</h2>
      <p>We share information only with service providers that help us run our business, such as our website host and email provider, and only as needed for them to provide that service. We may also disclose information where required by law.</p>

      <h2>International transfers</h2>
      <p>Our service providers may process information in countries other than your own. Where this happens, we rely on providers that apply appropriate safeguards to protect it.</p>

      <h2>Retention</h2>
      <p>We keep enquiry correspondence for as long as needed to respond and, if we work together, for the duration of the relationship and any period required for legal or accounting purposes.</p>

      <h2>Your rights</h2>
      <p>You can ask us to access, correct, delete, or stop using your personal information, or to provide a copy of it. Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> and we will respond within 30 days. Depending on where you live, you may also have the right to complain to your local data protection authority.</p>

      <h2>Security</h2>
      <p>We use reasonable technical and organisational measures to protect personal information. No method of transmission or storage is completely secure, but we work to protect your data and limit who can access it.</p>

      <h2>Changes</h2>
      <p>We may update this policy from time to time. The date at the top of this page shows when it was last revised.</p>

      <h2>Contact</h2>
      <p>{legalName}, Pakistan &middot; <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
    </article>
    <SiteFooter />
  </main>;
}
