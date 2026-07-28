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
  overviewTitle: string;
  overview: string;
  planningTitle: string;
  planning: Array<{ title: string; body: string }>;
  detailsTitle: string;
  details: string[];
  customsTitle: string;
  customsBody: string;
  costTitle: string;
  costBody: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  finalTitle: string;
  finalBody: string;
};

const COPY: Record<string, Copy> = {
  en: {
    eyebrow: "Vietnam–Indonesia freight",
    title: "Plan freight from Vietnam to Indonesia around the real cargo",
    description: "Compare ocean freight, air freight, FCL, LCL, documents and delivery scope for shipments between Vietnam and Indonesia.",
    quote: "Request a Vietnam–Indonesia quote",
    overviewTitle: "Build the route from origin to final delivery",
    overview: "The correct plan depends on the Vietnamese factory location, Indonesian destination, commodity, cargo volume and Incoterm. Jakarta, Surabaya and other gateways serve different markets, so the discharge port should be chosen together with the inland delivery plan.",
    planningTitle: "Four points to confirm before booking",
    planning: [
      { title: "Mode and volume", body: "Compare ocean FCL, ocean LCL and air freight using total cost, urgency and handling risk." },
      { title: "Port or airport pair", body: "Choose gateways around the real pickup and delivery locations, not only the lowest base rate." },
      { title: "Import readiness", body: "Confirm the importer, commodity requirements, HS code and permits before cargo departs." },
      { title: "Charge scope", body: "Separate freight, origin handling, destination charges, customs, taxes and final delivery." },
    ],
    detailsTitle: "Details needed for an accurate quote",
    details: ["Vietnam pickup address", "Indonesian port, airport or delivery postcode", "Commodity and HS code if available", "Packages, dimensions, weight and CBM", "FCL, LCL or air-freight requirement", "Cargo-ready date and Incoterm", "Special handling or permit requirements"],
    customsTitle: "Customs and import checks",
    customsBody: "Import requirements depend on the commodity and current Indonesian rules. The consignee or importer should confirm licensing, product controls, duties and taxes before shipment. A freight quote does not replace customs classification advice.",
    costTitle: "Rates and schedules",
    costBody: "Capacity, rates and schedules change. Request a current option for the exact cargo-ready date and compare the complete charge scope. Transit estimates should identify the routing and exclude time that depends on customs or consignee readiness.",
    faqTitle: "Vietnam to Indonesia shipping questions",
    faqs: [
      { question: "Can you quote door-to-door?", answer: "Yes, when both addresses, cargo details, Incoterm and import requirements are clear." },
      { question: "Should smaller cargo move by LCL or air?", answer: "Compare urgency, dimensions, chargeable weight, handling risk and total destination charges." },
      { question: "Which Indonesian port should I use?", answer: "The best gateway depends on the final destination, current carrier service and inland cost." },
    ],
    finalTitle: "Have a Vietnam–Indonesia shipment?",
    finalBody: "Share the real cargo details to receive a practical routing and cost comparison.",
  },
  vi: {
    eyebrow: "Vận chuyển Việt Nam–Indonesia",
    title: "Lập phương án vận chuyển Việt Nam đi Indonesia theo hàng thực tế",
    description: "So sánh đường biển, hàng không, FCL, LCL, chứng từ và giao hàng cho tuyến Việt Nam–Indonesia.",
    quote: "Yêu cầu báo giá Việt Nam–Indonesia",
    overviewTitle: "Lập tuyến từ nơi lấy hàng đến điểm giao cuối",
    overview: "Phương án phù hợp phụ thuộc vị trí nhà máy tại Việt Nam, điểm đến tại Indonesia, mặt hàng, sản lượng và Incoterm. Jakarta, Surabaya và các cửa ngõ khác phục vụ những khu vực khác nhau nên cần chọn cảng cùng với kế hoạch giao nội địa.",
    planningTitle: "Bốn điểm cần xác nhận trước booking",
    planning: [
      { title: "Phương thức và sản lượng", body: "So sánh FCL, LCL và hàng không theo tổng chi phí, độ gấp và rủi ro xếp dỡ." },
      { title: "Cặp cảng hoặc sân bay", body: "Chọn cửa ngõ theo nơi lấy và giao thực tế, không chỉ theo giá cơ bản thấp nhất." },
      { title: "Sẵn sàng nhập khẩu", body: "Xác nhận nhà nhập khẩu, yêu cầu mặt hàng, mã HS và giấy phép trước khi hàng đi." },
      { title: "Phạm vi chi phí", body: "Tách cước, phí đầu đi, phí đầu đến, hải quan, thuế và giao hàng cuối." },
    ],
    detailsTitle: "Thông tin cần có để báo giá chính xác",
    details: ["Địa chỉ lấy hàng tại Việt Nam", "Cảng, sân bay hoặc mã bưu chính tại Indonesia", "Mặt hàng và mã HS nếu có", "Số kiện, kích thước, trọng lượng và CBM", "Nhu cầu FCL, LCL hoặc hàng không", "Ngày hàng sẵn sàng và Incoterm", "Yêu cầu đặc biệt hoặc giấy phép"],
    customsTitle: "Kiểm tra hải quan và nhập khẩu",
    customsBody: "Yêu cầu nhập khẩu phụ thuộc mặt hàng và quy định hiện hành của Indonesia. Người nhận hoặc nhà nhập khẩu cần xác nhận giấy phép, kiểm soát sản phẩm, thuế và nghĩa vụ trước khi giao hàng cho vận chuyển.",
    costTitle: "Giá và lịch trình",
    costBody: "Chỗ, giá và lịch thay đổi. Cần lấy phương án hiện hành theo đúng ngày hàng sẵn sàng và so sánh toàn bộ phạm vi phí. Thời gian dự kiến cần nêu rõ tuyến đi và không bao gồm phần phụ thuộc hải quan.",
    faqTitle: "Câu hỏi tuyến Việt Nam–Indonesia",
    faqs: [
      { question: "Có thể báo giá door-to-door không?", answer: "Có, khi rõ hai địa chỉ, thông tin hàng, Incoterm và yêu cầu nhập khẩu." },
      { question: "Hàng nhỏ nên đi LCL hay hàng không?", answer: "Cần so sánh độ gấp, kích thước, trọng lượng tính cước, rủi ro và phí đầu đến." },
      { question: "Nên dùng cảng nào tại Indonesia?", answer: "Cửa ngõ phù hợp phụ thuộc điểm giao cuối, dịch vụ hiện hành và chi phí nội địa." },
    ],
    finalTitle: "Bạn có lô hàng Việt Nam–Indonesia?",
    finalBody: "Gửi thông tin thật để nhận so sánh tuyến và chi phí phù hợp.",
  },
  it: {
    eyebrow: "Trasporto Vietnam–Indonesia",
    title: "Pianifica il trasporto dal Vietnam all’Indonesia sui dati reali",
    description: "Confronta mare, aereo, FCL, LCL, documenti e consegna tra Vietnam e Indonesia.",
    quote: "Richiedi un preventivo Vietnam–Indonesia",
    overviewTitle: "Costruire la rotta fino alla consegna",
    overview: "Il piano dipende da fabbrica, destinazione indonesiana, merce, volume e Incoterm. Jakarta, Surabaya e altri gateway servono mercati diversi; porto e consegna interna vanno scelti insieme.",
    planningTitle: "Quattro punti prima del booking",
    planning: [
      { title: "Modalità e volume", body: "Confronta FCL, LCL e aereo per costo totale, urgenza e rischio." },
      { title: "Gateway", body: "Scegli porti o aeroporti intorno alle sedi reali, non solo alla tariffa base." },
      { title: "Importazione", body: "Conferma importatore, codice HS, controlli e permessi prima della partenza." },
      { title: "Costi inclusi", body: "Separa nolo, costi locali, dogana, imposte e consegna." },
    ],
    detailsTitle: "Dati per un preventivo accurato",
    details: ["Indirizzo di ritiro in Vietnam", "Porto, aeroporto o CAP indonesiano", "Merce e codice HS", "Colli, dimensioni, peso e CBM", "FCL, LCL o aereo", "Data pronta e Incoterm", "Requisiti speciali o permessi"],
    customsTitle: "Controlli doganali e import",
    customsBody: "I requisiti dipendono dalla merce e dalle regole indonesiane in vigore. Il destinatario deve confermare licenze, controlli, dazi e imposte prima della spedizione.",
    costTitle: "Tariffe e programmi",
    costBody: "Capacità, tariffe e programmi cambiano. Richiedi un’opzione aggiornata per la data reale e confronta tutti i costi.",
    faqTitle: "Domande Vietnam–Indonesia",
    faqs: [
      { question: "È possibile quotare door-to-door?", answer: "Sì, con indirizzi, dati merce, Incoterm e requisiti import chiari." },
      { question: "Per piccoli carichi LCL o aereo?", answer: "Confronta urgenza, dimensioni, peso tassabile, rischio e costi a destino." },
      { question: "Quale porto indonesiano?", answer: "Dipende dalla destinazione, dal servizio attuale e dal costo terrestre." },
    ],
    finalTitle: "Hai una spedizione Vietnam–Indonesia?",
    finalBody: "Invia i dati reali per confrontare rotta e costi.",
  },
  es: {
    eyebrow: "Transporte Vietnam–Indonesia",
    title: "Planifica el transporte de Vietnam a Indonesia según la carga real",
    description: "Compara marítimo, aéreo, FCL, LCL, documentos y entrega entre Vietnam e Indonesia.",
    quote: "Solicitar cotización Vietnam–Indonesia",
    overviewTitle: "Construir la ruta hasta la entrega final",
    overview: "El plan depende de la fábrica, destino indonesio, mercancía, volumen e Incoterm. Yakarta, Surabaya y otras puertas sirven mercados diferentes; el puerto debe elegirse junto con la entrega interior.",
    planningTitle: "Cuatro puntos antes de reservar",
    planning: [
      { title: "Modo y volumen", body: "Compara FCL, LCL y aéreo por costo total, urgencia y riesgo." },
      { title: "Puertos o aeropuertos", body: "Elige según las ubicaciones reales, no solo la tarifa base." },
      { title: "Importación", body: "Confirma importador, código HS, controles y permisos antes de la salida." },
      { title: "Alcance de cargos", body: "Separa flete, cargos locales, aduana, impuestos y entrega." },
    ],
    detailsTitle: "Datos para una cotización precisa",
    details: ["Dirección de recogida en Vietnam", "Puerto, aeropuerto o código postal en Indonesia", "Mercancía y código HS", "Bultos, dimensiones, peso y CBM", "FCL, LCL o aéreo", "Fecha disponible e Incoterm", "Requisitos especiales o permisos"],
    customsTitle: "Controles aduaneros y de importación",
    customsBody: "Los requisitos dependen de la mercancía y las normas vigentes de Indonesia. El importador debe confirmar licencias, controles, aranceles e impuestos antes del envío.",
    costTitle: "Tarifas y horarios",
    costBody: "La capacidad, tarifas y horarios cambian. Solicita una opción actual para la fecha real y compara todos los cargos.",
    faqTitle: "Preguntas Vietnam–Indonesia",
    faqs: [
      { question: "¿Se puede cotizar puerta a puerta?", answer: "Sí, con direcciones, datos, Incoterm y requisitos de importación claros." },
      { question: "¿LCL o aéreo para carga pequeña?", answer: "Compara urgencia, dimensiones, peso cobrable, riesgo y cargos de destino." },
      { question: "¿Qué puerto indonesio usar?", answer: "Depende del destino, servicio actual y costo interior." },
    ],
    finalTitle: "¿Tienes un envío Vietnam–Indonesia?",
    finalBody: "Comparte los datos reales para comparar ruta y costos.",
  },
  id: {
    eyebrow: "Pengiriman Vietnam–Indonesia",
    title: "Rencanakan pengiriman Vietnam ke Indonesia berdasarkan kargo sebenarnya",
    description: "Bandingkan laut, udara, FCL, LCL, dokumen, dan pengiriman akhir Vietnam–Indonesia.",
    quote: "Minta penawaran Vietnam–Indonesia",
    overviewTitle: "Bangun rute hingga tujuan akhir",
    overview: "Rencana bergantung pada lokasi pabrik, tujuan di Indonesia, komoditas, volume, dan Incoterm. Jakarta, Surabaya, dan gerbang lain melayani pasar berbeda, sehingga pelabuhan harus dipilih bersama rencana pengiriman darat.",
    planningTitle: "Empat hal sebelum booking",
    planning: [
      { title: "Moda dan volume", body: "Bandingkan FCL, LCL, dan udara berdasarkan total biaya, urgensi, dan risiko." },
      { title: "Pasangan gerbang", body: "Pilih pelabuhan atau bandara berdasarkan lokasi sebenarnya, bukan hanya tarif dasar." },
      { title: "Kesiapan impor", body: "Pastikan importir, kode HS, kontrol produk, dan izin sebelum kargo berangkat." },
      { title: "Cakupan biaya", body: "Pisahkan freight, biaya lokal, bea cukai, pajak, dan pengiriman akhir." },
    ],
    detailsTitle: "Detail untuk penawaran akurat",
    details: ["Alamat penjemputan Vietnam", "Pelabuhan, bandara, atau kode pos Indonesia", "Komoditas dan kode HS", "Koli, dimensi, berat, dan CBM", "Kebutuhan FCL, LCL, atau udara", "Tanggal siap dan Incoterm", "Penanganan khusus atau izin"],
    customsTitle: "Pemeriksaan bea cukai dan impor",
    customsBody: "Persyaratan bergantung pada komoditas dan aturan Indonesia saat ini. Penerima atau importir harus memastikan izin, kontrol produk, bea, dan pajak sebelum pengiriman.",
    costTitle: "Tarif dan jadwal",
    costBody: "Kapasitas, tarif, dan jadwal berubah. Minta opsi terkini untuk tanggal kargo siap dan bandingkan seluruh cakupan biaya.",
    faqTitle: "Pertanyaan Vietnam–Indonesia",
    faqs: [
      { question: "Bisakah door-to-door?", answer: "Ya, jika alamat, detail kargo, Incoterm, dan persyaratan impor jelas." },
      { question: "LCL atau udara untuk kargo kecil?", answer: "Bandingkan urgensi, dimensi, berat tagihan, risiko, dan biaya tujuan." },
      { question: "Pelabuhan Indonesia mana?", answer: "Tergantung tujuan akhir, layanan saat ini, dan biaya darat." },
    ],
    finalTitle: "Ada pengiriman Vietnam–Indonesia?",
    finalBody: "Kirim detail sebenarnya untuk membandingkan rute dan biaya.",
  },
};

