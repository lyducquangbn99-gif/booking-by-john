import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { galleryCopy, galleryImages } from '@/lib/cargo-gallery';

export default async function CargoGallery() {
  const locale = await getLocale();
  const c = galleryCopy[locale as keyof typeof galleryCopy] || galleryCopy.en;
  return <section id="cargo-gallery" aria-labelledby="cargo-gallery-title" className="scroll-mt-24 bg-bg-secondary px-5 py-16 lg:px-8">
    <div className="mx-auto max-w-6xl">
      <p className="text-sm font-bold uppercase tracking-widest text-ocean-blue">{c.eyebrow}</p>
      <div className="mt-3 max-w-3xl"><h2 id="cargo-gallery-title" className="text-3xl font-bold sm:text-4xl">{c.title}</h2><p className="mt-4 leading-7 text-text-secondary">{c.intro}</p></div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((item) => <figure key={item.id} className="overflow-hidden rounded-2xl border border-border-subtle bg-bg-card">
          <a href={`/cargo-gallery/${item.id}-1200.webp`} target="_blank" rel="noopener noreferrer" aria-label={`${c.view}: ${c.captions[item.index]}`} className="block focus-visible:outline-4 focus-visible:outline-ocean-blue">
            {/* Only irreversible, metadata-free publication derivatives are served. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/cargo-gallery/${item.id}-640.webp`} srcSet={`/cargo-gallery/${item.id}-640.webp 640w, /cargo-gallery/${item.id}-1200.webp 1200w`} sizes="(min-width: 1024px) 360px, (min-width: 640px) 46vw, 92vw" width={item.width} height={item.height} loading="lazy" decoding="async" alt={c.alts[item.index]} className="aspect-[4/3] w-full bg-bg-primary object-contain" />
          </a>
          <figcaption className="p-5"><h3 className="font-bold">{c.captions[item.index]}</h3><p className="mt-2 text-sm text-text-secondary">{c.photoLabel}</p></figcaption>
        </figure>)}
      </div>
      <p className="mt-6 max-w-4xl text-sm leading-6 text-text-secondary">{c.notice}</p>
      <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-border-subtle p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-bold">{c.ctaTitle}</p><p className="mt-2 max-w-xl text-sm text-text-secondary">{c.ctaBody}</p></div><Link href="/#request" className="shrink-0 rounded-lg bg-accent-orange px-6 py-3 text-center font-bold text-white focus-visible:outline-4 focus-visible:outline-ocean-blue">{c.cta} →</Link></div>
      <p className="mt-6 text-sm text-text-secondary">BYJ Logistics — BookingbyJohn, your direct logistics contact in Vietnam. Operations supported by Ocean Trans Vietnam.</p>
    </div>
  </section>;
}
