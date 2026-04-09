// components/Services.tsx
import { Truck, Package, Ship, Train, Zap, Plane, Waves } from "lucide-react";
import { getTranslations } from 'next-intl/server';

export default async function Services() {
  const t = await getTranslations('services');

  const services = [
    { icon: Truck,   title: t('ftl.title'),       description: t('ftl.description') },
    { icon: Package, title: t('ltl.title'),       description: t('ltl.description') },
    { icon: Ship,    title: t('drayage.title'),   description: t('drayage.description') },
    { icon: Train,   title: t('intermodal.title'),description: t('intermodal.description') },
    { icon: Zap,     title: t('expedited.title'), description: t('expedited.description') },
    { icon: Plane,   title: t('courier.title'),   description: t('courier.description') },
    { icon: Waves,   title: t('ocean.title'),     description: t('ocean.description') },
  ];

  return (
    <section id="services" className="bg-bg-primary py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-display text-xs text-accent-green tracking-widest uppercase mb-4">
          {t('tagline')}
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-14">
          {t('heading')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="bg-bg-card border border-border-subtle rounded-xl p-8 hover:-translate-y-1 hover:border-accent-green transition-all duration-200 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
              >
                <div className="mb-4 text-accent-green">
                  <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="font-display text-sm font-bold text-text-primary mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
