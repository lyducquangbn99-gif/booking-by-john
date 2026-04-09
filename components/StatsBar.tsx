// components/StatsBar.tsx
import { getTranslations } from 'next-intl/server';

export default async function StatsBar() {
  const t = await getTranslations('stats');

  const stats = [
    { value: "500+",  label: t('shipmentsHandled') },
    { value: "97.2%", label: t('onTimeRate') },
    { value: "<2hr",  label: t('avgQuoteTime') },
    { value: "0.3%",  label: t('claimRate') },
  ];

  return (
    <section className="bg-bg-secondary border-y border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`py-10 px-6 text-center ${
              i < stats.length - 1 ? "border-r border-border-subtle" : ""
            }`}
          >
            <div className="font-display text-3xl md:text-4xl font-bold text-accent-green mb-2">
              {stat.value}
            </div>
            <div className="text-xs text-text-muted tracking-widest uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
