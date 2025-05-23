
import React from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'blue' | 'purple' | 'green';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  color = 'blue',
  onClick,
  className,
  size = 'md',
  ...props
}) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (!buttonRef.current || !glowRef.current) return;
    
    const button = buttonRef.current;
    const glow = glowRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(glow, {
        x: x,
        y: y,
        duration: 0.2,
        ease: "power1.out"
      });
    };
    
    const handleMouseEnter = () => {
      gsap.to(glow, {
        opacity: 0.8,
        scale: 1.5,
        duration: 0.3,
        ease: "power1.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(glow, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: "power1.out"
      });
    };
    
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  const colorClasses = {
    blue: "border-neon-blue hover:shadow-neon-blue",
    purple: "border-neon-purple hover:shadow-neon-purple",
    green: "border-neon-green hover:shadow-neon-green"
  };
  
  const glowColors = {
    blue: "bg-neon-blue",
    purple: "bg-neon-purple",
    green: "bg-neon-green"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <button 
      ref={buttonRef}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden font-mono tracking-wide font-medium",
        "border bg-black/50 backdrop-blur-sm transition-all duration-300",
        "hover:bg-black/70 flex items-center justify-center gap-2",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black",
        colorClasses[color],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <div 
        ref={glowRef}
        className={cn(
          "absolute w-20 h-20 rounded-full opacity-0 blur-xl pointer-events-none",
          "-translate-x-1/2 -translate-y-1/2 mix-blend-screen",
          glowColors[color]
        )}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default GlowButton;
