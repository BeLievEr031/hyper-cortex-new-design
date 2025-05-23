
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../AnimatedText';

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !featuresRef.current || !horizontalRef.current) return;
    
    const features = featuresRef.current.querySelectorAll('.feature-item');
    
    // Initialize ScrollTrigger for horizontal scrolling
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${horizontalRef.current!.offsetWidth - window.innerWidth}`,
      pin: true,
      anticipatePin: 1,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.to(horizontalRef.current, {
          x: -self.progress * (horizontalRef.current!.offsetWidth - window.innerWidth),
          ease: "none"
        });
      }
    });
    
    // Animate features when they come into view
    features.forEach((feature, index) => {
      gsap.fromTo(feature,
        { 
          opacity: 0,
          y: 30
        },
        { 
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: feature,
            start: "left center",
            toggleActions: "play none none reverse",
            markers: false
          },
          duration: 0.5,
          delay: index * 0.1
        }
      );
    });
    
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const features = [
    {
      icon: "🔀",
      title: "Parallel Reasoning",
      description: "Explore multiple reasoning paths simultaneously, just like human cognition."
    },
    {
      icon: "🌿",
      title: "Branching Logic",
      description: "Create and manage branches of thought to compare different approaches."
    },
    {
      icon: "🔄",
      title: "Merge & Resolve",
      description: "Intelligently combine insights from different reasoning paths."
    },
    {
      icon: "📊",
      title: "Evaluation Metrics",
      description: "Quantify the quality of different reasoning approaches."
    },
    {
      icon: "🤝",
      title: "Multi-Agent Compatible",
      description: "Integrate with various agent frameworks and models."
    },
    {
      icon: "🚀",
      title: "Performance Boost",
      description: "Up to 40% improvement in complex reasoning tasks."
    }
  ];
  
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div 
        ref={horizontalRef}
        className="h-full flex items-center"
        style={{ width: '300%' }} // Adjust based on content
      >
        {/* Title panel */}
        <div className="h-full w-screen flex flex-col justify-center px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-grotesk font-bold mb-6">
              <AnimatedText 
                text="Core Features" 
                element="span"
                className="text-gradient"
                animationType="chars"
                stagger={0.03}
              />
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
              Our protocol enables AI systems to think along multiple paths simultaneously,
              evaluating and combining insights for better reasoning.
            </p>
          </div>
        </div>
        
        {/* Features grid */}
        <div 
          ref={featuresRef}
          className="h-full w-screen flex items-center px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.slice(0, 3).map((feature, index) => (
              <div 
                key={index}
                className="feature-item glass-panel p-8 rounded-lg group hover:border-neon-blue/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-grotesk font-medium mb-3 group-hover:text-neon-blue transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* More features */}
        <div className="h-full w-screen flex items-center px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.slice(3).map((feature, index) => (
              <div 
                key={index}
                className="feature-item glass-panel p-8 rounded-lg group hover:border-neon-purple/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-grotesk font-medium mb-3 group-hover:text-neon-purple transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
