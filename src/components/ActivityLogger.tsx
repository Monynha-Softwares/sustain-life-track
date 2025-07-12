import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Bike, 
  Recycle, 
  Lightbulb, 
  TreePine, 
  Car, 
  Droplets,
  CheckCircle2,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const activityCategories = [
  { id: 'transport', name: 'Transport', icon: Bike, color: 'bg-blue-100 text-blue-700', points: 10 },
  { id: 'recycling', name: 'Recycling', icon: Recycle, color: 'bg-green-100 text-green-700', points: 5 },
  { id: 'energy', name: 'Energy Saving', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-700', points: 8 },
  { id: 'planting', name: 'Tree Planting', icon: TreePine, color: 'bg-emerald-100 text-emerald-700', points: 15 },
  { id: 'carpool', name: 'Carpooling', icon: Car, color: 'bg-purple-100 text-purple-700', points: 12 },
  { id: 'water', name: 'Water Conservation', icon: Droplets, color: 'bg-cyan-100 text-cyan-700', points: 7 },
];

interface ActivityLoggerProps {
  onActivityLogged: (activity: any) => void;
}

export function ActivityLogger({ onActivityLogged }: ActivityLoggerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [isLogging, setIsLogging] = useState(false);

  const handleLogActivity = async () => {
    if (!selectedCategory || !description) return;

    setIsLogging(true);
    
    const category = activityCategories.find(cat => cat.id === selectedCategory);
    const activity = {
      id: Date.now().toString(),
      type: selectedCategory,
      description,
      details,
      points: category?.points || 0,
      date: new Date().toISOString(),
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onActivityLogged(activity);
    
    // Reset form
    setSelectedCategory('');
    setDescription('');
    setDetails('');
    setIsLogging(false);
  };

  const selectedCategoryData = activityCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Log Your Eco Action</h2>
        <p className="text-muted-foreground">Every sustainable action counts towards a better planet</p>
      </div>

      {/* Category Selection */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Choose Activity Type</h3>
        <div className="grid grid-cols-2 gap-3">
          {activityCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Card
                key={category.id}
                className={cn(
                  "p-4 cursor-pointer transition-all duration-300 hover:shadow-soft",
                  isSelected 
                    ? "ring-2 ring-primary bg-accent transform scale-105" 
                    : "hover:bg-accent/50"
                )}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <Icon className="h-8 w-8 text-primary" />
                  <span className="font-medium text-sm">{category.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    +{category.points} pts
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Activity Details */}
      {selectedCategory && (
        <div className="space-y-4 animate-fade-in-up">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              What did you do?
            </label>
            <Input
              placeholder="e.g., Biked to work instead of driving"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="transition-all duration-300 focus:shadow-soft"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Additional details (optional)
            </label>
            <Textarea
              placeholder="Any extra details like distance, time saved, etc."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="transition-all duration-300 focus:shadow-soft"
              rows={3}
            />
          </div>

          {/* Points Preview */}
          {selectedCategoryData && (
            <Card className="p-4 bg-gradient-success text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">You'll earn</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  +{selectedCategoryData.points} eco points
                </Badge>
              </div>
            </Card>
          )}

          <Button
            onClick={handleLogActivity}
            disabled={!description || isLogging}
            variant="nature"
            size="lg"
            className="w-full"
          >
            {isLogging ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Logging Action...
              </>
            ) : (
              <>
                <Plus className="mr-2" />
                Log Eco Action
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}