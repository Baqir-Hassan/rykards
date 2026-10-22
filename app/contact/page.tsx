import type { Metadata } from "next";
import { PageHero, SiteFooter, SiteNav, contactEmail, legalName } from "@/components/site-chrome";
import { EnquiryForm } from "@/components/enquiry-form";
import { MeetingScheduler } from "@/components/meeting-scheduler";
import { getEnquiryOption } from "@/lib/enquiry";

export const metadata: Metadata = {
  title: "Contact — Rykards",
  description: "Book a 20-minute Google Meet call with Rykards, request a product demo, or discuss custom software. You can also send an enquiry or email contact@rykards.com.",
  alternates: { canonical: "/contact" },
};

const steps = [
  ["01", "You choose", "Book a 20-minute meeting or send an enquiry about a product demo or custom build."],
  ["02", "We talk", "Meet at your booked time to discuss what you need. For written enquiries, we reply within one business day."],
  ["03", "We propose", "A clear scope, approach, and estimate so you can make a decision with confidence."],
];

export default async function Contact({ searchParams }: { searchParams: Promise<{ interest?: string | string[] }> }) {
  const params = await searchParams;
  const selected = getEnquiryOption(params.interest);
  const deliveryAvailable = Boolean(process.env.RESEND_API_KEY?.trim() && process.env.ENQUIRY_FROM_EMAIL?.trim());
  const mailto = `mailto:${contactEmail}?subject=Project%20enquiry`;
  return <main className="contact-page">
    <SiteNav />
    <PageHero
      label="/ Contact"
      title={<>Let&apos;s talk about<br /><em>what&apos;s next.</em></>}
      intro={<>Book a 20-minute Google Meet call to discuss a product demo or custom build, or send an enquiry and we&apos;ll reply within one business day. Prefer email? <a className="text-link" href={mailto}>{contactEmail}</a>.</>}
    />

    <div className="shell contact-actions"><a className="button button-small" href="#book-meeting">Book a meeting <span aria-hidden="true">&#8599;</span></a><a className="text-link" href="#enquiry">Send an enquiry</a></div>

    <MeetingScheduler />

    <section className="shell enquiry-section" id="enquiry" aria-labelledby="enquiry-heading">
      <div className="enquiry-intro"><p className="section-label">/ Start a conversation</p><h2 id="enquiry-heading">{selected ? selected.label : "Tell us what you need."}</h2><p>Tell us a little about your business and what you&apos;d like to see or build. We&apos;ll follow up with questions or a time to talk.</p><p>Prefer email?</p><a className="text-link enquiry-email" href={selected ? `mailto:${contactEmail}?subject=${encodeURIComponent(`${selected.label} enquiry`)}` : mailto}>{contactEmail} <span aria-hidden="true">&#8599;</span></a></div>
      <EnquiryForm key={selected?.id ?? "general"} initialInterest={selected?.id} deliveryAvailable={deliveryAvailable} />
    </section>

    <section className="shell contact-detail contact-facts" aria-label="Contact information">
      <dl className="facts">
        <div><dt>Response time</dt><dd>Within 1 business day</dd></div>
        <div><dt>Based in</dt><dd>Pakistan, working with clients worldwide</dd></div>
        <div><dt>Company</dt><dd>{legalName}</dd></div>
      </dl>
    </section>

    <section className="approach shell"><div className="approach-intro"><p className="section-label">/ What happens next</p><h2>Simple,<br /><em>from the start.</em></h2></div><div className="process-list">{steps.map(([num, title, copy]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <SiteFooter />
  </main>;
}
