import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Analytics from '@/components/Analytics';
import JsonLd from '@/components/JsonLd';
import FreightChatbox from '@/components/FreightChatbox';
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
  en: { title: "Shipping from Vietnam | Ocean, Air & Door-to-Door", description: "Plan international shipping from Vietnam by ocean or air, with customs, trucking and door-to-door support. Send your cargo details for a route-specific quote." },
  vi: { title: "Vận chuyển quốc tế từ Việt Nam | Biển, bay & door-to-door", description: "Lập phương án vận chuyển quốc tế từ Việt Nam bằng đường biển hoặc hàng không, kèm hải quan, trucking và door-to-door theo thông tin lô hàng." },
  it: { title: "Spedizioni dal Vietnam | Mare, aereo e door-to-door", description: "Pianifica spedizioni internazionali dal Vietnam via mare o aereo, con dogana, trasporto terrestre e consegna door-to-door su preventivo specifico." },
  es: { title: "Envíos desde Vietnam | Marítimo, aéreo y puerta a puerta", description: "Planifica envíos internacionales desde Vietnam por mar o aire, con aduanas, transporte terrestre y entrega puerta a puerta según tu carga." },
  id: { title: "Pengiriman dari Vietnam | Laut, Udara & Door-to-Door", description: "Rencanakan pengiriman internasional dari Vietnam melalui laut atau udara, termasuk bea cukai, trucking, dan door-to-door sesuai detail kargo." },
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
    <html lang={locale} className={notoSans.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('byj-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <NextIntlClientProvider messages={messages}>
          {children}
          <FreightChatbox />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
