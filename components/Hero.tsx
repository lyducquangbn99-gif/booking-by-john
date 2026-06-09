import Image from "next/image";

const trustPoints = ["Competitive Rates", "Fast & Reliable", "Expert Support"];

const routes = [
  { lane: "Vietnam -> Italy", port: "Genoa" },
  { lane: "Vietnam -> Indonesia", port: "Jakarta" },
  { lane: "Vietnam -> Taiwan", port: "Kaohsiung" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#0B1F3A]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,119,182,0.55),transparent_34%),linear-gradient(135deg,#0B1F3A_0%,#0B1F3A_52%,#0077B6_100%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
            Vietnam export logistics for focused trade lanes
          </p>
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Your cargo from Vietnam to Italy, Indonesia & Taiwan -- handled with care.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Reliable ocean freight, customs clearance, trucking and door-to-door logistics solutions from Vietnam.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#request"
              className="rounded-md bg-accent-orange px-6 py-4 text-center text-sm font-black text-white shadow-lg shadow-black/20 transition hover:bg-[#EA580C]"
            >
              Get a Freight Quote
            </a>
            <a
              href="#contact"
              className="rounded-md border border-white/30 bg-white/10 px-6 py-4 text-center text-sm font-black text-white transition hover:bg-white hover:text-[#0B1F3A]"
            >
              Contact John
            </a>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {trustPoints.map((point) => (
              <div key={point} className="rounded-lg border border-white/15 bg-white/10 p-4 text-white">
                <div className="text-sm font-black">{point}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-white/15 bg-white/10 text-white shadow-2xl shadow-black/20 backdrop-blur">
          <div className="relative aspect-[4/3] min-h-72">
            <Image
              src="/logistics-hero.png"
              alt="Ocean freight containers and cargo ship at a modern port"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-200">Priority routes</p>
            </div>
          </div>
          <div className="space-y-4 p-5">
            {routes.map((route) => (
              <div key={route.lane} className="rounded-lg bg-white p-5 text-[#111827]">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-black text-[#0B1F3A]">{route.lane}</h2>
                  <span className="rounded-md bg-accent-orange px-3 py-1 text-xs font-black text-white">
                    Hot Lane
                  </span>
                </div>
                <p className="mt-3 text-sm text-text-secondary">Port of discharge: {route.port}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
