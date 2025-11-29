import { Button } from "@/components/ui/button";
import { Users, Award, Leaf } from "lucide-react"; // Removed Target from imports as it's no longer used directly
import heroImage from "@/assets/hero-eco.jpg";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo"; // Import the Logo component

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-transparent"></div>
      </div>

      {/* Floating elements - Removed Leaf and Target */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-32 left-20 float-gentle" style={{ animationDelay: '2s' }}>
          <Users className="h-10 w-10 text-green-300/35" />
        </div>
        <div className="absolute bottom-20 right-32 float-gentle" style={{ animationDelay: '0.5s' }}>
          <Award className="h-14 w-14 text-green-400/30" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in-up mb-4" style={{ animationDelay: '0s' }}>
          <Logo 
            iconClassName="h-8 w-8 md:h-10 md:w-10 text-green-200" 
            textClassName="text-2xl md:text-3xl font-extrabold text-green-200 tracking-wide uppercase"
            showTagline={true}
            taglineClassName="text-lg text-green-100 mt-1"
            className="flex-col"
          />
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Journey to
            <span className="block bg-gradient-to-r from-green-300 to-emerald-200 bg-clip-text text-transparent">
              Sustainable Living
            </span>
          </h1>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            Track eco-friendly actions, earn green points, and join a community 
            making the world better, one sustainable choice at a time.
          </p>
        </div>

        <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.6s' }}>
          <Button 
            className="btn-nature text-lg px-8 py-6" 
            size="lg" 
            onClick={() => navigate('/app')}
          >
            <Leaf className="mr-2" />
            Start Your Eco Journey
          </Button>
          <Button 
            className="btn-floating text-lg px-8 py-6" 
            size="lg"
          >
            <Users className="mr-2" />
            Join Community
          </Button>
        </div>

        {/* Stats preview */}
        <div className="animate-fade-in-up mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto" style={{ animationDelay: '0.8s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">15K+</div>
            <div className="text-green-200 text-sm">Eco Warriors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">2.3M</div>
            <div className="text-green-200 text-sm">Green Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">890</div>
            <div className="text-green-200 text-sm">Events Hosted</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}