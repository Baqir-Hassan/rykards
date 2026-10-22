import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";

export const contactEmail = "contact@rykards.com";
export const legalName = "RYKARDS (PRIVATE) LIMITED";

function Brand() {
  return <><Image className="brand-mark" src="/rykards-mark.png" alt="" width={48} height={48} priority /><span className="brand-name">Rykards</span></>;
}

export function SiteNav() {
  return <nav className="nav shell" aria-label="Main navigation">
    <Link className="brand" href="/" aria-label="Rykards home"><Brand /></Link>
    <div className="nav-links"><Link href="/work">Products & work</Link><Link href="/#markets">Markets</Link><Link href="/overseas-clients">Overseas clients</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
    <Link className="button button-small nav-cta" href="/contact#book-meeting">Book a meeting <span aria-hidden="true">&#8599;</span></Link>
    <MobileMenu />
  </nav>;
}

export function SiteFooter() {
  return <footer className="footer shell">
    <Link className="brand" href="/" aria-label="Rykards home"><Brand /></Link>
    <div className="footer-links"><Link href="/uk-software-agency-partnerships">UK agencies</Link><Link href="/uae-wholesale-software">UAE wholesalers</Link><Link href="/overseas-clients">Overseas clients</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link></div>
    <p>&copy; {new Date().getFullYear()} {legalName} &middot; Pakistan</p>
  </footer>;
}

export function PageHero({ label, title, intro }: { label: string; title: React.ReactNode; intro: React.ReactNode }) {
  return <section className="page-hero shell">
    <p className="section-label">{label}</p>
    <h1>{title}</h1>
    <p className="page-intro">{intro}</p>
  </section>;
}
