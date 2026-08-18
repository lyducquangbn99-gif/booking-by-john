import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import RequestStepper from "@/components/RequestStepper";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPortRoute, PORT_ROUTES, type PortRoute } from "@/lib/port-routes";

type Props = { params: Promise<{ locale: string; lane: string }> };

const COPY: Record<string, {
  eyebrow: string; title: (route: PortRoute) => string; description: (route: PortRoute) => string;
  sailing: string; quote: string; planning: string; planningBody: string; compare: string;
  compareItems: string[]; details: string; detailItems: string[]; cost: string; costBody: string;
  current: string; currentBody: string; faq: string; faqs: (route: PortRoute) => Array<{ question: string; answer: string }>;
}> = {
  en: {
    eyebrow: "Port-specific ocean freight from Vietnam", title: r => `Ocean freight from Ho Chi Minh City to ${r.port}`,
    description: r => `Commercial planning page for FCL and LCL shipments from Ho Chi Minh City to ${r.port}, ${r.country}. Compare the current sailing, routing and quote scope for your actual ready date.`,
    sailing: "Check current sailing", quote: "Request current quote", planning: "Plan the shipment around the real cargo",
    planningBody: "Carrier space, equipment, cut-offs, routing and local charges change over time. We check the shipment details and ready date before presenting an option; this page is not a fixed tariff or transit-time promise.",
    compare: "What to compare", compareItems: ["FCL versus LCL total cost and handling", "Current routing, transshipment point and cut-offs", "Origin, ocean and destination charge scope", "Free time and inland delivery requirements"],
    details: "Details needed for a useful quote", detailItems: ["Origin or pickup address", "Destination port or final delivery postcode", "FCL/LCL and container type", "Commodity and HS code if available", "Volume, packages, dimensions and gross weight", "Cargo-ready date and Incoterm", "Name, company, email or phone"],
    cost: "What changes the current price", costBody: "Capacity, equipment, season, fuel, routing, cargo characteristics and local charges can all change the total. Duties, taxes, inspections and special handling are shown separately when applicable.",
    current: "Need a current sailing or current quote?", currentBody: "Send the required shipment details below. John will check options tied to this route and cargo-ready date.",
    faq: "Route questions", faqs: r => [{ question: `Is there a fixed rate to ${r.port}?`, answer: "No. A useful freight quote is date- and cargo-specific, with a stated validity and charge scope." }, { question: "Can this be quoted door to door?", answer: "Yes, when pickup and delivery addresses, cargo details and Incoterm are provided." }, { question: "Can I request both FCL and LCL?", answer: "Yes. Share the exact volume and packing so the two options can be compared on total cost and handling." }],
  },
  vi: {
    eyebrow: "Vận tải biển theo từng cảng từ Việt Nam", title: r => `Cước biển từ TP.HCM đi ${r.port}`,
    description: r => `Trang thương mại cho lô FCL/LCL từ TP.HCM đi ${r.port}, ${r.country}. Kiểm tra lịch tàu, hành trình và phạm vi báo giá hiện hành theo đúng ngày hàng sẵn sàng.`,
    sailing: "Kiểm tra lịch tàu hiện hành", quote: "Yêu cầu báo giá hiện hành", planning: "Lập phương án theo lô hàng thực tế",
    planningBody: "Chỗ, thiết bị, cut-off, hành trình và phí địa phương thay đổi theo thời điểm. Phương án chỉ được đưa ra sau khi kiểm tra thông tin và ngày hàng; trang này không phải biểu giá hay cam kết transit time cố định.",
    compare: "Nội dung cần so sánh", compareItems: ["Tổng chi phí và số lần xử lý của FCL/LCL", "Hành trình, điểm chuyển tải và cut-off hiện hành", "Phạm vi phí đầu xuất, cước biển và đầu nhập", "Free time và nhu cầu giao hàng nội địa"],
    details: "Thông tin cần để báo giá hữu ích", detailItems: ["Điểm lấy hàng/cảng đi", "Cảng đến hoặc mã bưu chính giao cuối", "FCL/LCL và loại container", "Tên hàng và mã HS nếu có", "Thể tích, số kiện, kích thước và trọng lượng", "Ngày hàng sẵn sàng và Incoterm", "Tên, công ty, email hoặc điện thoại"],
    cost: "Yếu tố làm thay đổi giá hiện hành", costBody: "Sức chứa, thiết bị, mùa vụ, nhiên liệu, hành trình, tính chất hàng và phí địa phương đều ảnh hưởng tổng chi phí. Thuế, kiểm hóa và xử lý đặc biệt được tách riêng khi áp dụng.",
    current: "Cần lịch tàu hoặc báo giá hiện hành?", currentBody: "Gửi đầy đủ thông tin bên dưới. John sẽ kiểm tra phương án gắn với đúng tuyến và ngày hàng sẵn sàng.",
    faq: "Câu hỏi về tuyến", faqs: r => [{ question: `Có giá cố định đi ${r.port} không?`, answer: "Không. Báo giá hữu ích phải gắn với ngày, hàng, thời hạn hiệu lực và phạm vi phí." }, { question: "Có thể báo door-to-door không?", answer: "Có, khi cung cấp địa chỉ lấy/giao, thông tin hàng và Incoterm." }, { question: "Có thể so sánh cả FCL và LCL không?", answer: "Có. Cần thể tích và đóng gói thực tế để so sánh tổng phí và số lần xử lý." }],
  },
  it: {
    eyebrow: "Trasporto marittimo dal Vietnam per porto", title: r => `Trasporto marittimo da Ho Chi Minh City a ${r.port}`,
    description: r => `Pagina commerciale per spedizioni FCL e LCL da Ho Chi Minh City a ${r.port}, ${r.country}. Verifica partenza, routing e costi attuali per la data merce pronta.`,
    sailing: "Verifica partenza attuale", quote: "Richiedi preventivo attuale", planning: "Pianifica sulla merce reale", planningBody: "Spazio, equipment, cut-off, routing e costi locali cambiano. Ogni opzione viene verificata sulla spedizione e sulla data pronta; non è una tariffa o promessa di transito fissa.",
    compare: "Cosa confrontare", compareItems: ["Costo totale e handling FCL/LCL", "Routing, trasbordo e cut-off attuali", "Costi origine, nolo e destinazione", "Free time e consegna interna"], details: "Dati necessari", detailItems: ["Origine o indirizzo ritiro", "Porto o CAP finale", "FCL/LCL e tipo container", "Merce e codice HS", "Volume, colli, misure e peso", "Data merce pronta e Incoterm", "Nome, azienda, email o telefono"], cost: "Cosa cambia il prezzo", costBody: "Capacità, equipment, stagione, carburante, routing, merce e costi locali influenzano il totale. Dazi, imposte e controlli sono separati.", current: "Serve una partenza o un preventivo attuale?", currentBody: "Invia i dati sotto. John verificherà le opzioni per la rotta e la data pronta.", faq: "Domande sulla rotta", faqs: r => [{ question: `Esiste una tariffa fissa per ${r.port}?`, answer: "No. Il preventivo dipende da data, merce, validità e costi inclusi." }, { question: "È possibile door-to-door?", answer: "Sì, con indirizzi, merce e Incoterm." }, { question: "Posso confrontare FCL e LCL?", answer: "Sì, con volume e imballaggio esatti." }],
  },
  es: {
    eyebrow: "Transporte marítimo por puerto desde Vietnam", title: r => `Transporte marítimo de Ho Chi Minh City a ${r.port}`,
    description: r => `Página comercial para envíos FCL y LCL de Ho Chi Minh City a ${r.port}, ${r.country}. Compare salida, ruta y alcance de cotización actuales para la fecha de carga.`,
    sailing: "Consultar salida actual", quote: "Solicitar cotización actual", planning: "Planifique con la carga real", planningBody: "Espacio, equipo, cut-offs, ruta y cargos locales cambian. Cada opción se revisa según la carga y fecha; no es una tarifa ni promesa fija.", compare: "Qué comparar", compareItems: ["Coste total y manipulación FCL/LCL", "Ruta, transbordo y cut-offs actuales", "Cargos de origen, flete y destino", "Free time y entrega interior"], details: "Datos necesarios", detailItems: ["Origen o dirección de recogida", "Puerto o código postal final", "FCL/LCL y contenedor", "Mercancía y código HS", "Volumen, bultos, medidas y peso", "Fecha lista e Incoterm", "Nombre, empresa, email o teléfono"], cost: "Qué cambia el precio", costBody: "Capacidad, equipo, temporada, combustible, ruta, carga y cargos locales afectan el total. Aranceles, impuestos e inspecciones se separan.", current: "¿Necesita salida o cotización actual?", currentBody: "Envíe los datos abajo. John revisará opciones para la ruta y fecha de carga.", faq: "Preguntas de la ruta", faqs: r => [{ question: `¿Hay tarifa fija a ${r.port}?`, answer: "No. La cotización depende de fecha, carga, validez y alcance." }, { question: "¿Se puede cotizar puerta a puerta?", answer: "Sí, con direcciones, carga e Incoterm." }, { question: "¿Puedo comparar FCL y LCL?", answer: "Sí, con volumen y embalaje exactos." }],
  },
  id: {
    eyebrow: "Ocean freight per pelabuhan dari Vietnam", title: r => `Ocean freight dari Ho Chi Minh City ke ${r.port}`,
    description: r => `Halaman komersial FCL dan LCL dari Ho Chi Minh City ke ${r.port}, ${r.country}. Periksa sailing, routing, dan cakupan penawaran terkini sesuai cargo-ready date.`, sailing: "Periksa sailing terkini", quote: "Minta penawaran terkini", planning: "Rencanakan berdasarkan kargo aktual", planningBody: "Space, equipment, cut-off, routing, dan biaya lokal berubah. Opsi diperiksa sesuai shipment dan tanggal siap; bukan tarif atau janji transit tetap.", compare: "Yang perlu dibandingkan", compareItems: ["Total biaya dan handling FCL/LCL", "Routing, transshipment, dan cut-off terkini", "Biaya origin, freight, dan destination", "Free time dan inland delivery"], details: "Data yang diperlukan", detailItems: ["Origin atau alamat pickup", "Port atau kode pos akhir", "FCL/LCL dan tipe container", "Komoditas dan HS code", "Volume, koli, dimensi, dan berat", "Cargo-ready date dan Incoterm", "Nama, perusahaan, email atau telepon"], cost: "Faktor perubahan harga", costBody: "Kapasitas, equipment, musim, fuel, routing, jenis kargo, dan biaya lokal memengaruhi total. Bea, pajak, dan inspeksi dipisahkan.", current: "Perlu sailing atau penawaran terkini?", currentBody: "Kirim data di bawah. John akan memeriksa opsi sesuai rute dan tanggal siap.", faq: "Pertanyaan rute", faqs: r => [{ question: `Apakah ada tarif tetap ke ${r.port}?`, answer: "Tidak. Penawaran bergantung pada tanggal, kargo, validitas, dan cakupan biaya." }, { question: "Bisa door-to-door?", answer: "Bisa, dengan alamat, data kargo, dan Incoterm." }, { question: "Bisa bandingkan FCL dan LCL?", answer: "Bisa, dengan volume dan packing aktual." }],
  },
};

