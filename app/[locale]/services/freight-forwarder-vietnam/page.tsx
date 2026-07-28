import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };
type Copy = {
  eyebrow: string;
  title: string;
  description: string;
  quote: string;
  guide: string;
  supportTitle: string;
  supportIntro: string;
  services: Array<{ title: string; body: string }>;
  processTitle: string;
  process: Array<{ title: string; body: string }>;
  detailsTitle: string;
  detailsBody: string;
  details: string[];
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  finalTitle: string;
  finalBody: string;
};

const COPY: Record<string, Copy> = {
  en: {
    eyebrow: "Vietnam freight forwarding support",
    title: "A freight forwarder in Vietnam for international shipments",
    description: "Plan ocean freight, air freight, export handling and delivery with one clear point of contact in Vietnam.",
    quote: "Request a freight quote",
    guide: "See how the process works",
    supportTitle: "Shipment support built around the real cargo",
    supportIntro: "The right solution depends on the commodity, volume, origin, destination, Incoterm and cargo-ready date. Each request is checked on those facts rather than a generic price promise.",
    services: [
      { title: "Ocean freight", body: "FCL and LCL planning from major Vietnamese ports, with routing and local-charge comparisons." },
      { title: "Air freight", body: "Options for urgent or higher-value cargo when transit time is the main priority." },
      { title: "Export coordination", body: "Support with booking cut-offs, shipping instructions, VGM and document readiness." },
      { title: "Door delivery", body: "Pickup and destination delivery can be included when full addresses and shipment terms are available." },
    ],
    processTitle: "A practical four-step process",
    process: [
      { title: "Share cargo details", body: "Provide the route, commodity, packages, dimensions, weight, ready date and Incoterm." },
      { title: "Compare suitable options", body: "Review the routing, schedule, equipment, charge scope and operational constraints." },
      { title: "Confirm before booking", body: "Agree on the selected option, documentation, cut-offs and responsibilities." },
      { title: "Coordinate the shipment", body: "Track the agreed milestones and communicate exceptions that require a decision." },
    ],
    detailsTitle: "What to send for an accurate quote",
    detailsBody: "Complete information reduces follow-up questions and makes competing options easier to compare.",
    details: ["Pickup location and final destination", "Commodity and HS code if available", "Package count, dimensions, weight and CBM", "FCL container type or LCL requirement", "Cargo-ready date and Incoterm", "Special handling, controlled or oversized cargo details"],
    faqTitle: "Freight forwarding questions",
    faqs: [
      { question: "Can you handle both FCL and LCL?", answer: "Yes. The suitable option depends on cargo volume, handling risk, schedule and total charges." },
      { question: "Can a quote include pickup and delivery?", answer: "Yes, when the full pickup address, delivery postcode, cargo details and Incoterm are provided." },
      { question: "Are rates fixed?", answer: "No. Freight rates and capacity change, so every quote should state its validity and charge scope." },
    ],
    finalTitle: "Planning a shipment from Vietnam?",
    finalBody: "Send the actual cargo details to receive a route-specific comparison instead of a generic estimate.",
  },
  vi: {
    eyebrow: "Hỗ trợ giao nhận vận tải tại Việt Nam",
    title: "Đơn vị freight forwarder tại Việt Nam cho hàng quốc tế",
    description: "Lập kế hoạch vận tải biển, hàng không, xử lý xuất khẩu và giao hàng với một đầu mối rõ ràng tại Việt Nam.",
    quote: "Yêu cầu báo giá vận chuyển",
    guide: "Xem quy trình làm việc",
    supportTitle: "Giải pháp dựa trên thông tin thật của lô hàng",
    supportIntro: "Phương án phù hợp phụ thuộc vào mặt hàng, sản lượng, điểm đi, điểm đến, Incoterm và ngày hàng sẵn sàng. Mỗi yêu cầu được kiểm tra theo dữ liệu thực tế, không dựa trên lời hứa giá chung chung.",
    services: [
      { title: "Vận tải biển", body: "Lập phương án FCL và LCL từ các cảng chính của Việt Nam, so sánh tuyến đi và phụ phí địa phương." },
      { title: "Vận tải hàng không", body: "Phương án cho hàng gấp hoặc giá trị cao khi thời gian vận chuyển là ưu tiên." },
      { title: "Điều phối xuất khẩu", body: "Hỗ trợ cut-off booking, shipping instruction, VGM và chuẩn bị chứng từ." },
      { title: "Giao hàng tận nơi", body: "Có thể bao gồm lấy hàng và giao hàng khi có địa chỉ đầy đủ cùng điều kiện vận chuyển." },
    ],
    processTitle: "Quy trình thực tế gồm bốn bước",
    process: [
      { title: "Gửi thông tin hàng", body: "Cung cấp tuyến, mặt hàng, kiện, kích thước, trọng lượng, ngày sẵn sàng và Incoterm." },
      { title: "So sánh phương án", body: "Đánh giá tuyến đi, lịch tàu hoặc chuyến bay, thiết bị, phạm vi chi phí và hạn chế khai thác." },
      { title: "Xác nhận trước booking", body: "Thống nhất phương án, chứng từ, cut-off và trách nhiệm của các bên." },
      { title: "Điều phối lô hàng", body: "Theo dõi các mốc đã thống nhất và thông báo khi có ngoại lệ cần quyết định." },
    ],
    detailsTitle: "Thông tin cần gửi để báo giá chính xác",
    detailsBody: "Thông tin đầy đủ giúp giảm trao đổi qua lại và dễ so sánh các phương án.",
    details: ["Địa điểm lấy hàng và nơi giao cuối cùng", "Mặt hàng và mã HS nếu có", "Số kiện, kích thước, trọng lượng và CBM", "Loại container FCL hoặc nhu cầu LCL", "Ngày hàng sẵn sàng và Incoterm", "Yêu cầu đặc biệt, hàng kiểm soát hoặc quá khổ"],
    faqTitle: "Câu hỏi về freight forwarding",
    faqs: [
      { question: "Có xử lý cả FCL và LCL không?", answer: "Có. Phương án phù hợp phụ thuộc vào sản lượng, rủi ro xếp dỡ, lịch trình và tổng chi phí." },
      { question: "Báo giá có thể gồm lấy và giao hàng không?", answer: "Có, khi có địa chỉ lấy hàng, mã bưu chính nơi giao, thông tin hàng và Incoterm." },
      { question: "Giá vận chuyển có cố định không?", answer: "Không. Giá và chỗ thay đổi nên mỗi báo giá cần ghi rõ thời hạn hiệu lực và phạm vi chi phí." },
    ],
    finalTitle: "Bạn đang chuẩn bị một lô hàng từ Việt Nam?",
    finalBody: "Gửi thông tin thực tế để nhận phương án theo đúng tuyến thay vì một mức giá ước tính chung.",
  },
  it: {
    eyebrow: "Supporto spedizioni dal Vietnam",
    title: "Uno spedizioniere in Vietnam per le spedizioni internazionali",
    description: "Pianifica trasporto marittimo, aereo, operazioni export e consegna con un unico referente in Vietnam.",
    quote: "Richiedi un preventivo",
    guide: "Scopri il processo",
    supportTitle: "Supporto basato sui dati reali della merce",
    supportIntro: "La soluzione dipende da merce, volume, origine, destinazione, Incoterm e data di disponibilità. Ogni richiesta viene valutata su questi dati.",
    services: [
      { title: "Trasporto marittimo", body: "Pianificazione FCL e LCL dai principali porti vietnamiti con confronto di rotte e costi locali." },
      { title: "Trasporto aereo", body: "Opzioni per merci urgenti o di maggior valore quando il tempo è prioritario." },
      { title: "Coordinamento export", body: "Supporto per cut-off, istruzioni di spedizione, VGM e documenti." },
      { title: "Consegna door-to-door", body: "Ritiro e consegna possono essere inclusi con indirizzi completi e termini di resa." },
    ],
    processTitle: "Un processo pratico in quattro fasi",
    process: [
      { title: "Invia i dati", body: "Indica rotta, merce, colli, dimensioni, peso, data pronta e Incoterm." },
      { title: "Confronta le opzioni", body: "Valuta rotta, programma, attrezzatura, costi inclusi e vincoli operativi." },
      { title: "Conferma il booking", body: "Concorda opzione, documenti, cut-off e responsabilità." },
      { title: "Coordina la spedizione", body: "Segui le tappe concordate e gestisci le eccezioni che richiedono una decisione." },
    ],
    detailsTitle: "Dati necessari per un preventivo accurato",
    detailsBody: "Informazioni complete riducono le domande e rendono le opzioni confrontabili.",
    details: ["Luogo di ritiro e destinazione finale", "Merce e codice HS se disponibile", "Colli, dimensioni, peso e CBM", "Tipo di container FCL o richiesta LCL", "Data merce pronta e Incoterm", "Requisiti speciali o merce fuori sagoma"],
    faqTitle: "Domande sulle spedizioni",
    faqs: [
      { question: "Gestite FCL e LCL?", answer: "Sì. La scelta dipende da volume, rischio di movimentazione, programma e costo totale." },
      { question: "Il preventivo può includere ritiro e consegna?", answer: "Sì, con indirizzi completi, dati della merce e Incoterm." },
      { question: "Le tariffe sono fisse?", answer: "No. Tariffe e capacità cambiano; ogni offerta deve indicare validità e costi inclusi." },
    ],
    finalTitle: "Stai pianificando una spedizione dal Vietnam?",
    finalBody: "Invia i dati reali della merce per ricevere un confronto specifico per la rotta.",
  },
  es: {
    eyebrow: "Apoyo de transporte de carga en Vietnam",
    title: "Un transitario en Vietnam para envíos internacionales",
    description: "Planifica transporte marítimo, aéreo, gestión de exportación y entrega con un único contacto en Vietnam.",
    quote: "Solicitar cotización",
    guide: "Ver el proceso",
    supportTitle: "Apoyo basado en los datos reales de la carga",
    supportIntro: "La solución depende de la mercancía, volumen, origen, destino, Incoterm y fecha de disponibilidad. Cada solicitud se revisa con esos datos.",
    services: [
      { title: "Transporte marítimo", body: "Planificación FCL y LCL desde los principales puertos vietnamitas, comparando rutas y cargos locales." },
      { title: "Transporte aéreo", body: "Opciones para carga urgente o de mayor valor cuando el tiempo es prioritario." },
      { title: "Coordinación de exportación", body: "Apoyo con cut-offs, instrucciones de envío, VGM y documentación." },
      { title: "Entrega puerta a puerta", body: "La recogida y entrega pueden incluirse con direcciones completas y condiciones de envío." },
    ],
    processTitle: "Un proceso práctico de cuatro pasos",
    process: [
      { title: "Comparte los datos", body: "Indica ruta, mercancía, bultos, dimensiones, peso, fecha disponible e Incoterm." },
      { title: "Compara opciones", body: "Revisa ruta, horario, equipo, alcance de cargos y limitaciones operativas." },
      { title: "Confirma la reserva", body: "Acuerda la opción, documentación, cut-offs y responsabilidades." },
      { title: "Coordina el envío", body: "Sigue los hitos acordados y comunica las excepciones que requieren decisión." },
    ],
    detailsTitle: "Datos para una cotización precisa",
    detailsBody: "La información completa reduce preguntas y facilita comparar opciones.",
    details: ["Lugar de recogida y destino final", "Mercancía y código HS si está disponible", "Bultos, dimensiones, peso y CBM", "Tipo de contenedor FCL o necesidad LCL", "Fecha de disponibilidad e Incoterm", "Requisitos especiales o carga sobredimensionada"],
    faqTitle: "Preguntas sobre forwarding",
    faqs: [
      { question: "¿Gestionan FCL y LCL?", answer: "Sí. La opción depende del volumen, riesgo de manipulación, horario y costo total." },
      { question: "¿La cotización puede incluir recogida y entrega?", answer: "Sí, con direcciones completas, datos de carga e Incoterm." },
      { question: "¿Las tarifas son fijas?", answer: "No. Tarifas y capacidad cambian; cada oferta debe indicar validez y cargos incluidos." },
    ],
    finalTitle: "¿Planificas un envío desde Vietnam?",
    finalBody: "Envía los datos reales de la carga para recibir una comparación específica para tu ruta.",
  },
  id: {
    eyebrow: "Dukungan freight forwarding di Vietnam",
    title: "Freight forwarder di Vietnam untuk pengiriman internasional",
    description: "Rencanakan angkutan laut, udara, penanganan ekspor, dan pengiriman dengan satu kontak jelas di Vietnam.",
    quote: "Minta penawaran",
    guide: "Lihat proses kerja",
    supportTitle: "Dukungan berdasarkan detail kargo sebenarnya",
    supportIntro: "Solusi bergantung pada komoditas, volume, asal, tujuan, Incoterm, dan tanggal kargo siap. Setiap permintaan diperiksa berdasarkan data tersebut.",
    services: [
      { title: "Angkutan laut", body: "Perencanaan FCL dan LCL dari pelabuhan utama Vietnam dengan perbandingan rute dan biaya lokal." },
      { title: "Angkutan udara", body: "Opsi untuk kargo mendesak atau bernilai tinggi saat waktu menjadi prioritas." },
      { title: "Koordinasi ekspor", body: "Dukungan untuk cut-off, shipping instruction, VGM, dan kesiapan dokumen." },
      { title: "Pengiriman door-to-door", body: "Penjemputan dan pengantaran dapat disertakan jika alamat dan ketentuan tersedia lengkap." },
    ],
    processTitle: "Proses praktis dalam empat langkah",
    process: [
      { title: "Kirim detail kargo", body: "Berikan rute, komoditas, koli, dimensi, berat, tanggal siap, dan Incoterm." },
      { title: "Bandingkan opsi", body: "Tinjau rute, jadwal, peralatan, cakupan biaya, dan kendala operasional." },
      { title: "Konfirmasi booking", body: "Sepakati opsi, dokumen, cut-off, dan tanggung jawab." },
      { title: "Koordinasikan kiriman", body: "Pantau tahapan yang disepakati dan komunikasikan pengecualian yang perlu keputusan." },
    ],
    detailsTitle: "Detail untuk penawaran yang akurat",
    detailsBody: "Informasi lengkap mengurangi pertanyaan lanjutan dan memudahkan perbandingan opsi.",
    details: ["Lokasi penjemputan dan tujuan akhir", "Komoditas dan kode HS jika tersedia", "Jumlah koli, dimensi, berat, dan CBM", "Jenis kontainer FCL atau kebutuhan LCL", "Tanggal kargo siap dan Incoterm", "Penanganan khusus atau kargo berukuran besar"],
    faqTitle: "Pertanyaan freight forwarding",
    faqs: [
      { question: "Apakah melayani FCL dan LCL?", answer: "Ya. Pilihan bergantung pada volume, risiko penanganan, jadwal, dan total biaya." },
      { question: "Bisakah penawaran mencakup penjemputan dan pengantaran?", answer: "Ya, jika alamat lengkap, detail kargo, dan Incoterm tersedia." },
      { question: "Apakah tarif tetap?", answer: "Tidak. Tarif dan kapasitas berubah; setiap penawaran harus mencantumkan masa berlaku dan cakupan biaya." },
    ],
    finalTitle: "Merencanakan pengiriman dari Vietnam?",
    finalBody: "Kirim detail kargo sebenarnya untuk menerima perbandingan sesuai rute.",
  },
};

