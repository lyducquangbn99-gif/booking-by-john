import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };
type Copy = {
  seoTitle: string;
  eyebrow: string;
  title: string;
  description: string;
  quote: string;
  guide: string;
  home: string;
  breadcrumb: string;
  fitTitle: string;
  fitIntro: string;
  useCases: Array<{ title: string; body: string }>;
  gatewaysTitle: string;
  gatewaysBody: string;
  processTitle: string;
  process: Array<{ title: string; body: string }>;
  detailsTitle: string;
  detailsBody: string;
  details: string[];
  compareTitle: string;
  compareBody: string;
  generalService: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  finalTitle: string;
  finalBody: string;
};

const COPY: Record<string, Copy> = {
  en: {
    seoTitle: "Air Freight Vietnam | International Air Cargo",
    eyebrow: "International air cargo from Vietnam",
    title: "Air freight from Vietnam planned around the real shipment",
    description: "Compare routing, airport options, charge scope and delivery requirements for time-sensitive international cargo from Vietnam.",
    quote: "Request an air freight quote",
    guide: "See the planning process",
    home: "Home",
    breadcrumb: "Air Freight Vietnam",
    fitTitle: "When air freight may be the practical choice",
    fitIntro: "Air freight is usually considered when speed, cargo value or supply-chain impact matters more than the lowest transport cost.",
    useCases: [
      { title: "Time-sensitive cargo", body: "Production parts, samples and replenishment shipments with a defined delivery window." },
      { title: "Higher-value goods", body: "Cargo where shorter transit and reduced handling time may support the risk plan." },
      { title: "Smaller urgent volumes", body: "Shipments that do not justify an ocean container but cannot wait for an ocean schedule." },
      { title: "Airport or door delivery", body: "Airport-to-airport or pickup-and-delivery scope when addresses and import responsibilities are clear." },
    ],
    gatewaysTitle: "Vietnam airport planning",
    gatewaysBody: "Tan Son Nhat (SGN), Noi Bai (HAN) and Da Nang (DAD) can support different origins and routings. The suitable gateway depends on pickup location, airline acceptance, connections, cargo characteristics and the requested delivery date.",
    processTitle: "A practical air freight process",
    process: [
      { title: "Check cargo acceptance", body: "Review commodity, dimensions, weight, packaging, documents and any airline restrictions." },
      { title: "Compare live options", body: "Compare routing, schedule, chargeable weight, included charges and delivery scope." },
      { title: "Confirm cut-offs", body: "Align cargo readiness, booking, export documents, terminal handover and flight plan." },
      { title: "Coordinate milestones", body: "Follow the agreed handover, departure, arrival and delivery milestones." },
    ],
    detailsTitle: "Details needed for an air freight quote",
    detailsBody: "Complete dimensions and weight are important because air cargo is priced using chargeable weight.",
    details: ["Pickup location and destination airport or address", "Commodity and HS code if available", "Package count and exact dimensions", "Gross weight for each package or total shipment", "Cargo-ready date and requested delivery date", "Incoterm and delivery scope", "Battery, dangerous goods, temperature or handling requirements"],
    compareTitle: "Air or ocean freight?",
    compareBody: "Compare total cost, required delivery date, cargo value, handling risk and shipment size. Ocean freight may suit larger or less urgent cargo; air freight may suit smaller shipments where time has greater business value.",
    generalService: "View complete freight forwarding support",
    faqTitle: "Air freight questions",
    faqs: [
      { question: "How is air freight chargeable weight calculated?", answer: "Airlines compare gross weight with volumetric weight and normally charge the higher figure. Exact rules should be confirmed with the current option." },
      { question: "Can air freight include pickup and delivery?", answer: "Yes, when both addresses, cargo details, Incoterm and import responsibilities are available." },
      { question: "Can batteries or dangerous goods move by air?", answer: "Some cargo may be accepted only with specific classification, packaging, documents and airline approval. Details must be checked before booking." },
      { question: "Are air freight rates fixed?", answer: "No. Capacity, routing, fuel and demand change, so quotes should show validity and included charges." },
    ],
    finalTitle: "Have time-sensitive cargo ready in Vietnam?",
    finalBody: "Send the actual package dimensions, weight, route and ready date to compare a current air freight option.",
  },
  vi: {
    seoTitle: "Vận tải hàng không Việt Nam | Air Freight quốc tế",
    eyebrow: "Vận tải hàng không quốc tế từ Việt Nam",
    title: "Vận tải hàng không từ Việt Nam theo đúng thông tin lô hàng",
    description: "So sánh tuyến bay, sân bay, phạm vi chi phí và yêu cầu giao hàng cho hàng quốc tế cần thời gian nhanh từ Việt Nam.",
    quote: "Yêu cầu báo giá hàng không",
    guide: "Xem quy trình lập phương án",
    home: "Trang chủ",
    breadcrumb: "Vận tải hàng không Việt Nam",
    fitTitle: "Khi nào nên cân nhắc vận tải hàng không",
    fitIntro: "Air freight phù hợp khi thời gian, giá trị hàng hoặc ảnh hưởng đến chuỗi cung ứng quan trọng hơn mức chi phí thấp nhất.",
    useCases: [
      { title: "Hàng cần gấp", body: "Linh kiện sản xuất, hàng mẫu và hàng bổ sung có thời hạn giao cụ thể." },
      { title: "Hàng giá trị cao", body: "Lô hàng cần thời gian vận chuyển và thời gian xử lý ngắn hơn trong phương án quản trị rủi ro." },
      { title: "Lô nhỏ cần nhanh", body: "Hàng chưa đủ để dùng container nhưng không thể chờ lịch vận tải biển." },
      { title: "Giao sân bay hoặc tận nơi", body: "Phạm vi airport-to-airport hoặc lấy và giao hàng khi rõ địa chỉ và trách nhiệm nhập khẩu." },
    ],
    gatewaysTitle: "Lập phương án sân bay tại Việt Nam",
    gatewaysBody: "Tân Sơn Nhất (SGN), Nội Bài (HAN) và Đà Nẵng (DAD) phù hợp với các điểm xuất phát và tuyến nối khác nhau. Cần chọn theo nơi lấy hàng, khả năng tiếp nhận của hãng bay, hành trình, đặc tính hàng và ngày giao yêu cầu.",
    processTitle: "Quy trình air freight thực tế",
    process: [
      { title: "Kiểm tra khả năng tiếp nhận", body: "Rà mặt hàng, kích thước, trọng lượng, đóng gói, chứng từ và hạn chế của hãng bay." },
      { title: "So sánh phương án hiện hành", body: "So sánh tuyến, lịch, trọng lượng tính cước, phí bao gồm và phạm vi giao hàng." },
      { title: "Xác nhận cut-off", body: "Căn chỉnh ngày hàng sẵn sàng, booking, chứng từ xuất khẩu, giao terminal và kế hoạch chuyến bay." },
      { title: "Theo dõi các mốc", body: "Theo dõi các mốc giao hàng, khởi hành, đến nơi và giao cuối đã thống nhất." },
    ],
    detailsTitle: "Thông tin cần có để báo giá hàng không",
    detailsBody: "Kích thước và trọng lượng chính xác rất quan trọng vì hàng không sử dụng trọng lượng tính cước.",
    details: ["Điểm lấy hàng và sân bay hoặc địa chỉ giao", "Mặt hàng và mã HS nếu có", "Số kiện và kích thước chính xác", "Trọng lượng từng kiện hoặc tổng lô hàng", "Ngày hàng sẵn sàng và ngày giao yêu cầu", "Incoterm và phạm vi giao hàng", "Pin, hàng nguy hiểm, nhiệt độ hoặc yêu cầu xử lý"],
    compareTitle: "Nên đi hàng không hay đường biển?",
    compareBody: "So sánh tổng chi phí, ngày cần giao, giá trị hàng, rủi ro xử lý và kích thước lô hàng. Đường biển thường phù hợp với hàng lớn hoặc ít gấp; hàng không phù hợp khi thời gian có giá trị kinh doanh cao hơn.",
    generalService: "Xem toàn bộ dịch vụ freight forwarding",
    faqTitle: "Câu hỏi về vận tải hàng không",
    faqs: [
      { question: "Trọng lượng tính cước hàng không được tính thế nào?", answer: "Hãng bay so sánh trọng lượng thực và trọng lượng thể tích, thường lấy số cao hơn. Công thức cụ thể cần xác nhận theo phương án hiện hành." },
      { question: "Có thể bao gồm lấy và giao hàng không?", answer: "Có, khi có đủ hai địa chỉ, thông tin hàng, Incoterm và trách nhiệm nhập khẩu." },
      { question: "Pin hoặc hàng nguy hiểm có đi máy bay được không?", answer: "Một số loại chỉ được tiếp nhận khi đúng phân loại, đóng gói, chứng từ và có hãng bay chấp thuận. Phải kiểm tra trước booking." },
      { question: "Giá air freight có cố định không?", answer: "Không. Chỗ, tuyến, nhiên liệu và nhu cầu thay đổi nên báo giá cần ghi rõ hiệu lực và phí bao gồm." },
    ],
    finalTitle: "Bạn có lô hàng cần gấp tại Việt Nam?",
    finalBody: "Gửi kích thước, trọng lượng, tuyến và ngày hàng sẵn sàng để so sánh phương án hàng không hiện hành.",
  },
  it: {
    seoTitle: "Trasporto aereo Vietnam | Air cargo internazionale",
    eyebrow: "Trasporto aereo internazionale dal Vietnam",
    title: "Trasporto aereo dal Vietnam basato sulla spedizione reale",
    description: "Confronta rotta, aeroporti, costi inclusi e consegna per merci internazionali urgenti dal Vietnam.",
    quote: "Richiedi un preventivo aereo",
    guide: "Vedi il processo",
    home: "Home",
    breadcrumb: "Trasporto aereo Vietnam",
    fitTitle: "Quando il trasporto aereo può essere adatto",
    fitIntro: "È utile quando tempo, valore della merce o impatto sulla supply chain contano più del costo minimo.",
    useCases: [
      { title: "Merce urgente", body: "Ricambi, campioni e rifornimenti con una finestra di consegna definita." },
      { title: "Merce di maggior valore", body: "Carichi per cui tempi più brevi possono supportare il piano di rischio." },
      { title: "Volumi piccoli e urgenti", body: "Spedizioni che non giustificano un container ma non possono attendere il mare." },
      { title: "Aeroporto o porta", body: "Airport-to-airport o ritiro e consegna con indirizzi e responsabilità chiare." },
    ],
    gatewaysTitle: "Pianificazione aeroportuale in Vietnam",
    gatewaysBody: "Tan Son Nhat (SGN), Noi Bai (HAN) e Da Nang (DAD) servono origini e collegamenti diversi. La scelta dipende da ritiro, accettazione, rotta, merce e data richiesta.",
    processTitle: "Un processo pratico",
    process: [
      { title: "Verifica accettazione", body: "Controlla merce, dimensioni, peso, imballo, documenti e restrizioni." },
      { title: "Confronta opzioni", body: "Valuta rotta, programma, peso tassabile, costi e consegna." },
      { title: "Conferma i cut-off", body: "Allinea disponibilità, booking, documenti, terminal e volo." },
      { title: "Coordina le tappe", body: "Segui consegna, partenza, arrivo e distribuzione concordati." },
    ],
    detailsTitle: "Dati per un preventivo aereo",
    detailsBody: "Dimensioni e peso esatti sono essenziali perché si applica il peso tassabile.",
    details: ["Ritiro e aeroporto o indirizzo di consegna", "Merce e codice HS", "Colli e dimensioni esatte", "Peso lordo", "Data pronta e data richiesta", "Incoterm e perimetro", "Batterie, pericolose, temperatura o gestione speciale"],
    compareTitle: "Aereo o mare?",
    compareBody: "Confronta costo totale, data richiesta, valore, rischio e volume. Il mare può adattarsi a carichi grandi e meno urgenti; l'aereo quando il tempo ha maggior valore.",
    generalService: "Vedi il supporto freight forwarding completo",
    faqTitle: "Domande sul trasporto aereo",
    faqs: [
      { question: "Come si calcola il peso tassabile?", answer: "Si confrontano peso lordo e volumetrico e normalmente si applica il maggiore. Conferma la regola dell'opzione attuale." },
      { question: "Può includere ritiro e consegna?", answer: "Sì, con indirizzi, dati, Incoterm e responsabilità import chiare." },
      { question: "Batterie o merci pericolose sono accettate?", answer: "Solo in alcuni casi con classificazione, imballo, documenti e approvazione corretti." },
      { question: "Le tariffe sono fisse?", answer: "No. Capacità, rotta, carburante e domanda cambiano; verifica validità e costi inclusi." },
    ],
    finalTitle: "Hai merce urgente pronta in Vietnam?",
    finalBody: "Invia dimensioni, peso, rotta e data pronta per confrontare un'opzione attuale.",
  },
  es: {
    seoTitle: "Transporte aéreo Vietnam | Carga internacional",
    eyebrow: "Carga aérea internacional desde Vietnam",
    title: "Transporte aéreo desde Vietnam según la carga real",
    description: "Compara ruta, aeropuertos, alcance de cargos y entrega para carga internacional urgente desde Vietnam.",
    quote: "Solicitar cotización aérea",
    guide: "Ver el proceso",
    home: "Inicio",
    breadcrumb: "Transporte aéreo Vietnam",
    fitTitle: "Cuándo puede convenir el transporte aéreo",
    fitIntro: "Suele considerarse cuando el tiempo, el valor o el impacto en la cadena importan más que el costo mínimo.",
    useCases: [
      { title: "Carga urgente", body: "Repuestos, muestras y reposición con una fecha de entrega definida." },
      { title: "Mercancía de mayor valor", body: "Carga donde un tránsito más corto puede apoyar el plan de riesgo." },
      { title: "Volúmenes pequeños urgentes", body: "Envíos que no justifican un contenedor pero no pueden esperar al transporte marítimo." },
      { title: "Aeropuerto o puerta", body: "Airport-to-airport o recogida y entrega con responsabilidades claras." },
    ],
    gatewaysTitle: "Planificación de aeropuertos en Vietnam",
    gatewaysBody: "Tan Son Nhat (SGN), Noi Bai (HAN) y Da Nang (DAD) sirven orígenes y conexiones distintos. La opción depende de recogida, aceptación, ruta, carga y fecha solicitada.",
    processTitle: "Un proceso práctico",
    process: [
      { title: "Revisar aceptación", body: "Comprueba mercancía, dimensiones, peso, embalaje, documentos y restricciones." },
      { title: "Comparar opciones", body: "Revisa ruta, horario, peso cobrable, cargos y entrega." },
      { title: "Confirmar cut-offs", body: "Coordina disponibilidad, reserva, documentos, terminal y vuelo." },
      { title: "Coordinar hitos", body: "Sigue entrega, salida, llegada y distribución acordadas." },
    ],
    detailsTitle: "Datos para cotizar carga aérea",
    detailsBody: "Las dimensiones y el peso exactos son esenciales porque se utiliza el peso cobrable.",
    details: ["Recogida y aeropuerto o dirección final", "Mercancía y código HS", "Bultos y dimensiones exactas", "Peso bruto", "Fecha disponible y requerida", "Incoterm y alcance", "Baterías, peligrosas, temperatura o manejo especial"],
    compareTitle: "¿Aéreo o marítimo?",
    compareBody: "Compara costo total, fecha, valor, riesgo y tamaño. El mar puede servir carga grande y menos urgente; el aéreo cuando el tiempo tiene mayor valor.",
    generalService: "Ver el servicio completo de forwarding",
    faqTitle: "Preguntas sobre carga aérea",
    faqs: [
      { question: "¿Cómo se calcula el peso cobrable?", answer: "Se compara el peso bruto con el volumétrico y normalmente se cobra el mayor. Confirma la regla de la opción actual." },
      { question: "¿Puede incluir recogida y entrega?", answer: "Sí, con direcciones, datos, Incoterm y responsabilidades de importación claras." },
      { question: "¿Se aceptan baterías o mercancías peligrosas?", answer: "Solo algunos casos con clasificación, embalaje, documentos y aprobación adecuados." },
      { question: "¿Las tarifas son fijas?", answer: "No. Capacidad, ruta, combustible y demanda cambian; revisa validez y cargos incluidos." },
    ],
    finalTitle: "¿Tienes carga urgente lista en Vietnam?",
    finalBody: "Envía dimensiones, peso, ruta y fecha para comparar una opción aérea actual.",
  },
  id: {
    seoTitle: "Air Freight Vietnam | Kargo udara internasional",
    eyebrow: "Kargo udara internasional dari Vietnam",
    title: "Air freight dari Vietnam berdasarkan detail kargo",
    description: "Bandingkan rute, bandara, cakupan biaya, dan pengiriman untuk kargo internasional mendesak dari Vietnam.",
    quote: "Minta penawaran udara",
    guide: "Lihat proses",
    home: "Beranda",
    breadcrumb: "Air Freight Vietnam",
    fitTitle: "Kapan air freight dapat menjadi pilihan",
    fitIntro: "Biasanya dipertimbangkan saat waktu, nilai kargo, atau dampak rantai pasok lebih penting daripada biaya terendah.",
    useCases: [
      { title: "Kargo mendesak", body: "Suku cadang, sampel, dan pengisian stok dengan target pengiriman." },
      { title: "Barang bernilai lebih tinggi", body: "Kargo yang dapat memperoleh manfaat dari transit dan penanganan lebih singkat." },
      { title: "Volume kecil dan mendesak", body: "Kiriman yang tidak memerlukan kontainer tetapi tidak dapat menunggu jadwal laut." },
      { title: "Bandara atau door delivery", body: "Airport-to-airport atau pickup dan delivery dengan tanggung jawab jelas." },
    ],
    gatewaysTitle: "Perencanaan bandara Vietnam",
    gatewaysBody: "Tan Son Nhat (SGN), Noi Bai (HAN), dan Da Nang (DAD) melayani asal dan koneksi berbeda. Pilihan bergantung pada pickup, penerimaan maskapai, rute, kargo, dan tanggal yang diminta.",
    processTitle: "Proses praktis air freight",
    process: [
      { title: "Periksa penerimaan", body: "Tinjau komoditas, dimensi, berat, kemasan, dokumen, dan pembatasan." },
      { title: "Bandingkan opsi", body: "Bandingkan rute, jadwal, chargeable weight, biaya, dan delivery." },
      { title: "Konfirmasi cut-off", body: "Selaraskan kesiapan, booking, dokumen, terminal, dan penerbangan." },
      { title: "Koordinasikan tahapan", body: "Pantau serah terima, keberangkatan, kedatangan, dan delivery." },
    ],
    detailsTitle: "Detail untuk penawaran air freight",
    detailsBody: "Dimensi dan berat yang tepat penting karena kargo udara memakai chargeable weight.",
    details: ["Pickup dan bandara atau alamat tujuan", "Komoditas dan kode HS", "Jumlah koli dan dimensi", "Berat kotor", "Tanggal siap dan target", "Incoterm dan cakupan", "Baterai, barang berbahaya, suhu, atau penanganan khusus"],
    compareTitle: "Udara atau laut?",
    compareBody: "Bandingkan total biaya, tanggal, nilai, risiko, dan ukuran. Laut dapat cocok untuk kargo besar dan tidak mendesak; udara saat waktu lebih bernilai.",
    generalService: "Lihat dukungan freight forwarding lengkap",
    faqTitle: "Pertanyaan air freight",
    faqs: [
      { question: "Bagaimana chargeable weight dihitung?", answer: "Berat kotor dibandingkan dengan volumetrik dan biasanya yang lebih tinggi digunakan. Konfirmasi aturan opsi saat ini." },
      { question: "Bisakah termasuk pickup dan delivery?", answer: "Ya, dengan alamat, detail, Incoterm, dan tanggung jawab impor yang jelas." },
      { question: "Apakah baterai atau barang berbahaya diterima?", answer: "Hanya kasus tertentu dengan klasifikasi, kemasan, dokumen, dan persetujuan yang sesuai." },
      { question: "Apakah tarif tetap?", answer: "Tidak. Kapasitas, rute, bahan bakar, dan permintaan berubah; periksa validitas dan biaya." },
    ],
    finalTitle: "Ada kargo mendesak siap di Vietnam?",
    finalBody: "Kirim dimensi, berat, rute, dan tanggal siap untuk membandingkan opsi udara saat ini.",
  },
};

