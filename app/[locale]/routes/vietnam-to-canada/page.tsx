import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RequestStepper from '@/components/RequestStepper';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { canadaCopy } from '@/lib/canada-copy';

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return routing.locales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = canadaCopy[locale] || canadaCopy.en;
  const path = `/${locale}/routes/vietnam-to-canada`;
  return {
    title: `${c.title} | Booking by John Ly`, description: c.intro,
    robots: { index: true, follow: true },
    alternates: { canonical: path, languages: { ...Object.fromEntries(routing.locales.map(l => [l, `/${l}/routes/vietnam-to-canada`])), 'x-default': '/en/routes/vietnam-to-canada' } },
    openGraph: { title: c.title, description: c.intro, url: path, type: 'website' },
  };
}
export default async function CanadaPage({ params }: Props) {
  const { locale } = await params;
  const c = canadaCopy[locale] || canadaCopy.en;
  return <main className="min-h-screen bg-bg-primary text-text-primary">
    <Nav />
    <section className="bg-[#0B1F3A] px-5 py-16 text-white lg:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-black tracking-widest text-orange-300">VIETNAM → CANADA</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">{c.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{c.intro}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#request" data-quote-cta="canada-hero" className="rounded-md bg-accent-orange px-6 py-4 font-bold">{c.quote}</a>
          <a href="https://wa.me/84352193969?text=Hello%20John%2C%20I%20would%20like%20a%20Vietnam%20to%20Canada%20freight%20quote." data-contact-placement="canada-hero" target="_blank" rel="noopener noreferrer" className="rounded-md border border-white/50 px-6 py-4 font-bold">{c.whatsapp}</a>
        </div>
      </div>
    </section>
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
      <article><h2 className="text-2xl font-bold">{c.options}</h2><p className="mt-4 leading-8 text-text-secondary">{c.body}</p></article>
      <article><h2 className="text-2xl font-bold">{c.scope}</h2><p className="mt-4 leading-8 text-text-secondary">{c.scopeBody}</p></article>
      <article><h2 className="text-2xl font-bold">{c.details}</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-text-secondary">{c.items.map(item => <li key={item}>{item}</li>)}</ul></article>
      <article><h2 className="text-2xl font-bold">{c.costs}</h2><p className="mt-4 leading-8 text-text-secondary">{c.costsBody}</p><Link href="/services/freight-forwarder-vietnam" className="mt-6 inline-block font-bold text-ocean-blue underline">{c.options} →</Link></article>
    </section>
    <RequestStepper initialOrigin="Vietnam" initialDestination="Canada" sourcePage="vietnam-to-canada" />
    <Footer />
  </main>;
}
