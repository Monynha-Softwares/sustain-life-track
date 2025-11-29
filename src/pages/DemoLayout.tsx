import { useState, useMemo } from "react";
import { Dashboard } from "@/components/Dashboard";
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
  Leaf,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for demo mode
const mockActivities = [
  {
    id: 'demo-1',
    type: 'recycling',
    description: 'Recycled plastic bottles and paper',
    details: 'Separated 5kg of recyclables.',
    points: 5,
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    user_id: 'demo-user',
  },
  {
    id: 'demo-2',
    type: 'transport',
    description: 'Biked to work',
    details: 'Saved CO2 emissions by cycling 10km.',
    points: 10,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    user_id: 'demo-user',
  },
  {
    id: 'demo-3',
    type: 'energy',
    description: 'Switched off lights when leaving room',
    details: 'Consciously reduced energy consumption.',
    points: 8,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    user_id: 'demo-user',
  },
  {
    id: 'demo-4',
    type: 'planting',
    description: 'Watered garden plants',
    details: 'Helped local flora thrive.',
    points: 15,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    user_id: 'demo-user',
  },
  {
    id: 'demo-5',
    type: 'water',
    description: 'Took a shorter shower',
    details: 'Reduced water usage by 5 minutes.',
    points: 7,
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
    user_id: 'demo-user',
  },
];

const DemoLayout = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  const userStats = useMemo(() => {
    const totalPoints = mockActivities.reduce((sum, activity) => sum + activity.points, 0);
    const totalActivities = mockActivities.length;

    let currentStreak = 0;
    if (mockActivities.length > 0) {
      const sortedActivities = [...mockActivities].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      let lastDate: Date | null = null;
      for (const activity of sortedActivities) {
        const activityDate = new Date(activity.created_at);
        activityDate.setHours(0, 0, 0, 0);

        if (!lastDate) {
          currentStreak = 1;
        } else {
          const diffTime = Math.abs(activityDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            currentStreak++;
          } else if (diffDays > 1) {
            break;
          }
        }
        lastDate = activityDate;
      }
    }

    const weeklyGoal = 200;
    const weeklyProgress = (totalPoints / weeklyGoal) * 100;

    return {
      totalPoints,
      weeklyGoal,
      currentStreak,
      totalActivities,
      weeklyProgress: Math.min(100, weeklyProgress),
    };
  }, []);

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
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            <Dashboard userStats={userStats} recentActivities={mockActivities} />
          </div>
        );

      case 'log':
        return (
          <div className="p-6 max-w-lg mx-auto space-y-6 text-center">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Log Your Eco Action</h2>
              <p className="text-muted-foreground">Every sustainable action counts towards a better planet</p>
            </div>
            <Card className="p-6 card-nature">
              <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ready to make an impact?</h3>
              <p className="text-muted-foreground mb-4">
                Log your real eco actions by creating an account or logging in!
              </p>
              <Button variant="nature" className="w-full" onClick={() => navigate('/login')}>
                <Plus className="mr-2" />
                Sign Up / Log In
              </Button>
            </Card>
          </div>
        );

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
              <h2 className="text-2xl font-bold text-foreground mb-2">Demo Profile</h2>
              <p className="text-muted-foreground">This is a preview of your eco journey</p>
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
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Badges</div>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button variant="nature" className="w-full" onClick={() => navigate('/login')}>
                Sign Up / Log In
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
                Back to Home
              </Button>
            </div>
          </div>
        );

      default:
        return <Dashboard userStats={userStats} recentActivities={mockActivities} />;
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

export default DemoLayout;