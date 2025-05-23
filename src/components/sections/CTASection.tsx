
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../AnimatedText';
import GlowButton from '../GlowButton';

interface CTASectionProps {
  onJoinWaitlist: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onJoinWaitlist }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !circlesRef.current) return;
    
    const circles = circlesRef.current.querySelectorAll('.circle');
    
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60%",
      onEnter: () => {
        gsap.fromTo(circles,
          { 
            scale: 0,
            opacity: 0 
          },
          { 
            scale: 1,
            opacity: 1, 
            stagger: 0.2, 
            duration: 1.5,
            ease: "elastic.out(1, 0.3)"
          }
        );
      },
      once: true
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-grotesk font-bold mb-6">
          <AnimatedText 
            text="Let's Build the" 
            element="span"
            className="block text-white glow-blue"
            animationType="words"
            stagger={0.1}
          />
          <AnimatedText 
            text="Cognitive Web" 
            element="span"
            className="block text-gradient mt-2"
            animationType="chars"
            stagger={0.05}
            delay={0.5}
          />
        </h2>
        
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Join our network of researchers, developers, and AI enthusiasts 
          building the future of artificial reasoning.
        </p>
        
        <div className="flex justify-center">
          <GlowButton 
            color="purple" 
            size="lg"
            onClick={onJoinWaitlist}
            className="rounded-md"
          >
            Join the Waitlist
          </GlowButton>
        </div>
        
        {/* Research logos */}
        <div className="mt-20">
          <p className="text-sm uppercase font-mono tracking-wider text-gray-400 mb-6">
            Backed by Research
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {["Stanford AI Lab", "MIT CSAIL", "Berkeley AI Research"].map((org, i) => (
              <div key={i} className="text-gray-500 font-grotesk font-medium">
                {org}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div 
        ref={circlesRef}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="circle absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-neon-blue/10 blur-3xl"></div>
        <div className="circle absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-purple/10 blur-3xl"></div>
        <div className="circle absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-neon-green/10 blur-3xl"></div>
      </div>
    </section>
  );
};

export default CTASection;
