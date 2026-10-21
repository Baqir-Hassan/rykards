import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SiteFooter, SiteNav } from "@/components/site-chrome";
import { solutions } from "@/lib/solutions";
import { getEnquiryHref } from "@/lib/enquiry";
import { WholesaleVideo } from "@/components/wholesale-video";
import { RestaurantVideo } from "@/components/restaurant-video";
import { MarketLinks, OverseasIntro } from "@/components/market-sections";

export const metadata: Metadata = {
  title: "Work — Rykards",
  description: "Explore Rykards' customizable software foundations for wholesale, cafe and retail, dental, restaurant, and golf club operations, with clear deployment status and custom engineering services.",
  alternates: { canonical: "/work" },
};

const workSolutions = [
  ...solutions.filter((solution) => solution.id === "restaurant"),
  ...solutions.filter((solution) => solution.id !== "restaurant"),
];

export default function Work() {
  return <main>
    <SiteNav />
    <PageHero
      label="/ Work & solutions"
      title={<>Software that<br /><em>runs the business.</em></>}
      intro="Explore our existing software, see what each foundation handles, and find out what can be adapted for your business. Deployment status is shown for every product."
    />

    <nav className="shell product-picker" aria-label="Choose a product"><p className="section-label">/ Find your starting point</p><ul>{workSolutions.map((solution) => <li key={solution.id}><a href={`#${solution.id}`}>{solution.name} <span aria-hidden="true">&darr;</span></a></li>)}</ul><Link className="text-link" href={getEnquiryHref("custom")}>Looking for custom software? <span aria-hidden="true">&#8599;</span></Link></nav>

    <section className="shell" aria-label="Software foundations">{workSolutions.map((solution) => <article className="case" id={solution.id} key={solution.id} tabIndex={-1} aria-labelledby={`${solution.id}-heading`}>
      <div className="featured-top"><p className="section-label">/ {solution.name}</p><span className="launch-tag"><i aria-hidden="true" /> {solution.status}</span></div>
      <div className="featured-grid">
        <div>
          <h2 id={`${solution.id}-heading`}>{solution.title}</h2>
          <p className="case-audience">{solution.audience}</p>
          <p className="case-summary">{solution.foundation}</p>
          {solution.capabilities.length > 0 && <div className="case-capabilities"><h3 className="section-label">/ In the foundation</h3><ul>{solution.capabilities.map((capability) => <li key={capability}><span aria-hidden="true">+</span>{capability}</li>)}</ul></div>}
        </div>
        <div className="featured-details">
          <h3 className="section-label">/ Scoped for your business</h3>
          <ul>{solution.tailoring.map((option) => <li key={option}><span aria-hidden="true">+</span>{option}</li>)}</ul>
          <p className="scope-note">{solution.scopeNote}</p>
          <Link className="button button-small product-enquiry" href={getEnquiryHref(solution.id)}>{solution.cta} <span aria-hidden="true">&#8599;</span></Link>
        </div>
      </div>
      {solution.id === "wholesale" && <><p className="market-product-link"><Link className="text-link" href="/uae-wholesale-software">Exploring wholesale software for a UAE business? See the demo and implementation scope ↗</Link></p><WholesaleVideo /></>}
      {solution.id === "restaurant" && <RestaurantVideo />}
    </article>)}</section>

    <section className="statement"><div className="shell statement-grid"><p className="section-label">/ Custom engineering</p><div><h2>Your workflow.<br /><span>Our engineering.</span></h2><p>Use an existing foundation where it fits, extend it where your operation needs more, or commission a custom system. We can design and build web and mobile software, connect your tools, and automate business processes. We agree the scope around your requirements.</p></div></div></section>

    <MarketLinks /><OverseasIntro />
    <section className="page-cta shell"><h2>Let&apos;s shape the right software for your operation.</h2><Link className="button button-small" href={getEnquiryHref("custom")}>Discuss your requirements <span aria-hidden="true">&#8599;</span></Link></section>
    <SiteFooter />
  </main>;
}
