import { getLocale } from "next-intl/server";

const COPY: Record<string, Array<{ value: string; label: string }>> = {
  en: [
    { value: "Route", label: "Shipment-specific planning" },
    { value: "Scope", label: "Itemized charge review" },
    { value: "Direct", label: "One point of contact" },
    { value: "5", label: "Website languages" },
  ],
  vi: [
    { value: "Tuyến", label: "Phương án theo từng lô hàng" },
    { value: "Chi phí", label: "Rà soát phạm vi phí" },
    { value: "Trực tiếp", label: "Một đầu mối liên hệ" },
    { value: "5", label: "Ngôn ngữ website" },
  ],
  it: [
    { value: "Rotta", label: "Piano specifico per spedizione" },
    { value: "Costi", label: "Verifica dei costi inclusi" },
    { value: "Diretto", label: "Un solo referente" },
    { value: "5", label: "Lingue del sito" },
  ],
  es: [
    { value: "Ruta", label: "Plan específico por envío" },
    { value: "Cargos", label: "Revisión del alcance" },
    { value: "Directo", label: "Un único contacto" },
    { value: "5", label: "Idiomas del sitio" },
  ],
  id: [
    { value: "Rute", label: "Rencana khusus per kiriman" },
    { value: "Biaya", label: "Tinjauan cakupan biaya" },
    { value: "Langsung", label: "Satu kontak utama" },
    { value: "5", label: "Bahasa website" },
  ],
};

export default async function StatsBar() {
  const locale = await getLocale();
  const stats = COPY[locale] || COPY.en;
  return (
    <section className="border-y border-border-subtle bg-bg-secondary">
      <div className="mx-auto grid max-w-6xl grid-cols-2 px-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`px-6 py-10 text-center ${index < stats.length - 1 ? "border-r border-border-subtle" : ""}`}
          >
            <div className="mb-2 font-display text-2xl font-bold text-accent-green md:text-3xl">
              {stat.value}
            </div>
            <div className="text-xs uppercase tracking-widest text-text-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
