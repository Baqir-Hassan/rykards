import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SiteFooter, SiteNav, legalName } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "About — Rykards",
  description: "Rykards is a software engineering company founded in Pakistan in 2025, led by three hands-on engineers.",
};

const team = [
  {
    name: "Baqir Hassan",
    role: "CEO",
    focus: ["Backend", "DevOps"],
    bio: "Leads the company and owns the systems underneath every product: APIs, data, infrastructure, and the pipelines that ship them.",
  },
  {
    name: "Bilal Kamran",
    role: "CFO",
    focus: ["Frontend", "UI/UX"],
    bio: "Runs finance and shapes everything users touch, from interface design through to the frontend code that delivers it.",
  },
  {
    name: "Maaz Ahmad",
    role: "CTO",
    focus: ["Mobile", "Automation", "Integrations"],
    bio: "Sets technical direction and builds mobile apps, automated workflows, and the integrations that connect products to the tools businesses already use.",
  },
];

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("");
}

export default function About() {
  return <main>
    <SiteNav />
    <PageHero
      label="/ About Rykards"
      title={<>The people doing<br /><em>the work.</em></>}
      intro="Rykards was founded in Pakistan in 2025 by three engineers who wanted to build software the way it should be built: senior people, close to the problem, accountable for the result."
    />

    <section className="team shell" aria-labelledby="team-heading">
      <div className="section-head"><p className="section-label">/ Leadership</p><h2 id="team-heading">Three leads. No layers.</h2></div>
      <div className="team-grid">{team.map((person) => <article key={person.name}>
        <div className="avatar" aria-hidden="true">{initials(person.name)}</div>
        <p className="project-type">{person.role}</p>
        <h3>{person.name}</h3>
        <p>{person.bio}</p>
        <ul className="tag-list">{person.focus.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      </article>)}</div>
    </section>

    <section className="page-band"><div className="shell detail-grid">
      <div><p className="section-label">/ Company</p></div>
      <dl className="facts">
        <div><dt>Legal name</dt><dd>{legalName}</dd></div>
        <div><dt>Founded</dt><dd>2025</dd></div>
        <div><dt>Headquarters</dt><dd>Pakistan</dd></div>
        <div><dt>Works with</dt><dd>Clients locally and internationally</dd></div>
      </dl>
    </div></section>

    <section className="page-cta shell"><h2>Want to work with us?</h2><Link className="button button-small" href="/contact">Get in touch <span aria-hidden="true">&#8599;</span></Link></section>
    <SiteFooter />
  </main>;
}
