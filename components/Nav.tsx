// components/Nav.tsx
"use client";

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle backdrop-blur-md bg-bg-primary/85">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="font-display text-lg font-bold text-text-primary flex items-center gap-2">
          Booking by John
          <span className="animate-logo-pulse inline-block w-2 h-2 rounded-full bg-accent-green" />
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          <a
            href="#services"
            className="hidden md:block text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Services
          </a>
          <a
            href="#trust"
            className="hidden md:block text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Why Us
          </a>
          <a
            href="#routes"
            className="hidden md:block text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Routes
          </a>
          <a
            href="#request"
            className="font-display text-sm font-bold text-bg-primary bg-accent-green px-5 py-2.5 rounded-md hover:-translate-y-px hover:shadow-[0_0_16px_rgba(0,232,123,0.4)] transition-all duration-200"
          >
            Get Moving
          </a>
        </nav>
      </div>
    </header>
  );
}
