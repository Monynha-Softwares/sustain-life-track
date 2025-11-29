import React from 'react';
import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showTagline?: boolean;
  taglineClassName?: string;
}

export function Logo({ 
  className, 
  iconClassName, 
  textClassName, 
  showTagline = false, 
  taglineClassName 
}: LogoProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="flex items-center">
        <Leaf className={cn("mr-2 text-primary", iconClassName)} />
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