import Link from "next/link";
import { getEnquiryHref } from "@/lib/enquiry";

export function MarketLinks() {
  return <section className="shell market-directory" id="markets" aria-labelledby="markets-heading">
    <p className="section-label">/ Work with Rykards</p>
    <h2 id="markets-heading">A partner for your next step.</h2>
    <div className="market-cards">
      <Link href="/uk-software-agency-partnerships"><span className="section-label">United Kingdom / Agencies</span><h3>More engineering capacity.<br />Your client relationship.</h3><p>White-label and subcontract development, custom software, backend and cloud engineering.</p><span className="text-link">Explore agency partnerships ↗</span></Link>
      <Link href="/uae-wholesale-software"><span className="section-label">United Arab Emirates / Wholesalers</span><h3>From branch stock<br />to collected payment.</h3><p>Explore our existing wholesale inventory and dispatch system, tailored to your operation.</p><span className="text-link">Explore wholesale software ↗</span></Link>
    </div>
  </section>;
}

export function OverseasIntro() {
  return <section className="page-band"><div className="shell overseas-intro">
    <div><p className="section-label">/ Based in Pakistan. Built around your team.</p><h2>How We Work With Overseas Clients</h2></div>
    <div><p>Discovery, an agreed scope, visible milestones, and regular remote reviews. We plan timezone overlap, commercial terms, and data handling together before work begins.</p><Link className="button button-small" href="/overseas-clients">See the overseas project process ↗</Link></div>
  </div></section>;
}

export function MarketCTA({ interest, label, title }: { interest: string; label: string; title: string }) {
  return <section className="page-cta shell"><h2>{title}</h2><Link className="button button-small" href={getEnquiryHref(interest)}>{label} ↗</Link></section>;
}
