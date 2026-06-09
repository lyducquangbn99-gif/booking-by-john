import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const blogPosts = getAllBlogPosts();

  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog post not found | Booking by John Ly",
    };
  }

  return {
    title: `${post.title} | Booking by John Ly`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <Nav />
      <article>
        <header className="bg-[#0B1F3A] px-5 py-16 text-white lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <Link href="/blog" className="text-sm font-black text-slate-200 hover:text-white">
              Back to blog
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-wide text-slate-200">
              <span>{post.category}</span>
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <time>{post.date}</time>
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span>{post.readTime}</span>
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-200">{post.excerpt}</p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8 lg:py-16">
          <div className="rounded-lg border border-border-subtle bg-white p-6 shadow-sm sm:p-10">
            {post.content.map((paragraph) => (
              <p key={paragraph} className="mb-6 text-base leading-8 text-text-secondary last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-border-subtle bg-white p-6">
            <h2 className="text-xl font-black text-[#0B1F3A]">Need an updated freight quote?</h2>
            <p className="mt-3 leading-7 text-text-secondary">
              Send John your cargo details and preferred route. He will help check the best practical option.
            </p>
            <Link
              href="/#request"
              className="mt-5 inline-flex rounded-md bg-accent-orange px-5 py-3 text-sm font-black text-white transition hover:bg-[#EA580C]"
            >
              Get a Freight Quote
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
