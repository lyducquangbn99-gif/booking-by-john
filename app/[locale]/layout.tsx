import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Analytics from '@/components/Analytics';
import JsonLd from '@/components/JsonLd';
import "../globals.css";

const notoSans = Noto_Sans({
  weight: "variable",
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-noto-sans",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const META: Record<string, { title: string; description: string }> = {
  en: { title: "Freight Forwarder Vietnam | Booking by John Ly", description: "Plan ocean freight, air freight, customs coordination and delivery from Vietnam with route-specific information and a clear quote scope." },
  vi: { title: "Dịch vụ vận chuyển quốc tế từ Việt Nam | Booking by John Ly", description: "Lập phương án vận tải biển, hàng không, điều phối hải quan và giao hàng từ Việt Nam theo thông tin thực tế của lô hàng." },
  it: { title: "Spedizioni internazionali dal Vietnam | Booking by John Ly", description: "Pianifica trasporto marittimo, aereo, coordinamento doganale e consegna dal Vietnam con informazioni specifiche per la rotta." },
  es: { title: "Transporte internacional desde Vietnam | Booking by John Ly", description: "Planifica transporte marítimo, aéreo, coordinación aduanera y entrega desde Vietnam con información específica para cada ruta." },
  id: { title: "Freight Forwarder dari Vietnam | Booking by John Ly", description: "Rencanakan angkutan laut, udara, koordinasi bea cukai, dan pengiriman dari Vietnam berdasarkan detail kargo sebenarnya." },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  return {
    metadataBase: new URL("https://www.bookingbyjohnly.com"),
    verification: {
      google: "TrKa9aRDz_0WkqS8DC6xtjvBj-ZBsnLFToIFZcwtSVs",
    },
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        vi: "/vi",
        it: "/it",
        es: "/es",
        id: "/id",
        "x-default": "/en",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: `/${locale}`,
      siteName: "Booking by John Ly",
      locale,
      images: [{ url: "/logistics-hero.png", alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/logistics-hero.png"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();
  const siteUrl = `https://www.bookingbyjohnly.com/${locale}`;
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.bookingbyjohnly.com/#organization",
    name: "Booking by John Ly",
    url: "https://www.bookingbyjohnly.com",
    email: "BookingbyJohnly@gmail.com",
    telephone: "+84 352 193 969",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "freight inquiry",
      telephone: "+84 352 193 969",
      availableLanguage: ["English", "Vietnamese", "Italian", "Spanish", "Indonesian"],
    },
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.bookingbyjohnly.com/#website",
    url: "https://www.bookingbyjohnly.com",
    name: "Booking by John Ly",
    inLanguage: locale,
    publisher: { "@id": "https://www.bookingbyjohnly.com/#organization" },
    mainEntityOfPage: siteUrl,
  };
  return (
    <html lang={locale} className={notoSans.variable}>
      <body>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <NextIntlClientProvider messages={messages}>
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
