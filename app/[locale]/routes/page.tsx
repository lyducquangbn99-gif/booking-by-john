import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { PORT_ROUTES } from "@/lib/port-routes";

type Props = { params: Promise<{ locale: string }> };

const COPY: Record<string, { title: string; description: string; eyebrow: string; heading: string; intro: string; guide: string; cta: string }> = {
  en: { title: "Ocean freight routes from Ho Chi Minh City", description: "Browse port-specific FCL and LCL route guides from Ho Chi Minh City and request a current sailing or cargo-specific quote.", eyebrow: "Port route directory", heading: "Ocean freight routes from Ho Chi Minh City", intro: "Choose a destination port to review the quote scope and information needed for a current sailing. Rates and routing are confirmed against the actual cargo-ready date.", guide: "View route guide", cta: "Request a current quote" },
  vi: { title: "Các tuyến vận tải biển từ TP.HCM", description: "Xem hướng dẫn tuyến FCL/LCL theo từng cảng từ TP.HCM và yêu cầu lịch tàu hoặc báo giá theo lô hàng thực tế.", eyebrow: "Danh mục tuyến cảng", heading: "Các tuyến vận tải biển từ TP.HCM", intro: "Chọn cảng đến để xem phạm vi báo giá và thông tin cần cung cấp. Giá và hành trình được kiểm tra theo đúng ngày hàng sẵn sàng.", guide: "Xem hướng dẫn tuyến", cta: "Yêu cầu báo giá hiện hành" },
  it: { title: "Rotte marittime da Ho Chi Minh City", description: "Consulta le guide FCL e LCL per porto da Ho Chi Minh City e richiedi una partenza o un preventivo attuale.", eyebrow: "Elenco rotte portuali", heading: "Rotte marittime da Ho Chi Minh City", intro: "Scegli il porto di destinazione per verificare dati e ambito del preventivo. Tariffe e routing dipendono dalla data merce pronta.", guide: "Consulta la rotta", cta: "Richiedi preventivo attuale" },
  es: { title: "Rutas marítimas desde Ho Chi Minh City", description: "Consulte guías FCL y LCL por puerto desde Ho Chi Minh City y solicite una salida o cotización actual.", eyebrow: "Directorio de rutas", heading: "Rutas marítimas desde Ho Chi Minh City", intro: "Elija el puerto de destino para revisar los datos y alcance de cotización. Tarifas y ruta se confirman para la fecha de carga.", guide: "Ver guía de ruta", cta: "Solicitar cotización actual" },
  id: { title: "Rute ocean freight dari Ho Chi Minh City", description: "Lihat panduan FCL dan LCL per pelabuhan dari Ho Chi Minh City dan minta sailing atau penawaran terkini.", eyebrow: "Direktori rute pelabuhan", heading: "Rute ocean freight dari Ho Chi Minh City", intro: "Pilih pelabuhan tujuan untuk melihat data dan cakupan penawaran. Tarif dan routing dikonfirmasi sesuai cargo-ready date.", guide: "Lihat panduan rute", cta: "Minta penawaran terkini" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale] || COPY.en;
  const path = `/${locale}/routes`;
  return {
    title: `${copy.title} | Booking by John Ly`,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(routing.locales.map(language => [language, `/${language}/routes`])),
        "x-default": "/en/routes",
      },
    },
  };
}

export default async function RoutesPage({ params }: Props) {
  const { locale } = await params;
  const copy = COPY[locale] || COPY.en;
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <Nav />
      <section className="bg-[#0B1F3A] px-5 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase tracking-widest text-orange-300">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black sm:text-6xl">{copy.heading}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{copy.intro}</p>
          <a href="#request" className="mt-8 inline-flex rounded-md bg-accent-orange px-6 py-3 font-black">{copy.cta}</a>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {PORT_ROUTES.map(route => (
          <article key={route.slug} className="rounded-lg border border-border-subtle bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-ocean-blue">{route.country}</p>
            <h2 className="mt-3 text-xl font-black text-[#0B1F3A]">Ho Chi Minh City → {route.port}</h2>
            <Link href={`/routes/${route.slug}`} className="mt-5 inline-flex font-black text-ocean-blue underline underline-offset-4">{copy.guide}</Link>
          </article>
        ))}
      </section>
      <section id="request" className="bg-[#0B1F3A] px-5 py-14 text-center text-white">
        <Link href="/#request" className="inline-flex rounded-md bg-accent-orange px-6 py-3 font-black">{copy.cta}</Link>
      </section>
      <Footer />
    </main>
  );
}
