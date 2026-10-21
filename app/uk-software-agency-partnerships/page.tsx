import Link from "next/link";
import { PageHero, SiteNav, SiteFooter } from "@/components/site-chrome";
import { MarketCTA, OverseasIntro } from "@/components/market-sections";
import { getEnquiryHref } from "@/lib/enquiry";
import { marketMetadata } from "@/lib/market-metadata";

export const metadata = marketMetadata("/uk-software-agency-partnerships", "UK Software Agency Partnerships — Rykards", "White-label and subcontract software development for UK agencies. Partner with Rykards for custom software, backend and cloud engineering, with an agreed scope and collaboration model.");

const services = [
  ["01", "White-label & subcontract development", "Bring Rykards into delivery under your agency brand or as a named technical partner. We agree client contact, confidentiality, ownership, and handover responsibilities before starting."],
  ["02", "Custom software", "Commission a web platform, internal tool, or business application around your client's requirements. Start with a discovery brief, then agree the functionality, acceptance criteria, and delivery milestones."],
  ["03", "Backend & cloud engineering", "Discuss APIs, database design, integrations, deployment workflows, and cloud infrastructure. We review the existing environment and agree the engineering and operational responsibilities."],
  ["04", "Flexible collaboration", "Scope a defined project, a delivery workstream, or ongoing engineering support. Availability, team involvement, review cadence, and commercial terms are agreed for each engagement."],
];

export default function UKPartnerships() {
  return <main><SiteNav />
    <PageHero label="/ United Kingdom · Agency partnerships" title={<>Your agency.<br /><em>Our engineering.</em></>} intro="Software development support for UK agencies that need a delivery partner. Rykards (PVT) LTD works from Pakistan, with white-label or subcontract collaboration shaped around your team and client commitments." />
    <div className="shell market-actions"><Link className="button button-small" href={getEnquiryHref("uk-partnership")}>Discuss an agency partnership ↗</Link><Link className="text-link" href="/work">Explore our products & work ↗</Link></div>
    <section className="shell market-services" aria-labelledby="uk-services"><p className="section-label">/ Where we can help</p><h2 id="uk-services">Capacity shaped around the brief.</h2>{services.map(([number, title, copy]) => <article className="service" key={number}><span className="service-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</section>
    <section className="page-band"><div className="shell detail-grid"><p className="section-label">/ Clear responsibilities</p><div><h2 className="market-subheading">Keep delivery visible.</h2><dl className="facts"><div><dt>Before the start</dt><dd>Agree the brief, access, scope, estimate, milestones, and who approves the work.</dd></div><div><dt>During delivery</dt><dd>Plan remote check-ins, written updates, demonstrations, and a shared record of decisions and changes.</dd></div><div><dt>At handover</dt><dd>Agree repository ownership, documentation, deployment access, and any ongoing maintenance.</dd></div></dl></div></div></section>
    <section className="shell market-note"><h2>Start with a practical brief.</h2><p>Tell us about your agency, the work you need help with, the current technology, and any deadlines. Share a redacted brief first; we can discuss an NDA and the right access before you provide confidential client material.</p><p>For UK coordination, Pakistan is four hours ahead during British Summer Time and five hours ahead during GMT. We agree meeting windows and response expectations around both teams.</p></section>
    <OverseasIntro /><MarketCTA interest="uk-partnership" label="Share your partnership brief" title="Have a project or workstream in mind?" /><SiteFooter />
  </main>;
}
