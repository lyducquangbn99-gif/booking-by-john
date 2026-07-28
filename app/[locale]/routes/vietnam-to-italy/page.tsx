import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

type RouteCopy = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  overviewTitle: string;
  overview: string[];
  planningTitle: string;
  planningItems: Array<{ title: string; body: string }>;
  documentsTitle: string;
  documentsIntro: string;
  documents: string[];
  costsTitle: string;
  costs: string;
  timelineTitle: string;
  timeline: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  finalTitle: string;
  finalBody: string;
  finalCta: string;
};

const COPY: Record<string, RouteCopy> = {
  en: {
    eyebrow: "Vietnam–Italy ocean freight",
    title: "Ship from Vietnam to Italy with a clearer freight plan",
    description:
      "A practical route guide for importers and exporters comparing FCL, LCL, schedules, documents and delivery options between Vietnam and Italy.",
    primaryCta: "Request a route-specific quote",
    secondaryCta: "Read the planning guide",
    overviewTitle: "What this route usually involves",
    overview: [
      "Cargo commonly departs from Cat Lai or Cai Mep in southern Vietnam, or Hai Phong in northern Vietnam. The best origin depends on the factory location, cargo readiness and carrier schedule.",
      "Genoa is a practical gateway for many northern Italian destinations. La Spezia, Venice and other ports may also be considered depending on the final delivery point and available service.",
      "There is no single best schedule for every shipment. A useful comparison includes ocean freight, origin and destination charges, transit structure, free time and inland delivery—not only the headline rate.",
    ],
    planningTitle: "Five decisions to make before booking",
    planningItems: [
      { title: "FCL or LCL", body: "Compare cargo volume, packing, handling risk and total landed cost. A low LCL base rate can still carry meaningful local charges." },
      { title: "Port pair", body: "Choose the Vietnam load port and Italian discharge port around the real factory and consignee locations." },
      { title: "Direct or transshipment", body: "Check the complete routing, connection point and schedule reliability rather than relying on a generic transit estimate." },
      { title: "Incoterm", body: "Confirm who controls and pays for origin handling, main freight, insurance, customs and final delivery." },
      { title: "Cargo readiness", body: "Align booking cut-off, customs documents, VGM, shipping instructions and factory loading before committing cargo." },
    ],
    documentsTitle: "Information needed for an accurate quote",
    documentsIntro: "Share the following details to reduce back-and-forth and compare options on the same basis:",
    documents: [
      "Origin address and preferred Vietnam port",
      "Final destination or Italian postal code",
      "Commodity and HS code if available",
      "Package count, dimensions, gross weight and CBM",
      "FCL container type or LCL requirement",
      "Cargo-ready date and target delivery window",
      "Incoterm and any special handling requirement",
    ],
    costsTitle: "What changes the total cost",
    costs:
      "Rates move with capacity, season, fuel, equipment, routing and local charges. Customs duties and import taxes depend on the commodity, origin qualification and current rules. A freight quote is therefore date-specific and should not be treated as a permanent tariff.",
    timelineTitle: "Transit-time expectations",
    timeline:
      "Transit time varies by carrier, port pair and transshipment plan. Ask for the current sailing, cut-offs and full routing for the exact shipment. Factory pickup, export clearance, port handling and delivery in Italy should be planned separately from port-to-port transit.",
    faqTitle: "Vietnam to Italy freight questions",
    faqs: [
      { question: "Which Italian port should I use?", answer: "Genoa is often practical for northern Italy, but the right port depends on the consignee location, carrier service and total inland cost." },
      { question: "Should I choose FCL or LCL?", answer: "FCL can reduce handling for larger shipments, while LCL can suit smaller volumes. Compare total charges and cargo risk, not only the ocean rate." },
      { question: "Can you quote door-to-door?", answer: "Yes, when the pickup address, delivery postcode, cargo details and Incoterm are available. Customs duties and taxes should be shown separately where applicable." },
      { question: "How quickly can I receive a quote?", answer: "Standard requests can often be checked quickly when cargo details are complete. Complex, controlled or oversized cargo may require additional carrier confirmation." },
    ],
    finalTitle: "Have a Vietnam–Italy shipment to plan?",
    finalBody: "Send the real cargo details. John will compare the practical route, schedule and cost components for your shipment.",
    finalCta: "Start a freight inquiry",
  },
  vi: {
    eyebrow: "Vận tải biển Việt Nam–Ý",
    title: "Gửi hàng từ Việt Nam đi Ý với kế hoạch vận chuyển rõ ràng hơn",
    description:
      "Hướng dẫn thực tế dành cho doanh nghiệp đang so sánh FCL, LCL, lịch tàu, chứng từ và phương án giao hàng giữa Việt Nam và Ý.",
    primaryCta: "Yêu cầu báo giá theo tuyến",
    secondaryCta: "Xem hướng dẫn lập kế hoạch",
    overviewTitle: "Tuyến vận chuyển này thường gồm những gì",
    overview: [
      "Hàng miền Nam thường đi từ Cát Lái hoặc Cái Mép; hàng miền Bắc thường đi từ Hải Phòng. Cảng đi phù hợp phụ thuộc vị trí nhà máy, ngày hàng sẵn sàng và lịch hãng tàu.",
      "Genoa là cửa ngõ thực tế cho nhiều điểm đến ở miền Bắc nước Ý. La Spezia, Venice hoặc cảng khác cũng có thể phù hợp tùy địa chỉ giao hàng và dịch vụ hiện có.",
      "Không có một lịch tàu tốt nhất cho mọi lô hàng. Cần so sánh cước biển, phí hai đầu, hành trình, free time và chi phí giao nội địa thay vì chỉ nhìn giá cước chính.",
    ],
    planningTitle: "Năm quyết định cần chốt trước khi booking",
    planningItems: [
      { title: "FCL hay LCL", body: "So sánh thể tích, đóng gói, rủi ro bốc dỡ và tổng chi phí. LCL có giá cơ bản thấp nhưng phí địa phương có thể đáng kể." },
      { title: "Cặp cảng", body: "Chọn cảng Việt Nam và cảng Ý dựa trên vị trí thật của nhà máy và người nhận hàng." },
      { title: "Đi thẳng hay chuyển tải", body: "Kiểm tra đầy đủ hành trình, điểm nối chuyến và độ ổn định lịch tàu." },
      { title: "Incoterm", body: "Xác định rõ bên chịu phí đầu xuất, cước chính, bảo hiểm, hải quan và giao hàng." },
      { title: "Ngày hàng sẵn sàng", body: "Đồng bộ cut-off, khai quan, VGM, shipping instruction và kế hoạch đóng hàng." },
    ],
    documentsTitle: "Thông tin cần có để báo giá chính xác",
    documentsIntro: "Cung cấp các dữ liệu sau để giảm trao đổi qua lại và so sánh các phương án cùng một cơ sở:",
    documents: [
      "Địa chỉ lấy hàng và cảng đi dự kiến tại Việt Nam",
      "Điểm giao cuối hoặc mã bưu chính tại Ý",
      "Tên hàng và mã HS nếu có",
      "Số kiện, kích thước, trọng lượng và CBM",
      "Loại container FCL hoặc nhu cầu LCL",
      "Ngày hàng sẵn sàng và thời gian giao mong muốn",
      "Incoterm và yêu cầu xử lý đặc biệt",
    ],
    costsTitle: "Yếu tố làm thay đổi tổng chi phí",
    costs:
      "Giá thay đổi theo sức chứa, mùa vụ, nhiên liệu, thiết bị, hành trình và phí địa phương. Thuế nhập khẩu phụ thuộc mặt hàng, xuất xứ và quy định hiện hành. Vì vậy báo giá luôn có thời hạn và không phải biểu phí cố định.",
    timelineTitle: "Kỳ vọng về thời gian vận chuyển",
    timeline:
      "Transit time phụ thuộc hãng tàu, cặp cảng và phương án chuyển tải. Cần kiểm tra lịch chạy, cut-off và hành trình đầy đủ của đúng lô hàng. Thời gian lấy hàng, khai quan, làm cảng và giao tại Ý cần được tính riêng.",
    faqTitle: "Câu hỏi về vận chuyển Việt Nam đi Ý",
    faqs: [
      { question: "Nên chọn cảng nào tại Ý?", answer: "Genoa thường phù hợp với miền Bắc Ý, nhưng cần xét vị trí người nhận, dịch vụ hãng tàu và tổng chi phí vận chuyển nội địa." },
      { question: "Nên đi FCL hay LCL?", answer: "FCL giảm số lần xử lý cho lô lớn; LCL phù hợp lô nhỏ. Hãy so sánh tổng phí và rủi ro hàng hóa." },
      { question: "Có thể báo giá door-to-door không?", answer: "Có, khi có địa chỉ lấy hàng, mã bưu chính giao hàng, thông tin hàng và Incoterm. Thuế phí hải quan sẽ được tách riêng khi cần." },
      { question: "Bao lâu có báo giá?", answer: "Yêu cầu tiêu chuẩn có thể kiểm tra nhanh khi đủ dữ liệu. Hàng kiểm soát, quá khổ hoặc phức tạp cần thêm xác nhận từ hãng vận chuyển." },
    ],
    finalTitle: "Bạn có lô hàng Việt Nam–Ý cần lên kế hoạch?",
    finalBody: "Gửi thông tin hàng thực tế. John sẽ kiểm tra tuyến, lịch và các thành phần chi phí phù hợp.",
    finalCta: "Bắt đầu inquiry",
  },
  it: {
    eyebrow: "Trasporto marittimo Vietnam–Italia",
    title: "Spedisci dal Vietnam all'Italia con un piano logistico più chiaro",
    description:
      "Guida pratica per importatori ed esportatori che confrontano FCL, LCL, partenze, documenti e consegna tra Vietnam e Italia.",
    primaryCta: "Richiedi un preventivo di rotta",
    secondaryCta: "Leggi la guida operativa",
    overviewTitle: "Come funziona normalmente questa rotta",
    overview: [
      "Le merci dal Vietnam meridionale partono spesso da Cat Lai o Cai Mep; dal nord, da Hai Phong. La scelta dipende da fabbrica, data di disponibilità e servizio della compagnia.",
      "Genova è una porta pratica per molte destinazioni del Nord Italia. La Spezia, Venezia o altri porti possono risultare migliori in base alla consegna finale.",
      "Il confronto deve includere nolo, spese locali, itinerario, free time e trasporto interno, non soltanto la tariffa oceanica.",
    ],
    planningTitle: "Cinque decisioni prima della prenotazione",
    planningItems: [
      { title: "FCL o LCL", body: "Valuta volume, imballaggio, rischio di movimentazione e costo totale." },
      { title: "Coppia di porti", body: "Scegli origine e destinazione in base alle posizioni reali di fabbrica e destinatario." },
      { title: "Diretto o trasbordo", body: "Controlla itinerario completo, connessione e affidabilità del servizio." },
      { title: "Incoterm", body: "Definisci chi paga origine, nolo, assicurazione, dogana e consegna." },
      { title: "Merce pronta", body: "Allinea cut-off, dogana export, VGM, istruzioni e carico in fabbrica." },
    ],
    documentsTitle: "Dati necessari per un preventivo accurato",
    documentsIntro: "Invia questi elementi per confrontare opzioni equivalenti:",
    documents: ["Indirizzo di ritiro e porto vietnamita", "Destinazione o CAP italiano", "Merce e codice HS se disponibile", "Colli, dimensioni, peso e CBM", "Tipo container o richiesta LCL", "Data merce pronta", "Incoterm e requisiti speciali"],
    costsTitle: "Cosa modifica il costo totale",
    costs: "Le tariffe variano con capacità, stagione, carburante, equipment, itinerario e spese locali. Dazi e imposte dipendono dalla merce e dalle regole vigenti. Ogni preventivo ha quindi validità limitata.",
    timelineTitle: "Tempi di transito",
    timeline: "I tempi dipendono da compagnia, porti e trasbordo. Verifica partenza, cut-off e itinerario della spedizione specifica, aggiungendo ritiro, dogana, terminal e consegna.",
    faqTitle: "Domande sulla rotta Vietnam–Italia",
    faqs: [
      { question: "Quale porto italiano scegliere?", answer: "Genova è spesso pratica per il Nord Italia, ma la scelta dipende da destinatario, servizio e costo inland." },
      { question: "FCL o LCL?", answer: "FCL riduce la movimentazione per volumi maggiori; LCL può convenire per piccoli lotti. Confronta sempre i costi totali." },
      { question: "È possibile una quotazione door-to-door?", answer: "Sì, con indirizzi, CAP, dettagli merce e Incoterm. Dazi e imposte vengono separati quando applicabili." },
      { question: "Quanto tempo serve per il preventivo?", answer: "Una richiesta completa può essere verificata rapidamente; merci speciali richiedono conferme aggiuntive." },
    ],
    finalTitle: "Hai una spedizione Vietnam–Italia?",
    finalBody: "Invia i dati reali della merce per confrontare rotta, partenza e costi.",
    finalCta: "Avvia la richiesta",
  },
  es: {
    eyebrow: "Transporte marítimo Vietnam–Italia",
    title: "Envíe de Vietnam a Italia con un plan de transporte más claro",
    description: "Guía práctica para comparar FCL, LCL, salidas, documentos y entrega entre Vietnam e Italia.",
    primaryCta: "Solicitar cotización de ruta",
    secondaryCta: "Leer la guía operativa",
    overviewTitle: "Cómo suele funcionar esta ruta",
    overview: [
      "La carga del sur de Vietnam suele salir de Cat Lai o Cai Mep; la del norte, de Hai Phong. La elección depende de la fábrica, fecha de disponibilidad y servicio naviero.",
      "Génova es una entrada práctica para muchos destinos del norte de Italia. La Spezia, Venecia u otros puertos pueden ser mejores según la entrega final.",
      "Compare flete, cargos locales, itinerario, tiempo libre y transporte interior, no solamente la tarifa marítima.",
    ],
    planningTitle: "Cinco decisiones antes de reservar",
    planningItems: [
      { title: "FCL o LCL", body: "Compare volumen, embalaje, riesgo de manipulación y coste total." },
      { title: "Puertos", body: "Elija origen y destino según las ubicaciones reales de fábrica y consignatario." },
      { title: "Directo o transbordo", body: "Revise ruta completa, conexión y fiabilidad del servicio." },
      { title: "Incoterm", body: "Defina quién paga origen, flete, seguro, aduana y entrega." },
      { title: "Carga lista", body: "Coordine cut-offs, aduana, VGM, instrucciones y carga en fábrica." },
    ],
    documentsTitle: "Datos necesarios para cotizar",
    documentsIntro: "Comparta estos datos para comparar opciones equivalentes:",
    documents: ["Dirección de recogida y puerto vietnamita", "Destino o código postal italiano", "Mercancía y código HS", "Bultos, dimensiones, peso y CBM", "Contenedor FCL o necesidad LCL", "Fecha de carga lista", "Incoterm y requisitos especiales"],
    costsTitle: "Qué modifica el coste total",
    costs: "Las tarifas cambian con capacidad, temporada, combustible, equipo, ruta y cargos locales. Aranceles e impuestos dependen de la mercancía y las normas vigentes; cada cotización tiene validez limitada.",
    timelineTitle: "Tiempo de tránsito",
    timeline: "Depende de naviera, puertos y transbordo. Confirme salida, cut-offs e itinerario del envío concreto, además de recogida, aduana, terminal y entrega.",
    faqTitle: "Preguntas sobre Vietnam–Italia",
    faqs: [
      { question: "¿Qué puerto italiano conviene?", answer: "Génova suele ser práctica para el norte de Italia, pero depende del destino, servicio y coste interior." },
      { question: "¿FCL o LCL?", answer: "FCL reduce manipulación para volúmenes grandes; LCL puede servir para lotes pequeños. Compare el coste total." },
      { question: "¿Se puede cotizar puerta a puerta?", answer: "Sí, con direcciones, código postal, datos de carga e Incoterm. Aranceles e impuestos se separan cuando corresponde." },
      { question: "¿Cuánto tarda una cotización?", answer: "Una solicitud completa puede revisarse rápidamente; la carga especial necesita confirmaciones adicionales." },
    ],
    finalTitle: "¿Tiene un envío Vietnam–Italia?",
    finalBody: "Envíe los datos reales para comparar ruta, salida y componentes del coste.",
    finalCta: "Iniciar consulta",
  },
  id: {
    eyebrow: "Angkutan laut Vietnam–Italia",
    title: "Kirim dari Vietnam ke Italia dengan rencana freight yang lebih jelas",
    description: "Panduan praktis untuk membandingkan FCL, LCL, jadwal, dokumen, dan pengiriman antara Vietnam dan Italia.",
    primaryCta: "Minta penawaran rute",
    secondaryCta: "Baca panduan perencanaan",
    overviewTitle: "Gambaran umum rute ini",
    overview: [
      "Kargo Vietnam selatan biasanya berangkat dari Cat Lai atau Cai Mep; dari utara melalui Hai Phong. Pilihan bergantung pada lokasi pabrik, kesiapan kargo, dan jadwal carrier.",
      "Genoa adalah pintu masuk praktis untuk banyak tujuan Italia utara. La Spezia, Venice, atau pelabuhan lain dapat dipertimbangkan sesuai tujuan akhir.",
      "Bandingkan ocean freight, biaya lokal, routing, free time, dan inland delivery—bukan hanya tarif utama.",
    ],
    planningTitle: "Lima keputusan sebelum booking",
    planningItems: [
      { title: "FCL atau LCL", body: "Bandingkan volume, kemasan, risiko handling, dan total landed cost." },
      { title: "Pasangan pelabuhan", body: "Pilih port berdasarkan lokasi nyata pabrik dan consignee." },
      { title: "Direct atau transshipment", body: "Periksa routing lengkap, koneksi, dan keandalan jadwal." },
      { title: "Incoterm", body: "Pastikan pihak yang membayar origin, freight, asuransi, customs, dan delivery." },
      { title: "Kesiapan kargo", body: "Selaraskan cut-off, customs, VGM, shipping instruction, dan loading." },
    ],
    documentsTitle: "Data untuk penawaran yang akurat",
    documentsIntro: "Bagikan data berikut agar opsi dapat dibandingkan dengan dasar yang sama:",
    documents: ["Alamat pickup dan port Vietnam", "Tujuan atau kode pos Italia", "Komoditas dan HS code", "Jumlah kemasan, dimensi, berat, dan CBM", "Tipe container atau kebutuhan LCL", "Tanggal cargo ready", "Incoterm dan kebutuhan khusus"],
    costsTitle: "Faktor yang mengubah total biaya",
    costs: "Tarif berubah mengikuti kapasitas, musim, bahan bakar, equipment, routing, dan biaya lokal. Bea dan pajak bergantung pada komoditas serta aturan saat ini. Setiap quotation memiliki masa berlaku.",
    timelineTitle: "Perkiraan transit time",
    timeline: "Transit bergantung pada carrier, pasangan port, dan transshipment. Periksa sailing, cut-off, dan routing untuk shipment aktual serta waktu pickup, customs, terminal, dan delivery.",
    faqTitle: "Pertanyaan rute Vietnam–Italia",
    faqs: [
      { question: "Pelabuhan Italia mana yang dipilih?", answer: "Genoa sering praktis untuk Italia utara, tetapi pilihan bergantung pada lokasi consignee, layanan carrier, dan biaya inland." },
      { question: "FCL atau LCL?", answer: "FCL mengurangi handling untuk volume besar; LCL dapat sesuai untuk volume kecil. Bandingkan total biaya." },
      { question: "Apakah bisa door-to-door?", answer: "Bisa, jika alamat, kode pos, detail kargo, dan Incoterm tersedia. Bea dan pajak dipisahkan bila berlaku." },
      { question: "Berapa lama mendapatkan quotation?", answer: "Permintaan lengkap dapat dicek dengan cepat; kargo khusus membutuhkan konfirmasi tambahan." },
    ],
    finalTitle: "Ada shipment Vietnam–Italia?",
    finalBody: "Kirim detail kargo aktual untuk membandingkan rute, jadwal, dan komponen biaya.",
    finalCta: "Mulai inquiry",
  },
};

