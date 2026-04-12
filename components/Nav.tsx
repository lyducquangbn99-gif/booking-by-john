// components/Nav.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { ChevronDown } from 'lucide-react';

const LOCALE_META: Record<string, { flag: string; label: string }> = {
  en: { flag: '🇺🇸', label: 'English' },
  es: { flag: '🇪🇸', label: 'Español' },
  vi: { flag: '🇻🇳', label: 'Tiếng Việt' },
  it: { flag: '🇮🇹', label: 'Italiano' },
  id: { flag: '🇮🇩', label: 'Indonesia' },
};

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const current = LOCALE_META[locale] ?? LOCALE_META.en;

  function switchLocale(loc: string) {
    router.replace(pathname, { locale: loc });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative ml-3 border-l border-border-subtle pl-3">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 font-display text-xs text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green rounded px-1 py-1"
      >
        <span aria-hidden="true">{current.flag}</span>
        <span>{locale.toUpperCase()}</span>
        <ChevronDown
          size={12}
          strokeWidth={2}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 mt-2 w-40 bg-bg-card border border-border-subtle rounded-lg shadow-lg overflow-hidden z-50"
        >
          {routing.locales.map((loc) => {
            const meta = LOCALE_META[loc];
            return (
              <li key={loc} role="option" aria-selected={loc === locale}>
                <button
                  onClick={() => switchLocale(loc)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:bg-bg-secondary ${
                    loc === locale
                      ? 'text-accent-green bg-accent-green/5'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                  }`}
                >
                  <span aria-hidden="true">{meta.flag}</span>
                  <span className="font-display text-xs">{meta.label}</span>
                  {loc === locale && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-green" aria-hidden="true" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function Nav() {
  const t = useTranslations('nav');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle backdrop-blur-md bg-bg-primary/85">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="font-display text-lg font-bold text-text-primary flex items-center gap-2">
          {t('logo')}
          <span
            className="inline-block w-2 h-2 rounded-full bg-accent-green motion-safe:animate-logo-pulse"
            aria-hidden="true"
          />
        </div>

        {/* Nav links + language switcher */}
        <nav className="flex items-center gap-8">
          <a
            href="#services"
            className="hidden md:block text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            {t('services')}
          </a>
          <a
            href="#trust"
            className="hidden md:block text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            {t('whyUs')}
          </a>
          <a
            href="#routes"
            className="hidden md:block text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            {t('routes')}
          </a>
          <a
            href="#request"
            className="font-display text-sm font-bold text-bg-primary bg-accent-green px-5 py-2.5 rounded-md hover:-translate-y-px hover:shadow-[0_0_16px_rgba(0,232,123,0.4)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-green min-h-11 inline-flex items-center"
          >
            {t('cta')}
          </a>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
