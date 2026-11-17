"use client";
import { useState } from 'react';
import { useLocale } from 'next-intl';
import { hasAnalyticsConsent, isInternalVisitor, trackBookingEvent } from '@/lib/analytics';

const COPY: Record<string, string[]> = {
  en: ['How did you find us? (Optional)', 'Choose an answer', 'Search engine', 'Social media', 'Recommendation', 'Other', 'Thank you!'],
  vi: ['Bạn biết đến chúng tôi qua đâu? (Không bắt buộc)', 'Chọn câu trả lời', 'Công cụ tìm kiếm', 'Mạng xã hội', 'Được giới thiệu', 'Khác', 'Cảm ơn bạn!'],
  it: ['Come ci hai trovato? (Facoltativo)', 'Scegli una risposta', 'Motore di ricerca', 'Social media', 'Passaparola', 'Altro', 'Grazie!'],
  es: ['¿Cómo nos encontraste? (Opcional)', 'Elige una respuesta', 'Buscador', 'Redes sociales', 'Recomendación', 'Otro', '¡Gracias!'],
  id: ['Bagaimana Anda menemukan kami? (Opsional)', 'Pilih jawaban', 'Mesin pencari', 'Media sosial', 'Rekomendasi', 'Lainnya', 'Terima kasih!'],
};
export default function DiscoveryQuestion() {
  const locale = useLocale();
  const [answered, setAnswered] = useState(false);
  const c = COPY[locale] || COPY.en;
  if (!hasAnalyticsConsent() || isInternalVisitor()) return null;
  if (answered) return <p className="my-4">{c[6]}</p>;
  return <label className="my-5 block text-sm">{c[0]}
    <select defaultValue="" className="mt-2 block w-full rounded border p-3 bg-bg-primary text-text-primary" onChange={event => {
      if (!event.target.value) return;
      trackBookingEvent('discovery_response', { discovery_channel: event.target.value, cta_location: 'quote-success' });
      setAnswered(true);
    }}>
      <option value="" disabled>{c[1]}</option>
      {['search', 'social', 'recommendation', 'other'].map((v, i) => <option key={v} value={v}>{c[i + 2]}</option>)}
    </select>
  </label>;
}