const BASE_URL = "https://www.bookingbyjohnly.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale] || COPY.en;
  const path = `/${locale}/services/air-freight-vietnam`;
  return {
    title: copy.seoTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(routing.locales.map((language) => [language, `/${language}/services/air-freight-vietnam`])),
        "x-default": "/en/services/air-freight-vietnam",
      },
    },
    openGraph: { title: copy.seoTitle, description: copy.description, type: "website", url: path },
    twitter: { card: "summary_large_image", title: copy.seoTitle, description: copy.description },
  };
}

export default async function AirFreightVietnamPage({ params }: Props) {
  const { locale } = await params;
  const copy = COPY[locale] || COPY.en;
  const pageUrl = `${BASE_URL}/${locale}/services/air-freight-vietnam`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.title,
    description: copy.description,
    url: pageUrl,
    serviceType: "International air freight forwarding",
    areaServed: { "@type": "Country", name: "Vietnam" },
    provider: { "@id": `${BASE_URL}/#organization` },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: copy.home, item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: pageUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <JsonLd data={[serviceSchema, faqSchema, breadcrumbSchema]} />
      <Nav />
      <section className="bg-[#0B1F3A] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
            <Link href="/" className="hover:text-white">{copy.home}</Link><span className="mx-2">/</span><span>{copy.breadcrumb}</span>
          </nav>
          <p className="mt-10 text-sm font-black uppercase tracking-widest text-orange-300">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{copy.description}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/?mode=Air%20Freight&source=air-freight-vietnam-hero#request" className="rounded-md bg-accent-orange px-6 py-3 font-black text-white">{copy.quote}</Link>
            <a href="#process" className="rounded-md border border-white/30 px-6 py-3 font-black">{copy.guide}</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.fitTitle}</h2>
        <p className="mt-4 max-w-4xl leading-7 text-text-secondary">{copy.fitIntro}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {copy.useCases.map((item) => (
            <article key={item.title} className="rounded-lg border border-border-subtle bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black text-[#0B1F3A]">{item.title}</h3>
              <p className="mt-3 leading-7 text-text-secondary">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.gatewaysTitle}</h2>
          <p className="mt-4 max-w-4xl leading-7 text-text-secondary">{copy.gatewaysBody}</p>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.processTitle}</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {copy.process.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-border-subtle bg-white p-6 shadow-sm">
              <span className="text-sm font-black text-accent-orange">0{index + 1}</span>
              <h3 className="mt-2 text-lg font-black text-[#0B1F3A]">{step.title}</h3>
              <p className="mt-3 leading-7 text-text-secondary">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.detailsTitle}</h2>
            <p className="mt-4 leading-7 text-text-secondary">{copy.detailsBody}</p>
            <Link href="/?mode=Air%20Freight&source=air-freight-vietnam-details#request" className="mt-6 inline-flex rounded-md bg-accent-orange px-6 py-3 font-black text-white">{copy.quote}</Link>
          </div>
          <ul className="space-y-3">
            {copy.details.map((detail) => <li key={detail} className="rounded-md bg-bg-primary p-4 shadow-sm">{detail}</li>)}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="rounded-xl border border-border-subtle bg-white p-7 shadow-sm">
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.compareTitle}</h2>
          <p className="mt-4 max-w-4xl leading-7 text-text-secondary">{copy.compareBody}</p>
          <Link href="/services/freight-forwarder-vietnam" className="mt-5 inline-flex font-black text-ocean-blue underline underline-offset-4">{copy.generalService}</Link>
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
        <Link href="/?mode=Air%20Freight&source=air-freight-vietnam-final#request" className="mt-8 inline-flex rounded-md bg-accent-orange px-6 py-3 font-black text-white">{copy.quote}</Link>
      </section>
      <Footer />
    </main>
  );
}
