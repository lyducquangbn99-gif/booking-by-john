import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Booking by John Ly",
  description: "Freight updates, route notes, and logistics guides from Booking by John Ly.",
};

export default function BlogIndexPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <Nav />
      <section className="bg-[#0B1F3A] px-5 py-16 text-white lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-wide text-slate-200">Blog</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            Daily logistics updates and freight guides
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Real route notes, cargo preparation tips, and market updates for customers shipping from Vietnam.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        {blogPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-lg border border-border-subtle bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3 text-xs font-black uppercase tracking-wide">
                  <span className="text-ocean-blue">{post.category}</span>
                  <time className="text-text-muted">{post.date}</time>
                </div>
                <h2 className="mt-5 text-xl font-black leading-8 text-[#0B1F3A] group-hover:text-ocean-blue">
                  {post.title}
                </h2>
                <p className="mt-3 leading-7 text-text-secondary">{post.excerpt}</p>
                <p className="mt-6 text-sm font-black text-accent-orange">{post.readTime}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border-subtle bg-white p-8 text-center">
            <h2 className="text-2xl font-black text-[#0B1F3A]">No posts yet</h2>
            <p className="mt-3 text-text-secondary">
              Add Markdown files inside <span className="font-bold">content/blog</span> to publish updates here.
            </p>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
