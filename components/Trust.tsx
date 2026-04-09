// components/Trust.tsx
import { getTranslations } from 'next-intl/server';

export default async function Trust() {
  const t = await getTranslations('trust');

  const trustPoints = [
    { title: t('carrierVetting.title'), detail: t('carrierVetting.detail') },
    { title: t('liveTracking.title'),   detail: t('liveTracking.detail') },
    { title: t('quoteSla.title'),       detail: t('quoteSla.detail') },
    { title: t('claims.title'),         detail: t('claims.detail') },
    { title: t('oneContact.title'),     detail: t('oneContact.detail') },
    { title: t('specialized.title'),    detail: t('specialized.detail') },
  ];

  return (
    <section id="trust" className="bg-bg-secondary py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-display text-xs text-accent-green tracking-widest uppercase mb-4">
          {t('tagline')}
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-14">
          {t('heading')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trustPoints.map((point, i) => (
            <div
              key={i}
              className="bg-bg-card border border-border-subtle border-t-transparent hover:border-t-accent-green rounded-xl p-8 hover:-translate-y-1 transition-all duration-200 cursor-default"
            >
              <h3 className="font-display text-sm font-bold text-text-primary mb-3">
                {point.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {point.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
