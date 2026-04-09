import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'vi'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
