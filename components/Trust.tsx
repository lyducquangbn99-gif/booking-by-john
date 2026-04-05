// components/Trust.tsx
const trustPoints = [
  {
    title: "Carrier Vetting",
    detail: "FMCSA clearance, $1M+ cargo insurance, safety score monitoring, no double-brokering.",
  },
  {
    title: "Live Tracking",
    detail: "GPS pings every 15 min, proactive check-call updates.",
  },
  {
    title: "2-Hour Quote SLA",
    detail: "Standard lanes within 2 hours; complex lanes same-day.",
  },
  {
    title: "Claims Under 0.5%",
    detail: "Full claims support, resolution typically under 30 days.",
  },
  {
    title: "One Point of Contact",
    detail: "Named rep with direct line, knows your lanes and preferences.",
  },
  {
    title: "Specialized Freight",
    detail: "Oversized, temp-controlled, hazmat, high-value experience.",
  },
];

export default function Trust() {
  return (
    <section id="trust" className="bg-bg-secondary py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-display text-xs text-accent-green tracking-widest uppercase mb-4">
          Why us
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-14">
          Built on proof, not promises
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trustPoints.map((point, i) => (
            <div
              key={i}
              className="bg-bg-card border border-border-subtle border-t-transparent hover:border-t-accent-green rounded-xl p-8 hover:-translate-y-1 transition-all duration-200 cursor-default"
            >
              <h3 className="font-display text-sm font-bold text-text-primary mb-3">
                {point.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {point.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
