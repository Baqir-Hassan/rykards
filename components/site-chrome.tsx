import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";

export const contactEmail = "contact@rykards.com";
export const legalName = "RYKARDS (PVT) LTD";

function Brand() {
  return <><Image className="brand-mark" src="/rykards-mark.png" alt="" width={48} height={48} priority /><span className="brand-name">Rykards</span></>;
}

export function SiteNav() {
  return <nav className="nav shell" aria-label="Main navigation">
    <Link className="brand" href="/" aria-label="Rykards home"><Brand /></Link>
    <div className="nav-links"><Link href="/#expertise">Expertise</Link><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
    <Link className="button button-small nav-cta" href="/contact">Start a project <span aria-hidden="true">&#8599;</span></Link>
    <MobileMenu />
  </nav>;
}

export function SiteFooter() {
  return <footer className="footer shell">
    <Link className="brand" href="/" aria-label="Rykards home"><Brand /></Link>
    <div className="footer-links"><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link></div>
    <p>&copy; {new Date().getFullYear()} {legalName} &middot; Pakistan</p>
  </footer>;
}

export function PageHero({ label, title, intro }: { label: string; title: React.ReactNode; intro: string }) {
  return <section className="page-hero shell">
    <p className="section-label">{label}</p>
    <h1>{title}</h1>
    <p className="page-intro">{intro}</p>
  </section>;
}
