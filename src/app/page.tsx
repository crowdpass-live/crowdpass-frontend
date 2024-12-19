"use client"

import Footer from "@/components/landing-page/footer";
import AboutSection from "@/components/landing-page/sections/about-section";
import FeaturesSection from "@/components/landing-page/sections/features-section";
import HeroSection from "@/components/landing-page/sections/hero-section";
import HiwSection from "@/components/landing-page/sections/hiw-section";


export default function Home() {
  return (
    <div className='overflow-x-hidden bg-gradient-to-b from-[#14141A] to-[#14141A]/50'>
    <HeroSection />
    <AboutSection />
    <FeaturesSection />
    <HiwSection />
    <Footer />
</div>
  );
}
