import Image from "next/image";

const services = [
  {
    number: "01",
    title: "Product engineering",
    copy: "From first commit to production scale, we design and build web and mobile products that feel considered at every layer.",
    tags: ["Web platforms", "Mobile apps", "SaaS products"],
  },
  {
    number: "02",
    title: "AI & automation",
    copy: "We turn useful AI into dependable product features and workflows, with the guardrails, evaluation, and observability they need.",
    tags: ["AI agents", "RAG systems", "Workflow automation"],
  },
  {
    number: "03",
    title: "Cloud & platforms",
    copy: "Secure, resilient infrastructure that keeps delivery fast as your users, data, and engineering organisation grow.",
    tags: ["Cloud architecture", "DevOps", "Modernisation"],
  },
];

const process = [
  ["01", "Align", "We clarify the problem, the user, and what success must look like."],
  ["02", "Shape", "We turn uncertainty into a focused roadmap, prototype, and technical plan."],
  ["03", "Build", "A senior, cross-functional team ships in transparent weekly increments."],
  ["04", "Evolve", "We measure, learn, and strengthen the product after it meets the real world."],
];

const projectFeatures = [
  "Tee-time booking",
  "Member management",
  "Staff scheduling",
  "Integrated payments",
];

function Brand() {
  return <><span className="brand-mark" aria-hidden="true"><Image src="/rykards-logo.png" alt="" width={70} height={70} priority /></span><span>RYKARDS</span></>;
}

export default function Home() {
  return <main>
    <nav className="nav shell" aria-label="Main navigation">
      <a className="brand" href="#top" aria-label="Rykards home"><Brand /></a>
      <div className="nav-links"><a href="#services">Expertise</a><a href="#approach">Approach</a><a href="#about">About</a></div>
      <a className="button button-small" href="#contact">Start a project <span aria-hidden="true">&#8599;</span></a>
    </nav>

    <section className="hero shell" id="top">
      <div className="eyebrow"><span /> Independent software engineering company</div>
      <h1><span className="hero-line">We engineer</span><br /><span className="hero-line">what&apos;s <em>next.</em></span></h1>
      <div className="hero-lower"><p>Rykards partners with ambitious teams to design, build, and scale software that creates a real advantage.</p><a className="circle-link" href="#services" aria-label="Explore our expertise">&darr;</a></div>
      <div className="signal-card" aria-hidden="true"><div className="signal-top"><span>RYK / SYSTEM</span><span>BUILD 01</span></div><div className="signal-orbit"><span>IDEA</span><i /><span>IMPACT</span></div><div className="signal-bars"><i/><i/><i/><i/><i/><i/><i/><i/></div></div>
    </section>

    <section className="statement"><div className="shell statement-grid"><p className="section-label">/ Our point of view</p><div><h2>Complex software.<br /><span>Clear thinking.</span></h2><p>Technology should move a business forward, not create another layer of friction. We bring product strategy, design, and deep engineering together so the path from idea to impact stays remarkably clear.</p></div></div></section>

    <section className="services shell" id="services">
      <div className="section-head"><p className="section-label">/ What we do</p><h2>Built for the hard parts.</h2></div>
      <div>{services.map((service) => <article className="service" key={service.number}><span className="service-number">{service.number}</span><div><h3>{service.title}</h3><p>{service.copy}</p><ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div><span className="service-arrow" aria-hidden="true">&#8599;</span></article>)}</div>
    </section>

    <section className="marquee" aria-label="Rykards capabilities"><div>STRATEGY <span>&#9670;</span> DESIGN <span>&#9670;</span> ENGINEERING <span>&#9670;</span> AI <span>&#9670;</span> CLOUD <span>&#9670;</span> STRATEGY <span>&#9670;</span> DESIGN <span>&#9670;</span></div></section>

    <section className="approach shell" id="approach"><div className="approach-intro"><p className="section-label">/ How we work</p><h2>Momentum,<br /><em>without chaos.</em></h2><p>Small senior teams. Short feedback loops. Direct communication. Every engagement is designed to make progress visible and decisions easier.</p></div><div className="process-list">{process.map(([num,title,copy]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="principles" id="about"><div className="shell">
      <div className="section-head light"><p className="section-label">/ The Rykards standard</p><h2>Built like it matters.</h2></div>
      <div className="principle-grid"><article><strong>Senior by default.</strong><p>The people in the room are the people doing the work. Fewer layers, stronger decisions.</p></article><article><strong>Outcomes over output.</strong><p>We measure progress by the value software creates, not the volume of tickets closed.</p></article><article><strong>Quality compounds.</strong><p>Clear architecture, thoughtful interfaces, and maintainable code keep paying dividends.</p></article></div>
      <div className="principle-stats">
        <div><span className="stat-label">Team model</span><strong>1 <small>TEAM</small></strong><span>Integrated product delivery</span></div>
        <div><span className="stat-label">Delivery rhythm</span><strong>2 <small>WEEK</small></strong><span>Planning and shipping cycles</span></div>
        <div><span className="stat-label">Collaboration</span><strong>100<small>% OPEN</small></strong><span>Direct, transparent communication</span></div>
      </div>
    </div></section>

    <section className="featured shell" id="featured">
      <div className="featured-top"><p className="section-label">/ Currently building</p><span className="launch-tag"><i /> Launching Q3 2026</span></div>
      <div className="featured-grid"><div><p className="project-type">Member &amp; operations platform</p><h2>The operating system for a private golf club.</h2></div><div className="featured-details"><p>A single platform bringing the member experience and day-to-day club operations into one clear system.</p><ul>{projectFeatures.map((feature) => <li key={feature}><span aria-hidden="true">+</span>{feature}</li>)}</ul></div></div>
      <div className="featured-cta"><p>Have an operation ready for better software?</p><a className="button button-small" href="#contact">Ready to start? <span aria-hidden="true">&#8599;</span></a></div>
    </section>

    <section className="contact shell" id="contact"><p className="section-label">/ Have something ambitious in mind?</p><h2>Let&apos;s build the<br /><em>right thing.</em></h2><div className="contact-row"><p>Tell us where you want to go. We&apos;ll bring a clear perspective on how software can get you there.</p><a className="button button-large" href="mailto:hello@rykards.com?subject=Project%20enquiry">hello@rykards.com <span aria-hidden="true">&#8599;</span></a></div></section>

    <footer className="footer shell"><a className="brand" href="#top" aria-label="Rykards home"><Brand /></a><p>Software engineering for what&apos;s next.</p><p>&copy; 2026 Rykards</p></footer>
  </main>;
}