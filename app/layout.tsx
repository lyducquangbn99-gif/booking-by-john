import type { Metadata } from "next";
import { Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const dmSans = DM_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Booking by John — Freight Brokerage & Ocean Freight from Vietnam",
  description:
    "Freight broker Vietnam. Ocean freight VNSGN to Europe & South America. Courier Vietnam worldwide. Vetted carriers, real-time visibility, 2-hour quote SLA.",
  openGraph: {
    title: "Booking by John — Freight Brokerage & Ocean Freight from Vietnam",
    description:
      "No runaround, no generic quotes. Vetted carriers, real-time visibility, and a broker who picks up the phone.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
