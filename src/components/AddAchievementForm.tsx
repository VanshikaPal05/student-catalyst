import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Plus, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddAchievementFormProps {
  onSubmit: (achievement: any) => void;
  onCancel: () => void;
}

export const AddAchievementForm = ({ onSubmit, onCancel }: AddAchievementFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    organization: "",
    proofFile: null as File | null
  });

  const categories = [
    { value: "conference", label: "Conferences & Workshops" },
    { value: "certification", label: "Certifications" },
    { value: "club", label: "Club Activities & Volunteering" },
    { value: "competition", label: "Competitions & Contests" },
    { value: "leadership", label: "Leadership & Internships" },
    { value: "community", label: "Community Services" },
    { value: "internship", label: "Internships" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.description || !formData.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create achievement object
    const newAchievement = {
      id: Date.now().toString(), // Simple ID for demo
      title: formData.title,
      category: formData.category,
      description: formData.description,
      date: formData.date,
      organization: formData.organization,
      proofUrl: formData.proofFile ? URL.createObjectURL(formData.proofFile) : undefined,
      status: "pending" as const
    };

    onSubmit(newAchievement);
    
    toast({
      title: "Achievement Added!",
      description: "Your achievement has been submitted for approval.",
    });

    // Reset form
    setFormData({
      title: "",
      category: "",
      description: "",
      date: "",
      organization: "",
      proofFile: null
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, proofFile: file });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Achievement
        </CardTitle>
        <CardDescription>
          Document your academic and extracurricular achievements with proof
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Achievement Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Achievement Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Best Paper Award at IEEE Conference"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select achievement category" />
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

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your achievement, its significance, and what you learned..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Date and Organization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                placeholder="e.g., IEEE, ACM, University Name"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="proof">Proof Document</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Upload certificate, document, or screenshot as proof
                </p>
                <Input
                  id="proof"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="w-full"
                />
                {formData.proofFile && (
                  <div className="flex items-center gap-2 text-sm text-success">
                    <FileText className="h-4 w-4" />
                    {formData.proofFile.name}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Add Achievement
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};