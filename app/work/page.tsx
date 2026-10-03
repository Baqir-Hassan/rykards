import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SiteFooter, SiteNav } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Work — Rykards",
  description: "Selected Rykards projects: a member and operations platform for a private golf club, and an inventory and dispatch system used by five wholesale businesses.",
};

type CaseStudy = {
  status: string;
  type: string;
  title: string;
  client: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  outcome: string;
};

const caseStudies: CaseStudy[] = [
  {
    status: "In production",
    type: "Inventory & dispatch system",
    title: "Wholesale operations, out of the ledger and into one system.",
    client: "5 wholesale businesses",
    problem: "Wholesalers were tracking stock and dispatch across paper registers, spreadsheets, and phone calls, which made it hard to know what was available and what had shipped.",
    solution: "We built a single system for managing inventory and dispatch, now running day to day across five local wholesale businesses.",
    features: ["Inventory tracking", "Dispatch management", "Multi-business use"],
    stack: ["Next.js", "Django", "PostgreSQL", "VPS hosting"],
    outcome: "In daily use by five businesses.",
  },
  {
    status: "Launching Q4 2026",
    type: "Member & operations platform",
    title: "The operating system for a private golf club.",
    client: "Private golf club (confidential until launch)",
    problem: "Member services and day-to-day club operations were spread across disconnected tools.",
    solution: "A single platform bringing the member experience and club operations into one clear system, built end to end by Rykards.",
    features: ["Tee-time booking", "Member management", "Staff scheduling", "Integrated payments"],
    stack: ["React", "Python FastAPI", "PostgreSQL", "AWS"],
    outcome: "Full case study to follow at launch.",
  },
];

// Add once the client has approved the wording, e.g.
// { quote: "...", name: "...", role: "...", company: "..." }
const testimonial: { quote: string; name: string; role: string; company: string } | null = null;

export default function Work() {
  return <main>
    <SiteNav />
    <PageHero
      label="/ Selected work"
      title={<>Software that<br /><em>runs the business.</em></>}
      intro="We focus on operational software: the systems people rely on every day to sell, schedule, ship, and serve their customers."
    />

    <section className="shell">{caseStudies.map((study) => <article className="case" key={study.title}>
      <div className="featured-top"><p className="section-label">/ {study.type}</p><span className="launch-tag"><i /> {study.status}</span></div>
      <div className="featured-grid">
        <div>
          <p className="project-type">{study.client}</p>
          <h2>{study.title}</h2>
          <dl className="case-body">
            <div><dt>The problem</dt><dd>{study.problem}</dd></div>
            <div><dt>What we built</dt><dd>{study.solution}</dd></div>
            <div><dt>Outcome</dt><dd>{study.outcome}</dd></div>
          </dl>
        </div>
        <div className="featured-details">
          <ul>{study.features.map((feature) => <li key={feature}><span aria-hidden="true">+</span>{feature}</li>)}</ul>
          {study.stack.length > 0 && <><p className="section-label stack-label">/ Stack</p><ul className="tag-list">{study.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul></>}
        </div>
      </div>
    </article>)}</section>

    {testimonial && <section className="page-band"><figure className="shell quote">
      <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
      <figcaption>{testimonial.name} &middot; {testimonial.role}, {testimonial.company}</figcaption>
    </figure></section>}

    <section className="page-cta shell"><h2>Have an operation ready for better software?</h2><Link className="button button-small" href="/contact">Start a project <span aria-hidden="true">&#8599;</span></Link></section>
    <SiteFooter />
  </main>;
}
