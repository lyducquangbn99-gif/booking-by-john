import { Link } from "@/i18n/navigation";
import { getRecentBlogPosts } from "@/lib/blog";

export default function BlogCards() {
  const posts = getRecentBlogPosts(3);

  return (
    <section id="blog" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-ocean-blue">Blog</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
            Logistics notes for better shipments
          </h2>
        </div>
        <Link
          href="/blog"
          className="inline-flex rounded-md border border-border-subtle bg-white px-5 py-3 text-sm font-black text-[#0B1F3A] transition hover:border-ocean-blue hover:text-ocean-blue"
        >
          View all posts
        </Link>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-lg border border-border-subtle bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-xs font-black uppercase tracking-wide text-ocean-blue">{post.category}</p>
            <h3 className="mt-4 text-lg font-black leading-7 text-[#0B1F3A] group-hover:text-ocean-blue">
              {post.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-text-secondary">{post.excerpt}</p>
            <p className="mt-5 text-sm font-black text-accent-orange">Read article</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
