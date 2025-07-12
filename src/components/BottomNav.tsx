import { Home, Plus, MessageSquare, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'log', label: 'Log Action', icon: Plus },
    { id: 'feed', label: 'Feed', icon: MessageSquare },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-border">
      <nav className="flex items-center justify-around max-w-md mx-auto px-6 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center p-2 rounded-xl transition-all duration-300",
                isActive 
                  ? "text-primary bg-accent transform scale-105" 
                  : "text-muted-foreground hover:text-primary hover:bg-accent/50"
              )}
            >
              <Icon 
                className={cn(
                  "h-6 w-6 mb-1 transition-all duration-300",
                  isActive && "animate-grow"
                )} 
              />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-pulse-success"></div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}