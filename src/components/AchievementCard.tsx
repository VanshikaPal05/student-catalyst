import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, ExternalLink, Award } from "lucide-react";

export interface Achievement {
  id: string;
  title: string;
  category: "conference" | "certification" | "club" | "competition" | "leadership" | "community" | "internship";
  description: string;
  date: string;
  proofUrl?: string;
  organization?: string;
  status: "pending" | "approved" | "rejected";
}

interface AchievementCardProps {
  achievement: Achievement;
}

const categoryConfig = {
  conference: { 
    label: "Conferences & Workshops", 
    icon: FileText, 
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20" 
  },
  certification: { 
    label: "Certifications", 
    icon: Award, 
    bgColor: "bg-success/10",
    borderColor: "border-success/20" 
  },
  club: { 
    label: "Club Activities", 
    icon: ExternalLink, 
    bgColor: "bg-info/10",
    borderColor: "border-info/20" 
  },
  competition: { 
    label: "Competitions", 
    icon: Award, 
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20" 
  },
  leadership: {
    label: "Leadership",
    icon: Award,
    bgColor: "bg-warning/10", 
    borderColor: "border-warning/20"
  },
  community: {
    label: "Community Service",
    icon: ExternalLink,
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20"
  },
  internship: {
    label: "Internships",
    icon: FileText,
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20"
  }
};

const statusColors = {
  pending: "bg-warning/20 text-warning",
  approved: "bg-success/20 text-success", 
  rejected: "bg-destructive/20 text-destructive"
};

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const config = categoryConfig[achievement.category];
  const Icon = config.icon;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-achievement-border bg-gradient-to-br from-card to-achievement-bg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.bgColor} ${config.borderColor} border`}>
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {achievement.title}
              </h3>
              <p className="text-sm text-muted-foreground">{config.label}</p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={statusColors[achievement.status]}
          >
            {achievement.status.charAt(0).toUpperCase() + achievement.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {achievement.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(achievement.date).toLocaleDateString()}
          </div>
          
          {achievement.organization && (
            <span className="text-sm text-primary font-medium">
              {achievement.organization}
            </span>
          )}
        </div>
        
        {achievement.proofUrl && (
          <Button variant="outline" size="sm" className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            View Proof Document
          </Button>
        )}
      </CardContent>
    </Card>
  );
};