// components/Hero.tsx
import { getTranslations } from 'next-intl/server';

export default async function Hero() {
  const t = await getTranslations('hero');
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-bg-primary">

      {/* Radial glow — top right */}
      <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,232,123,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-display text-xs text-accent-green tracking-widest uppercase mb-6">
          {t('tagline')}
        </p>

        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight text-text-primary max-w-3xl mb-7">
          {t('heading')}{" "}
          <span className="text-accent-green">{t('headingAccent')}</span>
        </h1>

        <p className="text-lg text-text-secondary max-w-xl leading-relaxed mb-12">
          {t('subheading')}
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#request"
            className="font-display font-bold text-sm text-bg-primary bg-accent-green px-8 py-4 rounded-md hover:-translate-y-px hover:shadow-[0_0_24px_rgba(0,232,123,0.35)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-green min-h-11 inline-flex items-center"
          >
            {t('ctaPrimary')}
          </a>
          <a
            href="#trust"
            className="font-display text-sm text-text-secondary border border-border-subtle px-8 py-4 rounded-md hover:text-text-primary hover:border-white/20 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green min-h-11 inline-flex items-center"
          >
            {t('ctaSecondary')}
          </a>
        </div>
      </div>
    </section>
  );
}