const BASE_URL = "https://www.bookingbyjohnly.com";
export function generateStaticParams() { return routing.locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale] || COPY.en;
  const path = `/${locale}/routes/vietnam-to-indonesia`;
  return {
    title: `${copy.title} | Booking by John Ly`,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(routing.locales.map((language) => [language, `/${language}/routes/vietnam-to-indonesia`])),
        "x-default": "/en/routes/vietnam-to-indonesia",
      },
    },
    openGraph: { title: copy.title, description: copy.description, type: "website", url: path },
  };
}

export default async function VietnamToIndonesiaPage({ params }: Props) {
  const { locale } = await params;
  const copy = COPY[locale] || COPY.en;
  const pageUrl = `${BASE_URL}/${locale}/routes/vietnam-to-indonesia`;
  const schemas = [
    {
      "@context": "https://schema.org", "@type": "Service", name: copy.title,
      description: copy.description, url: pageUrl,
      serviceType: "International freight forwarding",
      areaServed: [{ "@type": "Country", name: "Vietnam" }, { "@type": "Country", name: "Indonesia" }],
      provider: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: copy.faqs.map((faq) => ({
        "@type": "Question", name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: "Vietnam to Indonesia", item: pageUrl },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <JsonLd data={schemas} /><Nav />
      <section className="bg-[#0B1F3A] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span><span>Vietnam to Indonesia</span>
          </nav>
          <p className="mt-10 text-sm font-black uppercase tracking-widest text-orange-300">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{copy.description}</p>
          <Link href="/#request" className="mt-9 inline-flex rounded-md bg-accent-orange px-6 py-3 font-black text-white">{copy.quote}</Link>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.overviewTitle}</h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-text-secondary">{copy.overview}</p>
      </section>
      <section className="bg-white px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.planningTitle}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {copy.planning.map((item, index) => (
              <article key={item.title} className="rounded-lg border border-border-subtle bg-bg-primary p-6">
                <span className="text-sm font-black text-accent-orange">0{index + 1}</span>
                <h3 className="mt-2 text-xl font-black text-[#0B1F3A]">{item.title}</h3>
                <p className="mt-3 leading-7 text-text-secondary">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.detailsTitle}</h2>
          <ul className="mt-6 space-y-3">{copy.details.map((item) => <li key={item} className="rounded-md bg-white p-4 shadow-sm">{item}</li>)}</ul>
        </div>
        <div className="space-y-6">
          <article className="rounded-lg border border-border-subtle bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-[#0B1F3A]">{copy.customsTitle}</h2>
            <p className="mt-4 leading-7 text-text-secondary">{copy.customsBody}</p>
          </article>
          <article className="rounded-lg border border-border-subtle bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-[#0B1F3A]">{copy.costTitle}</h2>
            <p className="mt-4 leading-7 text-text-secondary">{copy.costBody}</p>
          </article>
        </div>
      </section>
      <section className="bg-white px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.faqTitle}</h2>
          <div className="mt-8 space-y-4">{copy.faqs.map((faq) => (
            <article key={faq.question} className="rounded-lg border border-border-subtle p-6">
              <h3 className="text-lg font-black text-[#0B1F3A]">{faq.question}</h3>
              <p className="mt-3 leading-7 text-text-secondary">{faq.answer}</p>
            </article>
          ))}</div>
        </div>
      </section>
      <section className="bg-[#0B1F3A] px-5 py-14 text-center text-white lg:px-8">
        <h2 className="text-3xl font-black">{copy.finalTitle}</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-200">{copy.finalBody}</p>
        <Link href="/#request" className="mt-8 inline-flex rounded-md bg-accent-orange px-6 py-3 font-black text-white">{copy.quote}</Link>
      </section>
      <Footer />
    </main>
  );
}
