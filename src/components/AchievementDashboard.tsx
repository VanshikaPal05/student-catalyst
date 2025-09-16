import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AchievementCard, Achievement } from "./AchievementCard";
import { AddAchievementForm } from "./AddAchievementForm";
import { UpcomingEvents } from "./UpcomingEvents";
import { AchievementAnalytics } from "./AchievementAnalytics";
import { Plus, Search, Trophy, FileText, Award, ExternalLink, Users, Briefcase, Heart, Calendar, TrendingUp, BarChart3 } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export const AchievementDashboard = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "International AI Conference 2024",
      category: "conference",
      description: "Presented research paper on 'Machine Learning in Educational Analytics' at the International Conference on AI",
      date: "2024-03-15",
      organization: "IEEE Computer Society",
      proofUrl: "#",
      status: "approved"
    },
    {
      id: "2", 
      title: "AWS Cloud Practitioner Certification",
      category: "certification",
      description: "Achieved AWS Cloud Practitioner certification demonstrating foundational cloud computing knowledge",
      date: "2024-02-20",
      organization: "Amazon Web Services",
      proofUrl: "#",
      status: "approved"
    },
    {
      id: "3",
      title: "President - Computer Science Club",
      category: "leadership",
      description: "Led a team of 50+ members, organized technical workshops and coding competitions throughout the academic year",
      date: "2024-01-10",
      organization: "College Computer Science Club",
      status: "approved"
    },
    {
      id: "4",
      title: "Coding Competition Winner",
      category: "competition",
      description: "First place in the Inter-University Coding Championship with algorithm optimization challenge",
      date: "2024-04-05",
      organization: "State University",
      proofUrl: "#",
      status: "approved"
    },
    {
      id: "5",
      title: "Community Teaching Volunteer",
      category: "community",
      description: "Taught basic computer skills to underprivileged children for 6 months in local community center",
      date: "2024-01-15",
      organization: "Local Community Center",
      status: "approved"
    },
    {
      id: "6",
      title: "Software Engineering Internship",
      category: "internship",
      description: "3-month internship developing full-stack web applications using React and Node.js",
      date: "2024-06-01",
      organization: "Tech Solutions Inc",
      status: "pending"
    }
  ]);
  
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { value: "all", label: "All Categories", icon: Trophy },
    { value: "conference", label: "Conferences & Workshops", icon: FileText },
    { value: "certification", label: "Certifications", icon: Award },
    { value: "club", label: "Club Activities & Volunteering", icon: Users },
    { value: "competition", label: "Competitions & Contests", icon: Trophy },
    { value: "leadership", label: "Leadership & Internships", icon: Briefcase },
    { value: "community", label: "Community Services", icon: Heart },
    { value: "internship", label: "Internships", icon: Briefcase }
  ];

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = filterCategory === "all" || achievement.category === filterCategory;
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddAchievement = (newAchievement: Achievement) => {
    setAchievements([newAchievement, ...achievements]);
    setShowAddForm(false);
  };

  const stats = {
    total: achievements.length,
    approved: achievements.filter(a => a.status === "approved").length,
    pending: achievements.filter(a => a.status === "pending").length,
    categories: [...new Set(achievements.map(a => a.category))].length
  };

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
        <AddAchievementForm 
          onSubmit={handleAddAchievement}
          onCancel={() => setShowAddForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                My Achievements
              </h1>
              <p className="text-muted-foreground mt-1">
                Track and showcase your academic and extracurricular accomplishments
              </p>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Achievement
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <p className="text-2xl font-bold text-primary">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <p className="text-2xl font-bold text-success">{stats.approved}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <p className="text-2xl font-bold text-accent">{stats.categories}</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count = cat.value === "all" 
              ? achievements.length 
              : achievements.filter(a => a.category === cat.value).length;
            
            return (
              <Badge
                key={cat.value}
                variant={filterCategory === cat.value ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setFilterCategory(cat.value)}
              >
                <Icon className="h-3 w-3 mr-1" />
                {cat.label} ({count})
              </Badge>
            );
          })}
        </div>

        {/* Analytics Section */}
        <div className="mb-8">
          <AchievementAnalytics achievements={achievements} />
        </div>

        {/* Upcoming Events Section */}
        <div className="mb-8">
          <UpcomingEvents />
        </div>

        {/* Achievements Grid */}
        {filteredAchievements.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              No achievements found
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterCategory !== "all" 
                ? "Try adjusting your search or filters" 
                : "Start by adding your first achievement!"
              }
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Achievement
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                My Achievements
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement) => (
                <AchievementCard 
                  key={achievement.id} 
                  achievement={achievement}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};