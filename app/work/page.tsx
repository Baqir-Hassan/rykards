import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SiteFooter, SiteNav } from "@/components/site-chrome";
import { solutions } from "@/lib/solutions";
import { WholesaleVideo } from "@/components/wholesale-video";
import { RestaurantVideo } from "@/components/restaurant-video";

export const metadata: Metadata = {
  title: "Work — Rykards",
  description: "Explore Rykards' customizable software foundations for wholesale, cafe and retail, dental, restaurant, and golf club operations, with clear deployment status and custom engineering services.",
};

export default function Work() {
  return <main>
    <SiteNav />
    <PageHero
      label="/ Work & solutions"
      title={<>Software that<br /><em>runs the business.</em></>}
      intro="Start with a customizable Rykards software foundation, or work with us on a custom build. We shape workflows, interfaces, reports, and integrations around your operation. Each solution's current deployment status is shown below."
    />

    <section className="shell" aria-label="Software foundations">{solutions.map((solution) => <article className="case" id={solution.id} key={solution.id}>
      <div className="featured-top"><p className="section-label">/ {solution.name}</p><span className="launch-tag"><i aria-hidden="true" /> {solution.status}</span></div>
      <div className="featured-grid">
        <div>
          <h2>{solution.title}</h2>
          <dl className="case-body">
            <div><dt>The operational need</dt><dd>{solution.need}</dd></div>
            <div><dt>The foundation</dt><dd>{solution.foundation}</dd></div>
            <div><dt>Deployment status</dt><dd>{solution.deployment}</dd></div>
          </dl>
        </div>
        <div className="featured-details">
          <p className="section-label">/ Customization options</p>
          <ul>{solution.tailoring.map((option) => <li key={option}><span aria-hidden="true">+</span>{option}</li>)}</ul>
          <p>We agree customization scope around your requirements.</p>
        </div>
      </div>
      {solution.id === "wholesale" && <WholesaleVideo />}
      {solution.id === "restaurant" && <RestaurantVideo />}
    </article>)}</section>

    <section className="statement"><div className="shell statement-grid"><p className="section-label">/ Custom engineering</p><div><h2>Your workflow.<br /><span>Our engineering.</span></h2><p>Use an existing foundation where it fits, extend it where your operation needs more, or commission a custom system. We can design and build web and mobile software, connect your tools, and automate business processes. We agree the scope around your requirements.</p></div></div></section>

    <section className="page-cta shell"><h2>Let&apos;s shape the right software for your operation.</h2><Link className="button button-small" href="/contact">Discuss your requirements <span aria-hidden="true">&#8599;</span></Link></section>
    <SiteFooter />
  </main>;
}
