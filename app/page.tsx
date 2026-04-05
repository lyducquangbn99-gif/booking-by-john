import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Services from "@/components/Services";
import Trust from "@/components/Trust";
import OceanRoutes from "@/components/OceanRoutes";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <StatsBar />
      <Services />
      <Trust />
      <OceanRoutes />
    </main>
  );
}
