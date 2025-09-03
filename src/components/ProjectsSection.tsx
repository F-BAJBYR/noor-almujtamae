import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, Users, Calendar, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ProjectsSection = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(6);
      
      setProjects(data || []);
    };
    
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === "الكل") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [projects, selectedCategory]);

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}م`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}ك`;
    }
    return amount.toString();
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'تعليم': '🏫',
      'صحة': '🏥', 
      'إغاثة': '🧥',
      'بنية تحتية': '💧',
      'default': '🏛️'
    };
    return icons[category] || icons.default;
  };

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary arabic-text mb-4">
            المشاريع الخيرية
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            اكتشف المشاريع التي تحتاج دعمكم وساهم في إحداث تأثير إيجابي في المجتمع
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["الكل", "التعليم", "الصحة", "الإغاثة", "المياه والصرف الصحي", "التغذية", "الرعاية الاجتماعية", "مسجد"].map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                category === selectedCategory 
                  ? "bg-primary text-primary-foreground" 
                  : "border-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{getCategoryIcon(project.category)}</div>
                  <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {project.category || 'عام'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 arabic-text leading-tight">
                  {project.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {project.description || project.short_description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">المبلغ المجمع</span>
                    <span className="font-bold text-primary">
                      {formatAmount(project.raised_amount || 0)} ر.س
                    </span>
                  </div>
                  <Progress 
                    value={getProgressPercentage(project.raised_amount || 0, project.goal_amount || 1)} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {getProgressPercentage(project.raised_amount || 0, project.goal_amount || 1).toFixed(0)}% مكتمل
                    </span>
                    <span className="text-gray-600">
                      الهدف: {formatAmount(project.goal_amount || 0)} ر.س
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">{project.location || 'غير محدد'}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">0 متبرع</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <Calendar className="w-4 w-4" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">متاح</div>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full"
                >
                  تبرع للمشروع
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            onClick={() => navigate("/projects")}
            variant="outline" 
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-8 py-4 rounded-full"
          >
            عرض جميع المشاريع
            <ArrowLeft className="mr-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;