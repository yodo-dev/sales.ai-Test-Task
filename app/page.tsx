import { HeroSection } from "@/components/HeroSection";
import { RoiCalculator } from "@/components/RoiCalculator";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <RoiCalculator />
      </main>
    </>
  );
}
