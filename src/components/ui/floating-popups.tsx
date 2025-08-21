import { useState, useEffect } from "react";
import { X, Sparkles, MessageCircle, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingPopup {
  id: string;
  content: string;
  type: 'info' | 'promo' | 'reminder';
  position: { x: number; y: number };
  duration?: number;
}

const FloatingPopups = () => {
  const [popups, setPopups] = useState<FloatingPopup[]>([]);
  const [closedPopups, setClosedPopups] = useState<Set<string>>(new Set());

  const defaultPopups: FloatingPopup[] = [
    {
      id: 'welcome',
      content: '🌟 Welcome to BRCTC! Professional counseling & training services available.',
      type: 'info',
      position: { x: 20, y: 20 },
      duration: 8000
    },
    {
      id: 'emergency',
      content: '🚨 Need immediate support? Call us now: +254 721 683232',
      type: 'reminder',
      position: { x: window.innerWidth - 350, y: 80 },
      duration: 10000
    },
    {
      id: 'training',
      content: '🎓 New training programs starting soon! Limited spaces available.',
      type: 'promo',
      position: { x: 50, y: window.innerHeight - 150 },
      duration: 12000
    }
  ];

  useEffect(() => {
    // Show popups after a delay
    const timer = setTimeout(() => {
      setPopups(defaultPopups.filter(popup => !closedPopups.has(popup.id)));
    }, 2000);

    return () => clearTimeout(timer);
  }, [closedPopups]);

  useEffect(() => {
    // Auto-close popups based on their duration
    popups.forEach(popup => {
      if (popup.duration && !closedPopups.has(popup.id)) {
        setTimeout(() => {
          closePopup(popup.id);
        }, popup.duration);
      }
    });
  }, [popups]);

  const closePopup = (id: string) => {
    setClosedPopups(prev => new Set([...prev, id]));
    setPopups(prev => prev.filter(popup => popup.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'promo': return <Sparkles className="h-4 w-4" />;
      case 'reminder': return <AlertCircle className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getVariant = (type: string) => {
    switch (type) {
      case 'promo': return 'from-accent to-accent-light';
      case 'reminder': return 'from-destructive/80 to-destructive';
      default: return 'from-primary to-secondary';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {popups.map((popup) => (
        <div
          key={popup.id}
          className="absolute pointer-events-auto animate-fade-in"
          style={{ 
            left: `${Math.min(popup.position.x, window.innerWidth - 320)}px`,
            top: `${Math.min(popup.position.y, window.innerHeight - 100)}px`
          }}
        >
          <div className={cn(
            "max-w-sm p-4 rounded-lg shadow-xl backdrop-blur-md border border-white/20",
            "bg-gradient-to-r text-white relative group hover:scale-105 transition-all duration-300",
            getVariant(popup.type)
          )}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(popup.type)}
              </div>
              <p className="text-sm font-medium leading-relaxed flex-1">
                {popup.content}
              </p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => closePopup(popup.id)}
                className="h-6 w-6 p-0 text-white/80 hover:text-white hover:bg-white/20 flex-shrink-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            {/* Animated progress bar */}
            {popup.duration && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-lg overflow-hidden">
                <div 
                  className="h-full bg-white/60"
                  style={{
                    animation: `shrinkProgress ${popup.duration}ms linear forwards`
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ))}
      
      <style>
        {`
          @keyframes shrinkProgress {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>
    </div>
  );
};

export default FloatingPopups;