
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import GlowButton from './GlowButton';
import AnimatedText from './AnimatedText';

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Success!",
        description: "You've joined the waitlist. We'll be in touch soon.",
        variant: "default",
      });
      onOpenChange(false);
      setEmail('');
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-panel border-neon-blue/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>
            <AnimatedText 
              text="Join the Cognitive Web" 
              element="h3" 
              className="text-2xl font-grotesk text-gradient"
              animationType="chars"
              stagger={0.02}
            />
          </DialogTitle>
          <DialogDescription className="text-gray-300 mt-2">
            <AnimatedText 
              text="Enter your email to join the waitlist and be first to access our protocol." 
              element="p"
              animationType="words"
              stagger={0.03}
              delay={0.4}
            />
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-white/10 focus:border-neon-blue/70 
                        text-white placeholder:text-gray-400"
            />
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <GlowButton 
              type="submit" 
              color="blue" 
              className="w-full sm:w-auto rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Join Waitlist"}
            </GlowButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
