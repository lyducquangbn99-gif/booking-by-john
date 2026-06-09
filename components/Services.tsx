import { PackageCheck, Plane, Ship, Truck, Warehouse, ClipboardCheck } from "lucide-react";

const services = [
  { icon: Ship, title: "Ocean Freight", description: "FCL and LCL shipping with practical routing and rate guidance." },
  { icon: Plane, title: "Air Freight", description: "Urgent cargo support when speed matters more than ocean transit." },
  { icon: Truck, title: "Drayage & Trucking", description: "Port pickup, inland delivery, and coordinated container movement." },
  { icon: Warehouse, title: "Warehousing", description: "Storage and handling support before export or final delivery." },
  { icon: ClipboardCheck, title: "Customs Clearance", description: "Documentation and clearance coordination to reduce delays." },
  { icon: PackageCheck, title: "Door to Door", description: "End-to-end logistics from Vietnam origin to overseas consignee." },
];

export default function Services() {
  return (
    <section id="services" className="border-y border-border-subtle bg-white px-5 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-wide text-ocean-blue">Services</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
            Freight services built around clear communication
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="rounded-lg border border-border-subtle bg-white p-6 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-orange-50 text-accent-orange">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-black text-[#0B1F3A]">{service.title}</h3>
                <p className="mt-3 leading-7 text-text-secondary">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
