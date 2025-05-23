
import React, { useEffect, useState } from 'react';
import CustomCursor from '@/components/ui/custom-cursor';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/sections/HeroSection';
import WhySection from '@/components/sections/WhySection';
import BuildingSection from '@/components/sections/BuildingSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import UseCasesSection from '@/components/sections/UseCasesSection';
import TechStackSection from '@/components/sections/TechStackSection';
import CTASection from '@/components/sections/CTASection';
import WaitlistModal from '@/components/WaitlistModal';
import Logo2Src from "../assets/Logo-2.png"
import Logo3Src from "../assets/Logo-3.png"
// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Index = () => {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const handleOpenWaitlist = () => {
    setWaitlistOpen(true);
  };

  useEffect(() => {
    // Set up smooth scrolling
    const setupScroll = async () => {
      try {
        // Applying a basic smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        gsap.from(".logo", {
          opacity: 0,
          delay: .1,
          duration: .8
        })
      } catch (error) {
        console.error('Error setting up smooth scroll:', error);
      }
    };

    setupScroll();

    // Clean up the effect
    return () => {
      document.documentElement.style.scrollBehavior = '';
      // Kill all GSAP animations and ScrollTriggers on component unmount
      gsap.killTweensOf('*');
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white overflow-x-hidden">
      {/* Custom cursor */}
      <CustomCursor />

      {/* Main content */}
      <main>
        <div className='logo w-full md:w-auto absolute z-10 md:left-5 md:top-5 pt-2 pb-2 md:gap-0 flex flex-col md:flex-row items-center justify-center md:justify-start'>
          <img src={Logo3Src} className='w-20 md:w-32 text-center' />
          <div className='md:-mx-7 flex md:block gap-2'>
            <p className='text-sm md:text-xl uppercase font-extrabold'>Hyper</p>
            <p className='text-sm md:text-xl uppercase font-extrabold'>Cortex</p>
          </div>
        </div>
        <HeroSection onJoinWaitlist={handleOpenWaitlist} />
        <WhySection />
        <BuildingSection />
        <FeaturesSection />
        <UseCasesSection />
        <TechStackSection />
        <CTASection onJoinWaitlist={handleOpenWaitlist} />
      </main>

      {/* Waitlist Modal */}
      <WaitlistModal
        open={waitlistOpen}
        onOpenChange={setWaitlistOpen}
      />
    </div>
  );
};

export default Index;
