"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const COPY: Record<string, { light: string; dark: string }> = {
  en: { light: "Use light mode", dark: "Use dark mode" },
  vi: { light: "Dùng chế độ sáng", dark: "Dùng chế độ tối" },
  it: { light: "Usa modalità chiara", dark: "Usa modalità scura" },
  es: { light: "Usar modo claro", dark: "Usar modo oscuro" },
  id: { light: "Gunakan mode terang", dark: "Gunakan mode gelap" },
};

export default function ThemeToggle({ locale }: { locale: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    localStorage.setItem("byj-theme", next);
    setTheme(next);
  }

  const copy = COPY[locale] || COPY.en;
  const label = theme === "dark" ? copy.light : copy.dark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="theme-toggle flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-card text-text-primary shadow-sm transition hover:border-ocean-blue hover:text-ocean-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-blue"
    >
      {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
