import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Target, 
  Zap, 
  TrendingUp,
  Calendar,
  Star,
  Leaf,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardProps {
  userStats: {
    totalPoints: number;
    weeklyGoal: number;
    currentStreak: number;
    totalActivities: number;
    weeklyProgress: number;
  };
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    points: number;
    created_at?: string;
    date?: string;
  }>;
}

export function Dashboard({ userStats, recentActivities }: DashboardProps) {
  const badges = [
    { name: "Eco Warrior", icon: Trophy, earned: true, color: "text-yellow-500" },
    { name: "Green Streak", icon: Zap, earned: true, color: "text-green-500" },
    { name: "Tree Lover", icon: Leaf, earned: false, color: "text-gray-400" },
    { name: "Earth Champion", icon: Award, earned: false, color: "text-gray-400" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, Eco Warrior! 🌱
        </h1>
        <p className="text-muted-foreground">
          Here's your sustainability impact so far
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center card-nature">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-gradient-primary">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-foreground">{userStats.totalPoints}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </div>
        </Card>

        <Card className="p-4 text-center card-nature">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-gradient-success">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-foreground">{userStats.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
        </Card>

        <Card className="p-4 text-center card-nature">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-secondary">
              <TrendingUp className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">{userStats.totalActivities}</div>
            <div className="text-sm text-muted-foreground">Activities</div>
          </div>
        </Card>

        <Card className="p-4 text-center card-nature">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-accent">
              <Target className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">{Math.round(userStats.weeklyProgress)}%</div>
            <div className="text-sm text-muted-foreground">Weekly Goal</div>
          </div>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="p-6 card-nature">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Weekly Goal Progress</h3>
            <Badge variant="secondary">
              {userStats.totalPoints}/{userStats.weeklyGoal} points
            </Badge>
          </div>
          <Progress 
            value={userStats.weeklyProgress} 
            className="h-3"
          />
          <p className="text-sm text-muted-foreground">
            {userStats.weeklyGoal - userStats.totalPoints > 0 
              ? `${userStats.weeklyGoal - userStats.totalPoints} more points to reach your weekly goal!`
              : "🎉 Weekly goal achieved! Keep up the amazing work!"
            }
          </p>
        </div>
      </Card>

      {/* Badges */}
      <Card className="p-6 card-nature">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.name}
                className={cn(
                  "flex flex-col items-center p-4 rounded-lg transition-all duration-300",
                  badge.earned 
                    ? "bg-gradient-to-br from-accent to-accent/80 hover:shadow-soft" 
                    : "bg-muted/50 grayscale"
                )}
              >
                <Icon className={cn("h-8 w-8 mb-2", badge.color)} />
                <span className="text-sm font-medium text-center">{badge.name}</span>
                {badge.earned && (
                  <Star className="h-4 w-4 text-yellow-500 mt-1" />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent Activities */}
      <Card className="p-6 card-nature">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
          <Calendar className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="space-y-3">
          {recentActivities.slice(0, 5).map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors duration-200"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground">{activity.description}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(activity.created_at || activity.date || '').toLocaleDateString()}
                </p>
              </div>
              <Badge variant="secondary" className="eco-badge">
                +{activity.points} pts
              </Badge>
            </div>
          ))}
          {recentActivities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Leaf className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Start logging your eco-friendly activities to see them here!</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}