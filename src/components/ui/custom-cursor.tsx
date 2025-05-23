
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cursorRef.current) return;
    
    const cursor = cursorRef.current;
    const trail = cursorTrailRef.current;
    
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power1.out"
      });
      
      if (trail) {
        gsap.to(trail, {
          x: clientX,
          y: clientY,
          duration: 0.5,
          ease: "power1.out",
          delay: 0.05
        });
      }
    };
    
    const onMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.2,
        ease: "power2.out"
      });
    };
    
    const onMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    };
    
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('button') || 
          target.closest('a') || 
          target.classList.contains('hoverable')) {
        gsap.to(cursor, {
          scale: 1.5,
          backgroundColor: "rgba(57, 255, 20, 0.3)",
          border: "1px solid rgba(57, 255, 20, 0.5)",
          duration: 0.3
        });
      }
    };
    
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('button') || 
          target.closest('a') || 
          target.classList.contains('hoverable')) {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "rgba(0, 229, 255, 0.3)",
          border: "1px solid rgba(0, 229, 255, 0.5)",
          duration: 0.3
        });
      }
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);
  
  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Fix for links and buttons
    const allClickables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    allClickables.forEach((el) => {
      (el as HTMLElement).style.cursor = 'none';
    });
    
    return () => {
      document.body.style.cursor = '';
      allClickables.forEach((el) => {
        (el as HTMLElement).style.cursor = '';
      });
    };
  }, []);
  
  return (
    <>
      <div 
        ref={cursorTrailRef}
        className="custom-cursor bg-neon-purple/20 blur-md w-10 h-10"
      />
      <div 
        ref={cursorRef}
        className="custom-cursor bg-neon-blue/30 border border-neon-blue/50 mix-blend-screen"
      />
    </>
  );
};

export default CustomCursor;
