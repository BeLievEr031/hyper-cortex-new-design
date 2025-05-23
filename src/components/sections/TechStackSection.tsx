
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../AnimatedText';

const TechStackSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !techRef.current) return;
    
    const logos = techRef.current.querySelectorAll('.tech-logo');
    
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.fromTo(logos,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.1, 
            duration: 0.5,
            ease: "power2.out"
          }
        );
      },
      once: true
    });
    
    // Typing animation for code
    if (codeRef.current) {
      const codeText = codeRef.current.textContent || '';
      codeRef.current.textContent = '';
      let currentChar = 0;
      
      ScrollTrigger.create({
        trigger: codeRef.current,
        start: "top 80%",
        onEnter: () => {
          const typeInterval = setInterval(() => {
            if (currentChar < codeText.length) {
              codeRef.current!.textContent += codeText[currentChar];
              currentChar++;
            } else {
              clearInterval(typeInterval);
            }
          }, 20);
        },
        once: true
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const techLogos = [
    { name: "LangChain", bg: "bg-yellow-500" },
    { name: "AutoGen", bg: "bg-blue-500" },
    { name: "LlamaIndex", bg: "bg-green-500" },
    { name: "Semantic Kernel", bg: "bg-purple-500" }
  ];
  
  const sampleCode = `import { ParallelReasoner } from "@cognitive-protocol/core";

// Initialize a parallel reasoning task
const reasoner = new ParallelReasoner({
  maxBranches: 3,
  mergeStrategy: "consensus"
});

// Fork into multiple reasoning paths
const branches = await reasoner.fork({
  prompt: "What are the ethical implications of AI?",
  perspectives: [
    "Utilitarian",
    "Deontological",
    "Virtue Ethics"
  ]
});

// Merge results using consensus protocol
const result = await reasoner.merge(branches);

console.log(result.finalConclusion);`;
  
  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-grotesk font-bold mb-6">
            <AnimatedText 
              text="Built for Builders" 
              element="span"
              className="text-gradient"
              animationType="chars"
              stagger={0.03}
            />
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Our protocol integrates seamlessly with popular AI frameworks and agent architectures.
          </p>
        </div>
        
        {/* Tech stack logos */}
        <div 
          ref={techRef}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {techLogos.map((tech, index) => (
            <div 
              key={index}
              className="tech-logo glass-panel px-6 py-4 rounded-lg flex items-center gap-3"
            >
              <div className={`w-3 h-3 rounded-full ${tech.bg}`}></div>
              <span className="font-mono text-sm">{tech.name}</span>
            </div>
          ))}
        </div>
        
        {/* Code example */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="glass-panel rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs font-mono ml-2 text-gray-400">parallal-reasoning-example.js</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto text-gray-300">
              <code ref={codeRef}>
                {sampleCode}
              </code>
            </pre>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute bottom-0 right-0 w-full h-full -z-10 opacity-30">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#00e5ff" opacity="0.1" d="M38.3,-66.1C51.3,-59.5,64.6,-52.5,70.8,-41.5C77.1,-30.5,76.2,-15.2,73.8,-1.4C71.3,12.5,67.2,25,59.7,34.1C52.1,43.3,41,49.1,30.2,56.7C19.4,64.3,8.8,73.7,-2.3,77C-13.5,80.3,-25.1,77.6,-34.8,71.1C-44.5,64.7,-52.3,54.6,-58.3,43.6C-64.3,32.5,-68.6,20.6,-71.3,7.8C-74,-5,-75.2,-18.6,-70.3,-29C-65.3,-39.4,-54.2,-46.5,-42.7,-53.9C-31.3,-61.4,-19.5,-69.3,-5.8,-73.5C7.9,-77.7,25.2,-72.7,38.3,-66.1Z" transform="translate(150 150)" />
        </svg>
      </div>
    </section>
  );
};

export default TechStackSection;
