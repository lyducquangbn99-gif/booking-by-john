// components/Services.tsx
const services = [
  { icon: "🚛", title: "Full Truckload (FTL)",    description: "Dedicated capacity for loads 10K+ lbs. Direct, no stops, fast transit." },
  { icon: "📦", title: "LTL",                      description: "Cost-efficient for palletized freight under 10K lbs with flexible pickup." },
  { icon: "🚢", title: "Drayage",                  description: "Port-to-warehouse container moves. Chassis management included." },
  { icon: "🚂", title: "Intermodal",               description: "Rail + truck combo for long-haul savings without sacrificing reliability." },
  { icon: "⚡", title: "Expedited",                description: "Hot shots, team drivers, air freight. When it absolutely can't wait." },
  { icon: "✈️", title: "Courier — VN to World",   description: "Authorized agent for UPS, DHL, and FedEx in Vietnam. Fast, door-to-door delivery worldwide." },
  { icon: "🌊", title: "Ocean Freight",            description: "From/to Vietnam to the world. Competitive rates with suitable schedules for your shipment." },
];

export default function Services() {
  return (
    <section id="services" className="bg-bg-primary py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-display text-xs text-accent-green tracking-widest uppercase mb-4">
          What we move
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-14">
          Seven ways to ship
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-bg-card border border-border-subtle rounded-xl p-8 hover:-translate-y-1 hover:border-accent-green transition-all duration-200 cursor-default"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-display text-sm font-bold text-text-primary mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