const BASE_URL = "https://www.bookingbyjohnly.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale] || COPY.en;
  const path = `/${locale}/services/freight-forwarder-vietnam`;
  return {
    title: `${copy.title} | Booking by John Ly`,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(routing.locales.map((language) => [language, `/${language}/services/freight-forwarder-vietnam`])),
        "x-default": "/en/services/freight-forwarder-vietnam",
      },
    },
    openGraph: { title: copy.title, description: copy.description, type: "website", url: path },
    twitter: { card: "summary_large_image", title: copy.title, description: copy.description },
  };
}

export default async function FreightForwarderVietnamPage({ params }: Props) {
  const { locale } = await params;
  const copy = COPY[locale] || COPY.en;
  const pageUrl = `${BASE_URL}/${locale}/services/freight-forwarder-vietnam`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.title,
    description: copy.description,
    url: pageUrl,
    serviceType: "International freight forwarding",
    areaServed: { "@type": "Country", name: "Vietnam" },
    provider: { "@id": `${BASE_URL}/#organization` },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Freight Forwarder Vietnam", item: pageUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <JsonLd data={[serviceSchema, faqSchema, breadcrumbSchema]} />
      <Nav />
      <section className="bg-[#0B1F3A] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span><span>Freight Forwarder Vietnam</span>
          </nav>
          <p className="mt-10 text-sm font-black uppercase tracking-widest text-orange-300">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{copy.description}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/?mode=Ocean%20Freight&source=freight-forwarder-vietnam-hero#request" className="rounded-md bg-accent-orange px-6 py-3 font-black text-white">{copy.quote}</Link>
            <a href="#process" className="rounded-md border border-white/30 px-6 py-3 font-black">{copy.guide}</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.supportTitle}</h2>
        <p className="mt-4 max-w-4xl leading-7 text-text-secondary">{copy.supportIntro}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {copy.services.map((service) => (
            <article key={service.title} className="rounded-lg border border-border-subtle bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black text-[#0B1F3A]">{service.title}</h3>
              <p className="mt-3 leading-7 text-text-secondary">{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="bg-white px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.processTitle}</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {copy.process.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-border-subtle bg-bg-primary p-6">
                <span className="text-sm font-black text-accent-orange">0{index + 1}</span>
                <h3 className="mt-2 text-lg font-black text-[#0B1F3A]">{step.title}</h3>
                <p className="mt-3 leading-7 text-text-secondary">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.detailsTitle}</h2>
          <p className="mt-4 leading-7 text-text-secondary">{copy.detailsBody}</p>
        </div>
        <ul className="space-y-3">
          {copy.details.map((detail) => <li key={detail} className="rounded-md bg-white p-4 shadow-sm">{detail}</li>)}
        </ul>
      </section>

      <section className="bg-white px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.faqTitle}</h2>
          <div className="mt-8 space-y-4">
            {copy.faqs.map((faq) => (
              <article key={faq.question} className="rounded-lg border border-border-subtle p-6">
                <h3 className="text-lg font-black text-[#0B1F3A]">{faq.question}</h3>
                <p className="mt-3 leading-7 text-text-secondary">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B1F3A] px-5 py-14 text-center text-white lg:px-8">
        <h2 className="text-3xl font-black">{copy.finalTitle}</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-200">{copy.finalBody}</p>
        <Link href="/?mode=Ocean%20Freight&source=freight-forwarder-vietnam-final#request" className="mt-8 inline-flex rounded-md bg-accent-orange px-6 py-3 font-black text-white">{copy.quote}</Link>
      </section>
      <Footer />
    </main>
  );
}
