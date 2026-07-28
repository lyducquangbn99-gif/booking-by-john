import { getLocale } from "next-intl/server";

type Copy = { label: string; heading: string; items: Array<{ title: string; detail: string }> };
const COPY: Record<string, Copy> = {
  en: {
    label: "How inquiries are handled",
    heading: "A clear process before cargo moves",
    items: [
      { title: "Cargo-first review", detail: "Options are checked against the actual commodity, volume, route, ready date and Incoterm." },
      { title: "Visible charge scope", detail: "Quotes distinguish freight, local charges, customs, taxes and delivery where applicable." },
      { title: "Document readiness", detail: "Shipping instructions, VGM and available commercial documents are reviewed against the agreed plan." },
      { title: "Current routing", detail: "Schedules and routing are checked for the shipment date instead of presented as permanent promises." },
      { title: "One point of contact", detail: "The inquiry remains connected to one named contact for follow-up and operational questions." },
      { title: "Data care", detail: "Contact and cargo details are used only to respond to the freight request and coordinate the service." },
    ],
  },
  vi: {
    label: "Cách xử lý yêu cầu",
    heading: "Quy trình rõ ràng trước khi hàng di chuyển",
    items: [
      { title: "Kiểm tra theo hàng thực tế", detail: "Phương án dựa trên mặt hàng, sản lượng, tuyến, ngày sẵn sàng và Incoterm." },
      { title: "Phạm vi phí rõ ràng", detail: "Báo giá tách cước, phí địa phương, hải quan, thuế và giao hàng khi áp dụng." },
      { title: "Sẵn sàng chứng từ", detail: "Shipping instruction, VGM và chứng từ thương mại có sẵn được rà theo phương án." },
      { title: "Tuyến đi hiện hành", detail: "Lịch và routing được kiểm tra theo ngày hàng thay vì cam kết cố định." },
      { title: "Một đầu mối", detail: "Yêu cầu được theo dõi bởi một đầu mối cho trao đổi và vận hành." },
      { title: "Bảo vệ dữ liệu", detail: "Thông tin liên hệ và hàng hóa chỉ dùng để phản hồi yêu cầu và điều phối dịch vụ." },
    ],
  },
  it: {
    label: "Come gestiamo le richieste",
    heading: "Un processo chiaro prima della partenza",
    items: [
      { title: "Verifica della merce", detail: "Le opzioni dipendono da merce, volume, rotta, data pronta e Incoterm." },
      { title: "Costi visibili", detail: "L’offerta distingue nolo, costi locali, dogana, imposte e consegna." },
      { title: "Documenti pronti", detail: "Istruzioni, VGM e documenti disponibili vengono verificati sul piano concordato." },
      { title: "Rotta aggiornata", detail: "Programmi e routing sono verificati per la data reale." },
      { title: "Un referente", detail: "La richiesta rimane collegata a un contatto nominativo." },
      { title: "Cura dei dati", detail: "Dati di contatto e merce sono usati solo per la richiesta e il servizio." },
    ],
  },
  es: {
    label: "Cómo gestionamos las solicitudes",
    heading: "Un proceso claro antes de mover la carga",
    items: [
      { title: "Revisión de la carga", detail: "Las opciones se basan en mercancía, volumen, ruta, fecha e Incoterm." },
      { title: "Cargos visibles", detail: "La oferta distingue flete, cargos locales, aduana, impuestos y entrega." },
      { title: "Documentos preparados", detail: "Instrucciones, VGM y documentos disponibles se revisan según el plan." },
      { title: "Ruta actual", detail: "Horarios y routing se comprueban para la fecha real." },
      { title: "Un contacto", detail: "La solicitud permanece vinculada a un contacto identificado." },
      { title: "Cuidado de datos", detail: "Los datos se usan solo para responder y coordinar el servicio." },
    ],
  },
  id: {
    label: "Cara kami menangani permintaan",
    heading: "Proses yang jelas sebelum kargo bergerak",
    items: [
      { title: "Tinjauan kargo", detail: "Opsi diperiksa berdasarkan komoditas, volume, rute, tanggal siap, dan Incoterm." },
      { title: "Cakupan biaya jelas", detail: "Penawaran memisahkan freight, biaya lokal, bea cukai, pajak, dan pengiriman." },
      { title: "Kesiapan dokumen", detail: "Instruksi, VGM, dan dokumen yang tersedia ditinjau sesuai rencana." },
      { title: "Rute terkini", detail: "Jadwal dan routing diperiksa untuk tanggal pengiriman sebenarnya." },
      { title: "Satu kontak", detail: "Permintaan tetap terhubung ke satu kontak untuk tindak lanjut." },
      { title: "Perlindungan data", detail: "Data kontak dan kargo hanya digunakan untuk permintaan dan layanan." },
    ],
  },
};

export default async function Trust() {
  const locale = await getLocale();
  const copy = COPY[locale] || COPY.en;
  return (
    <section id="trust" className="bg-bg-secondary px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs uppercase tracking-widest text-accent-green">{copy.label}</p>
        <h2 className="mb-14 text-3xl font-bold text-text-primary md:text-4xl">{copy.heading}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((item) => (
            <article key={item.title} className="rounded-xl border border-border-subtle bg-bg-card p-8">
              <h3 className="mb-3 text-sm font-bold text-text-primary">{item.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
