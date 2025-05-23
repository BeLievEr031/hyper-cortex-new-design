
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../AnimatedText';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WhySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.card');

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(sectionRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.3
          }
        );
      },
      once: true
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const cards = [
    {
      title: "Single-Threaded Thinking is Limited",
      description: "Current AI reasoning is linear and sequential, limiting its ability to solve complex problems efficiently."
    },
    {
      title: "Humans Think in Parallel",
      description: "Our brains naturally explore multiple reasoning paths simultaneously, then converge on the best solution."
    },
    {
      title: "AI Needs Multi-Threaded Cognition",
      description: "To achieve more robust reasoning, AI systems need to develop and explore multiple lines of thought in parallel."
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
              text="Why We Exist"
              element="span"
              className="text-gradient"
              animationType="chars"
              stagger={0.03}
            />
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We're building the infrastructure for AI systems to reason like humans -
            exploring multiple paths of thought simultaneously.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="card glass-panel p-8 rounded-lg flex flex-col relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <span className="font-mono text-sm text-neon-blue/80 mb-4">0{index + 1}</span>
              <h3 className="text-xl font-grotesk font-medium mb-3">{card.title}</h3>
              <p className="text-gray-300 flex-grow">{card.description}</p>

              {/* Visual metaphor */}
              <div className="mt-6 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full ${index === 0 ? 'bg-red-400' : index === 1 ? 'bg-neon-blue' : 'bg-neon-green'}`}
                  style={{ width: `${(index + 1) * 30}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Background visual showing single vs multi-threading */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none">
          <div className="relative max-w-5xl mx-auto h-full">
            <div className="absolute h-0.5 w-full bottom-10 bg-white/10"></div>

            <div className="absolute left-0 bottom-10 h-0.5 w-1/2 bg-neon-purple animate-pulse-glow"></div>

            <div className="absolute right-0 bottom-10">
              <div className="h-0.5 w-1/3 bg-neon-blue mb-2 animate-pulse-glow"></div>
              <div className="h-0.5 w-1/3 bg-neon-green animate-pulse-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
