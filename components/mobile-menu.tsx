"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  ["/#expertise", "Expertise"],
  ["/work", "Work"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return <div className="mobile-menu">
    <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu-panel" onClick={() => setOpen(!open)}>
      {open ? "Close" : "Menu"}
    </button>
    {open && <div className="menu-panel" id="mobile-menu-panel">
      {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link className="button" href="/contact" onClick={() => setOpen(false)}>Start a project <span aria-hidden="true">&#8599;</span></Link>
    </div>}
  </div>;
}
