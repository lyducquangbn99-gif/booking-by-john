import type { Metadata } from "next";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import RequestStepper from "@/components/RequestStepper";
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
  optionsTitle: string;
  options: Array<{ title: string; body: string }>;
  detailsTitle: string;
  details: string[];
  noteTitle: string;
  noteBody: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  formTitle: string;
  formBody: string;
};

const COPY: Record<string, Copy> = {
  en: {
    eyebrow: "Hai Phong to Jakarta ocean freight",
    title: "Ocean freight from Hai Phong to Jakarta for dry container cargo",
    description: "Request a current FCL or LCL option for general cargo moving from Hai Phong, Vietnam to Jakarta, Indonesia.",
    quote: "Request a Hai Phong–Jakarta quote",
    overviewTitle: "Plan the shipment around your actual cargo",
    overview: "The suitable option depends on container type, cargo details, ready date, pickup location, Incoterm and the consignee's import readiness. Share these details so the quote can separate ocean freight, local charges and any requested inland services.",
    optionsTitle: "What the quote can cover",
    options: [
      { title: "FCL dry containers", body: "Options for standard dry-container cargo, subject to equipment, space and carrier confirmation." },
      { title: "LCL cargo", body: "A comparison for smaller shipments when consolidation is appropriate for the cargo." },
      { title: "Origin coordination", body: "Pickup, export customs and origin handling can be included when the required scope is clear." },
      { title: "Jakarta delivery scope", body: "Port-only or onward delivery can be reviewed once the destination address and import responsibilities are confirmed." },
    ],
    detailsTitle: "Details needed for a useful quote",
    details: ["Commodity and HS code if available", "Container size or package dimensions, weight and CBM", "Pickup address in or near Hai Phong", "Cargo-ready date", "Incoterm and requested charge scope", "Jakarta port or final delivery address", "Special handling, permits or controlled-goods requirements"],
    noteTitle: "Rates, schedules and import requirements",
    noteBody: "Rates, space, equipment and schedules can change. The consignee or importer should confirm Indonesian licensing, product controls, duties and taxes before shipment. Any option is subject to the carrier's current confirmation and the final cargo details.",
    faqTitle: "Hai Phong to Jakarta shipping questions",
    faqs: [
      { question: "Can I request both FCL and LCL options?", answer: "Yes. Provide package dimensions, total weight and CBM so the options can be compared on the same cargo basis." },
      { question: "Can pickup in Hai Phong be included?", answer: "Yes, when the pickup address, loading needs and cargo-ready date are provided." },
      { question: "Can you quote delivery beyond Jakarta port?", answer: "It can be reviewed after the final address, Incoterm and import-clearance responsibilities are confirmed." },
    ],
    formTitle: "Have cargo ready for Jakarta?",
    formBody: "Send the actual shipment details below to request a current route and cost review.",
  },
  vi: {
    eyebrow: "Vận tải biển Hải Phòng đi Jakarta",
    title: "Vận chuyển container thường từ Hải Phòng đi Jakarta",
    description: "Yêu cầu phương án FCL hoặc LCL hiện hành cho hàng thông thường từ Hải Phòng, Việt Nam đến Jakarta, Indonesia.",
    quote: "Yêu cầu báo giá Hải Phòng–Jakarta",
    overviewTitle: "Lập phương án theo lô hàng thực tế",
    overview: "Phương án phù hợp phụ thuộc loại container, thông tin hàng, ngày sẵn sàng, điểm lấy hàng, Incoterm và khả năng làm thủ tục nhập của người nhận. Hãy gửi đủ thông tin để báo giá tách rõ cước biển, phí địa phương và dịch vụ nội địa nếu cần.",
    optionsTitle: "Phạm vi có thể đưa vào báo giá",
    options: [
      { title: "FCL container thường", body: "Phương án cho hàng phù hợp container khô tiêu chuẩn, tùy tình trạng thiết bị, chỗ và xác nhận của hãng tàu." },
      { title: "Hàng lẻ LCL", body: "So sánh cho lô hàng nhỏ khi phương án gom hàng phù hợp với tính chất hàng." },
      { title: "Điều phối đầu Hải Phòng", body: "Có thể gồm lấy hàng, khai quan xuất khẩu và xử lý đầu đi khi phạm vi yêu cầu rõ ràng." },
      { title: "Giao hàng tại Jakarta", body: "Có thể xem xét giao tại cảng hoặc giao tiếp khi đã xác nhận địa chỉ và trách nhiệm nhập khẩu." },
    ],
    detailsTitle: "Thông tin cần để báo giá hữu ích",
    details: ["Tên hàng và mã HS nếu có", "Cỡ container hoặc số kiện, kích thước, trọng lượng và CBM", "Địa chỉ lấy hàng tại Hải Phòng hoặc khu vực lân cận", "Ngày hàng sẵn sàng", "Incoterm và phạm vi phí cần báo", "Cảng Jakarta hoặc địa chỉ giao cuối", "Yêu cầu xử lý đặc biệt, giấy phép hoặc hàng có kiểm soát"],
    noteTitle: "Giá, lịch tàu và yêu cầu nhập khẩu",
    noteBody: "Giá, chỗ, thiết bị và lịch tàu có thể thay đổi. Người nhận hoặc nhà nhập khẩu cần xác nhận giấy phép, kiểm soát mặt hàng, thuế và nghĩa vụ tại Indonesia trước khi gửi hàng. Mọi phương án phụ thuộc xác nhận hiện hành của hãng tàu và thông tin hàng cuối cùng.",
    faqTitle: "Câu hỏi về tuyến Hải Phòng–Jakarta",
    faqs: [
      { question: "Có thể xin đồng thời phương án FCL và LCL không?", answer: "Có. Hãy gửi kích thước kiện, tổng trọng lượng và CBM để so sánh trên cùng một cơ sở hàng hóa." },
      { question: "Có thể gồm lấy hàng tại Hải Phòng không?", answer: "Có, khi có địa chỉ lấy hàng, yêu cầu đóng hàng và ngày hàng sẵn sàng." },
      { question: "Có thể báo giao tiếp sau cảng Jakarta không?", answer: "Có thể xem xét sau khi xác nhận địa chỉ cuối, Incoterm và trách nhiệm thông quan nhập khẩu." },
    ],
    formTitle: "Bạn có hàng chuẩn bị đi Jakarta?",
    formBody: "Gửi thông tin lô hàng thực tế bên dưới để yêu cầu kiểm tra tuyến và chi phí hiện hành.",
  },
  it: {
    eyebrow: "Trasporto marittimo Hai Phong–Jakarta",
    title: "Trasporto di container dry da Hai Phong a Jakarta",
    description: "Richiedi un'opzione FCL o LCL aggiornata per merci generiche da Hai Phong, Vietnam, a Jakarta, Indonesia.",
    quote: "Richiedi un preventivo Hai Phong–Jakarta",
    overviewTitle: "Pianificare sulla merce reale",
    overview: "La soluzione dipende da container, merce, data pronta, ritiro, Incoterm e preparazione dell'importatore. I dati completi permettono di distinguere nolo, costi locali e servizi terrestri richiesti.",
    optionsTitle: "Cosa può includere il preventivo",
    options: [
      { title: "Container dry FCL", body: "Opzioni per merce da container standard, soggette a spazio, attrezzatura e conferma del vettore." },
      { title: "Merce LCL", body: "Confronto per spedizioni più piccole quando il consolidamento è adatto alla merce." },
      { title: "Coordinamento all'origine", body: "Ritiro, dogana export e handling possono essere inclusi con uno scope chiaro." },
      { title: "Consegna a Jakarta", body: "Porto o consegna successiva possono essere valutati dopo aver confermato indirizzo e responsabilità import." },
    ],
    detailsTitle: "Dati necessari",
    details: ["Merce e codice HS se disponibile", "Container o colli, dimensioni, peso e CBM", "Indirizzo di ritiro a Hai Phong", "Data merce pronta", "Incoterm e costi richiesti", "Porto di Jakarta o indirizzo finale", "Permessi o gestione speciale"],
    noteTitle: "Tariffe, programmi e importazione",
    noteBody: "Tariffe, spazio, attrezzatura e programmi possono cambiare. L'importatore deve confermare licenze, controlli, dazi e imposte in Indonesia. Ogni opzione resta soggetta alla conferma del vettore e ai dati finali della merce.",
    faqTitle: "Domande Hai Phong–Jakarta",
    faqs: [
      { question: "Posso confrontare FCL e LCL?", answer: "Sì. Servono dimensioni, peso totale e CBM per confrontare le opzioni sulla stessa merce." },
      { question: "È possibile includere il ritiro a Hai Phong?", answer: "Sì, con indirizzo, esigenze di carico e data pronta." },
      { question: "È possibile quotare oltre il porto di Jakarta?", answer: "Può essere valutato dopo la conferma di indirizzo, Incoterm e responsabilità doganali." },
    ],
    formTitle: "Hai merce pronta per Jakarta?",
    formBody: "Invia i dati reali per richiedere una verifica aggiornata di rotta e costi.",
  },
  es: {
    eyebrow: "Transporte marítimo Hai Phong–Yakarta",
    title: "Transporte de contenedores secos de Hai Phong a Yakarta",
    description: "Solicita una opción FCL o LCL actual para carga general de Hai Phong, Vietnam, a Yakarta, Indonesia.",
    quote: "Solicitar cotización Hai Phong–Yakarta",
    overviewTitle: "Planificar según la carga real",
    overview: "La opción depende del contenedor, la mercancía, fecha disponible, recogida, Incoterm y preparación del importador. Los datos completos permiten separar flete, cargos locales y servicios terrestres solicitados.",
    optionsTitle: "Qué puede cubrir la cotización",
    options: [
      { title: "Contenedores secos FCL", body: "Opciones para carga de contenedor estándar, sujetas a equipo, espacio y confirmación del transportista." },
      { title: "Carga LCL", body: "Comparación para envíos pequeños cuando la consolidación es adecuada para la carga." },
      { title: "Coordinación en origen", body: "Recogida, aduana de exportación y manejo pueden incluirse con un alcance claro." },
      { title: "Entrega en Yakarta", body: "Puerto o entrega posterior pueden revisarse tras confirmar dirección y responsabilidades de importación." },
    ],
    detailsTitle: "Datos necesarios",
    details: ["Mercancía y código HS si está disponible", "Contenedor o bultos, dimensiones, peso y CBM", "Dirección de recogida en Hai Phong", "Fecha de carga disponible", "Incoterm y alcance de cargos", "Puerto de Yakarta o dirección final", "Permisos o manejo especial"],
    noteTitle: "Tarifas, horarios e importación",
    noteBody: "Tarifas, espacio, equipo y horarios pueden cambiar. El importador debe confirmar licencias, controles, aranceles e impuestos en Indonesia. Toda opción queda sujeta a confirmación del transportista y a los datos finales.",
    faqTitle: "Preguntas Hai Phong–Yakarta",
    faqs: [
      { question: "¿Puedo comparar FCL y LCL?", answer: "Sí. Facilita dimensiones, peso total y CBM para comparar sobre la misma carga." },
      { question: "¿Se puede incluir la recogida en Hai Phong?", answer: "Sí, con dirección, necesidades de carga y fecha disponible." },
      { question: "¿Se puede cotizar más allá del puerto de Yakarta?", answer: "Puede revisarse al confirmar dirección, Incoterm y responsabilidades aduaneras." },
    ],
    formTitle: "¿Tienes carga lista para Yakarta?",
    formBody: "Envía los datos reales para solicitar una revisión actual de ruta y costos.",
  },
  id: {
    eyebrow: "Angkutan laut Hai Phong–Jakarta",
    title: "Pengiriman kontainer dry dari Hai Phong ke Jakarta",
    description: "Minta opsi FCL atau LCL terkini untuk kargo umum dari Hai Phong, Vietnam ke Jakarta, Indonesia.",
    quote: "Minta penawaran Hai Phong–Jakarta",
    overviewTitle: "Rencanakan berdasarkan kargo sebenarnya",
    overview: "Opsi yang sesuai bergantung pada jenis kontainer, detail kargo, tanggal siap, lokasi pengambilan, Incoterm, dan kesiapan importir. Detail lengkap membantu memisahkan freight, biaya lokal, dan layanan darat yang diminta.",
    optionsTitle: "Cakupan penawaran",
    options: [
      { title: "Kontainer dry FCL", body: "Opsi untuk kargo kontainer standar, tergantung peralatan, ruang, dan konfirmasi carrier." },
      { title: "Kargo LCL", body: "Perbandingan untuk kiriman lebih kecil jika konsolidasi sesuai untuk kargo." },
      { title: "Koordinasi di Hai Phong", body: "Penjemputan, bea cukai ekspor, dan origin handling dapat disertakan bila cakupan jelas." },
      { title: "Pengiriman di Jakarta", body: "Port-only atau pengiriman lanjutan dapat ditinjau setelah alamat dan tanggung jawab impor dikonfirmasi." },
    ],
    detailsTitle: "Detail yang diperlukan",
    details: ["Komoditas dan kode HS bila tersedia", "Ukuran kontainer atau koli, dimensi, berat, dan CBM", "Alamat penjemputan di Hai Phong", "Tanggal kargo siap", "Incoterm dan cakupan biaya", "Pelabuhan Jakarta atau alamat akhir", "Izin atau penanganan khusus"],
    noteTitle: "Tarif, jadwal, dan persyaratan impor",
    noteBody: "Tarif, ruang, peralatan, dan jadwal dapat berubah. Importir harus memastikan izin, kontrol produk, bea, dan pajak di Indonesia. Setiap opsi tunduk pada konfirmasi carrier dan detail akhir kargo.",
    faqTitle: "Pertanyaan rute Hai Phong–Jakarta",
    faqs: [
      { question: "Bisakah saya membandingkan FCL dan LCL?", answer: "Ya. Berikan dimensi, berat total, dan CBM agar perbandingan memakai dasar kargo yang sama." },
      { question: "Bisakah penjemputan di Hai Phong disertakan?", answer: "Ya, dengan alamat, kebutuhan pemuatan, dan tanggal siap." },
      { question: "Bisakah dikutip hingga tujuan setelah pelabuhan Jakarta?", answer: "Dapat ditinjau setelah alamat akhir, Incoterm, dan tanggung jawab kepabeanan dikonfirmasi." },
    ],
    formTitle: "Ada kargo siap ke Jakarta?",
    formBody: "Kirim detail sebenarnya untuk meminta tinjauan rute dan biaya terkini.",
  },
};

