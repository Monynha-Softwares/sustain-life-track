import React, { useState, useEffect, createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { Toaster, toast } from 'sonner';

interface SessionContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
          if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            if (location.pathname === '/login' || location.pathname.startsWith('/demo')) {
              navigate('/app'); // Redirect to app on sign in if coming from login or demo
            }
            toast.success('Welcome back!', { description: 'You have successfully logged in.' });
          }
        } else {
          setSession(null);
          setUser(null);
          if (event === 'SIGNED_OUT') {
            if (!location.pathname.startsWith('/demo')) { // Only redirect if not already in demo
              navigate('/login'); // Redirect to login on sign out
            }
            toast.info('Logged out', { description: 'You have been signed out.' });
          }
        }
        setIsLoading(false);
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user || null);
      setIsLoading(false);
      
      const isDemoPath = location.pathname.startsWith('/demo');

      if (!initialSession && !isDemoPath && location.pathname !== '/login') {
        navigate('/login');
      } else if (initialSession && (location.pathname === '/login' || isDemoPath)) {
        navigate('/app');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]); // Add location.pathname to dependencies

  return (
    <SessionContext.Provider value={{ session, user, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};