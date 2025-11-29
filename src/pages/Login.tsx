import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Logo } from '@/components/Logo'; // Import the Logo component

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-nature p-4">
      <Card className="w-full max-w-md card-nature">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Logo 
              iconClassName="h-8 w-8 text-primary" 
              textClassName="text-3xl font-bold text-foreground"
              className="flex-row"
            />
          </div>
          <CardDescription className="text-muted-foreground">
            Sign in or create an account to start your eco journey!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            providers={[]} // Only email/password by default, add others if needed
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--primary))',
                    brandAccent: 'hsl(var(--primary-glow))',
                    inputBackground: 'hsl(var(--input))',
                    inputBorder: 'hsl(var(--border))',
                    inputBorderHover: 'hsl(var(--ring))',
                    inputBorderFocus: 'hsl(var(--ring))',
                    inputText: 'hsl(var(--foreground))',
                    messageText: 'hsl(var(--destructive-foreground))',
                    messageBackground: 'hsl(var(--destructive))',
                    anchorTextColor: 'hsl(var(--primary))',
                    anchorTextHoverColor: 'hsl(var(--primary-glow))',
                  },
                },
              },
            }}
            theme="light" // Use light theme, can be dynamic based on app theme
            redirectTo={window.location.origin + '/app'} // Redirect to /app after successful login
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;