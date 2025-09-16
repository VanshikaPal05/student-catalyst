import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import { Achievement } from "./AchievementCard";
import { TrendingUp, Award, Calendar, Target } from "lucide-react";

interface AnalyticsProps {
  achievements: Achievement[];
}

export const AchievementAnalytics = ({ achievements }: AnalyticsProps) => {
  // Category distribution data
  const categoryData = [
    { name: "Conferences", value: achievements.filter(a => a.category === "conference").length, color: "hsl(259 94% 51%)" },
    { name: "Certifications", value: achievements.filter(a => a.category === "certification").length, color: "hsl(217 91% 60%)" },
    { name: "Leadership", value: achievements.filter(a => a.category === "leadership").length, color: "hsl(25 95% 53%)" },
    { name: "Competitions", value: achievements.filter(a => a.category === "competition").length, color: "hsl(142 71% 45%)" },
    { name: "Community", value: achievements.filter(a => a.category === "community").length, color: "hsl(300 76% 72%)" },
    { name: "Internships", value: achievements.filter(a => a.category === "internship").length, color: "hsl(50 98% 64%)" }
  ].filter(item => item.value > 0);

  // Monthly achievement data
  const monthlyData = achievements.reduce((acc, achievement) => {
    const month = new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ month, count: 1 });
    }
    return acc;
  }, [] as { month: string; count: number }[])
  .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
  .slice(-6); // Last 6 months

  // Status distribution
  const statusData = [
    { name: "Approved", value: achievements.filter(a => a.status === "approved").length, color: "hsl(142 71% 45%)" },
    { name: "Pending", value: achievements.filter(a => a.status === "pending").length, color: "hsl(25 95% 53%)" }
  ].filter(item => item.value > 0);

  const chartConfig = {
    category: {
      label: "Category",
    },
    status: {
      label: "Status",
    },
    monthly: {
      label: "Monthly Achievements",
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Achievement Analytics
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Achievements</p>
                <p className="text-2xl font-bold text-primary">{achievements.length}</p>
              </div>
              <Award className="h-8 w-8 text-primary opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-success">
                  {achievements.filter(a => a.status === "approved").length}
                </p>
              </div>
              <Target className="h-8 w-8 text-success opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-accent">
                  {achievements.filter(a => {
                    const achievementMonth = new Date(a.date).getMonth();
                    const currentMonth = new Date().getMonth();
                    return achievementMonth === currentMonth;
                  }).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-accent opacity-60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-info">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold text-info">{categoryData.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-info opacity-60" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              Achievement Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Progress Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-info to-success rounded-full"></div>
              Monthly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Bar dataKey="count" fill="hsl(259 94% 51%)" radius={[4, 4, 0, 0]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        {statusData.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-success to-warning rounded-full"></div>
                Approval Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {/* Achievement Trend Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-accent to-primary rounded-full"></div>
              Achievement Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="hsl(25 95% 53%)" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(25 95% 53%)", strokeWidth: 2, r: 6 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};