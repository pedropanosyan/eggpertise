import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { AchievementsBanner } from "@/components/achievements-banner";
import { ServicesSection } from "@/components/services-section";
import { DistributorsSection } from "@/components/distributors-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <AchievementsBanner />
      <DistributorsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
