import { useState } from "react";
import { MessageCircle, Phone, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "+254721683232";

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello BRCTC! I'm interested in your counseling services and training programs. Could you please provide more information?");
    window.open(`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const actions = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      onClick: handleWhatsApp,
      className: "bg-green-500 hover:bg-green-600 text-white",
    },
    {
      icon: Phone,
      label: "Call",
      onClick: handleCall,
      className: "bg-blue-500 hover:bg-blue-600 text-white",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Action Buttons */}
      <div className={cn(
        "flex flex-col space-y-2 transition-all duration-300 transform",
        isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}>
        {actions.map((action, index) => (
          <div key={index} className="flex items-center space-x-3">
            <span className="bg-background/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-medium shadow-lg border">
              {action.label}
            </span>
            <Button
              size="sm"
              onClick={action.onClick}
              className={cn(
                "h-12 w-12 rounded-full shadow-lg transition-all duration-200 hover:scale-110",
                action.className
              )}
            >
              <action.icon className="h-6 w-6" />
            </Button>
          </div>
        ))}
      </div>

      {/* Main Toggle Button */}
      <Button
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full shadow-xl bg-gradient-to-br from-primary to-secondary hover:scale-110 transition-all duration-300",
          isOpen && "rotate-45"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Plus className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Pulse Animation */}
      {!isOpen && (
        <div className="absolute -bottom-2 -right-2 h-18 w-18 rounded-full bg-primary/30 animate-ping" />
      )}
    </div>
  );
};

export default FloatingActions;