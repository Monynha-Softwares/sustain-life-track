import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { ActivityLogger } from "@/components/ActivityLogger";
import { BottomNav } from "@/components/BottomNav";
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
  MessageCircle
} from "lucide-react";

const AppLayout = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activities, setActivities] = useState([
    {
      id: '1',
      type: 'transport',
      description: 'Biked to work instead of driving',
      points: 10,
      date: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'recycling',
      description: 'Separated plastic and paper waste',
      points: 5,
      date: new Date(Date.now() - 86400000).toISOString(),
    }
  ]);

  const userStats = {
    totalPoints: 125,
    weeklyGoal: 200,
    currentStreak: 7,
    totalActivities: 23,
    weeklyProgress: 62.5,
  };

  const handleActivityLogged = (activity: any) => {
    setActivities(prev => [activity, ...prev]);
    // Show celebration animation or toast here
  };

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
            <Dashboard userStats={userStats} recentActivities={activities} />
          </div>
        );

      case 'log':
        return <ActivityLogger onActivityLogged={handleActivityLogged} />;

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
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Badges</div>
                </div>
              </div>
            </Card>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full">Edit Profile</Button>
              <Button variant="outline" className="w-full">Notification Settings</Button>
              <Button variant="outline" className="w-full">Privacy Settings</Button>
              <Button variant="outline" className="w-full">Help & Support</Button>
            </div>
          </div>
        );

      default:
        return <Dashboard userStats={userStats} recentActivities={activities} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-nature pb-20">
      {renderTabContent()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default AppLayout;