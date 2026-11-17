// Explicit marketing taxonomy: never forward arbitrary visitor-supplied UTM text.
const SOURCES = ['google', 'bing', 'linkedin', 'facebook', 'instagram', 'whatsapp', 'email', 'newsletter', 'referral', 'direct', 'other'];
const MEDIUMS = ['organic', 'social', 'email', 'referral', 'cpc', 'paid-social', 'messaging'];
const CAMPAIGNS = ['vietnam-canada', 'canada-growth', 'vietnam-italy', 'vietnam-spain', 'vietnam-indonesia'];
const CONTENT = ['hero', 'footer', 'article', 'route', 'service', 'newsletter'];
export function safeTag(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value) return '';
  const allowed = field === 'utm_medium' ? MEDIUMS : field === 'utm_campaign' ? CAMPAIGNS : field === 'utm_content' ? CONTENT : SOURCES;
  return allowed.includes(value.toLowerCase()) ? value.toLowerCase() : 'other';
}
export function referrerSource(referrer: string, origin: string) {
  try {
    const url = new URL(referrer);
    if (url.origin === origin) return '';
    if (/(^|\.)google\.[a-z.]+$/.test(url.hostname)) return 'google';
    for (const host of ['bing.com', 'linkedin.com', 'facebook.com', 'instagram.com']) {
      if (url.hostname === host || url.hostname.endsWith('.' + host)) return host.split('.')[0];
    }
    return 'referral';
  } catch { return 'direct'; }
}
