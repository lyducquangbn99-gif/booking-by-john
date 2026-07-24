import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import { routing } from "@/i18n/routing";
import BlogArticleContent from "@/components/BlogArticleContent";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
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

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <Nav />
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
        </div>
      </article>
      <Footer />
    </main>
  );
}
