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

  const projects = [
    {
      id: 1,
      title: "بناء مدرسة في القصيم",
      description: "مشروع لبناء مدرسة حديثة تخدم ٥٠٠ طالب وطالبة في منطقة القصيم",
      fullDescription: `مشروع بناء مدرسة حديثة في منطقة القصيم يهدف إلى توفير بيئة تعليمية متطورة للأطفال والشباب في المنطقة. 

المشروع يشمل:
• بناء 20 فصل دراسي مجهز بأحدث التقنيات التعليمية
• مختبرات علمية وحاسوبية متطورة
• مكتبة عامة تحتوي على أكثر من 5000 كتاب
• ملاعب رياضية ومرافق ترفيهية
• قاعة متعددة الأغراض للأنشطة المجتمعية

سيستفيد من المشروع أكثر من 500 طالب وطالبة، ويوفر فرص عمل لأكثر من 50 شخص من أبناء المنطقة.`,
      location: "القصيم",
      target: 500000,
      raised: 350000,
      donors: 234,
      daysLeft: 15,
      category: "تعليم",
      image: "🏫",
      features: [
        "20 فصل دراسي مجهز",
        "مختبرات علمية وحاسوبية",
        "مكتبة عامة",
        "ملاعب رياضية",
        "قاعة متعددة الأغراض"
      ],
      beneficiaries: "500+ طالب وطالبة",
      impact: "توفير فرص عمل ل 50+ شخص",
      timeline: "6 أشهر",
      updates: [
        { date: "2024-01-15", title: "بدء أعمال الحفر", description: "تم البدء في أعمال الحفر والأساسات" },
        { date: "2024-01-10", title: "الحصول على التراخيص", description: "تم الحصول على جميع التراخيص اللازمة" },
        { date: "2024-01-05", title: "إطلاق المشروع", description: "تم إطلاق المشروع رسمياً" }
      ]
    },
    {
      id: 2,
      title: "مشروع كسوة الشتاء",
      description: "توزيع الملابس الشتوية والبطانيات للأسر المحتاجة في المناطق الباردة",
      fullDescription: `مشروع كسوة الشتاء يهدف إلى توفير الملابس الشتوية والبطانيات للأسر المحتاجة في المناطق الباردة.

المشروع يشمل:
• توزيع 1000 معطف شتوي للأطفال والكبار
• توفير 500 بطانية عالية الجودة
• توزيع أحذية شتوية مقاومة للماء
• ملابس داخلية شتوية للأطفال
• جوارب صوفية للعائلات

سيتم التوزيع على الأسر الأكثر احتياجاً في المناطق الباردة خاصة في فصل الشتاء.`,
      location: "تبوك",
      target: 200000,
      raised: 180000,
      donors: 456,
      daysLeft: 8,
      category: "إغاثة",
      image: "🧥",
      features: [
        "1000 معطف شتوي",
        "500 بطانية عالية الجودة",
        "أحذية شتوية مقاومة للماء",
        "ملابس داخلية شتوية",
        "جوارب صوفية"
      ],
      beneficiaries: "300+ عائلة",
      impact: "حماية من البرد القارس",
      timeline: "شهر واحد",
      updates: [
        { date: "2024-01-12", title: "توزيع الدفعة الثانية", description: "تم توزيع 200 معطف إضافي" },
        { date: "2024-01-08", title: "بدء التوزيع", description: "تم توزيع أول دفعة من المعاطف" },
        { date: "2024-01-01", title: "وصول البضائع", description: "وصلت جميع البضائع للمستودع" }
      ]
    },
    {
      id: 3,
      title: "حفر بئر ماء",
      description: "حفر بئر ماء عذب لخدمة قرية نائية وتوفير المياه النظيفة للسكان",
      fullDescription: `مشروع حفر بئر ماء عذب لخدمة قرية نائية وتوفير المياه النظيفة للسكان.

المشروع يشمل:
• حفر بئر بعمق 150 متر
• تركيب مضخة مياه عالية الكفاءة
• بناء خزان مياه بسعة 50,000 لتر
• مد شبكة توزيع للمنازل
• تركيب محطة تنقية مياه

سيوفر المشروع المياه النظيفة لأكثر من 200 عائلة في القرية ويحسن من جودة الحياة بشكل كبير.`,
      location: "نجران",
      target: 75000,
      raised: 32000,
      donors: 89,
      daysLeft: 30,
      category: "بنية تحتية",
      image: "💧",
      features: [
        "بئر بعمق 150 متر",
        "مضخة مياه عالية الكفاءة",
        "خزان مياه 50,000 لتر",
        "شبكة توزيع للمنازل",
        "محطة تنقية مياه"
      ],
      beneficiaries: "200+ عائلة",
      impact: "توفير مياه نظيفة دائمة",
      timeline: "3 أشهر",
      updates: [
        { date: "2024-01-10", title: "اختيار موقع الحفر", description: "تم اختيار الموقع الأمثل للحفر" },
        { date: "2024-01-05", title: "المسح الجيولوجي", description: "تم إجراء المسح الجيولوجي للمنطقة" },
        { date: "2024-01-01", title: "إطلاق المشروع", description: "تم إطلاق المشروع وجمع التبرعات" }
      ]
    }
  ];

  useEffect(() => {
    const projectData = projects.find(p => p.id === parseInt(id || "0"));
    if (projectData) {
      setProject(projectData);
      
      // SEO
      document.title = `${projectData.title} - منصة عطاء`;
      const desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (desc) {
        desc.setAttribute("content", projectData.description);
      } else {
        const m = document.createElement("meta");
        m.name = "description";
        m.content = projectData.description;
        document.head.appendChild(m);
      }
    } else {
      navigate("/projects");
    }
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
                  <span className="text-6xl">{project.image}</span>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {project.category}
                  </Badge>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-primary arabic-text mb-6">
                  {project.title}
                </h1>
                
                <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                  {project.description}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-bold text-lg">{project.location}</div>
                    <div className="text-sm text-muted-foreground">الموقع</div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-bold text-lg">{project.donors}</div>
                    <div className="text-sm text-muted-foreground">متبرع</div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-bold text-lg">{project.daysLeft}</div>
                    <div className="text-sm text-muted-foreground">يوم متبقي</div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-bold text-lg">{project.beneficiaries}</div>
                    <div className="text-sm text-muted-foreground">مستفيد</div>
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
                        {formatAmount(project.raised)} ر.س
                      </span>
                      <span className="text-muted-foreground">
                        من {formatAmount(project.target)} ر.س
                      </span>
                    </div>
                    <Progress 
                      value={getProgressPercentage(project.raised, project.target)} 
                      className="h-3"
                    />
                    <div className="text-center">
                      <span className="font-bold text-lg text-primary">
                        {getProgressPercentage(project.raised, project.target).toFixed(0)}% مكتمل
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
                      {project.fullDescription}
                    </div>
                  </CardContent>
                </Card>

                {/* Updates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold arabic-text flex items-center gap-3">
                      <Clock className="w-6 h-6" />
                      آخر التحديثات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.updates.map((update: any, index: number) => (
                        <div key={index} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                          <div>
                            <div className="font-bold text-lg">{update.title}</div>
                            <div className="text-sm text-muted-foreground mb-2">{update.date}</div>
                            <div className="text-foreground">{update.description}</div>
                          </div>
                        </div>
                      ))}
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
                      <span className="text-muted-foreground">المستفيدون:</span>
                      <span className="font-medium">{project.beneficiaries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">المدة المتوقعة:</span>
                      <span className="font-medium">{project.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">التأثير:</span>
                      <span className="font-medium">{project.impact}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold arabic-text">
                      ما يشمله المشروع
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {project.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
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