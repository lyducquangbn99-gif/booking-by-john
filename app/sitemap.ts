import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllBlogPosts } from "@/lib/blog";

const BASE_URL = "https://www.bookingbyjohnly.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = routing.locales.flatMap((locale) => [
    {
      url: `${BASE_URL}/${locale}`,
      changeFrequency: "weekly",
      priority: locale === "en" ? 1 : 0.9,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((language) => [language, `${BASE_URL}/${language}`]),
          ),
          "x-default": `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/${locale}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((language) => [language, `${BASE_URL}/${language}/blog`]),
          ),
          "x-default": `${BASE_URL}/en/blog`,
        },
      },
    },
    {
      url: `${BASE_URL}/${locale}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((language) => [language, `${BASE_URL}/${language}/about`]),
          ),
          "x-default": `${BASE_URL}/en/about`,
        },
      },
    },
  ]);

  const articlePages: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    getAllBlogPosts(locale).map((post) => {
      const translatedLocales = routing.locales.filter((language) =>
        getAllBlogPosts(language).some((candidate) => candidate.slug === post.slug),
      );

      return {
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: post.date || undefined,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            ...Object.fromEntries(
              translatedLocales.map((language) => [
                language,
                `${BASE_URL}/${language}/blog/${post.slug}`,
              ]),
            ),
            ...(translatedLocales.includes("en")
              ? { "x-default": `${BASE_URL}/en/blog/${post.slug}` }
              : {}),
          },
        },
      };
    }),
  );

  const routeSlugs = ["vietnam-to-italy", "vietnam-to-spain", "vietnam-to-indonesia", "vietnam-to-taiwan"];
  const routePages: MetadataRoute.Sitemap = routeSlugs.flatMap((slug) =>
    routing.locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/routes/${slug}`,
      changeFrequency: "monthly",
      priority: locale === "en" || (slug === "vietnam-to-italy" && locale === "it") || (slug === "vietnam-to-spain" && locale === "es") || (slug === "vietnam-to-indonesia" && locale === "id") ? 0.9 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((language) => [
              language,
              `${BASE_URL}/${language}/routes/${slug}`,
            ]),
          ),
          "x-default": `${BASE_URL}/en/routes/${slug}`,
        },
      },
    })),
  );

  const serviceSlugs = ["freight-forwarder-vietnam", "air-freight-vietnam"];
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.flatMap((slug) =>
    routing.locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/services/${slug}`,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((language) => [
              language,
              `${BASE_URL}/${language}/services/${slug}`,
            ]),
          ),
          "x-default": `${BASE_URL}/en/services/${slug}`,
        },
      },
    })),
  );

  return [...staticPages, ...servicePages, ...routePages, ...articlePages];
}