export function generateStaticParams() { return routing.locales.flatMap(locale => PORT_ROUTES.map(route => ({ locale, lane: route.slug }))); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, lane } = await params; const route = getPortRoute(lane); if (!route) return {};
  const copy = COPY[locale] || COPY.en; const path = `/${locale}/routes/${route.slug}`;
  return { title: `${copy.title(route)} | Booking by John Ly`, description: copy.description(route), alternates: { canonical: path, languages: { ...Object.fromEntries(routing.locales.map(l => [l, `/${l}/routes/${route.slug}`])), "x-default": `/en/routes/${route.slug}` } }, openGraph: { title: copy.title(route), description: copy.description(route), url: path, type: "website" } };
}

export default async function PortRoutePage({ params }: Props) {
  const { locale, lane } = await params; const route = getPortRoute(lane); if (!route) notFound(); const copy = COPY[locale] || COPY.en;
  const url = `https://www.bookingbyjohnly.com/${locale}/routes/${route.slug}`; const faqs = copy.faqs(route);
  return <main className="min-h-screen bg-bg-primary text-text-primary"><JsonLd data={[{ "@context": "https://schema.org", "@type": "Service", name: copy.title(route), description: copy.description(route), url, serviceType: "Ocean freight forwarding support", areaServed: ["Vietnam", route.country], provider: { "@id": "https://www.bookingbyjohnly.com/#organization" } }, { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }]} /><Nav />
    <section className="bg-[#0B1F3A] px-5 py-20 text-white"><div className="mx-auto max-w-6xl"><nav className="text-sm text-slate-300"><Link href="/">Home</Link> / {route.port}</nav><p className="mt-10 text-sm font-black uppercase tracking-widest text-orange-300">{copy.eyebrow}</p><h1 className="mt-4 max-w-4xl text-4xl font-black sm:text-6xl">{copy.title(route)}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{copy.description(route)}</p><div className="mt-9 flex flex-wrap gap-4"><a href="#request" className="rounded-md bg-accent-orange px-6 py-3 font-black">{copy.sailing}</a><a href="#request" className="rounded-md border border-white/30 px-6 py-3 font-black">{copy.quote}</a></div></div></section>
    <section className="mx-auto max-w-6xl px-5 py-16"><h2 className="text-3xl font-black text-[#0B1F3A]">{copy.planning}</h2><p className="mt-5 max-w-4xl text-lg leading-8 text-text-secondary">{copy.planningBody}</p><div className="mt-10 grid gap-6 md:grid-cols-2"><article className="rounded-lg bg-white p-7 shadow-sm"><h2 className="text-2xl font-black text-[#0B1F3A]">{copy.compare}</h2><ul className="mt-5 space-y-3">{copy.compareItems.map(x => <li key={x}>• {x}</li>)}</ul></article><article className="rounded-lg bg-white p-7 shadow-sm"><h2 className="text-2xl font-black text-[#0B1F3A]">{copy.details}</h2><ul className="mt-5 space-y-3">{copy.detailItems.map(x => <li key={x}>• {x}</li>)}</ul></article></div></section>
    <section className="bg-white px-5 py-16"><div className="mx-auto max-w-6xl"><h2 className="text-3xl font-black text-[#0B1F3A]">{copy.cost}</h2><p className="mt-5 max-w-4xl leading-8 text-text-secondary">{copy.costBody}</p><h2 className="mt-14 text-3xl font-black text-[#0B1F3A]">{copy.faq}</h2><div className="mt-6 grid gap-4">{faqs.map(f => <article key={f.question} className="rounded-lg border border-border-subtle p-6"><h3 className="font-black text-[#0B1F3A]">{f.question}</h3><p className="mt-3 text-text-secondary">{f.answer}</p></article>)}</div></div></section>
    <section className="bg-[#0B1F3A] px-5 py-14 text-center text-white"><h2 className="text-3xl font-black">{copy.current}</h2><p className="mx-auto mt-4 max-w-2xl text-slate-200">{copy.currentBody}</p></section><RequestStepper initialOrigin={route.origin} initialDestination={route.destination} initialMode="Ocean Freight" sourcePage={`port-route-${route.slug}`} /><Footer /></main>;
}
