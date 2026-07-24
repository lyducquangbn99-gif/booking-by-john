import type { Metadata } from "next";
import InternalVisitorControl from "@/components/InternalVisitorControl";

export const metadata: Metadata = {
  title: "Internal analytics control",
  robots: { index: false, follow: false, noarchive: true },
};

export default function InternalExclusionPage() {
  return <InternalVisitorControl />;
}

