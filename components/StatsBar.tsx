import { getLocale } from "next-intl/server";

type Action = { value: string; label: string; href: string; external?: boolean };

const COPY: Record<string, Action[]> = {
  en: [
    { value: "2 min", label: "Send shipment details", href: "#request" },
    { value: "Current route", label: "Checked for your ready date", href: "#request" },
    { value: "Clear charges", label: "Know what the quote includes", href: "#request" },
    { value: "Talk to John", label: "Direct Zalo / WhatsApp", href: "https://wa.me/84352193969", external: true },
  ],
  vi: [
    { value: "2 phút", label: "Gửi nhanh thông tin lô hàng", href: "#request" },
    { value: "Tuyến hiện hành", label: "Kiểm tra theo ngày hàng sẵn sàng", href: "#request" },
    { value: "Phí rõ ràng", label: "Biết báo giá gồm những khoản nào", href: "#request" },
    { value: "Trao đổi với John", label: "Zalo / WhatsApp trực tiếp", href: "https://wa.me/84352193969", external: true },
  ],
  it: [
    { value: "2 min", label: "Invia i dati della spedizione", href: "#request" },
    { value: "Rotta attuale", label: "Verificata per la data della merce", href: "#request" },
    { value: "Costi chiari", label: "Sai cosa include il preventivo", href: "#request" },
    { value: "Parla con John", label: "Zalo / WhatsApp diretto", href: "https://wa.me/84352193969", external: true },
  ],
  es: [
    { value: "2 min", label: "Envía los datos del envío", href: "#request" },
    { value: "Ruta actual", label: "Revisada para la fecha de carga", href: "#request" },
    { value: "Cargos claros", label: "Conoce qué incluye la cotización", href: "#request" },
    { value: "Habla con John", label: "Zalo / WhatsApp directo", href: "https://wa.me/84352193969", external: true },
  ],
  id: [
    { value: "2 menit", label: "Kirim detail pengiriman", href: "#request" },
    { value: "Rute terkini", label: "Diperiksa untuk tanggal kesiapan", href: "#request" },
    { value: "Biaya jelas", label: "Ketahui isi penawaran", href: "#request" },
    { value: "Hubungi John", label: "Zalo / WhatsApp langsung", href: "https://wa.me/84352193969", external: true },
  ],
};

export default async function StatsBar() {
  const locale = await getLocale();
  const actions = COPY[locale] || COPY.en;

  return (
    <section className="border-y border-border-subtle bg-bg-secondary" aria-label="Quick booking benefits">
      <div className="mx-auto grid max-w-6xl grid-cols-2 px-6 md:grid-cols-4">
        {actions.map((action, index) => (
          <a
            key={action.label}
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noreferrer" : undefined}
            className={`group px-5 py-9 text-center transition-colors hover:bg-bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-green ${
              index < actions.length - 1 ? "border-r border-border-subtle" : ""
            }`}
          >
            <div className="mb-2 font-display text-xl font-bold text-accent-green transition-transform group-hover:-translate-y-0.5 md:text-2xl">
              {action.value}
            </div>
            <div className="text-xs uppercase leading-relaxed tracking-widest text-text-muted">
              {action.label}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
