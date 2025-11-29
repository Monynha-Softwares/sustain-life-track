import React from 'react';
import { Leaf, LucideIcon } from 'lucide-react'; // Import LucideIcon type
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showTagline?: boolean;
  taglineClassName?: string;
  icon?: LucideIcon; // Add icon prop to allow custom icons
}

export function Logo({ 
  className, 
  iconClassName, 
  textClassName, 
  showTagline = false, 
  taglineClassName,
  icon: Icon = Leaf // Use Leaf as default icon if none is provided
}: LogoProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="flex items-center">
        <Icon className={cn("mr-2 text-primary", iconClassName)} /> {/* Use the dynamic Icon prop */}
        <span className={cn("font-bold text-foreground", textClassName)}>Monynha Eco</span>
      </div>
      {showTagline && (
        <p className={cn("italic mt-1 text-muted-foreground", taglineClassName)}>
          Where every green step is a playful leap!
        </p>
      )}
    </div>
  );
}