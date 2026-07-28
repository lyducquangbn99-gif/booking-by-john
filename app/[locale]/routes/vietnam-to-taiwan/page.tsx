import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };
type Copy = {
  eyebrow: string; title: string; description: string; quote: string;
  overviewTitle: string; overview: string;
  planningTitle: string; planning: Array<{ title: string; body: string }>;
  detailsTitle: string; details: string[];
  portsTitle: string; portsBody: string; costTitle: string; costBody: string;
  faqTitle: string; faqs: Array<{ question: string; answer: string }>;
  finalTitle: string; finalBody: string;
};

const COPY: Record<string, Copy> = {
  en: {
    eyebrow: "Vietnam–Taiwan freight",
    title: "Plan freight from Vietnam to Taiwan with the right port and service",
    description: "Compare FCL, LCL, air freight, port options, documents and delivery scope for Vietnam–Taiwan shipments.",
    quote: "Request a Vietnam–Taiwan quote",
    overviewTitle: "Match the route to the real pickup and delivery points",
    overview: "Cargo can move from southern or northern Vietnam to gateways such as Kaohsiung, Keelung or Taichung. The suitable port depends on the factory, consignee, carrier schedule, cargo type and inland delivery plan—not only the headline freight rate.",
    planningTitle: "Four checks before booking",
    planning: [
      { title: "FCL, LCL or air", body: "Compare total cost, urgency, shipment size and handling risk." },
      { title: "Port pair", body: "Choose origin and destination gateways around actual inland locations and current service." },
      { title: "Cargo readiness", body: "Align booking cut-off, shipping instructions, VGM, export documents and factory loading." },
      { title: "Charge scope", body: "Separate freight, local charges, customs, taxes and final delivery." },
    ],
    detailsTitle: "Information needed for an accurate quote",
    details: ["Vietnam pickup address or load port", "Taiwan port or final delivery postcode", "Commodity and HS code if available", "Package count, dimensions, weight and CBM", "FCL container type, LCL or air requirement", "Cargo-ready date and Incoterm", "Special handling or controlled-cargo details"],
    portsTitle: "Choosing the destination gateway",
    portsBody: "Kaohsiung, Keelung and Taichung serve different industrial and consumption areas. Compare the current carrier service and the complete inland plan before selecting a port.",
    costTitle: "Rates and transit expectations",
    costBody: "Rates, equipment and schedules change. Request a current sailing or flight for the exact cargo-ready date. Transit estimates should identify the routing and exclude time that depends on customs or consignee readiness.",
    faqTitle: "Vietnam to Taiwan shipping questions",
    faqs: [
      { question: "Can you quote door-to-door?", answer: "Yes, when both addresses, cargo details, Incoterm and import requirements are clear." },
      { question: "Which Taiwan port should I use?", answer: "The best gateway depends on the final destination, current service and total inland cost." },
      { question: "Can small cargo move by LCL or air?", answer: "Yes. Compare urgency, chargeable weight, local charges and handling risk." },
    ],
    finalTitle: "Have a Vietnam–Taiwan shipment?",
    finalBody: "Share the actual cargo details to receive a practical route and cost comparison.",
  },
  vi: {
    eyebrow: "Vận chuyển Việt Nam–Đài Loan",
    title: "Lập phương án vận chuyển Việt Nam đi Đài Loan theo đúng cảng và dịch vụ",
    description: "So sánh FCL, LCL, hàng không, cảng, chứng từ và giao hàng cho tuyến Việt Nam–Đài Loan.",
    quote: "Yêu cầu báo giá Việt Nam–Đài Loan",
    overviewTitle: "Chọn tuyến theo điểm lấy và giao thực tế",
    overview: "Hàng có thể đi từ miền Nam hoặc miền Bắc Việt Nam đến Cao Hùng, Cơ Long hoặc Đài Trung. Cảng phù hợp phụ thuộc vị trí nhà máy, người nhận, lịch vận chuyển, loại hàng và kế hoạch giao nội địa, không chỉ dựa vào mức cước.",
    planningTitle: "Bốn điểm cần kiểm tra trước booking",
    planning: [
      { title: "FCL, LCL hay hàng không", body: "So sánh tổng chi phí, độ gấp, sản lượng và rủi ro xếp dỡ." },
      { title: "Cặp cảng", body: "Chọn cửa ngõ theo vị trí nội địa thực tế và dịch vụ hiện hành." },
      { title: "Hàng sẵn sàng", body: "Căn chỉnh cut-off, shipping instruction, VGM, chứng từ và lịch đóng hàng." },
      { title: "Phạm vi phí", body: "Tách cước, phí địa phương, hải quan, thuế và giao hàng cuối." },
    ],
    detailsTitle: "Thông tin cần có để báo giá chính xác",
    details: ["Địa chỉ lấy hàng hoặc cảng đi tại Việt Nam", "Cảng hoặc mã bưu chính nơi giao tại Đài Loan", "Mặt hàng và mã HS nếu có", "Số kiện, kích thước, trọng lượng và CBM", "Loại container FCL, LCL hoặc hàng không", "Ngày hàng sẵn sàng và Incoterm", "Yêu cầu đặc biệt hoặc hàng kiểm soát"],
    portsTitle: "Chọn cửa ngõ đầu đến",
    portsBody: "Cao Hùng, Cơ Long và Đài Trung phục vụ các khu vực công nghiệp và tiêu dùng khác nhau. Cần so sánh dịch vụ hiện hành cùng toàn bộ phương án giao nội địa.",
    costTitle: "Giá và thời gian vận chuyển",
    costBody: "Giá, thiết bị và lịch thay đổi. Cần lấy chuyến hiện hành theo ngày hàng sẵn sàng. Thời gian dự kiến phải nêu rõ tuyến đi và không bao gồm phần phụ thuộc hải quan hoặc người nhận.",
    faqTitle: "Câu hỏi tuyến Việt Nam–Đài Loan",
    faqs: [
      { question: "Có thể báo giá door-to-door không?", answer: "Có, khi rõ hai địa chỉ, thông tin hàng, Incoterm và yêu cầu nhập khẩu." },
      { question: "Nên dùng cảng nào tại Đài Loan?", answer: "Cửa ngõ phù hợp phụ thuộc điểm giao cuối, dịch vụ hiện hành và tổng chi phí nội địa." },
      { question: "Hàng nhỏ có thể đi LCL hoặc hàng không không?", answer: "Có. Cần so sánh độ gấp, trọng lượng tính cước, phí địa phương và rủi ro." },
    ],
    finalTitle: "Bạn có lô hàng Việt Nam–Đài Loan?",
    finalBody: "Gửi thông tin thật để nhận so sánh tuyến và chi phí phù hợp.",
  },
  it: {
    eyebrow: "Trasporto Vietnam–Taiwan",
    title: "Pianifica il trasporto Vietnam–Taiwan con porto e servizio adatti",
    description: "Confronta FCL, LCL, aereo, porti, documenti e consegna.",
    quote: "Richiedi un preventivo Vietnam–Taiwan",
    overviewTitle: "Abbinare la rotta a ritiro e consegna",
    overview: "La merce può partire dal nord o sud del Vietnam verso Kaohsiung, Keelung o Taichung. Il porto dipende da sedi, programma, merce e consegna interna, non solo dalla tariffa.",
    planningTitle: "Quattro controlli prima del booking",
    planning: [
      { title: "FCL, LCL o aereo", body: "Confronta costo totale, urgenza, volume e rischio." },
      { title: "Coppia di porti", body: "Scegli in base alle sedi reali e al servizio attuale." },
      { title: "Merce pronta", body: "Allinea cut-off, istruzioni, VGM, documenti e carico." },
      { title: "Costi inclusi", body: "Separa nolo, costi locali, dogana, imposte e consegna." },
    ],
    detailsTitle: "Dati per un preventivo accurato",
    details: ["Ritiro o porto in Vietnam", "Porto o CAP a Taiwan", "Merce e codice HS", "Colli, dimensioni, peso e CBM", "FCL, LCL o aereo", "Data pronta e Incoterm", "Requisiti speciali"],
    portsTitle: "Scegliere il gateway",
    portsBody: "Kaohsiung, Keelung e Taichung servono aree diverse. Confronta servizio attuale e piano terrestre completo.",
    costTitle: "Tariffe e tempi",
    costBody: "Tariffe, attrezzature e programmi cambiano. Richiedi una partenza aggiornata e una rotta completa.",
    faqTitle: "Domande Vietnam–Taiwan",
    faqs: [
      { question: "È possibile door-to-door?", answer: "Sì, con indirizzi, dati, Incoterm e requisiti import chiari." },
      { question: "Quale porto usare?", answer: "Dipende dalla destinazione, dal servizio e dal costo terrestre." },
      { question: "LCL o aereo per piccoli carichi?", answer: "Sì; confronta urgenza, peso tassabile, costi e rischio." },
    ],
    finalTitle: "Hai una spedizione Vietnam–Taiwan?",
    finalBody: "Invia i dati reali per confrontare rotta e costi.",
  },
  es: {
    eyebrow: "Transporte Vietnam–Taiwán",
    title: "Planifica el transporte Vietnam–Taiwán con el puerto adecuado",
    description: "Compara FCL, LCL, aéreo, puertos, documentos y entrega.",
    quote: "Solicitar cotización Vietnam–Taiwán",
    overviewTitle: "Ajustar la ruta a la recogida y entrega",
    overview: "La carga puede salir del norte o sur de Vietnam hacia Kaohsiung, Keelung o Taichung. El puerto depende de ubicaciones, servicio, mercancía y entrega interior, no solo de la tarifa.",
    planningTitle: "Cuatro controles antes de reservar",
    planning: [
      { title: "FCL, LCL o aéreo", body: "Compara costo total, urgencia, volumen y riesgo." },
      { title: "Puertos", body: "Elige según las ubicaciones reales y el servicio actual." },
      { title: "Carga lista", body: "Coordina cut-offs, instrucciones, VGM, documentos y carga." },
      { title: "Cargos incluidos", body: "Separa flete, cargos locales, aduana, impuestos y entrega." },
    ],
    detailsTitle: "Datos para una cotización precisa",
    details: ["Recogida o puerto en Vietnam", "Puerto o código postal en Taiwán", "Mercancía y código HS", "Bultos, dimensiones, peso y CBM", "FCL, LCL o aéreo", "Fecha disponible e Incoterm", "Requisitos especiales"],
    portsTitle: "Elegir la puerta de entrada",
    portsBody: "Kaohsiung, Keelung y Taichung sirven áreas diferentes. Compara el servicio actual y el plan interior completo.",
    costTitle: "Tarifas y tiempos",
    costBody: "Tarifas, equipos y horarios cambian. Solicita una salida actual y la ruta completa.",
    faqTitle: "Preguntas Vietnam–Taiwán",
    faqs: [
      { question: "¿Se puede cotizar puerta a puerta?", answer: "Sí, con direcciones, datos, Incoterm y requisitos claros." },
      { question: "¿Qué puerto usar?", answer: "Depende del destino, servicio y costo interior." },
      { question: "¿LCL o aéreo para carga pequeña?", answer: "Ambos son posibles; compara urgencia, peso, cargos y riesgo." },
    ],
    finalTitle: "¿Tienes un envío Vietnam–Taiwán?",
    finalBody: "Comparte los datos reales para comparar ruta y costos.",
  },
  id: {
    eyebrow: "Pengiriman Vietnam–Taiwan",
    title: "Rencanakan pengiriman Vietnam–Taiwan dengan pelabuhan yang tepat",
    description: "Bandingkan FCL, LCL, udara, pelabuhan, dokumen, dan pengiriman akhir.",
    quote: "Minta penawaran Vietnam–Taiwan",
    overviewTitle: "Sesuaikan rute dengan lokasi sebenarnya",
    overview: "Kargo dapat berangkat dari Vietnam utara atau selatan menuju Kaohsiung, Keelung, atau Taichung. Pilihan bergantung pada lokasi, layanan, jenis kargo, dan rencana darat, bukan hanya tarif.",
    planningTitle: "Empat pemeriksaan sebelum booking",
    planning: [
      { title: "FCL, LCL, atau udara", body: "Bandingkan total biaya, urgensi, volume, dan risiko." },
      { title: "Pasangan pelabuhan", body: "Pilih berdasarkan lokasi sebenarnya dan layanan saat ini." },
      { title: "Kargo siap", body: "Selaraskan cut-off, instruksi, VGM, dokumen, dan pemuatan." },
      { title: "Cakupan biaya", body: "Pisahkan freight, biaya lokal, bea cukai, pajak, dan pengiriman." },
    ],
    detailsTitle: "Detail untuk penawaran akurat",
    details: ["Penjemputan atau pelabuhan Vietnam", "Pelabuhan atau kode pos Taiwan", "Komoditas dan kode HS", "Koli, dimensi, berat, dan CBM", "FCL, LCL, atau udara", "Tanggal siap dan Incoterm", "Persyaratan khusus"],
    portsTitle: "Memilih gerbang tujuan",
    portsBody: "Kaohsiung, Keelung, dan Taichung melayani area berbeda. Bandingkan layanan saat ini dan rencana darat lengkap.",
    costTitle: "Tarif dan waktu",
    costBody: "Tarif, peralatan, dan jadwal berubah. Minta jadwal aktual dan rute lengkap.",
    faqTitle: "Pertanyaan Vietnam–Taiwan",
    faqs: [
      { question: "Bisakah door-to-door?", answer: "Ya, jika alamat, detail, Incoterm, dan persyaratan jelas." },
      { question: "Pelabuhan mana yang dipakai?", answer: "Tergantung tujuan, layanan, dan biaya darat." },
      { question: "LCL atau udara untuk kargo kecil?", answer: "Keduanya mungkin; bandingkan urgensi, berat, biaya, dan risiko." },
    ],
    finalTitle: "Ada pengiriman Vietnam–Taiwan?",
    finalBody: "Kirim detail sebenarnya untuk membandingkan rute dan biaya.",
  },
};

