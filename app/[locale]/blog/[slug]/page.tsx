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

type CommercialTarget = {
  label: string;
  href: string;
  quoteHref: string;
};

const PAGE_COPY: Record<
  string,
  {
    handoffTitle: string;
    handoffBody: string;
    handoffLink: string;
    quoteLink: string;
    relatedTitle: string;
  }
> = {
  en: {
    handoffTitle: "Turn this guidance into a shipment check",
    handoffBody:
      "Use the relevant commercial route or Vietnam handling service below, then send the real shipment details for a current option. Rates, space and transit plans are checked against the live requirement.",
    handoffLink: "View the relevant freight service",
    quoteLink: "Request a current quote",
    relatedTitle: "Related articles",
  },
  vi: {
    handoffTitle: "Chuyển hướng dẫn này thành kiểm tra lô hàng thực tế",
    handoffBody:
      "Xem tuyến hoặc dịch vụ xử lý hàng Việt Nam phù hợp bên dưới, sau đó gửi thông tin lô hàng thực tế để kiểm tra phương án hiện tại. Giá, chỗ và kế hoạch vận chuyển được kiểm tra theo từng yêu cầu cụ thể.",
    handoffLink: "Xem tuyến hoặc dịch vụ phù hợp",
    quoteLink: "Yêu cầu báo giá hiện tại",
    relatedTitle: "Bài viết liên quan",
  },
  it: {
    handoffTitle: "Trasforma questa guida in un controllo della spedizione",
    handoffBody:
      "Consulta la rotta commerciale o il servizio di gestione in Vietnam più pertinente e invia i dati reali della spedizione per verificare l'opzione attuale. Tariffe, spazio e piano di transito vengono controllati sul requisito concreto.",
    handoffLink: "Vedi il servizio freight pertinente",
    quoteLink: "Richiedi un preventivo attuale",
    relatedTitle: "Articoli correlati",
  },
  es: {
    handoffTitle: "Convierte esta guía en una revisión de tu envío",
    handoffBody:
      "Consulta la ruta comercial o el servicio de gestión en Vietnam más relevante y envía los datos reales del embarque para revisar la opción actual. Tarifas, espacio y plan de tránsito se comprueban para cada solicitud concreta.",
    handoffLink: "Ver el servicio de carga relevante",
    quoteLink: "Solicitar cotización actual",
    relatedTitle: "Artículos relacionados",
  },
  id: {
    handoffTitle: "Ubah panduan ini menjadi pemeriksaan shipment",
    handoffBody:
      "Buka rute komersial atau layanan handling Vietnam yang paling relevan, lalu kirim detail shipment aktual untuk mengecek opsi saat ini. Tarif, space, dan rencana transit diperiksa berdasarkan kebutuhan nyata.",
    handoffLink: "Lihat layanan freight yang relevan",
    quoteLink: "Minta penawaran saat ini",
    relatedTitle: "Artikel terkait",
  },
};

