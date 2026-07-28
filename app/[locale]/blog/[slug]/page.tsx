import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import { routing } from "@/i18n/routing";
import BlogArticleContent from "@/components/BlogArticleContent";
import JsonLd from "@/components/JsonLd";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const RELATED_COPY: Record<string, {
  routeTitle: string;
  routeBody: string;
  routeLink: string;
  relatedTitle: string;
}> = {
  en: {
    routeTitle: "Vietnam to Italy shipping",
    routeBody: "Compare the route, documents, FCL and LCL planning points before requesting a shipment-specific quote.",
    routeLink: "View the Vietnam to Italy route guide",
    relatedTitle: "Related articles",
  },
  vi: {
    routeTitle: "Vận chuyển Việt Nam đi Ý",
    routeBody: "So sánh tuyến đi, chứng từ, phương án FCL và LCL trước khi yêu cầu báo giá theo lô hàng.",
    routeLink: "Xem hướng dẫn tuyến Việt Nam đi Ý",
    relatedTitle: "Bài viết liên quan",
  },
  it: {
    routeTitle: "Spedizioni dal Vietnam all’Italia",
    routeBody: "Confronta rotta, documenti e opzioni FCL e LCL prima di richiedere un preventivo specifico.",
    routeLink: "Consulta la guida Vietnam–Italia",
    relatedTitle: "Articoli correlati",
  },
  es: {
    routeTitle: "Envíos de Vietnam a Italia",
    routeBody: "Compara la ruta, la documentación y las opciones FCL y LCL antes de solicitar una cotización específica.",
    routeLink: "Ver la guía de la ruta Vietnam–Italia",
    relatedTitle: "Artículos relacionados",
  },
  id: {
    routeTitle: "Pengiriman Vietnam ke Italia",
    routeBody: "Bandingkan rute, dokumen, serta opsi FCL dan LCL sebelum meminta penawaran khusus kiriman.",
    routeLink: "Lihat panduan rute Vietnam–Italia",
    relatedTitle: "Artikel terkait",
  },
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllBlogPosts(locale).map((post) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);

  if (!post) {
    return {
      title: "Blog post not found | Booking by John Ly",
    };
  }

  const languages = Object.fromEntries(
    routing.locales
      .filter((language) => getBlogPost(language, slug))
      .map((language) => [language, `/${language}/blog/${slug}`]),
  );

  return {
    title: `${post.title} | Booking by John Ly`,
    description: post.excerpt,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        ...languages,
        ...(getBlogPost("en", slug) ? { "x-default": `/en/blog/${slug}` } : {}),
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/${locale}/blog/${slug}`,
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);
  const t = await getTranslations({ locale, namespace: "blog" });

  if (!post) {
    notFound();
  }

  const baseUrl = "https://www.bookingbyjohnly.com";
  const articleUrl = `${baseUrl}/${locale}/blog/${slug}`;
  const relatedPosts = getAllBlogPosts(locale)
    .filter((candidate) => candidate.slug !== slug)
    .slice(0, 2);
  const relatedCopy = RELATED_COPY[locale] || RELATED_COPY.en;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: new URL(post.image, baseUrl).toString(),
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: locale,
      mainEntityOfPage: articleUrl,
      author: {
        "@type": "Organization",
        name: "Booking by John Ly",
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "Booking by John Ly",
        url: baseUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${baseUrl}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${baseUrl}/${locale}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: articleUrl,
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <Nav />
      <JsonLd data={structuredData} />
      <article>
        <header className="bg-[#0B1F3A] px-5 py-16 text-white lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <Link href="/blog" className="text-sm font-semibold text-slate-200 hover:text-white">
              {t("backToBlog")}
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-200">
              <span>{post.category}</span>
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <time>{post.date}</time>
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span>{post.readTime}</span>
            </div>
            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-200">{post.excerpt}</p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8 lg:py-16">
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-lg border border-border-subtle bg-[#0B1F3A]">
            <Image src={post.image} alt={post.imageAlt} fill className="object-cover" priority />
          </div>

          <BlogArticleContent blocks={post.content} />

          <section className="mt-10 rounded-lg border border-border-subtle bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-[#0B1F3A]">
              {relatedCopy.routeTitle}
            </h2>
            <p className="mt-3 leading-7 text-text-secondary">
              {relatedCopy.routeBody}
            </p>
            <Link
              href="/routes/vietnam-to-italy"
              className="mt-4 inline-flex font-bold text-ocean-blue underline underline-offset-4"
            >
              {relatedCopy.routeLink}
            </Link>
          </section>

          {post.sources.length > 0 && (
            <section className="mt-8 rounded-lg border border-border-subtle bg-white p-6">
              <h2 className="text-xl font-bold text-[#0B1F3A]">{t("sources")}</h2>
              <ul className="mt-4 list-disc space-y-3 pl-6 text-text-secondary">
                {post.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-bold text-ocean-blue underline underline-offset-4">
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-8 rounded-lg border border-border-subtle bg-white p-6">
            <h2 className="text-xl font-bold text-[#0B1F3A]">{t("ctaTitle")}</h2>
            <p className="mt-3 leading-7 text-text-secondary">
              {t("ctaBody")}
            </p>
            <Link
              href="/#request"
              className="mt-5 inline-flex rounded-md bg-accent-orange px-5 py-3 text-sm font-bold text-white transition hover:bg-[#EA580C]"
            >
              {t("ctaButton")}
            </Link>
          </div>

          {relatedPosts.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-[#0B1F3A]">{relatedCopy.relatedTitle}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="rounded-lg border border-border-subtle bg-white p-5 transition hover:border-ocean-blue"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-ocean-blue">
                      {relatedPost.category}
                    </span>
                    <h3 className="mt-2 font-bold leading-6 text-[#0B1F3A]">
                      {relatedPost.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
}
