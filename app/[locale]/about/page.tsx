import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };
type Copy = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  identityTitle: string;
  identityBody: string;
  promiseTitle: string;
  promiseBody: string;
  principles: Array<{ title: string; body: string }>;
  locationTitle: string;
  locationBody: string;
  servicesTitle: string;
  services: string[];
  ctaTitle: string;
  ctaBody: string;
  cta: string;
};

const COPY: Record<string, Copy> = {
  en: {
    seoTitle: "About John Ly | Vietnam Freight Contact",
    seoDescription: "Meet John Ly, a direct logistics contact in Hanoi supporting international freight planning from Vietnam with Ocean Trans Vietnam.",
    eyebrow: "A direct logistics contact in Vietnam",
    title: "Booking by John Ly",
    intro: "A personal point of contact for shippers who want clear questions, practical options and a straightforward path from cargo details to booking.",
    identityTitle: "The person and the operation",
    identityBody: "Booking by John Ly is the customer-facing service led by John Ly and supported operationally by Ocean Trans Vietnam. Customers work directly with John while shipment options are coordinated around the actual route, cargo and timing.",
    promiseTitle: "Wherever you go, I will be there.",
    promiseBody: "The slogan reflects the role John aims to play: stay reachable, keep the next action clear and help customers coordinate each agreed shipment milestone.",
    principles: [
      { title: "One clear contact", body: "Share the shipment once and keep communication with a named person." },
      { title: "Cargo-specific planning", body: "Options are based on route, commodity, volume, Incoterm and ready date." },
      { title: "No invented guarantees", body: "Schedules, capacity and rates are confirmed against the current shipment instead of unsupported promises." },
    ],
    locationTitle: "Based in Hanoi, serving international trade",
    locationBody: "John works from Hanoi, Vietnam, supporting export and import enquiries across ocean freight, air freight and related logistics coordination.",
    servicesTitle: "What customers can ask about",
    services: ["FCL and LCL ocean freight", "International air freight", "Export coordination and documentation", "Inland pickup and destination delivery", "Customs and door-to-door planning"],
    ctaTitle: "Have a shipment to plan?",
    ctaBody: "Send the route, commodity, packages, weight, volume and cargo-ready date. John will review the request and identify the information needed for a current option.",
    cta: "Send cargo details",
  },
  vi: {
    seoTitle: "Về John Ly | Đầu mối logistics tại Việt Nam",
    seoDescription: "Gặp John Ly, đầu mối logistics trực tiếp tại Hà Nội, hỗ trợ lập phương án vận chuyển quốc tế từ Việt Nam cùng Ocean Trans Vietnam.",
    eyebrow: "Đầu mối logistics trực tiếp tại Việt Nam",
    title: "Booking by John Ly",
    intro: "Một đầu mối cá nhân dành cho khách hàng cần câu hỏi rõ ràng, phương án thực tế và quy trình thuận tiện từ thông tin lô hàng đến booking.",
    identityTitle: "Con người và đơn vị vận hành",
    identityBody: "Booking by John Ly là thương hiệu dịch vụ trực tiếp do John Ly phụ trách, với sự hỗ trợ vận hành từ Ocean Trans Vietnam. Khách hàng làm việc trực tiếp với John, còn phương án được xây dựng theo đúng tuyến, hàng hóa và thời gian thực tế.",
    promiseTitle: "Wherever you go, I will be there.",
    promiseBody: "Slogan thể hiện vai trò John hướng tới: luôn giữ liên lạc, làm rõ bước tiếp theo và hỗ trợ khách hàng điều phối từng mốc đã thống nhất của lô hàng.",
    principles: [
      { title: "Một đầu mối rõ ràng", body: "Chỉ cần gửi thông tin lô hàng một lần và trao đổi với một người phụ trách cụ thể." },
      { title: "Phương án theo từng lô hàng", body: "Tuyến, mặt hàng, sản lượng, Incoterm và ngày hàng sẵn sàng là cơ sở tư vấn." },
      { title: "Không đưa ra cam kết thiếu căn cứ", body: "Lịch trình, chỗ và giá được kiểm tra theo lô hàng hiện tại thay vì dùng lời hứa chung chung." },
    ],
    locationTitle: "Làm việc tại Hà Nội, hỗ trợ thương mại quốc tế",
    locationBody: "John làm việc tại Hà Nội, Việt Nam, hỗ trợ yêu cầu xuất nhập khẩu về vận tải biển, hàng không và các khâu điều phối logistics liên quan.",
    servicesTitle: "Khách hàng có thể trao đổi về",
    services: ["Vận tải biển FCL và LCL", "Vận tải hàng không quốc tế", "Điều phối xuất khẩu và chứng từ", "Lấy hàng nội địa và giao tại điểm đến", "Lập phương án thông quan và door-to-door"],
    ctaTitle: "Bạn có lô hàng cần lên phương án?",
    ctaBody: "Gửi tuyến, mặt hàng, số kiện, trọng lượng, thể tích và ngày hàng sẵn sàng. John sẽ xem yêu cầu và xác định thông tin cần thiết để kiểm tra phương án hiện hành.",
    cta: "Gửi thông tin lô hàng",
  },
  it: {
    seoTitle: "Chi è John Ly | Referente logistico in Vietnam",
    seoDescription: "Conosci John Ly, referente logistico diretto ad Hanoi per pianificare spedizioni internazionali dal Vietnam con Ocean Trans Vietnam.",
    eyebrow: "Un referente logistico diretto in Vietnam",
    title: "Booking by John Ly",
    intro: "Un unico contatto per chi cerca domande chiare, opzioni pratiche e un percorso semplice dai dati della merce al booking.",
    identityTitle: "La persona e l'operatività",
    identityBody: "Booking by John Ly è il servizio rivolto ai clienti guidato da John Ly e supportato operativamente da Ocean Trans Vietnam. Il cliente parla direttamente con John e le opzioni vengono coordinate sulla rotta, la merce e i tempi reali.",
    promiseTitle: "Wherever you go, I will be there.",
    promiseBody: "Lo slogan esprime il ruolo di John: restare raggiungibile, chiarire il prossimo passo e aiutare a coordinare le tappe concordate.",
    principles: [
      { title: "Un contatto chiaro", body: "Condividi la spedizione una volta e comunica con una persona identificata." },
      { title: "Pianificazione sulla merce", body: "Le opzioni dipendono da rotta, merce, volume, Incoterm e data pronta." },
      { title: "Niente garanzie inventate", body: "Programmi, capacità e tariffe vengono verificati per la spedizione corrente." },
    ],
    locationTitle: "Ad Hanoi, per il commercio internazionale",
    locationBody: "John lavora ad Hanoi, Vietnam, e supporta richieste import-export per mare, aereo e servizi logistici collegati.",
    servicesTitle: "Di cosa puoi parlare con John",
    services: ["Trasporto marittimo FCL e LCL", "Trasporto aereo internazionale", "Coordinamento export e documenti", "Ritiro interno e consegna a destino", "Pianificazione doganale e door-to-door"],
    ctaTitle: "Hai una spedizione da pianificare?",
    ctaBody: "Invia rotta, merce, colli, peso, volume e data pronta. John verificherà i dati necessari per un'opzione attuale.",
    cta: "Invia i dati della merce",
  },
  es: {
    seoTitle: "Sobre John Ly | Contacto logístico en Vietnam",
    seoDescription: "Conoce a John Ly, contacto logístico directo en Hanói para planificar envíos internacionales desde Vietnam con Ocean Trans Vietnam.",
    eyebrow: "Un contacto logístico directo en Vietnam",
    title: "Booking by John Ly",
    intro: "Un único contacto para clientes que buscan preguntas claras, opciones prácticas y un camino sencillo desde los datos de carga hasta la reserva.",
    identityTitle: "La persona y la operación",
    identityBody: "Booking by John Ly es el servicio de atención al cliente dirigido por John Ly y respaldado operativamente por Ocean Trans Vietnam. El cliente trabaja directamente con John y las opciones se coordinan según la ruta, la carga y el plazo reales.",
    promiseTitle: "Wherever you go, I will be there.",
    promiseBody: "El eslogan refleja el papel de John: estar disponible, aclarar el siguiente paso y ayudar a coordinar cada hito acordado.",
    principles: [
      { title: "Un contacto claro", body: "Comparte el envío una vez y mantén la comunicación con una persona identificada." },
      { title: "Planificación según la carga", body: "Las opciones se basan en ruta, mercancía, volumen, Incoterm y fecha disponible." },
      { title: "Sin garantías inventadas", body: "Horarios, capacidad y tarifas se confirman para el envío actual." },
    ],
    locationTitle: "En Hanói, para el comercio internacional",
    locationBody: "John trabaja en Hanói, Vietnam, apoyando consultas de importación y exportación por mar, aire y coordinación logística relacionada.",
    servicesTitle: "Qué puedes consultar",
    services: ["Transporte marítimo FCL y LCL", "Transporte aéreo internacional", "Coordinación de exportación y documentos", "Recogida interior y entrega en destino", "Planificación aduanera y puerta a puerta"],
    ctaTitle: "¿Tienes un envío que planificar?",
    ctaBody: "Envía ruta, mercancía, bultos, peso, volumen y fecha disponible. John revisará los datos necesarios para una opción actual.",
    cta: "Enviar datos de carga",
  },
  id: {
    seoTitle: "Tentang John Ly | Kontak logistik Vietnam",
    seoDescription: "Kenali John Ly, kontak logistik langsung di Hanoi untuk perencanaan pengiriman internasional dari Vietnam bersama Ocean Trans Vietnam.",
    eyebrow: "Kontak logistik langsung di Vietnam",
    title: "Booking by John Ly",
    intro: "Satu kontak untuk pelanggan yang membutuhkan pertanyaan jelas, opsi praktis, dan proses sederhana dari detail kargo hingga booking.",
    identityTitle: "Kontak dan operasional",
    identityBody: "Booking by John Ly adalah layanan pelanggan yang dipimpin John Ly dan didukung secara operasional oleh Ocean Trans Vietnam. Pelanggan berkomunikasi langsung dengan John, sementara opsi dikoordinasikan berdasarkan rute, kargo, dan waktu aktual.",
    promiseTitle: "Wherever you go, I will be there.",
    promiseBody: "Slogan ini mencerminkan peran John: tetap mudah dihubungi, memperjelas langkah berikutnya, dan membantu mengoordinasikan setiap tahapan yang disepakati.",
    principles: [
      { title: "Satu kontak jelas", body: "Bagikan detail pengiriman sekali dan berkomunikasi dengan satu orang yang bertanggung jawab." },
      { title: "Perencanaan sesuai kargo", body: "Opsi didasarkan pada rute, komoditas, volume, Incoterm, dan tanggal siap." },
      { title: "Tanpa janji yang dibuat-buat", body: "Jadwal, kapasitas, dan tarif dikonfirmasi untuk pengiriman aktual." },
    ],
    locationTitle: "Berbasis di Hanoi, melayani perdagangan internasional",
    locationBody: "John bekerja dari Hanoi, Vietnam, mendukung permintaan ekspor-impor melalui laut, udara, dan koordinasi logistik terkait.",
    servicesTitle: "Hal yang dapat didiskusikan",
    services: ["Angkutan laut FCL dan LCL", "Angkutan udara internasional", "Koordinasi ekspor dan dokumen", "Pickup domestik dan delivery tujuan", "Perencanaan bea cukai dan door-to-door"],
    ctaTitle: "Ada pengiriman yang perlu direncanakan?",
    ctaBody: "Kirim rute, komoditas, koli, berat, volume, dan tanggal siap. John akan meninjau informasi yang diperlukan untuk opsi terkini.",
    cta: "Kirim detail kargo",
  },
};

