import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import RequestStepper from "@/components/RequestStepper";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };
type Copy = {
  eyebrow: string;
  title: string;
  description: string;
  quote: string;
  plan: string;
  overviewTitle: string;
  overview: string;
  decisionsTitle: string;
  decisions: Array<{ title: string; body: string }>;
  detailsTitle: string;
  detailsIntro: string;
  details: string[];
  portsTitle: string;
  portsBody: string;
  costTitle: string;
  costBody: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  finalTitle: string;
  finalBody: string;
};

const COPY: Record<string, Copy> = {
  en: {
    eyebrow: "Vietnam–Spain ocean freight",
    title: "Ship from Vietnam to Spain with a route-specific freight plan",
    description: "Compare FCL, LCL, port options, documents and delivery scope for cargo moving between Vietnam and Spain.",
    quote: "Request a Vietnam–Spain quote",
    plan: "Review the planning points",
    overviewTitle: "Planning the complete route",
    overview: "A useful comparison starts with the real factory and consignee locations. Cargo may depart through Cat Lai, Cai Mep or Hai Phong, while Barcelona, Valencia, Algeciras or another Spanish gateway may suit the final destination. The lowest ocean rate is not always the lowest landed cost.",
    decisionsTitle: "Four decisions before booking",
    decisions: [
      { title: "FCL or LCL", body: "Compare shipment volume, packing, handling risk and all origin and destination charges." },
      { title: "Port pair", body: "Select ports around inland distance, carrier service, schedule and the consignee’s delivery location." },
      { title: "Routing", body: "Check whether the service is direct or transshipped and review the complete connection plan." },
      { title: "Incoterm", body: "Confirm who controls pickup, export handling, main freight, customs, taxes and final delivery." },
    ],
    detailsTitle: "Details needed for an accurate quote",
    detailsIntro: "Send complete cargo information so options can be compared on the same scope.",
    details: ["Vietnam pickup address or load port", "Spanish port or final delivery postcode", "Commodity and HS code if available", "Packages, dimensions, gross weight and CBM", "FCL container type or LCL requirement", "Cargo-ready date and Incoterm", "Any special handling or controlled-cargo requirement"],
    portsTitle: "Choosing a Spanish gateway",
    portsBody: "Barcelona and Valencia can be practical for many Mediterranean and inland destinations, while Algeciras may suit particular carrier networks or southern locations. The correct choice depends on the live service and total inland plan, not a fixed port recommendation.",
    costTitle: "Rates and transit expectations",
    costBody: "Freight rates, capacity and schedules change. Request a current sailing and itemized charge scope for the exact shipment. Port-to-port transit should be separated from pickup, export clearance, destination handling, customs and final delivery time.",
    faqTitle: "Vietnam to Spain shipping questions",
    faqs: [
      { question: "Can the quote include delivery in Spain?", answer: "Yes, when the delivery postcode, cargo details and Incoterm are available." },
      { question: "Which Spanish port is best?", answer: "The best port depends on the final destination, current carrier service and total inland cost." },
      { question: "Can smaller shipments move as LCL?", answer: "Yes. Compare the full LCL charge structure and handling risk with an FCL alternative." },
    ],
    finalTitle: "Have cargo moving from Vietnam to Spain?",
    finalBody: "Share the actual shipment details to receive a practical route and cost comparison.",
  },
  vi: {
    eyebrow: "Vận tải biển Việt Nam–Tây Ban Nha",
    title: "Vận chuyển từ Việt Nam đi Tây Ban Nha theo phương án riêng cho lô hàng",
    description: "So sánh FCL, LCL, cảng đi đến, chứng từ và phạm vi giao hàng cho tuyến Việt Nam–Tây Ban Nha.",
    quote: "Yêu cầu báo giá Việt Nam–Tây Ban Nha",
    plan: "Xem các điểm cần chuẩn bị",
    overviewTitle: "Lập kế hoạch cho toàn bộ hành trình",
    overview: "Việc so sánh nên bắt đầu từ vị trí thực tế của nhà máy và người nhận. Hàng có thể đi qua Cát Lái, Cái Mép hoặc Hải Phòng; tại Tây Ban Nha có thể cân nhắc Barcelona, Valencia, Algeciras hoặc cảng khác. Giá cước biển thấp nhất chưa chắc là tổng chi phí thấp nhất.",
    decisionsTitle: "Bốn quyết định trước khi booking",
    decisions: [
      { title: "FCL hay LCL", body: "So sánh sản lượng, đóng gói, rủi ro xếp dỡ và toàn bộ phí tại hai đầu." },
      { title: "Cặp cảng", body: "Chọn cảng theo khoảng cách nội địa, dịch vụ hãng tàu, lịch trình và nơi giao hàng." },
      { title: "Tuyến vận chuyển", body: "Kiểm tra đi thẳng hay chuyển tải và xem toàn bộ kế hoạch nối chuyến." },
      { title: "Incoterm", body: "Xác định bên chịu trách nhiệm lấy hàng, xuất khẩu, cước chính, hải quan, thuế và giao cuối." },
    ],
    detailsTitle: "Thông tin cần có để báo giá chính xác",
    detailsIntro: "Gửi đầy đủ thông tin để các phương án được so sánh cùng một phạm vi chi phí.",
    details: ["Địa chỉ lấy hàng tại Việt Nam hoặc cảng đi", "Cảng Tây Ban Nha hoặc mã bưu chính nơi giao", "Mặt hàng và mã HS nếu có", "Số kiện, kích thước, trọng lượng và CBM", "Loại container FCL hoặc nhu cầu LCL", "Ngày hàng sẵn sàng và Incoterm", "Yêu cầu đặc biệt hoặc hàng thuộc diện kiểm soát"],
    portsTitle: "Chọn cửa ngõ tại Tây Ban Nha",
    portsBody: "Barcelona và Valencia phù hợp với nhiều điểm đến Địa Trung Hải và nội địa; Algeciras có thể phù hợp với một số mạng lưới hãng tàu hoặc điểm đến phía nam. Cần chọn theo dịch vụ hiện hành và tổng phương án nội địa.",
    costTitle: "Giá và thời gian vận chuyển",
    costBody: "Giá, chỗ và lịch tàu thay đổi. Cần kiểm tra chuyến hiện hành và phạm vi phí cho đúng lô hàng. Thời gian cảng đến cảng nên tách khỏi lấy hàng, thông quan xuất khẩu, xử lý đầu đến, hải quan và giao hàng.",
    faqTitle: "Câu hỏi tuyến Việt Nam đi Tây Ban Nha",
    faqs: [
      { question: "Báo giá có thể gồm giao hàng tại Tây Ban Nha không?", answer: "Có, khi có mã bưu chính nơi giao, thông tin hàng và Incoterm." },
      { question: "Nên chọn cảng nào tại Tây Ban Nha?", answer: "Cảng phù hợp phụ thuộc nơi giao cuối, dịch vụ hãng tàu hiện hành và tổng chi phí nội địa." },
      { question: "Hàng nhỏ có thể đi LCL không?", answer: "Có. Cần so sánh toàn bộ cấu trúc phí LCL và rủi ro xếp dỡ với phương án FCL." },
    ],
    finalTitle: "Bạn có lô hàng từ Việt Nam đi Tây Ban Nha?",
    finalBody: "Gửi thông tin thật của lô hàng để nhận so sánh tuyến và chi phí phù hợp.",
  },
  it: {
    eyebrow: "Trasporto marittimo Vietnam–Spagna",
    title: "Spedisci dal Vietnam alla Spagna con un piano specifico",
    description: "Confronta FCL, LCL, porti, documenti e consegna per le merci tra Vietnam e Spagna.",
    quote: "Richiedi un preventivo Vietnam–Spagna",
    plan: "Consulta i punti di pianificazione",
    overviewTitle: "Pianificare l’intera rotta",
    overview: "Il confronto parte dalle sedi reali di fabbrica e destinatario. La merce può partire da Cat Lai, Cai Mep o Hai Phong e arrivare via Barcellona, Valencia, Algeciras o un altro porto. La tariffa marittima più bassa non coincide sempre con il costo totale più basso.",
    decisionsTitle: "Quattro decisioni prima del booking",
    decisions: [
      { title: "FCL o LCL", body: "Confronta volume, imballaggio, rischio di movimentazione e tutti i costi locali." },
      { title: "Coppia di porti", body: "Scegli in base a distanza interna, servizio, programma e luogo di consegna." },
      { title: "Instradamento", body: "Verifica servizio diretto o trasbordo e l’intero piano di collegamento." },
      { title: "Incoterm", body: "Definisci responsabilità per ritiro, export, nolo, dogana, imposte e consegna." },
    ],
    detailsTitle: "Dati per un preventivo accurato",
    detailsIntro: "Fornisci dati completi per confrontare opzioni con lo stesso perimetro.",
    details: ["Indirizzo di ritiro o porto vietnamita", "Porto spagnolo o codice postale di consegna", "Merce e codice HS se disponibile", "Colli, dimensioni, peso lordo e CBM", "Tipo di container FCL o richiesta LCL", "Data merce pronta e Incoterm", "Requisiti speciali o merce controllata"],
    portsTitle: "Scegliere un porto spagnolo",
    portsBody: "Barcellona e Valencia possono servire molte destinazioni mediterranee e interne; Algeciras può essere adatto a reti specifiche o al sud. La scelta dipende dal servizio attuale e dal piano terrestre totale.",
    costTitle: "Tariffe e tempi",
    costBody: "Tariffe, capacità e programmi cambiano. Richiedi una partenza aggiornata e costi dettagliati. Separa il transito porto-porto da ritiro, export, gestione a destino, dogana e consegna.",
    faqTitle: "Domande Vietnam–Spagna",
    faqs: [
      { question: "Il preventivo può includere la consegna in Spagna?", answer: "Sì, con codice postale, dati della merce e Incoterm." },
      { question: "Qual è il porto spagnolo migliore?", answer: "Dipende dalla destinazione finale, dal servizio attuale e dal costo terrestre totale." },
      { question: "Le piccole spedizioni possono viaggiare LCL?", answer: "Sì. Confronta tutti i costi e il rischio di movimentazione con FCL." },
    ],
    finalTitle: "Hai merce dal Vietnam alla Spagna?",
    finalBody: "Invia i dati reali per un confronto pratico di rotta e costi.",
  },
  es: {
    eyebrow: "Transporte marítimo Vietnam–España",
    title: "Envía de Vietnam a España con un plan específico para tu carga",
    description: "Compara FCL, LCL, puertos, documentación y entrega para mercancías entre Vietnam y España.",
    quote: "Solicitar cotización Vietnam–España",
    plan: "Revisar la planificación",
    overviewTitle: "Planificar la ruta completa",
    overview: "La comparación debe partir de la ubicación real de la fábrica y del destinatario. La carga puede salir por Cat Lai, Cai Mep o Hai Phong y entrar por Barcelona, Valencia, Algeciras u otro puerto español. El flete marítimo más bajo no siempre ofrece el menor costo total.",
    decisionsTitle: "Cuatro decisiones antes de reservar",
    decisions: [
      { title: "FCL o LCL", body: "Compara volumen, embalaje, riesgo de manipulación y todos los cargos en origen y destino." },
      { title: "Puertos", body: "Elige según la distancia interior, servicio, horario y lugar de entrega." },
      { title: "Ruta", body: "Comprueba si el servicio es directo o con transbordo y revisa todas las conexiones." },
      { title: "Incoterm", body: "Define quién controla recogida, exportación, flete, aduana, impuestos y entrega." },
    ],
    detailsTitle: "Datos para una cotización precisa",
    detailsIntro: "Envía información completa para comparar todas las opciones con el mismo alcance.",
    details: ["Dirección de recogida o puerto en Vietnam", "Puerto español o código postal de entrega", "Mercancía y código HS si está disponible", "Bultos, dimensiones, peso bruto y CBM", "Tipo de contenedor FCL o necesidad LCL", "Fecha de disponibilidad e Incoterm", "Manipulación especial o carga controlada"],
    portsTitle: "Elegir una puerta de entrada española",
    portsBody: "Barcelona y Valencia pueden servir muchos destinos mediterráneos e interiores; Algeciras puede encajar con determinadas redes o ubicaciones del sur. La elección depende del servicio actual y del plan interior total.",
    costTitle: "Tarifas y tiempos de tránsito",
    costBody: "Las tarifas, capacidad y horarios cambian. Solicita una salida actual y cargos desglosados. Separa el tránsito puerto a puerto de la recogida, exportación, manipulación, aduana y entrega.",
    faqTitle: "Preguntas sobre envíos Vietnam–España",
    faqs: [
      { question: "¿La cotización puede incluir entrega en España?", answer: "Sí, cuando se dispone del código postal, datos de carga e Incoterm." },
      { question: "¿Qué puerto español es mejor?", answer: "Depende del destino final, servicio actual y costo interior total." },
      { question: "¿Los envíos pequeños pueden ir como LCL?", answer: "Sí. Compara todos los cargos LCL y el riesgo de manipulación con FCL." },
    ],
    finalTitle: "¿Tienes carga de Vietnam a España?",
    finalBody: "Comparte los datos reales para recibir una comparación práctica de ruta y costos.",
  },
  id: {
    eyebrow: "Angkutan laut Vietnam–Spanyol",
    title: "Kirim dari Vietnam ke Spanyol dengan rencana khusus",
    description: "Bandingkan FCL, LCL, pilihan pelabuhan, dokumen, dan cakupan pengiriman Vietnam–Spanyol.",
    quote: "Minta penawaran Vietnam–Spanyol",
    plan: "Lihat poin perencanaan",
    overviewTitle: "Merencanakan seluruh rute",
    overview: "Perbandingan dimulai dari lokasi pabrik dan penerima sebenarnya. Kargo dapat berangkat melalui Cat Lai, Cai Mep, atau Hai Phong dan tiba melalui Barcelona, Valencia, Algeciras, atau pelabuhan lain. Tarif laut terendah belum tentu menghasilkan total biaya terendah.",
    decisionsTitle: "Empat keputusan sebelum booking",
    decisions: [
      { title: "FCL atau LCL", body: "Bandingkan volume, kemasan, risiko penanganan, serta seluruh biaya asal dan tujuan." },
      { title: "Pasangan pelabuhan", body: "Pilih berdasarkan jarak darat, layanan carrier, jadwal, dan lokasi pengiriman." },
      { title: "Rute", body: "Periksa layanan langsung atau transshipment serta seluruh rencana koneksi." },
      { title: "Incoterm", body: "Pastikan tanggung jawab penjemputan, ekspor, freight, bea cukai, pajak, dan pengiriman." },
    ],
    detailsTitle: "Detail untuk penawaran akurat",
    detailsIntro: "Kirim informasi lengkap agar opsi dibandingkan dengan cakupan yang sama.",
    details: ["Alamat penjemputan atau pelabuhan Vietnam", "Pelabuhan Spanyol atau kode pos pengiriman", "Komoditas dan kode HS jika tersedia", "Koli, dimensi, berat kotor, dan CBM", "Jenis kontainer FCL atau kebutuhan LCL", "Tanggal kargo siap dan Incoterm", "Penanganan khusus atau kargo terkontrol"],
    portsTitle: "Memilih pelabuhan Spanyol",
    portsBody: "Barcelona dan Valencia dapat melayani banyak tujuan Mediterania dan daratan; Algeciras mungkin sesuai untuk jaringan tertentu atau lokasi selatan. Pilihan bergantung pada layanan aktual dan total rencana darat.",
    costTitle: "Tarif dan waktu transit",
    costBody: "Tarif, kapasitas, dan jadwal berubah. Minta jadwal terkini dan rincian biaya. Pisahkan transit port-to-port dari penjemputan, ekspor, penanganan tujuan, bea cukai, dan pengiriman.",
    faqTitle: "Pertanyaan pengiriman Vietnam–Spanyol",
    faqs: [
      { question: "Bisakah penawaran mencakup pengiriman di Spanyol?", answer: "Ya, jika kode pos, detail kargo, dan Incoterm tersedia." },
      { question: "Pelabuhan Spanyol mana yang terbaik?", answer: "Tergantung tujuan akhir, layanan carrier saat ini, dan total biaya darat." },
      { question: "Bisakah kiriman kecil menggunakan LCL?", answer: "Ya. Bandingkan seluruh biaya dan risiko penanganan LCL dengan FCL." },
    ],
    finalTitle: "Ada kargo dari Vietnam ke Spanyol?",
    finalBody: "Kirim detail sebenarnya untuk menerima perbandingan rute dan biaya yang praktis.",
  },
};

