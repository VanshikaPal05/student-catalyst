import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AchievementCard, Achievement } from "./AchievementCard";
import { AddAchievementForm } from "./AddAchievementForm";
import { Plus, Search, Trophy, FileText, Award, ExternalLink } from "lucide-react";

export const AchievementDashboard = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "Best Research Paper Award",
      category: "award",
      description: "Received best paper award for research on 'AI in Education' at the National Conference on Computer Science",
      date: "2024-03-15",
      organization: "IEEE Computer Society",
      proofUrl: "#",
      status: "approved"
    },
    {
      id: "2", 
      title: "React Developer Certification",
      category: "certificate",
      description: "Completed advanced React development course with hands-on projects and best practices",
      date: "2024-02-20",
      organization: "Meta",
      proofUrl: "#",
      status: "approved"
    },
    {
      id: "3",
      title: "Student Management System",
      category: "project",
      description: "Built a full-stack web application for managing student records using React and Node.js",
      date: "2024-01-10",
      status: "pending"
    }
  ]);
  
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { value: "all", label: "All Categories", icon: Trophy },
    { value: "conference", label: "Conference Papers", icon: FileText },
    { value: "certificate", label: "Certificates", icon: Award },
    { value: "project", label: "Projects", icon: ExternalLink },
    { value: "award", label: "Awards", icon: Trophy }
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};