const BASE_URL = "https://www.bookingbyjohnly.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale] || COPY.en;
  const path = `/${locale}/about`;
  return {
    title: copy.seoTitle,
    description: copy.seoDescription,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(routing.locales.map((language) => [language, `/${language}/about`])),
        "x-default": "/en/about",
      },
    },
    openGraph: { title: copy.seoTitle, description: copy.seoDescription, url: path, type: "profile" },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const copy = COPY[locale] || COPY.en;
  const pageUrl = `${BASE_URL}/${locale}/about`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#john-ly`,
        name: "John Ly",
        url: pageUrl,
        jobTitle: "International freight contact",
        worksFor: { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@type": "AboutPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: copy.seoTitle,
        about: { "@id": `${BASE_URL}/#john-ly` },
        isPartOf: { "@id": `${BASE_URL}/#website` },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <JsonLd data={schema} />
      <Nav />
      <section className="bg-[#0B1F3A] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase tracking-widest text-orange-300">{copy.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{copy.intro}</p>
          <Link href="/#request" className="mt-9 inline-flex rounded-md bg-accent-orange px-6 py-3 font-black text-white">
            {copy.cta}
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
        <article className="rounded-xl border border-border-subtle bg-white p-7 shadow-sm">
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.identityTitle}</h2>
          <p className="mt-5 leading-8 text-text-secondary">{copy.identityBody}</p>
        </article>
        <article className="rounded-xl bg-orange-50 p-7">
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.promiseTitle}</h2>
          <p className="mt-5 leading-8 text-text-secondary">{copy.promiseBody}</p>
        </article>
      </section>

      <section className="bg-white px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {copy.principles.map((item) => (
            <article key={item.title} className="rounded-lg border border-border-subtle p-6">
              <h2 className="text-xl font-black text-[#0B1F3A]">{item.title}</h2>
              <p className="mt-3 leading-7 text-text-secondary">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.locationTitle}</h2>
          <p className="mt-5 leading-8 text-text-secondary">{copy.locationBody}</p>
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#0B1F3A]">{copy.servicesTitle}</h2>
          <ul className="mt-5 space-y-3">
            {copy.services.map((service) => (
              <li key={service} className="rounded-md border border-border-subtle bg-white p-4 shadow-sm">{service}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#0B1F3A] px-5 py-14 text-center text-white lg:px-8">
        <h2 className="text-3xl font-black">{copy.ctaTitle}</h2>
        <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-200">{copy.ctaBody}</p>
        <Link href="/#request" className="mt-8 inline-flex rounded-md bg-accent-orange px-6 py-3 font-black text-white">
          {copy.cta}
        </Link>
      </section>
      <Footer />
    </main>
  );
}
