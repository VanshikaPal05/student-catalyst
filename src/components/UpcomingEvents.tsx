import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  maxAttendees: number;
}

export const UpcomingEvents = () => {
  const upcomingEvents: Event[] = [
    {
      id: "1",
      title: "Tech Symposium 2024",
      description: "Annual technology symposium featuring industry experts and latest tech trends",
      date: "2024-04-15",
      time: "09:00 AM",
      location: "Main Auditorium",
      category: "Conference",
      attendees: 245,
      maxAttendees: 300
    },
    {
      id: "2",
      title: "AI/ML Workshop",
      description: "Hands-on workshop on Machine Learning fundamentals and practical applications",
      date: "2024-04-20",
      time: "02:00 PM", 
      location: "Computer Lab 1",
      category: "Workshop",
      attendees: 28,
      maxAttendees: 40
    },
    {
      id: "3",
      title: "Career Fair 2024",
      description: "Meet with top companies and explore internship and job opportunities",
      date: "2024-04-25",
      time: "10:00 AM",
      location: "Sports Complex",
      category: "Career",
      attendees: 180,
      maxAttendees: 500
    },
    {
      id: "4",
      title: "Open Source Hackathon",
      description: "48-hour hackathon focusing on open source contributions and innovation",
      date: "2024-05-01",
      time: "06:00 PM",
      location: "Innovation Center",
      category: "Competition",
      attendees: 64,
      maxAttendees: 80
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'conference': return 'bg-primary text-primary-foreground';
      case 'workshop': return 'bg-info text-info-foreground';
      case 'career': return 'bg-success text-success-foreground';
      case 'competition': return 'bg-accent text-accent-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground">
            Don't miss out on these exciting opportunities
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upcomingEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{event.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-info" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-success" />
                  <span>{event.attendees}/{event.maxAttendees} registered</span>
                  <div className="flex-1 bg-muted rounded-full h-2 ml-2">
                    <div 
                      className="bg-gradient-to-r from-success to-warning h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                Register Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};