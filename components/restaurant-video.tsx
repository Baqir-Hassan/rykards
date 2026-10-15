export function RestaurantVideo() {
  return <figure className="solution-video">
    <figcaption className="section-label">/ Watch the Restaurant IMS overview</figcaption>
    <video controls playsInline preload="none" poster="/restaurant-video-poster.jpg" aria-label="Rykards Restaurant IMS software explainer">
      <source src="/IMS-explainer.mp4" type="video/mp4" />
      Your browser does not support video playback. <a href="/IMS-explainer.mp4">Download the Restaurant IMS overview</a>.
    </video>
  </figure>;
}
