import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, MapPin, Users, Calendar, Target, CheckCircle, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<any>(null);
  const [donationAmount, setDonationAmount] = useState("100");

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        navigate("/projects");
        return;
      }

      const { data: projectData, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching project:', error);
        navigate("/projects");
        return;
      }

      if (projectData) {
        setProject(projectData);
        
        // SEO
        document.title = `${projectData.title} - منصة عطاء`;
        const desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
        if (desc) {
          desc.setAttribute("content", projectData.description || projectData.short_description || '');
        } else {
          const m = document.createElement("meta");
          m.name = "description";
          m.content = projectData.description || projectData.short_description || '';
          document.head.appendChild(m);
        }
      } else {
        navigate("/projects");
      }
    };

    fetchProject();
  }, [id, navigate]);

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString();
  };

  const handleDonate = async () => {
    try {
      const amount = parseFloat(donationAmount);
      if (!amount || amount <= 0) {
        toast({ title: "مبلغ غير صالح", description: "الرجاء إدخال مبلغ صحيح.", variant: "destructive" });
        return;
      }

      if (amount < 10) {
        toast({ title: "مبلغ قليل", description: "الحد الأدنى للتبرع هو 10 ريال.", variant: "destructive" });
        return;
      }

      const amountMinor = Math.round(amount * 100);
      
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: {
          amount: amountMinor,
          currency: "sar",
          donor: {
            name: `متبرع لمشروع ${project?.title}`,
            email: "guest@example.com",
            isAnonymous: false,
          },
          payment_method: "card",
          success_url: `${window.location.origin}/project/${id}?status=success`,
          cancel_url: `${window.location.origin}/project/${id}?status=cancel`,
        },
      });

      if (error) {
        toast({ title: "حدث خطأ", description: "تعذّر إنشاء عملية الدفع.", variant: "destructive" });
        return;
      }

      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (e) {
      toast({ title: "خطأ غير متوقع", description: "حدثت مشكلة غير متوقعة.", variant: "destructive" });
    }
  };

  if (!project) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-6 text-primary hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة
            </Button>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl">
                    {project.category === 'تعليم' ? '🏫' : 
                     project.category === 'صحة' ? '🏥' : 
                     project.category === 'إغاثة' ? '🧥' : 
                     project.category === 'بنية تحتية' ? '💧' : '🏛️'}
                  </span>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {project.category || 'عام'}
                  </Badge>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-primary arabic-text mb-6">
                  {project.title}
                </h1>
                
                <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                  {project.short_description || project.description}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-bold text-lg">{project.location || 'غير محدد'}</div>
                    <div className="text-sm text-muted-foreground">الموقع</div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-bold text-lg">0</div>
                    <div className="text-sm text-muted-foreground">متبرع</div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-bold text-lg">متاح</div>
                    <div className="text-sm text-muted-foreground">الحالة</div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-bold text-lg">المجتمع</div>
                    <div className="text-sm text-muted-foreground">المستفيد</div>
                  </div>
                </div>
              </div>

              {/* Donation Card */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center arabic-text">
                    ساهم في المشروع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-2xl text-primary">
                        {formatAmount(project.raised_amount || 0)} ر.س
                      </span>
                      <span className="text-muted-foreground">
                        من {formatAmount(project.goal_amount || 0)} ر.س
                      </span>
                    </div>
                    <Progress 
                      value={getProgressPercentage(project.raised_amount || 0, project.goal_amount || 1)} 
                      className="h-3"
                    />
                    <div className="text-center">
                      <span className="font-bold text-lg text-primary">
                        {getProgressPercentage(project.raised_amount || 0, project.goal_amount || 1).toFixed(0)}% مكتمل
                      </span>
                    </div>
                  </div>

                  {/* Donation Amount */}
                  <div className="space-y-3">
                    <label className="text-lg font-medium">مبلغ التبرع (ريال)</label>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {["50", "100", "250"].map((amount) => (
                        <Button
                          key={amount}
                          variant={donationAmount === amount ? "default" : "outline"}
                          onClick={() => setDonationAmount(amount)}
                          className="h-12"
                        >
                          {amount}
                        </Button>
                      ))}
                    </div>
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="w-full h-12 px-4 border rounded-lg text-lg text-center"
                      placeholder="مبلغ مخصص"
                      min="10"
                    />
                  </div>

                  <Button 
                    onClick={handleDonate}
                    className="w-full h-14 text-lg font-bold"
                    disabled={!donationAmount || parseFloat(donationAmount) < 10}
                  >
                    <Heart className="w-5 h-5 ml-2" />
                    تبرع الآن - {donationAmount} ر.س
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold arabic-text">
                      وصف المشروع
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-line text-foreground leading-relaxed">
                      {project.description}
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Project Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold arabic-text">
                      معلومات المشروع
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الفئة:</span>
                      <span className="font-medium">{project.category || 'عام'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الموقع:</span>
                      <span className="font-medium">{project.location || 'غير محدد'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الحالة:</span>
                      <span className="font-medium">{project.status === 'active' ? 'نشط' : 'غير نشط'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">تاريخ الإنشاء:</span>
                      <span className="font-medium">
                        {new Date(project.created_at).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetails;