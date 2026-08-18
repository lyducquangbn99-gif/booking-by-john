import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

const routes = [
  { destination: "Italy", port: "Genoa", href: "/routes/ho-chi-minh-to-genoa" },
  { destination: "Spain", port: "Barcelona / Valencia", href: "/routes/ho-chi-minh-to-barcelona" },
  { destination: "Indonesia", port: "Jakarta / Surabaya", href: "/routes/vietnam-to-indonesia" },
  { destination: "Taiwan", port: "Kaohsiung / Keelung", href: "/routes/vietnam-to-taiwan" },
];
const COPY: Record<string, { label: string; heading: string; intro: string; hot: string; available: string; discharge: string; guide: string; destinations: Record<string, string> }> = {
  en: { label: "Popular routes", heading: "Hot lanes from Vietnam", intro: "Focused support for importers and exporters moving cargo through practical, high-demand lanes.", hot: "Hot Lane", available: "Available", discharge: "Port of discharge", guide: "View route guide", destinations: { Italy: "Italy", Spain: "Spain", Indonesia: "Indonesia", Taiwan: "Taiwan" } },
  vi: { label: "Tuyến phổ biến", heading: "Các tuyến trọng điểm từ Việt Nam", intro: "Hỗ trợ tập trung cho doanh nghiệp xuất nhập khẩu trên các tuyến có nhu cầu thực tế.", hot: "Tuyến trọng điểm", available: "Đang hỗ trợ", discharge: "Cảng dỡ hàng", guide: "Xem hướng dẫn tuyến", destinations: { Italy: "Ý", Spain: "Tây Ban Nha", Indonesia: "Indonesia", Taiwan: "Đài Loan" } },
  it: { label: "Rotte popolari", heading: "Rotte prioritarie dal Vietnam", intro: "Supporto dedicato a importatori ed esportatori sulle rotte più pratiche.", hot: "Rotta prioritaria", available: "Disponibile", discharge: "Porto di sbarco", guide: "Consulta la guida", destinations: { Italy: "Italia", Spain: "Spagna", Indonesia: "Indonesia", Taiwan: "Taiwan" } },
  es: { label: "Rutas populares", heading: "Rutas prioritarias desde Vietnam", intro: "Apoyo específico para importadores y exportadores en rutas prácticas.", hot: "Ruta prioritaria", available: "Disponible", discharge: "Puerto de descarga", guide: "Ver guía de ruta", destinations: { Italy: "Italia", Spain: "España", Indonesia: "Indonesia", Taiwan: "Taiwán" } },
  id: { label: "Rute populer", heading: "Rute prioritas dari Vietnam", intro: "Dukungan terfokus bagi importir dan eksportir pada rute yang praktis.", hot: "Rute prioritas", available: "Tersedia", discharge: "Pelabuhan bongkar", guide: "Lihat panduan rute", destinations: { Italy: "Italia", Spain: "Spanyol", Indonesia: "Indonesia", Taiwan: "Taiwan" } },
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

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
