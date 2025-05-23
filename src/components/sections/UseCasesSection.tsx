
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../AnimatedText';

const UseCasesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const casesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !casesRef.current) return;
    
    const useCases = casesRef.current.querySelectorAll('.use-case');
    
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.fromTo(useCases,
          { 
            opacity: 0, 
            y: 50 
          },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.2, 
            duration: 0.8,
            ease: "power3.out"
          }
        );
      },
      once: true
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const useCases = [
    {
      title: "Scientific Research",
      description: "Explore multiple hypotheses in parallel, evaluating evidence for each path before converging on the most promising direction.",
      color: "blue"
    },
    {
      title: "Multi-step Planning",
      description: "Break down complex tasks into multiple paths, evaluating different approaches to find the optimal solution strategy.",
      color: "purple"
    },
    {
      title: "Decision Making",
      description: "Evaluate multiple decision paths simultaneously, comparing tradeoffs, risks, and potential outcomes to make better choices.",
      color: "green"
    }
  ];
  
  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-grotesk font-bold mb-6">
            <AnimatedText 
              text="Use Cases" 
              element="span"
              className="text-gradient"
              animationType="chars"
              stagger={0.03}
            />
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Our parallel reasoning protocol unlocks new capabilities across multiple domains.
          </p>
        </div>
        
        <div 
          ref={casesRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className={`use-case glass-panel p-8 rounded-lg border-${useCase.color === 'blue' ? 'neon-blue/20' : useCase.color === 'purple' ? 'neon-purple/20' : 'neon-green/20'}`}
            >
              <div className="h-40 mb-6 rounded bg-white/5 flex items-center justify-center overflow-hidden relative">
                {/* Animated SVG illustration */}
                <div className={`absolute inset-0 bg-${useCase.color === 'blue' ? 'neon-blue/5' : useCase.color === 'purple' ? 'neon-purple/5' : 'neon-green/5'}`}>
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path 
                      fill={useCase.color === 'blue' ? '#00e5ff' : useCase.color === 'purple' ? '#8b5cf6' : '#39ff14'} 
                      opacity="0.2"
                      d="M41.9,-62.5C54.6,-55.2,65.2,-43,71.2,-29.1C77.2,-15.1,78.6,0.8,74.3,15C70.1,29.3,60.2,42.1,47.7,53.3C35.3,64.4,20.2,74,2.8,76.1C-14.7,78.1,-34.5,72.6,-47.8,61.3C-61.1,50,-68,32.9,-71.2,15.4C-74.3,-2.1,-73.7,-19.9,-66,-32.8C-58.3,-45.7,-43.4,-53.5,-29.6,-60.3C-15.7,-67.2,-2.9,-73,9.5,-71.8C21.9,-70.6,29.3,-69.8,41.9,-62.5Z" 
                      transform="translate(100 100)" 
                      className="animate-float"
                    />
                  </svg>
                </div>
                
                {/* Icons representing each use case */}
                <div className="relative z-10">
                  {index === 0 && (
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6H20M4 10H12M4 14H20M4 18H12" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 18C14 17.4477 14.4477 17 15 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H15C14.4477 19 14 18.5523 14 18Z" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 17C14.2636 17 13.5276 16.5895 13 16C12.4724 15.4105 11.7364 15 11 15C10.2636 15 9.52736 15.4105 9 16C8.47264 16.5895 7.73636 17 7 17" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  
                  {index === 1 && (
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 17L15 17" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 6V13M12 13L9 10M12 13L15 10" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  
                  {index === 2 && (
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 16L12 21L17 16" stroke="#39ff14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 3V21" stroke="#39ff14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 9L3 9" stroke="#39ff14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 3L3 3" stroke="#39ff14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
              
              <h3 className="text-xl font-grotesk font-medium mb-3">{useCase.title}</h3>
              <p className="text-gray-300">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
