import { useState } from "react";

export default function Bottle({ hue = 20, image, alt = "Perfume bottle" }) {
  const [failed, setFailed] = useState(false);

  if (image && !failed) {
    return (
      <img
        src={image}
        alt={alt}
        className="bottle"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 100 120"
      className="bottle"
      role="img"
      aria-label="Perfume bottle"
    >
      <rect width="100" height="120" fill={`hsl(${hue} 35% 94%)`} />
      <rect x="42" y="14" width="16" height="12" fill="#C7A45A" />
      <rect x="46" y="26" width="8" height="8" fill="#a8863f" />
      <rect
        x="26"
        y="34"
        width="48"
        height="70"
        rx="8"
        fill={`hsl(${hue} 55% 38%)`}
      />
      <rect
        x="32"
        y="42"
        width="8"
        height="54"
        rx="4"
        fill="#fff"
        opacity=".25"
      />
      <rect x="38" y="62" width="24" height="18" fill="#FAF7F2" opacity=".9" />
    </svg>
  );
}