const BASE_URL = "https://www.bookingbyjohnly.com";
const SLUG = "/routes/hai-phong-to-jakarta";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale] || COPY.en;
  const path = `/${locale}${SLUG}`;
  return {
    title: `${copy.title} | Booking by John Ly`,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(routing.locales.map((language) => [language, `/${language}${SLUG}`])),
        "x-default": `/en${SLUG}`,
      },
    },
    openGraph: { title: copy.title, description: copy.description, type: "website", url: path },
  };
}

export default async function HaiPhongToJakartaPage({ params }: Props) {
  const { locale } = await params;
  const copy = COPY[locale] || COPY.en;
  const pageUrl = `${BASE_URL}/${locale}${SLUG}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: copy.title,
      description: copy.description,
      url: pageUrl,
      serviceType: "Ocean freight forwarding",
      areaServed: [{ "@type": "City", name: "Hai Phong" }, { "@type": "City", name: "Jakarta" }],
      provider: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: copy.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: "Hai Phong to Jakarta", item: pageUrl },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <JsonLd data={schemas} />
      <Nav />
      <section className="bg-[#0B1F3A] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span><span>Hai Phong → Jakarta</span>
          </nav>
          <p className="mt-10 text-sm font-black uppercase tracking-widest text-orange-300">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{copy.description}</p>
          <a href="#request" className="mt-9 inline-flex rounded-md bg-accent-orange px-6 py-3 font-black text-white">{copy.quote}</a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.overviewTitle}</h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-text-secondary">{copy.overview}</p>
      </section>

      <section className="bg-white px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.optionsTitle}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {copy.options.map((item, index) => (
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
          <ul className="mt-6 space-y-3 text-text-secondary">
            {copy.details.map((detail) => <li key={detail} className="flex gap-3"><span className="font-black text-accent-green">✓</span><span>{detail}</span></li>)}
          </ul>
        </div>
        <aside className="rounded-xl bg-[#0B1F3A] p-8 text-white">
          <h2 className="text-2xl font-black">{copy.noteTitle}</h2>
          <p className="mt-4 leading-7 text-slate-200">{copy.noteBody}</p>
        </aside>
      </section>

      <section className="bg-white px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.faqTitle}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {copy.faqs.map((faq) => (
              <article key={faq.question} className="rounded-lg border border-border-subtle p-6">
                <h3 className="font-black text-[#0B1F3A]">{faq.question}</h3>
                <p className="mt-3 leading-7 text-text-secondary">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-14 text-center lg:px-8 lg:pt-20">
        <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.formTitle}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-secondary">{copy.formBody}</p>
      </section>
      <RequestStepper initialMode="Ocean Freight" initialOrigin="Hai Phong, Vietnam" initialDestination="Jakarta, Indonesia" sourcePage="hai-phong-to-jakarta" />
      <Footer />
    </main>
  );
}
