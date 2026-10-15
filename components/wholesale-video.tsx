export function WholesaleVideo() {
  return <figure className="solution-video">
    <figcaption className="section-label">/ Watch the wholesale overview</figcaption>
    <video controls playsInline preload="none" poster="/wholesale-video-poster.jpg" aria-label="Rykards wholesale software explainer">
      <source src="/rykards-explainer-spoken-contact.mp4" type="video/mp4" />
      Your browser does not support video playback. <a href="/rykards-explainer-spoken-contact.mp4">Download the wholesale overview</a>.
    </video>
  </figure>;
}
