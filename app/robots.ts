import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/*/internal-exclusion"],
    },
    sitemap: "https://www.bookingbyjohnly.com/sitemap.xml",
    host: "https://www.bookingbyjohnly.com",
  };
}
