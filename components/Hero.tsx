import Image from "next/image";
import { getLocale } from "next-intl/server";

const routes = [
  { destination: "Italy", port: "Genoa" },
  { destination: "Spain", port: "Barcelona / Valencia" },
  { destination: "Indonesia", port: "Jakarta / Surabaya" },
  { destination: "Taiwan", port: "Kaohsiung / Keelung" },
];
const COPY: Record<string, {
  eyebrow: string; title: string; body: string; quote: string; contact: string;
  trust: string[]; priority: string; hot: string; discharge: string; imageAlt: string;
  destinations: Record<string, string>;
}> = {
  en: {
    eyebrow: "Vietnam export logistics for focused trade lanes",
    title: "International freight from Vietnam, planned around your real cargo.",
    body: "Ocean freight, air freight, customs coordination, trucking and door-to-door support from Vietnam.",
    quote: "Get a Freight Quote", contact: "Contact John",
    trust: ["Clear charge scope", "Practical route options", "Direct support"],
    priority: "Priority routes", hot: "Priority", discharge: "Port of discharge",
    imageAlt: "Ocean freight containers and cargo ship at a modern port",
    destinations: { Italy: "Italy", Spain: "Spain", Indonesia: "Indonesia", Taiwan: "Taiwan" },
  },
  vi: {
    eyebrow: "Logistics xuất khẩu từ Việt Nam theo tuyến trọng điểm",
    title: "Vận chuyển quốc tế từ Việt Nam theo đúng nhu cầu thực tế của lô hàng.",
    body: "Vận tải biển, hàng không, điều phối hải quan, trucking và door-to-door từ Việt Nam.",
    quote: "Nhận báo giá vận chuyển", contact: "Liên hệ John",
    trust: ["Phạm vi phí rõ ràng", "Phương án tuyến thực tế", "Hỗ trợ trực tiếp"],
    priority: "Tuyến ưu tiên", hot: "Ưu tiên", discharge: "Cảng dỡ hàng",
    imageAlt: "Container và tàu hàng tại cảng biển hiện đại",
    destinations: { Italy: "Ý", Spain: "Tây Ban Nha", Indonesia: "Indonesia", Taiwan: "Đài Loan" },
  },
  it: {
    eyebrow: "Logistica export dal Vietnam sulle rotte prioritarie",
    title: "Trasporto internazionale dal Vietnam pianificato sulla merce reale.",
    body: "Trasporto marittimo e aereo, coordinamento doganale, trucking e door-to-door dal Vietnam.",
    quote: "Richiedi un preventivo", contact: "Contatta John",
    trust: ["Costi inclusi chiari", "Rotte pratiche", "Supporto diretto"],
    priority: "Rotte prioritarie", hot: "Priorità", discharge: "Porto di sbarco",
    imageAlt: "Container e nave cargo in un porto moderno",
    destinations: { Italy: "Italia", Spain: "Spagna", Indonesia: "Indonesia", Taiwan: "Taiwan" },
  },
  es: {
    eyebrow: "Logística de exportación desde Vietnam en rutas prioritarias",
    title: "Transporte internacional desde Vietnam adaptado a la carga real.",
    body: "Transporte marítimo y aéreo, coordinación aduanera, trucking y puerta a puerta desde Vietnam.",
    quote: "Solicitar cotización", contact: "Contactar con John",
    trust: ["Cargos claramente definidos", "Rutas prácticas", "Apoyo directo"],
    priority: "Rutas prioritarias", hot: "Prioridad", discharge: "Puerto de descarga",
    imageAlt: "Contenedores y buque de carga en un puerto moderno",
    destinations: { Italy: "Italia", Spain: "España", Indonesia: "Indonesia", Taiwan: "Taiwán" },
  },
  id: {
    eyebrow: "Logistik ekspor Vietnam untuk rute prioritas",
    title: "Pengiriman internasional dari Vietnam berdasarkan kargo sebenarnya.",
    body: "Angkutan laut dan udara, koordinasi bea cukai, trucking, dan door-to-door dari Vietnam.",
    quote: "Minta penawaran", contact: "Hubungi John",
    trust: ["Cakupan biaya jelas", "Opsi rute praktis", "Dukungan langsung"],
    priority: "Rute prioritas", hot: "Prioritas", discharge: "Pelabuhan bongkar",
    imageAlt: "Kontainer dan kapal kargo di pelabuhan modern",
    destinations: { Italy: "Italia", Spain: "Spanyol", Indonesia: "Indonesia", Taiwan: "Taiwan" },
  },
};

export default async function Hero() {
  const locale = await getLocale();
  const copy = COPY[locale] || COPY.en;
  return (
    <section id="home" className="relative overflow-hidden bg-[#0B1F3A]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,119,182,0.55),transparent_34%),linear-gradient(135deg,#0B1F3A_0%,#0B1F3A_52%,#0077B6_100%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
            {copy.eyebrow}
          </p>
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            {copy.body}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#request"
              data-quote-cta="hero"
              className="rounded-md bg-accent-orange px-6 py-4 text-center text-sm font-black text-white shadow-lg shadow-black/20 transition hover:bg-[#EA580C]"
            >
              {copy.quote}
            </a>
            <a
              href="#contact"
              className="rounded-md border border-white/30 bg-white/10 px-6 py-4 text-center text-sm font-black text-white transition hover:bg-white hover:text-[#0B1F3A]"
            >
              {copy.contact}
            </a>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {copy.trust.map((point) => (
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
              alt={copy.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-200">{copy.priority}</p>
            </div>
          </div>
          <div className="space-y-4 p-5">
            {routes.map((route) => (
              <div key={route.destination} className="rounded-lg bg-white p-5 text-[#111827]">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-black text-[#0B1F3A]">Vietnam → {copy.destinations[route.destination]}</h2>
                  <span className="rounded-md bg-accent-orange px-3 py-1 text-xs font-black text-white">
                    {copy.hot}
                  </span>
                </div>
                <p className="mt-3 text-sm text-text-secondary">{copy.discharge}: {route.port}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
