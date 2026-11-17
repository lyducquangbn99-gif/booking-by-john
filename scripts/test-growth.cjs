const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, imports = {}, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText;
  vm.runInNewContext(code, {exports, require: id => imports[id], ...globals});
  return exports;
}
const attribution = load('lib/attribution.ts', {}, {URL});
for (const value of ['person@example.com', '+84352193969', 'Jane Doe', 'https://example.com/private', 'order-12345']) {
  for (const key of ['source', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) assert.equal(attribution.safeTag(value, key), 'other');
}
assert.equal(attribution.safeTag('linkedin', 'utm_source'), 'linkedin');
assert.equal(attribution.safeTag('canada-growth', 'utm_campaign'), 'canada-growth');
assert.equal(attribution.referrerSource('https://www.google.com/search?q=private', 'https://www.bookingbyjohnly.com'), 'google');
assert.equal(attribution.referrerSource('https://private.example/customer', 'https://www.bookingbyjohnly.com'), 'referral');
const local = new Map(), session = new Map(), events = [];
const window = {localStorage: {getItem: key => local.get(key)}, sessionStorage: {getItem: key => session.get(key)}, location: {origin: 'https://www.bookingbyjohnly.com', pathname: '/vi/routes/vietnam-to-canada', href: 'https://www.bookingbyjohnly.com/vi/routes/vietnam-to-canada?email=private@example.com#secret'}, gtag: (...args) => events.push(args)};
const analytics = load('lib/analytics.ts', {'./attribution': attribution}, {window});
analytics.trackBookingEvent('whatsapp_click');
assert.equal(events.length, 0);
local.set(analytics.ANALYTICS_CONSENT_KEY, 'granted');
session.set(analytics.ACQUISITION_CONTEXT_KEY, JSON.stringify({utm_source: 'person@example.com', utm_campaign: 'canada-growth'}));
analytics.trackBookingEvent('whatsapp_click', {cta_location: 'canada-hero', source_page: 'private@example.com', lead_source: 'private@example.com'});
assert.equal(events.length, 1);
assert.equal(events[0][2].locale, 'vi');
assert.equal(events[0][2].utm_source, 'other');
assert.equal(events[0][2].page_location, 'https://www.bookingbyjohnly.com/vi/routes/vietnam-to-canada');
assert.ok(!JSON.stringify(events).includes('private'));
local.set(analytics.INTERNAL_VISITOR_KEY, '1');
analytics.trackBookingEvent('whatsapp_click');
assert.equal(events.length, 1);
local.delete(analytics.INTERNAL_VISITOR_KEY);
window.localStorage.getItem = () => {throw Error('storage denied');};
analytics.trackBookingEvent('whatsapp_click');
assert.equal(events.length, 1);
console.log('PASS: attribution allowlists, consent, internal exclusion, URL privacy, locale, blocked storage.');
