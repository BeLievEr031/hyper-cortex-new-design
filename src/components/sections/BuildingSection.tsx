
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../AnimatedText';

const BuildingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;
    
    const cards = cardsRef.current.querySelectorAll('.building-card');
    
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.fromTo(cards,
          { 
            opacity: 0, 
            y: 50,
            rotateX: -10,
            rotateY: 5
          },
          { 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            rotateY: 0,
            duration: 0.8, 
            stagger: 0.2,
            ease: "power2.out"
          }
        );
      },
      once: true
    });
    
    // Card hover animations
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          boxShadow: '0 20px 25px -5px rgba(0, 229, 255, 0.1), 0 10px 10px -5px rgba(0, 229, 255, 0.04)',
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: '0 0 0 0 rgba(0, 229, 255, 0)',
          duration: 0.3
        });
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const buildingCards = [
    {
      title: "Git for Thoughts",
      description: "Version control for reasoning paths, allowing AI systems to branch, explore, and merge different lines of thought.",
      color: "blue",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 3L21 9M21 9L15 15M21 9H9C6.79086 9 5 10.7909 5 13V21" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Kubernetes for Cognitive Tasks",
      description: "Orchestrate and manage complex reasoning processes across multiple agents and reasoning paths.",
      color: "purple",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69752 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69752 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.27 6.96L12 12.01L20.73 6.96" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22.08V12" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Consensus Protocol",
      description: "Efficiently merge and evaluate different reasoning paths to find optimal solutions and avoid faulty logic.",
      color: "green",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 8L3 12L7 16" stroke="#39ff14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 8L21 12L17 16" stroke="#39ff14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 4L10 20" stroke="#39ff14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];
  
  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-grotesk font-bold mb-6">
            <AnimatedText 
              text="What We're Building" 
              element="span"
              className="text-gradient"
              animationType="chars"
              stagger={0.03}
            />
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            A protocol stack for AI systems to explore multiple reasoning paths in parallel,
            evaluate alternatives, and converge on optimal solutions.
          </p>
        </div>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 perspective"
        >
          {buildingCards.map((card, index) => (
            <div 
              key={index}
              className={`building-card glass-panel p-8 rounded-lg flex flex-col transition-all duration-300 preserve-3d border border-${card.color === 'blue' ? 'neon-blue/20' : card.color === 'purple' ? 'neon-purple/20' : 'neon-green/20'}`}
            >
              <div className={`mb-6 text-${card.color === 'blue' ? 'neon-blue' : card.color === 'purple' ? 'neon-purple' : 'neon-green'}`}>
                {card.icon}
              </div>
              
              <h3 className="text-xl font-grotesk font-medium mb-3">{card.title}</h3>
              <p className="text-gray-300">{card.description}</p>
              
              {/* Decorative element */}
              <div className={`absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-5 bg-${card.color === 'blue' ? 'neon-blue' : card.color === 'purple' ? 'neon-purple' : 'neon-green'}`}></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-blue/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-purple/5 blur-3xl"></div>
      </div>
    </section>
  );
};

export default BuildingSection;
