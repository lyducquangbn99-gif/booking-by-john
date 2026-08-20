import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

const routes = [
  { destination: "Italy", port: "Genoa", href: "/routes/ho-chi-minh-to-genoa" },
  { destination: "Spain", port: "Barcelona / Valencia", href: "/routes/ho-chi-minh-to-barcelona" },
  { destination: "France", port: "Fos-sur-Mer", href: "/routes/ho-chi-minh-to-fos-sur-mer" },
  { destination: "Indonesia", port: "Jakarta / Surabaya", href: "/routes/vietnam-to-indonesia" },
  { destination: "Taiwan", port: "Kaohsiung / Keelung", href: "/routes/vietnam-to-taiwan" },
];
const COPY: Record<string, { label: string; heading: string; intro: string; hot: string; available: string; discharge: string; guide: string; destinations: Record<string, string> }> = {
  en: { label: "Route guides", heading: "Ocean freight routes from Vietnam", intro: "Plan FCL and LCL shipments with port-specific information and request a current sailing or quote for the actual cargo-ready date.", hot: "Route guide", available: "Quote on request", discharge: "Port of discharge", guide: "View route guide", destinations: { Italy: "Italy", Spain: "Spain", France: "France", Indonesia: "Indonesia", Taiwan: "Taiwan" } },
  vi: { label: "Hướng dẫn tuyến", heading: "Các tuyến vận tải biển từ Việt Nam", intro: "Lập phương án FCL/LCL theo từng cảng và yêu cầu lịch tàu hoặc báo giá hiện hành theo đúng ngày hàng sẵn sàng.", hot: "Hướng dẫn tuyến", available: "Báo giá theo yêu cầu", discharge: "Cảng dỡ hàng", guide: "Xem hướng dẫn tuyến", destinations: { Italy: "Ý", Spain: "Tây Ban Nha", France: "Pháp", Indonesia: "Indonesia", Taiwan: "Đài Loan" } },
  it: { label: "Guide delle rotte", heading: "Rotte marittime dal Vietnam", intro: "Pianifica spedizioni FCL e LCL per porto e richiedi una partenza o un preventivo attuale per la data merce pronta.", hot: "Guida rotta", available: "Preventivo su richiesta", discharge: "Porto di sbarco", guide: "Consulta la guida", destinations: { Italy: "Italia", Spain: "Spagna", France: "Francia", Indonesia: "Indonesia", Taiwan: "Taiwan" } },
  es: { label: "Guías de rutas", heading: "Rutas marítimas desde Vietnam", intro: "Planifique envíos FCL y LCL por puerto y solicite una salida o cotización actual para la fecha de carga.", hot: "Guía de ruta", available: "Cotización a solicitud", discharge: "Puerto de descarga", guide: "Ver guía de ruta", destinations: { Italy: "Italia", Spain: "España", France: "Francia", Indonesia: "Indonesia", Taiwan: "Taiwán" } },
  id: { label: "Panduan rute", heading: "Rute ocean freight dari Vietnam", intro: "Rencanakan pengiriman FCL dan LCL per pelabuhan dan minta sailing atau penawaran terkini sesuai cargo-ready date.", hot: "Panduan rute", available: "Penawaran sesuai permintaan", discharge: "Pelabuhan bongkar", guide: "Lihat panduan rute", destinations: { Italy: "Italia", Spain: "Spanyol", France: "Prancis", Indonesia: "Indonesia", Taiwan: "Taiwan" } },
};

export default async function OceanRoutes() {
  const locale = await getLocale();
  const copy = COPY[locale] || COPY.en;
  return (
    <section id="routes" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-ocean-blue">{copy.label}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
            {copy.heading}
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-7 text-text-secondary">
          {copy.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {routes.map((route) => (
          <article
            key={route.destination}
            className="rounded-lg border border-border-subtle bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-md bg-orange-100 px-3 py-1 text-xs font-black text-[#EA580C]">
                {copy.hot}
              </span>
              <span className="text-sm font-semibold text-accent-green">{copy.available}</span>
            </div>
            <h3 className="mt-6 text-2xl font-black text-[#0B1F3A]">
              Vietnam → {copy.destinations[route.destination]}
            </h3>
            <p className="mt-4 text-text-secondary">
              {copy.discharge}: <span className="font-bold text-text-primary">{route.port}</span>
            </p>
            {route.href ? (
              <Link
                href={route.href}
                className="mt-5 inline-flex text-sm font-black text-ocean-blue underline underline-offset-4"
              >
                {copy.guide}
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
