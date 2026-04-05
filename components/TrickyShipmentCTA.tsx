// components/TrickyShipmentCTA.tsx
export default function TrickyShipmentCTA() {
  return (
    <section className="relative bg-bg-primary py-24 px-6 overflow-hidden">
      {/* Orange radial glow */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(255,107,53,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-5">
          Got a tricky shipment?
        </h2>
        <p className="text-lg text-text-secondary leading-relaxed max-w-xl mx-auto mb-10">
          Oversized, hazmat, multi-stop, cross-border — the harder it is, the
          more you need someone who&apos;s done it before. Let&apos;s figure it
          out together.
        </p>
        <a
          href="#request"
          className="inline-block font-display font-bold text-sm text-white bg-accent-orange px-9 py-4 rounded-md hover:-translate-y-px hover:shadow-[0_0_24px_rgba(255,107,53,0.4)] transition-all duration-200"
        >
          Tell me about it →
        </a>
      </div>
    </section>
  );
}
