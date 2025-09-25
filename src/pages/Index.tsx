import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PlantCatalog from "@/components/PlantCatalog";
import CultivationGuides from "@/components/CultivationGuides";
import EducationalSection from "@/components/EducationalSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      window.requestAnimationFrame(() => {
        document.getElementById(state.scrollTo ?? "")?.scrollIntoView({ behavior: "smooth" });
      });
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PlantCatalog />
        <CultivationGuides />
        <EducationalSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
