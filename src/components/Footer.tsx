import React from 'react';
import { Logo } from './Logo'; // Import the new Logo component

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6 px-4 text-center text-muted-foreground text-sm mt-8">
      <div className="max-w-md mx-auto flex flex-col items-center space-y-3">
        <Logo 
          iconClassName="h-5 w-5" 
          textClassName="font-semibold text-primary"
          className="flex-row"
        />
        <p>
          &copy; {new Date().getFullYear()} Monynha Softwares. All rights reserved.
        </p>
        <a 
          href="https://monynha.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary hover:underline transition-colors"
        >
          Visit Monynha.com
        </a>
      </div>
    </footer>
  );
}