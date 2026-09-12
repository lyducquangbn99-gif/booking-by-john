import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import TrackedContactLink from "@/components/TrackedContactLink";

const COPY: Record<string, { tagline: string; services: string; routes: string; contact: string; ocean: string; air: string; trucking: string; customs: string; door: string; destinations: string[] }> = {
  en: { tagline: "Your trusted logistics partner from Vietnam to the world.", services: "Services", routes: "Popular Routes", contact: "Contact", ocean: "Ocean Freight", air: "Air Freight", trucking: "Inland Trucking", customs: "Customs Clearance", door: "Door to Door", destinations: ["Italy", "Spain", "Indonesia", "Taiwan", "Türkiye"] },
  vi: { tagline: "Đối tác logistics từ Việt Nam đến thị trường quốc tế.", services: "Dịch vụ", routes: "Tuyến phổ biến", contact: "Liên hệ", ocean: "Vận tải biển", air: "Vận tải hàng không", trucking: "Vận chuyển nội địa", customs: "Thông quan", door: "Door to Door", destinations: ["Ý", "Tây Ban Nha", "Indonesia", "Đài Loan", "Thổ Nhĩ Kỳ"] },
  it: { tagline: "Il tuo partner logistico dal Vietnam al mondo.", services: "Servizi", routes: "Rotte popolari", contact: "Contatti", ocean: "Trasporto marittimo", air: "Trasporto aereo", trucking: "Trasporto interno", customs: "Sdoganamento", door: "Door to Door", destinations: ["Italia", "Spagna", "Indonesia", "Taiwan", "Turchia"] },
  es: { tagline: "Tu socio logístico desde Vietnam hacia el mundo.", services: "Servicios", routes: "Rutas populares", contact: "Contacto", ocean: "Transporte marítimo", air: "Transporte aéreo", trucking: "Transporte interior", customs: "Despacho aduanero", door: "Puerta a puerta", destinations: ["Italia", "España", "Indonesia", "Taiwán", "Turquía"] },
  id: { tagline: "Mitra logistik Anda dari Vietnam ke dunia.", services: "Layanan", routes: "Rute populer", contact: "Kontak", ocean: "Angkutan laut", air: "Angkutan udara", trucking: "Trucking", customs: "Bea cukai", door: "Door to Door", destinations: ["Italia", "Spanyol", "Indonesia", "Taiwan", "Turki"] },
};

export default async function Footer() {
  const locale = await getLocale();
  const copy = COPY[locale] || COPY.en;
  return (
    <footer id="contact" className="bg-[#0B1F3A] px-5 py-14 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-4">
            <span className="footer-logo-plate flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-sky-300/70">
              <Image src="/byj-logo-mark.png" alt="Booking by John Ly" width={56} height={56} className="footer-logo-mark h-14 w-14 object-contain" />
            </span>
            <h2 className="text-xl font-black">Booking by John Ly</h2>
          </div>
          <p className="mt-4 leading-7 text-slate-200">{copy.tagline}</p>
        </div>
        <div>
          <h3 className="font-black">{copy.services}</h3>
          <ul className="mt-4 space-y-2 text-slate-200">
            <li><Link href="/services/freight-forwarder-vietnam" className="hover:text-accent-orange">{copy.ocean}</Link></li>
            <li><Link href="/services/air-freight-vietnam" className="hover:text-accent-orange">{copy.air}</Link></li>
            <li><Link href="/services/inland-trucking-vietnam" className="hover:text-accent-orange">{copy.trucking}</Link></li>
            <li><Link href="/services/customs-clearance-vietnam" className="hover:text-accent-orange">{copy.customs}</Link></li>
            <li><Link href="/services/door-to-door-shipping-vietnam" className="hover:text-accent-orange">{copy.door}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-black">{copy.routes}</h3>
          <ul className="mt-4 space-y-2 text-slate-200">
            <li><Link href="/routes/vietnam-to-italy" className="hover:text-accent-orange">Vietnam → {copy.destinations[0]}</Link></li>
            <li><Link href="/routes/vietnam-to-spain" className="hover:text-accent-orange">Vietnam → {copy.destinations[1]}</Link></li>
            <li><Link href="/routes/vietnam-to-indonesia" className="hover:text-accent-orange">Vietnam → {copy.destinations[2]}</Link></li>
            <li><Link href="/routes/vietnam-to-taiwan" className="hover:text-accent-orange">Vietnam → {copy.destinations[3]}</Link></li>
            <li><Link href="/routes/ho-chi-minh-to-mersin" className="hover:text-accent-orange">Vietnam → {copy.destinations[4]}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-black">{copy.contact}</h3>
          <ul className="mt-4 space-y-2 text-slate-200">
            <li><TrackedContactLink href="mailto:BookingbyJohnly@gmail.com" channel="email" placement="footer" className="hover:text-accent-orange">Email: BookingbyJohnly@gmail.com</TrackedContactLink></li>
            <li><TrackedContactLink href="https://wa.me/84352193969?text=Hi%20John%2C%20I%27d%20like%20a%20freight%20quote%20from%20Vietnam." channel="whatsapp" placement="footer" target="_blank" rel="noopener noreferrer" className="hover:text-accent-orange">WhatsApp: +84 352 193 969</TrackedContactLink></li>
            <li><TrackedContactLink href="tel:+84352193969" channel="phone" placement="footer" className="hover:text-accent-orange">Phone / Zalo: +84 352 193 969</TrackedContactLink></li>
            <li>Website: bookingbyjohnly.com</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-slate-300">© {new Date().getFullYear()} Booking by John Ly. All rights reserved.</div>
    </footer>
  );
}
