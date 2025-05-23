
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import AnimatedText from '../AnimatedText';
import GlowButton from '../GlowButton';

interface HeroSectionProps {
  onJoinWaitlist: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onJoinWaitlist }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    const tl = gsap.timeline();

    // Animate the background
    tl.fromTo(bgRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 0.6, duration: 2, ease: "power3.out" },
      0
    );

    // Animate the section
    tl.fromTo(sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" },
      0.5
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Background Elements */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <div className="grid-bg"></div>
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/5 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-neon-purple/5 blur-3xl rounded-full top-1/4 left-1/4 w-1/2 h-1/2"></div>
        <div className="absolute inset-0 bg-neon-green/5 blur-3xl rounded-full bottom-1/4 right-1/4 w-1/2 h-1/2"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-2">
          <p className="text-neon-blue font-mono tracking-wider animate-pulse-glow">
            INTRODUCING
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-grotesk font-bold tracking-tighter">
            <AnimatedText
              text="Protocol for Parallel"
              element="h1"
              className="block text-white"
              animationType="words"
              stagger={0.1}
              delay={0.5}
            />
            <AnimatedText
              text="Chain-of-Thought Reasoning"
              element="span"
              animationType="words"
              className='text-gradient'
              stagger={0.1}
              delay={1.0}
            />
          </h1>
        </div>

        <div>
          <AnimatedText
            text="A New Reasoning Layer for Next-Gen Autonomous Agents"
            element="p"
            className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto"
            animationType="words"
            stagger={0.05}
            delay={1.5}
          />
        </div>

        <div className="mt-10 flex justify-center">
          <GlowButton
            color="blue"
            size="lg"
            onClick={onJoinWaitlist}
            className="rounded-md"
          >
            Join the Cognitive Web
          </GlowButton>
        </div>

        <div className="pt-12 opacity-50">
          <div className="flex justify-center gap-10">
            {['Fork', 'Merge', 'Consensus'].map((word, i) => (
              <div
                key={word}
                className="font-mono text-xs uppercase tracking-widest text-gray-400 flex gap-1.5 items-center"
                style={{ animationDelay: `${2 + i * 0.2}s` }}
              >
                <span className="animate-pulse-glow">•</span>
                <span>{word}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
