import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'vi', 'it', 'id'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
