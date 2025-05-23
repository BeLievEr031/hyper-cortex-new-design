import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTextProps {
  text: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  animationType: string;
  onComplete?: () => void;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  element = 'h2',
  className = '',
  stagger = 0.05,
  delay = 0.1,
  duration = 0.6,
  onComplete = () => { },
}) => {
  const textRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  // Font loading check
  useEffect(() => {
    if ('fonts' in document) {
      document.fonts.ready.then(() => setFontLoaded(true));
    } else {
      setTimeout(() => setFontLoaded(true), 1000);
    }
  }, []);

  useEffect(() => {
    if (!textRef.current || hasAnimatedRef.current || !fontLoaded) return;

    gsap.fromTo(
      textRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          once: true, // only animates once
        },
        onComplete: () => {
          onComplete();
          hasAnimatedRef.current = true;
        },
      }
    );
  }, [delay, duration, onComplete, fontLoaded]);

  const TextComponent = element as React.ElementType;
  const initialStyle = { opacity: fontLoaded ? undefined : 0 };

  return (
    <TextComponent
      ref={textRef}
      className={`split-text ${className}`}
      style={initialStyle}
    >
      {text}
    </TextComponent>
  );
};

export default AnimatedText;
