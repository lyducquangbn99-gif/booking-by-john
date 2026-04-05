// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-subtle px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-start gap-8">
        <div>
          <div className="font-display text-base font-bold text-text-primary mb-3">
            Booking by John
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Freight brokerage &amp; ocean freight from Vietnam.
            <br />
            MC# TBD · USDOT# TBD
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-display text-xs text-text-muted tracking-widest uppercase mb-1">
            Contact
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
        © {new Date().getFullYear()} Booking by John. All rights reserved.
      </div>
    </footer>
  );
}
