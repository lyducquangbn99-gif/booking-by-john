import { Link } from "@/i18n/navigation";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0B1F3A] px-5 py-14 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-xl font-black">Booking by John Ly</h2>
          <p className="mt-4 leading-7 text-slate-200">
            Your trusted logistics partner from Vietnam to the world.
          </p>
        </div>
        <div>
          <h3 className="font-black">Services</h3>
          <ul className="mt-4 space-y-2 text-slate-200">
            <li>
              <Link href="/services/freight-forwarder-vietnam" className="hover:text-accent-orange">
                Ocean Freight
              </Link>
            </li>
            <li>Air Freight</li>
            <li>Drayage & Trucking</li>
            <li>Customs Clearance</li>
            <li>Door to Door</li>
          </ul>
        </div>
        <div>
          <h3 className="font-black">Popular Routes</h3>
          <ul className="mt-4 space-y-2 text-slate-200">
            <li>
              <Link href="/routes/vietnam-to-italy" className="hover:text-accent-orange">
                Vietnam to Italy
              </Link>
            </li>
            <li>
              <Link href="/routes/vietnam-to-spain" className="hover:text-accent-orange">
                Vietnam to Spain
              </Link>
            </li>
            <li>
              <Link href="/routes/vietnam-to-indonesia" className="hover:text-accent-orange">
                Vietnam to Indonesia
              </Link>
            </li>
            <li>
              <Link href="/routes/vietnam-to-taiwan" className="hover:text-accent-orange">
                Vietnam to Taiwan
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-black">Contact</h3>
          <ul className="mt-4 space-y-2 text-slate-200">
            <li>
              <a href="mailto:BookingbyJohnly@gmail.com" className="hover:text-accent-orange">
                Email: BookingbyJohnly@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+84352193969" className="hover:text-accent-orange">
                Phone / WhatsApp / Zalo: +84 352 193 969
              </a>
            </li>
            <li>Website: bookingbyjohnly.com</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-slate-300">
        © {new Date().getFullYear()} Booking by John Ly. All rights reserved.
      </div>
    </footer>
  );
}