const BASE_URL = "https://www.bookingbyjohnly.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale] || COPY.en;
  const path = `/${locale}/routes/vietnam-to-spain`;
  return {
    title: `${copy.title} | Booking by John Ly`,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(routing.locales.map((language) => [language, `/${language}/routes/vietnam-to-spain`])),
        "x-default": "/en/routes/vietnam-to-spain",
      },
    },
    openGraph: { title: copy.title, description: copy.description, type: "website", url: path },
    twitter: { card: "summary_large_image", title: copy.title, description: copy.description },
  };
}

export default async function VietnamToSpainPage({ params }: Props) {
  const { locale } = await params;
  const copy = COPY[locale] || COPY.en;
  const pageUrl = `${BASE_URL}/${locale}/routes/vietnam-to-spain`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: copy.title,
      description: copy.description,
      url: pageUrl,
      serviceType: "Ocean freight planning and forwarding support",
      areaServed: [{ "@type": "Country", name: "Vietnam" }, { "@type": "Country", name: "Spain" }],
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
        { "@type": "ListItem", position: 2, name: "Vietnam to Spain", item: pageUrl },
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
            <Link href="/" className="hover:text-white">Home</Link><span className="mx-2">/</span><span>Vietnam to Spain</span>
          </nav>
          <p className="mt-10 text-sm font-black uppercase tracking-widest text-orange-300">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{copy.description}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/?origin=Vietnam&destination=Spain&source=vietnam-to-spain-hero#request" className="rounded-md bg-accent-orange px-6 py-3 font-black text-white">{copy.quote}</Link>
            <a href="#planning" className="rounded-md border border-white/30 px-6 py-3 font-black">{copy.plan}</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.overviewTitle}</h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-text-secondary">{copy.overview}</p>
      </section>

      <section id="planning" className="bg-white px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.decisionsTitle}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {copy.decisions.map((item, index) => (
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
          <p className="mt-4 leading-7 text-text-secondary">{copy.detailsIntro}</p>
          <ul className="mt-6 space-y-3">
            {copy.details.map((detail) => <li key={detail} className="rounded-md bg-white p-4 shadow-sm">{detail}</li>)}
          </ul>
          <Link href="/?origin=Vietnam&destination=Spain&source=vietnam-to-spain-details#request" className="mt-6 inline-flex rounded-md bg-accent-orange px-6 py-3 font-black text-white">{copy.quote}</Link>
        </div>
        <div className="space-y-6">
          <article className="rounded-lg border border-border-subtle bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-black text-[#0B1F3A]">{copy.portsTitle}</h2>
            <p className="mt-4 leading-7 text-text-secondary">{copy.portsBody}</p>
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
        <Link href="#request" data-quote-cta="route-final" className="mt-8 inline-flex rounded-md bg-accent-orange px-6 py-3 font-black text-white">{copy.quote}</Link>
      </section>
      <RequestStepper
        initialOrigin="Vietnam"
        initialDestination="Spain"
        initialMode="Ocean Freight"
        sourcePage="vietnam-to-spain-embedded-form"
      />
      <Footer />
    </main>
  );
}