function commercialTargetFor(slug: string): CommercialTarget {
  const source = `blog-${slug}`.slice(0, 120);
  const encodedSource = encodeURIComponent(source);

  if (/italy|genoa|la-spezia|cbam/i.test(slug)) {
    return {
      label: "Vietnam → Italy",
      href: `/routes/vietnam-to-italy?source=${encodedSource}`,
      quoteHref: `/?mode=Ocean%20Freight&source=${encodedSource}#request`,
    };
  }
  if (/spain|barcelona|valencia|algeciras/i.test(slug)) {
    return {
      label: "Vietnam → Spain",
      href: `/routes/vietnam-to-spain?source=${encodedSource}`,
      quoteHref: `/?mode=Ocean%20Freight&source=${encodedSource}#request`,
    };
  }
  if (/indonesia|jakarta/i.test(slug)) {
    return {
      label: "Vietnam → Indonesia",
      href: `/routes/vietnam-to-indonesia?source=${encodedSource}`,
      quoteHref: `/?mode=Ocean%20Freight&source=${encodedSource}#request`,
    };
  }
  if (/taiwan|kaohsiung|keelung|taichung/i.test(slug)) {
    return {
      label: "Vietnam → Taiwan",
      href: `/routes/vietnam-to-taiwan?source=${encodedSource}`,
      quoteHref: `/?mode=Ocean%20Freight&source=${encodedSource}#request`,
    };
  }
  if (/haiphong|hai-phong/i.test(slug)) {
    return {
      label: "Hai Phong origin freight",
      href: `/services/freight-forwarder-vietnam?source=${encodedSource}`,
      quoteHref: `/?origin=Hai%20Phong%2C%20Vietnam&mode=Ocean%20Freight&source=${encodedSource}#request`,
    };
  }
  if (/mexico|mazatlan/i.test(slug)) {
    return {
      label: "Vietnam → Mexico freight support",
      href: `/services/freight-forwarder-vietnam?source=${encodedSource}`,
      quoteHref: `/?source=${encodedSource}#request`,
    };
  }

  return {
    label: "Vietnam freight-forwarding support",
    href: `/services/freight-forwarder-vietnam?source=${encodedSource}`,
    quoteHref: `/?source=${encodedSource}#request`,
  };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllBlogPosts(locale).map((post) => ({
      locale,
      slug: post.slug,
    })),
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
        ...(getBlogPost("en", slug)
          ? { "x-default": `/en/blog/${slug}` }
          : {}),
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
  const pageCopy = PAGE_COPY[locale] || PAGE_COPY.en;
  const commercialTarget = commercialTargetFor(slug);
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
            <Link
              href="/blog"
              className="text-sm font-semibold text-slate-200 hover:text-white"
            >
              {t("backToBlog")}
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-200">
              <span>{post.category}</span>
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <time>{post.date}</time>
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span>{post.readTime}</span>
            </div>
            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-200">
              {post.excerpt}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8 lg:py-16">
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-lg border border-border-subtle bg-[#0B1F3A]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>

          <BlogArticleContent blocks={post.content} />

          <section className="mt-10 rounded-lg border border-border-subtle bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-[#0B1F3A]">
              {pageCopy.handoffTitle}
            </h2>
            <p className="mt-3 leading-7 text-text-secondary">
              {pageCopy.handoffBody}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={commercialTarget.href}
                className="inline-flex rounded-md border border-ocean-blue px-5 py-3 text-sm font-bold text-ocean-blue transition hover:bg-ocean-blue hover:text-white"
              >
                {pageCopy.handoffLink}: {commercialTarget.label}
              </Link>
              <Link
                href={commercialTarget.quoteHref}
                className="inline-flex rounded-md bg-accent-orange px-5 py-3 text-sm font-bold text-white transition hover:bg-[#EA580C]"
              >
                {pageCopy.quoteLink}
              </Link>
            </div>
          </section>

          {post.sources.length > 0 && (
            <section className="mt-8 rounded-lg border border-border-subtle bg-white p-6">
              <h2 className="text-xl font-bold text-[#0B1F3A]">
                {t("sources")}
              </h2>
              <ul className="mt-4 list-disc space-y-3 pl-6 text-text-secondary">
                {post.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-ocean-blue underline underline-offset-4"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-8 rounded-lg border border-border-subtle bg-white p-6">
            <h2 className="text-xl font-bold text-[#0B1F3A]">
              {t("ctaTitle")}
            </h2>
            <p className="mt-3 leading-7 text-text-secondary">
              {t("ctaBody")}
            </p>
            <Link
              href={commercialTarget.quoteHref}
              className="mt-5 inline-flex rounded-md bg-accent-orange px-5 py-3 text-sm font-bold text-white transition hover:bg-[#EA580C]"
            >
              {t("ctaButton")}
            </Link>
          </div>

          {relatedPosts.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-[#0B1F3A]">
                {pageCopy.relatedTitle}
              </h2>
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
