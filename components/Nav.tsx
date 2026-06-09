"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ChevronDown, Menu, X } from "lucide-react";

const LOCALE_META: Record<string, { flag: string; label: string }> = {
  en: { flag: "US", label: "English" },
  es: { flag: "ES", label: "Espanol" },
  vi: { flag: "VN", label: "Tieng Viet" },
  it: { flag: "IT", label: "Italiano" },
  id: { flag: "ID", label: "Indonesia" },
};

const links = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Routes", href: "/#routes" },
  { label: "About Us", href: "/#trust" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(loc: string) {
    router.replace(pathname, { locale: loc });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex min-h-10 items-center gap-1.5 rounded-md border border-border-subtle px-3 text-xs font-bold text-text-secondary transition hover:text-ocean-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-blue"
      >
        <span>{LOCALE_META[locale]?.flag ?? "EN"}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border border-border-subtle bg-white shadow-lg"
        >
          {routing.locales.map((loc) => {
            const meta = LOCALE_META[loc];
            return (
              <li key={loc} role="option" aria-selected={loc === locale}>
                <button
                  type="button"
                  onClick={() => switchLocale(loc)}
                  className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition ${
                    loc === locale
                      ? "bg-orange-50 text-accent-orange"
                      : "text-text-secondary hover:bg-bg-primary hover:text-ocean-blue"
                  }`}
                >
                  <span className="font-bold">{meta.flag}</span>
                  <span>{meta.label}</span>
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
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/#home" className="flex items-center gap-3" aria-label="Booking by John Ly home">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0B1F3A] text-sm font-black text-white">
            BJ
          </span>
          <span className="text-base font-black tracking-tight text-[#0B1F3A] sm:text-lg">
            {t("logo")}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-text-secondary lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-ocean-blue">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/#request"
            className="rounded-md bg-accent-orange px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#EA580C]"
          >
            Get a Quote
          </Link>
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="rounded-md border border-border-subtle p-2 text-[#0B1F3A] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          <span className="sr-only">Menu</span>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-border-subtle bg-white px-5 py-4 lg:hidden">
          <nav className="grid gap-2 text-sm font-semibold text-text-secondary">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-2 hover:bg-bg-primary hover:text-ocean-blue"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#request"
              className="mt-2 rounded-md bg-accent-orange px-4 py-3 text-center font-black text-white hover:bg-[#EA580C]"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </Link>
            <div className="mt-2">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
