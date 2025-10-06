export const revalidate = 300; // 5 minutes

import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { AchievementsBanner } from "@/components/achievements-banner";
import { ServicesSection } from "@/components/services-section";
import { DistributorsSection } from "@/components/distributors-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { getFabricantes } from "@/lib/contentful";

export default async function HomePage() {
  const distributors = await getFabricantes();

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <DistributorsSection distributors={distributors} />
      <AboutSection />
      {/*<ServicesSection />*/}
      {/*<AchievementsBanner />*/}
      <ContactSection />
      <Footer />
    </main>
  );
}
