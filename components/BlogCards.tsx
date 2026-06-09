const posts = [
  "How to prepare cargo details for a faster freight quote",
  "What importers should know about Vietnam to Europe shipping",
  "Choosing FCL, LCL, or air freight for urgent shipments",
];

export default function BlogCards() {
  return (
    <section id="blog" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-ocean-blue">Blog</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
            Logistics notes for better shipments
          </h2>
        </div>
        <p className="max-w-xl text-text-secondary">
          Simple guidance for shippers preparing cargo from Vietnam.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {posts.map((title) => (
          <article key={title} className="rounded-lg border border-border-subtle bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-ocean-blue">Freight guide</p>
            <h3 className="mt-4 text-lg font-black leading-7 text-[#0B1F3A]">{title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
