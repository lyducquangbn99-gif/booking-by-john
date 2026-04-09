// components/OceanRoutes.tsx
import { getTranslations } from 'next-intl/server';

const routes = [
  { port: "Antwerp, Belgium",        code: "BEANR", hot: true },
  { port: "Rotterdam, Netherlands",  code: "NLRTM", hot: true },
  { port: "Hamburg, Germany",        code: "DEHAM", hot: true },
  { port: "Le Havre, France",        code: "FRLEH", hot: false },
  { port: "Genoa, Italy",            code: "ITGOA", hot: false },
  { port: "Durres, Albania",         code: "ALDRZ", hot: false },
  { port: "Santos, Brazil",          code: "BRSSZ", hot: false },
  { port: "Buenos Aires, Argentina", code: "ARBUE", hot: false },
];

const origins = [
  "Ho Chi Minh City (VNSGN)",
  "Hai Phong (VNHPH)",
];

export default async function OceanRoutes() {
  const t = await getTranslations('routes');

  return (
    <section id="routes" className="bg-bg-primary py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-display text-xs text-accent-green tracking-widest uppercase mb-4">
          {t('tagline')}
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-14">
          {t('heading')}
        </h2>

        <div className="flex flex-col gap-12">
          {origins.map((origin) => (
            <div key={origin}>
              <p className="font-display text-xs text-text-muted tracking-widest uppercase mb-5">
                {t('originLabel')}: {origin}
              </p>
              <div className="flex flex-wrap gap-3">
                {routes.map((route) => (
                  <div
                    key={route.code}
                    className="inline-flex items-center gap-2 border border-border-subtle rounded-full px-4 py-2 text-sm text-text-secondary hover:border-accent-green hover:text-accent-green hover:bg-accent-green/5 transition-all duration-200 cursor-default"
                  >
                    <span className="font-display text-xs text-text-muted">
                      {route.code}
                    </span>
                    <span>{route.port}</span>
                    {route.hot && (
                      <span className="font-display text-[10px] font-bold text-white bg-accent-orange px-1.5 py-0.5 rounded tracking-wide">
                        HOT
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
