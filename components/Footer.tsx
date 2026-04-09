// components/Footer.tsx
import { getTranslations } from 'next-intl/server';

export default async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="bg-bg-secondary border-t border-border-subtle px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-start gap-8">
        <div>
          <div className="font-display text-base font-bold text-text-primary mb-3">
            {t('logo')}
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            {t('tagline')}
            <br />
            {t('registrationNote')}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-display text-xs text-text-muted tracking-widest uppercase mb-1">
            {t('contactLabel')}
          </p>
          <a
            href="mailto:BookingbyJohnly@gmail.com"
            className="text-sm text-text-secondary hover:text-accent-green transition-colors duration-200"
          >
            BookingbyJohnly@gmail.com
          </a>
          <a
            href="tel:+84352193969"
            className="text-sm text-text-secondary hover:text-accent-green transition-colors duration-200"
          >
            +84 352 193 969
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border-subtle text-center text-xs text-text-muted">
        {t('copyright', { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}
