import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { MapPin, Users, Calendar, ArrowLeft, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Projects = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    // SEO
    document.title = "جميع المشاريع - منصة عطاء";
    const desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (desc) {
      desc.setAttribute("content", "استكشف جميع المشاريع الخيرية المتاحة للتبرع وساهم في إحداث تأثير إيجابي في المجتمع.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "استكشف جميع المشاريع الخيرية المتاحة للتبرع وساهم في إحداث تأثير إيجابي في المجتمع.";
      document.head.appendChild(m);
    }
  }, []);
  
  const projects = [
    {
      id: 1,
      title: "بناء مدرسة في القصيم",
      description: "مشروع لبناء مدرسة حديثة تخدم ٥٠٠ طالب وطالبة في منطقة القصيم",
      location: "القصيم",
      target: 500000,
      raised: 350000,
      donors: 234,
      daysLeft: 15,
      category: "تعليم",
      image: "🏫",
      urgent: false,
      dateCreated: "2024-01-01"
    },
    {
      id: 2,
      title: "مشروع كسوة الشتاء",
      description: "توزيع الملابس الشتوية والبطانيات للأسر المحتاجة في المناطق الباردة",
      location: "تبوك",
      target: 200000,
      raised: 180000,
      donors: 456,
      daysLeft: 8,
      category: "إغاثة",
      image: "🧥",
      urgent: true,
      dateCreated: "2024-01-05"
    },
    {
      id: 3,
      title: "حفر بئر ماء",
      description: "حفر بئر ماء عذب لخدمة قرية نائية وتوفير المياه النظيفة للسكان",
      location: "نجران",
      target: 75000,
      raised: 32000,
      donors: 89,
      daysLeft: 30,
      category: "بنية تحتية",
      image: "💧",
      urgent: false,
      dateCreated: "2023-12-20"
    },
    {
      id: 4,
      title: "مستشفى ميداني للاجئين",
      description: "إنشاء مستشفى ميداني لتقديم الرعاية الطبية العاجلة للاجئين",
      location: "الحدود الشمالية",
      target: 800000,
      raised: 245000,
      donors: 178,
      daysLeft: 45,
      category: "صحة",
      image: "🏥",
      urgent: true,
      dateCreated: "2024-01-10"
    },
    {
      id: 5,
      title: "مشروع الإفطار المدرسي",
      description: "توفير وجبات إفطار صحية ومغذية للطلاب في المدارس النائية",
      location: "جازان",
      target: 150000,
      raised: 95000,
      donors: 312,
      daysLeft: 20,
      category: "تعليم",
      image: "🍎",
      urgent: false,
      dateCreated: "2023-12-15"
    },
    {
      id: 6,
      title: "إعادة تأهيل دار الأيتام",
      description: "تجديد وتطوير مرافق دار الأيتام لتوفير بيئة أفضل للأطفال",
      location: "مكة المكرمة",
      target: 300000,
      raised: 120000,
      donors: 156,
      daysLeft: 35,
      category: "إغاثة",
      image: "🏠",
      urgent: false,
      dateCreated: "2023-12-25"
    }
  ];

  const categories = ["الكل", "تعليم", "صحة", "إغاثة", "بنية تحتية"];

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

  const filteredProjects = projects
    .filter(project => {
      const matchesCategory = selectedCategory === "الكل" || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "progress":
          return getProgressPercentage(b.raised, b.target) - getProgressPercentage(a.raised, a.target);
        case "urgent":
          return Number(b.urgent) - Number(a.urgent);
        case "amount":
          return b.target - a.target;
        case "newest":
        default:
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-primary arabic-text mb-4">
                جميع المشاريع الخيرية
              </h1>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                اكتشف واختر من بين {projects.length} مشروع خيري متنوع وساهم في إحداث التغيير الإيجابي
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="ابحث عن مشروع..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-12 h-12 text-lg bg-background"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap justify-between items-center gap-4">
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-full"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border rounded-lg bg-background"
                  >
                    <option value="newest">الأحدث</option>
                    <option value="progress">الأكثر تقدماً</option>
                    <option value="urgent">الأكثر إلحاحاً</option>
                    <option value="amount">أكبر مبلغ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Info */}
            <div className="mb-8 text-center">
              <p className="text-lg text-foreground/70">
                تم العثور على {filteredProjects.length} مشروع
                {selectedCategory !== "الكل" && ` في فئة "${selectedCategory}"`}
                {searchTerm && ` يحتوي على "${searchTerm}"`}
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className={`overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm cursor-pointer ${
                    project.urgent ? 'ring-2 ring-red-500/20' : ''
                  }`}
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{project.image}</div>
                      <div className="flex flex-col gap-2">
                        <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {project.category}
                        </span>
                        {project.urgent && (
                          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                            عاجل
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 arabic-text leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">المبلغ المجمع</span>
                        <span className="font-bold text-primary">
                          {formatAmount(project.raised)} ر.س
                        </span>
                      </div>
                      <Progress 
                        value={getProgressPercentage(project.raised, project.target)} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {getProgressPercentage(project.raised, project.target).toFixed(0)}% مكتمل
                        </span>
                        <span className="text-gray-600">
                          الهدف: {formatAmount(project.target)} ر.س
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1 text-gray-600">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">{project.location}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1 text-gray-600">
                          <Users className="w-4 h-4" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">{project.donors} متبرع</div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1 text-gray-600">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">{project.daysLeft} يوم</div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project/${project.id}`);
                      }}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full"
                    >
                      تبرع للمشروع
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-primary mb-4">لا توجد نتائج</h3>
                <p className="text-lg text-foreground/70 mb-6">
                  لم نجد أي مشاريع تطابق معايير البحث الخاصة بك
                </p>
                <Button 
                  onClick={() => {
                    setSelectedCategory("الكل");
                    setSearchTerm("");
                  }}
                  variant="outline"
                >
                  إعادة تعيين الفلاتر
                </Button>
              </div>
            )}

            {/* Back to Home */}
            <div className="text-center mt-16">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/")}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-8 py-4 rounded-full"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                العودة للصفحة الرئيسية
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;