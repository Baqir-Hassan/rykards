import Link from "next/link";
import { PageHero, SiteNav, SiteFooter } from "@/components/site-chrome";
import { MarketCTA, OverseasIntro } from "@/components/market-sections";
import { WholesaleVideo } from "@/components/wholesale-video";
import { getEnquiryHref } from "@/lib/enquiry";
import { marketMetadata } from "@/lib/market-metadata";

export const metadata = marketMetadata("/uae-wholesale-software", "Wholesale Inventory & Dispatch Software for UAE Businesses — Rykards", "Explore Rykards' existing wholesale system for UAE wholesalers: multi-branch stock, purchasing, sales, dispatch, collections, balances, and reporting. Request a demo and scope local requirements.");

const capabilities = [
  ["Multi-branch stock", "Track on-hand, reserved, and available stock by branch, with stock movements, counts, and adjustments."],
  ["Purchasing & receiving", "Manage supplier purchase orders, partial goods receipts, supplier bills, and supplier payments."],
  ["Sales & invoicing", "Connect sales orders, approval, stock reservation, invoices, and customer credit balances."],
  ["Dispatch & delivery", "Split shipments, assign staff, schedule dispatches, and record delivery outcomes and proof."],
  ["Collections & balances", "Record and verify collections, allocate payments, and review receivables, payables, statements, and aging."],
  ["Operational reporting", "Review sales, purchasing, cash movement, stock exceptions, and financial reports within the user's permissions."],
];

export default function UAEWholesale() {
  return <main><SiteNav />
    <PageHero label="/ United Arab Emirates · Wholesale operations" title={<>Stock to dispatch.<br /><em>Order to payment.</em></>} intro="For UAE wholesalers exploring connected operations: start with Rykards' existing wholesale inventory and dispatch management system, then scope the configuration and customization your business needs." />
    <div className="shell market-actions"><Link className="button button-small" href={getEnquiryHref("uae-wholesale")}>Request a UAE wholesale demo ↗</Link><Link className="text-link" href="/work#wholesale">View the wholesale product ↗</Link></div>
    <section className="page-band"><div className="shell detail-grid"><p className="section-label">/ An existing product foundation</p><div><h2 className="market-subheading">Deployed with five wholesalers.</h2><p className="market-band-copy">Build on an operational product rather than starting every workflow from scratch. This deployment count describes the existing product; it does not imply UAE installations. We review your fit and local requirements before agreeing an implementation.</p></div></div></section>
    <section className="shell market-services" aria-labelledby="uae-capabilities"><p className="section-label">/ In the existing system</p><h2 id="uae-capabilities">Follow the whole trading flow.</h2><div className="capability-grid">{capabilities.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div><WholesaleVideo /></section>
    <section className="shell market-note" aria-labelledby="uae-fit"><p className="section-label">/ Tailored implementation</p><h2 id="uae-fit">Your branches. Your workflows.</h2><p>We can scope changes to purchasing, sales approvals, dispatch processes, invoice layouts, reporting, and integrations. A demo helps us map your current operation to the foundation and identify what needs configuration or development.</p><p>The current foundation defaults to PKR and Pakistan time. UAE currency, timezone, tax and invoicing requirements, language needs, hosting, data migration, and integrations must be reviewed and agreed before rollout. UAE regulatory compliance is not claimed out of the box.</p><p>For remote coordination, Pakistan is one hour ahead of the UAE. We agree demonstration, training, launch, and support windows around your team.</p></section>
    <OverseasIntro /><MarketCTA interest="uae-wholesale" label="Book a wholesale demo" title="Show us how your wholesale business trades." /><SiteFooter />
  </main>;
}