const SLUG = "/routes/vietnam-to-italy";
const BASE_URL = "https://www.bookingbyjohnly.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale] ?? COPY.en;
  const languages = Object.fromEntries(
    routing.locales.map((language) => [language, `/${language}${SLUG}`]),
  );

  return {
    title: `${copy.title} | Booking by John Ly`,
    description: copy.description,
    alternates: {
      canonical: `/${locale}${SLUG}`,
      languages: { ...languages, "x-default": `/en${SLUG}` },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      type: "website",
      url: `/${locale}${SLUG}`,
      images: [{ url: "/logistics-hero.png", alt: copy.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: ["/logistics-hero.png"],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function VietnamToItalyPage({ params }: Props) {
  const { locale } = await params;
  const copy = COPY[locale] ?? COPY.en;
  const pageUrl = `${BASE_URL}/${locale}${SLUG}`;
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
    areaServed: [
      { "@type": "Country", name: "Vietnam" },
      { "@type": "Country", name: "Italy" },
    ],
    serviceType: "Ocean freight planning and forwarding support",
    provider: { "@id": `${BASE_URL}/#organization` },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Vietnam to Italy", item: pageUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <JsonLd data={[serviceSchema, faqSchema, breadcrumbSchema]} />
      <Nav />

      <section className="bg-[#0B1F3A] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span>Vietnam to Italy</span>
          </nav>
          <p className="mt-10 text-sm font-black uppercase tracking-widest text-orange-300">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{copy.description}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/#request" className="rounded-md bg-accent-orange px-6 py-3 font-black text-white hover:bg-[#EA580C]">
              {copy.primaryCta}
            </Link>
            <a href="#planning" className="rounded-md border border-white/30 px-6 py-3 font-black text-white hover:bg-white/10">
              {copy.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.overviewTitle}</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {copy.overview.map((paragraph) => (
            <p key={paragraph} className="rounded-lg border border-border-subtle bg-white p-6 leading-7 text-text-secondary shadow-sm">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section id="planning" className="bg-white px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.planningTitle}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {copy.planningItems.map((item, index) => (
              <article key={item.title} className="rounded-lg border border-border-subtle bg-bg-primary p-6">
                <p className="text-sm font-black text-accent-orange">0{index + 1}</p>
                <h3 className="mt-2 text-xl font-black text-[#0B1F3A]">{item.title}</h3>
                <p className="mt-3 leading-7 text-text-secondary">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.documentsTitle}</h2>
          <p className="mt-4 leading-7 text-text-secondary">{copy.documentsIntro}</p>
          <ul className="mt-6 space-y-3">
            {copy.documents.map((document) => (
              <li key={document} className="flex gap-3 rounded-md bg-white p-4 shadow-sm">
                <span aria-hidden="true" className="font-black text-accent-green">✓</span>
                <span>{document}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <article className="rounded-lg border border-border-subtle bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-[#0B1F3A]">{copy.costsTitle}</h2>
            <p className="mt-4 leading-7 text-text-secondary">{copy.costs}</p>
          </article>
          <article className="rounded-lg border border-border-subtle bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-[#0B1F3A]">{copy.timelineTitle}</h2>
            <p className="mt-4 leading-7 text-text-secondary">{copy.timeline}</p>
          </article>
        </div>
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

      <section className="bg-[#0B1F3A] px-5 py-14 text-white lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black">{copy.finalTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-200">{copy.finalBody}</p>
          <Link href="/#request" className="mt-8 inline-flex rounded-md bg-accent-orange px-6 py-3 font-black text-white hover:bg-[#EA580C]">
            {copy.finalCta}
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
