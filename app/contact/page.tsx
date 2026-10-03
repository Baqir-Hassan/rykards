import type { Metadata } from "next";
import { PageHero, SiteFooter, SiteNav, contactEmail, legalName } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Contact — Rykards",
  description: "Start a project with Rykards. Email contact@rykards.com and we will reply within one business day.",
};

const steps = [
  ["01", "You write", "Tell us what you are building, who it is for, and any timeline or budget you have in mind."],
  ["02", "We reply", "Within one business day, with questions or a time to talk it through."],
  ["03", "We propose", "A clear scope, approach, and estimate so you can make a decision with confidence."],
];

export default function Contact() {
  const mailto = `mailto:${contactEmail}?subject=Project%20enquiry`;
  return <main>
    <SiteNav />
    <PageHero
      label="/ Contact"
      title={<>Let&apos;s talk about<br /><em>what&apos;s next.</em></>}
      intro="The fastest way to reach us is email. Every message is read by one of our three leads, not a sales team."
    />

    <section className="shell contact-detail">
      <a className="button button-large" href={mailto}>{contactEmail} <span aria-hidden="true">&#8599;</span></a>
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
