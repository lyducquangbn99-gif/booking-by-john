const routes = [
  { lane: "Vietnam -> Italy", port: "Genoa" },
  { lane: "Vietnam -> Indonesia", port: "Jakarta" },
  { lane: "Vietnam -> Taiwan", port: "Kaohsiung" },
];

export default function OceanRoutes() {
  return (
    <section id="routes" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-ocean-blue">Popular routes</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
            Hot lanes from Vietnam
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-7 text-text-secondary">
          Focused support for importers and exporters moving cargo through practical, high-demand lanes.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {routes.map((route) => (
          <article
            key={route.lane}
            className="rounded-lg border border-border-subtle bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-md bg-orange-100 px-3 py-1 text-xs font-black text-[#EA580C]">
                Hot Lane
              </span>
              <span className="text-sm font-semibold text-accent-green">Available</span>
            </div>
            <h3 className="mt-6 text-2xl font-black text-[#0B1F3A]">{route.lane}</h3>
            <p className="mt-4 text-text-secondary">
              Port of discharge: <span className="font-bold text-text-primary">{route.port}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
