import { useState, useMemo } from "react";
import { Dashboard } from "@/components/Dashboard";
import { ActivityLogger } from "@/components/ActivityLogger";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Calendar,
  User,
  MapPin,
  Clock,
  Users,
  Heart,
  MessageCircle,
  Loader2
} from "lucide-react";
import { useSession } from "@/components/SessionContextProvider";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// Define the type for an activity fetched from Supabase
interface EcoActivity {
  id: string;
  type: string;
  description: string;
  details: string | null;
  points: number;
  created_at: string;
  user_id: string;
}

const AppLayout = () => {
  const { user, isLoading: isSessionLoading } = useSession();
  const [activeTab, setActiveTab] = useState('home');

  // Fetch activities from Supabase
  const { data: activities, isLoading: isActivitiesLoading, error, refetch } = useQuery<EcoActivity[]>({
    queryKey: ['ecoActivities', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error: fetchError } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      return data || [];
    },
    enabled: !!user?.id, // Only run query if user is logged in
  });

  // Calculate user stats based on fetched activities
  const userStats = useMemo(() => {
    if (!activities) {
      return {
        totalPoints: 0,
        weeklyGoal: 200, // Default goal
        currentStreak: 0,
        totalActivities: 0,
        weeklyProgress: 0,
      };
    }

    const totalPoints = activities.reduce((sum, activity) => sum + activity.points, 0);
    const totalActivities = activities.length;

    // Simple streak calculation (can be improved)
    let currentStreak = 0;
    if (activities.length > 0) {
      const sortedActivities = [...activities].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      let lastDate: Date | null = null;
      for (const activity of sortedActivities) {
        const activityDate = new Date(activity.created_at);
        activityDate.setHours(0, 0, 0, 0); // Normalize to start of day

        if (!lastDate) {
          currentStreak = 1;
        } else {
          const diffTime = Math.abs(activityDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) { // Consecutive day
            currentStreak++;
          } else if (diffDays > 1) { // Gap in streak
            break;
          }
        }
        lastDate = activityDate;
      }
    }

    const weeklyGoal = 200; // Example weekly goal
    const weeklyProgress = (totalPoints / weeklyGoal) * 100;

    return {
      totalPoints,
      weeklyGoal,
      currentStreak,
      totalActivities,
      weeklyProgress: Math.min(100, weeklyProgress), // Cap at 100%
    };
  }, [activities]);

  if (error) {
    toast.error('Error fetching activities', { description: error.message });
  }

  const feedPosts = [
    {
      id: '1',
      user: 'Sarah Green',
      activity: 'Planted 5 trees in the community park',
      points: 25,
      time: '2 hours ago',
      likes: 12,
      comments: 3,
    },
    {
      id: '2',
      user: 'Mike Earth',
      activity: 'Organized neighborhood recycling drive',
      points: 30,
      time: '5 hours ago',
      likes: 18,
      comments: 7,
    },
    {
      id: '3',
      user: 'Luna Forest',
      activity: 'Switched to solar energy at home',
      points: 50,
      time: '1 day ago',
      likes: 24,
      comments: 12,
    },
  ];

  const events = [
    {
      id: '1',
      title: 'Community Tree Planting',
      date: '2024-02-15',
      time: '09:00 AM',
      location: 'Central Park',
      participants: 23,
    },
    {
      id: '2',
      title: 'Beach Cleanup Drive',
      date: '2024-02-18',
      time: '07:00 AM',
      location: 'Sunset Beach',
      participants: 45,
    },
    {
      id: '3',
      title: 'Sustainable Living Workshop',
      date: '2024-02-20',
      time: '02:00 PM',
      location: 'EcoCenter',
      participants: 15,
    },
  ];

  const renderTabContent = () => {
    if (isSessionLoading || isActivitiesLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            <Dashboard userStats={userStats} recentActivities={activities || []} />
          </div>
        );

      case 'log':
        return <ActivityLogger refetchActivities={refetch} />;

      case 'feed':
        return (
          <div className="p-6 max-w-lg mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Community Feed</h2>
              <p className="text-muted-foreground">See what other eco warriors are doing</p>
            </div>

            <div className="space-y-4">
              {feedPosts.map((post) => (
                <Card key={post.id} className="p-4 card-nature">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-foreground">{post.user}</span>
                      </div>
                      <Badge variant="secondary">+{post.points} pts</Badge>
                    </div>

                    <p className="text-foreground">{post.activity}</p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{post.time}</span>
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="p-6 max-w-lg mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Local Events</h2>
              <p className="text-muted-foreground">Join your community in making a difference</p>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="p-4 card-nature">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">{event.title}</h3>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{event.participants} participants</span>
                      </div>
                    </div>

                    <Button variant="nature" size="sm" className="w-full">
                      RSVP to Event
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="p-6 max-w-lg mx-auto space-y-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Your Profile</h2>
              <p className="text-muted-foreground">Track your eco journey</p>
            </div>

            <Card className="p-6 card-nature text-center">
              <h3 className="text-lg font-semibold mb-4">Eco Impact Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-primary">{userStats.totalPoints}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{userStats.totalActivities}</div>
                  <div className="text-sm text-muted-foreground">Activities</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{userStats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">0</div> {/* Placeholder for badges */}
                  <div className="text-sm text-muted-foreground">Badges</div>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button variant="outline" className="w-full">Edit Profile</Button>
              <Button variant="outline" className="w-full">Notification Settings</Button>
              <Button variant="outline" className="w-full">Privacy Settings</Button>
              <Button variant="outline" className="w-full">Help & Support</Button>
              <Button variant="destructive" className="w-full" onClick={() => supabase.auth.signOut()}>
                Sign Out
              </Button>
            </div>
          </div>
        );

      default:
        return <Dashboard userStats={userStats} recentActivities={activities || []} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-nature pb-20">
      {renderTabContent()}
      <Footer />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default AppLayout;