const BASE_URL = "https://www.bookingbyjohnly.com";
export function generateStaticParams() { return routing.locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; const copy = COPY[locale] || COPY.en;
  const path = `/${locale}/routes/vietnam-to-taiwan`;
  return {
    title: `${copy.title} | Booking by John Ly`, description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(routing.locales.map((language) => [language, `/${language}/routes/vietnam-to-taiwan`])),
        "x-default": "/en/routes/vietnam-to-taiwan",
      },
    },
    openGraph: { title: copy.title, description: copy.description, type: "website", url: path },
  };
}

export default async function VietnamToTaiwanPage({ params }: Props) {
  const { locale } = await params; const copy = COPY[locale] || COPY.en;
  const pageUrl = `${BASE_URL}/${locale}/routes/vietnam-to-taiwan`;
  const schemas = [
    {
      "@context": "https://schema.org", "@type": "Service", name: copy.title,
      description: copy.description, url: pageUrl, serviceType: "International freight forwarding",
      areaServed: ["Vietnam", "Taiwan"], provider: { "@id": `${BASE_URL}/#organization` },
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
        { "@type": "ListItem", position: 2, name: "Vietnam to Taiwan", item: pageUrl },
      ],
    },
  ];
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <JsonLd data={schemas} /><Nav />
      <section className="bg-[#0B1F3A] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-300"><Link href="/">Home</Link><span className="mx-2">/</span><span>Vietnam to Taiwan</span></nav>
          <p className="mt-10 text-sm font-black uppercase tracking-widest text-orange-300">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{copy.description}</p>
          <Link href="/#request" className="mt-9 inline-flex rounded-md bg-accent-orange px-6 py-3 font-black text-white">{copy.quote}</Link>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.overviewTitle}</h2><p className="mt-5 max-w-4xl text-lg leading-8 text-text-secondary">{copy.overview}</p>
      </section>
      <section className="bg-white px-5 py-14 lg:px-8 lg:py-20"><div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.planningTitle}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">{copy.planning.map((item, index) => (
          <article key={item.title} className="rounded-lg border border-border-subtle bg-bg-primary p-6">
            <span className="text-sm font-black text-accent-orange">0{index + 1}</span><h3 className="mt-2 text-xl font-black text-[#0B1F3A]">{item.title}</h3><p className="mt-3 leading-7 text-text-secondary">{item.body}</p>
          </article>
        ))}</div>
      </div></section>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div><h2 className="text-3xl font-black text-[#0B1F3A]">{copy.detailsTitle}</h2><ul className="mt-6 space-y-3">{copy.details.map((item) => <li key={item} className="rounded-md bg-white p-4 shadow-sm">{item}</li>)}</ul></div>
        <div className="space-y-6">
          <article className="rounded-lg border border-border-subtle bg-white p-7 shadow-sm"><h2 className="text-2xl font-black text-[#0B1F3A]">{copy.portsTitle}</h2><p className="mt-4 leading-7 text-text-secondary">{copy.portsBody}</p></article>
          <article className="rounded-lg border border-border-subtle bg-white p-7 shadow-sm"><h2 className="text-2xl font-black text-[#0B1F3A]">{copy.costTitle}</h2><p className="mt-4 leading-7 text-text-secondary">{copy.costBody}</p></article>
        </div>
      </section>
      <section className="bg-white px-5 py-14 lg:px-8 lg:py-20"><div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.faqTitle}</h2><div className="mt-8 space-y-4">{copy.faqs.map((faq) => (
          <article key={faq.question} className="rounded-lg border border-border-subtle p-6"><h3 className="text-lg font-black text-[#0B1F3A]">{faq.question}</h3><p className="mt-3 leading-7 text-text-secondary">{faq.answer}</p></article>
        ))}</div>
      </div></section>
      <section className="bg-[#0B1F3A] px-5 py-14 text-center text-white lg:px-8"><h2 className="text-3xl font-black">{copy.finalTitle}</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-200">{copy.finalBody}</p><Link href="/#request" className="mt-8 inline-flex rounded-md bg-accent-orange px-6 py-3 font-black text-white">{copy.quote}</Link></section>
      <Footer />
    </main>
  );
}
