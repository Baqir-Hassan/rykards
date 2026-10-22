"use client";

import Link from "next/link";
import { useState } from "react";

const bookingUrl = "https://calendly.com/software-rykards/rykards-business-discovery-call";

export function MeetingScheduler() {
  const [open, setOpen] = useState(false);

  return <section className="shell meeting-section" id="book-meeting" aria-labelledby="meeting-heading">
    <div className="meeting-heading">
      <div>
        <p className="section-label">/ Book a meeting</p>
        <h2 id="meeting-heading">A conversation.<br />A clear next step.</h2>
      </div>
      <div className="meeting-details">
        <p className="meeting-format">20 minutes · Google Meet</p>
        <p>Book a Rykards business discovery call to discuss your operation, explore a product demo, or talk through a custom build. Choose a time that works for you.</p>
      </div>
    </div>

    <div className="meeting-launch">
      <p>See available times and confirm your meeting through Calendly.</p>
      <button className="button button-small" type="button" aria-expanded={open} aria-controls="meeting-calendar" onClick={() => setOpen(!open)}>{open ? "Hide calendar" : "Choose a time"} <span aria-hidden="true">&#8599;</span></button>
    </div>

    <div id="meeting-calendar">
      {open && <iframe
        className="meeting-calendar"
        src={bookingUrl}
        title="Book a 20-minute Rykards business discovery call with Calendly"
      />}
    </div>

    <p className="meeting-fallback"><a className="text-link" href={bookingUrl} target="_blank" rel="noopener noreferrer">Open booking page in a new tab <span aria-hidden="true">&#8599;</span></a><span>Prefer to write? <a className="text-link" href="#enquiry">Send an enquiry</a>.</span></p>
    <p className="meeting-privacy">Choosing a time loads Calendly, which processes booking details and may use cookies. Read our <Link className="text-link" href="/privacy">privacy policy</Link> and <a className="text-link" href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">Calendly&apos;s privacy policy</a>.</p>
  </section>;
}
