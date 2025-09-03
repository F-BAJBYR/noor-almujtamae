import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Users, Target, Shield, Zap, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: "الشفافية",
      description: "نؤمن بالشفافية الكاملة في جميع عملياتنا المالية والإدارية"
    },
    {
      icon: Shield,
      title: "الأمانة",
      description: "نحافظ على ثقة المتبرعين من خلال الأمانة في التعامل مع التبرعات"
    },
    {
      icon: Target,
      title: "الفعالية",
      description: "نسعى لتحقيق أقصى استفادة من كل ريال يتم التبرع به"
    },
    {
      icon: Users,
      title: "التعاون",
      description: "نبني شراكات قوية مع جميع أطراف المجتمع لتحقيق أهدافنا"
    }
  ];

  const stats = [
    { number: "+١٠٠٠", label: "مشروع مكتمل", icon: Target },
    { number: "+٥٠٠ك", label: "مستفيد", icon: Users },
    { number: "+١٠٠م", label: "ريال تبرعات", icon: Heart },
    { number: "+١٣", label: "منطقة في المملكة", icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-light to-secondary-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary arabic-text mb-6">
              من نحن
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              منصة عطاء هي منصة سعودية رائدة في مجال العمل الخيري والتنموي، 
              نهدف إلى ربط المتبرعين بالمشاريع الخيرية بطريقة مبتكرة وشفافة
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-primary arabic-text">
                  قصتنا
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  بدأت منصة عطاء من رؤية بسيطة: جعل العمل الخيري أكثر فعالية وشفافية. 
                  أردنا أن نخلق جسراً قوياً بين المتبرعين الكرام والمشاريع التي تحتاج دعمهم.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  منذ انطلاقتنا، نجحنا في تنفيذ أكثر من ١٠٠٠ مشروع خيري وتنموي، 
                  ووصلنا إلى أكثر من ٥٠٠ ألف مستفيد في جميع أنحاء المملكة العربية السعودية.
                </p>
                <Button 
                  onClick={() => navigate("/donate")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded-full"
                >
                  <Heart className="w-5 h-5 ml-2" />
                  ساهم معنا الآن
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="text-center p-6 shadow-lg">
                    <CardContent className="pt-6">
                      <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-foreground/70">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Vision */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary arabic-text flex items-center gap-3">
                    <Target className="w-8 h-8" />
                    رسالتنا
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    نسعى لتكون منصة عطاء الوجهة الأولى للعمل الخيري في المملكة العربية السعودية، 
                    من خلال توفير منصة رقمية متطورة تضمن الشفافية والفعالية في توصيل المساعدات 
                    للمحتاجين وتحقيق التنمية المستدامة في المجتمع.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary arabic-text flex items-center gap-3">
                    <Zap className="w-8 h-8" />
                    رؤيتنا
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    أن نكون المنصة الرائدة في مجال العمل الخيري والتنموي، 
                    ونساهم في بناء مجتمع متماسك ومتطور من خلال تسهيل عملية التبرع 
                    وضمان وصول المساعدات لمستحقيها بأعلى معايير الشفافية والكفاءة.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary arabic-text mb-4">
                قيمنا
              </h2>
              <p className="text-xl text-foreground/70">
                القيم التي توجه عملنا وتشكل هويتنا
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-foreground/70">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary-light to-secondary-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary arabic-text mb-6">
              انضم إلى رحلتنا في صنع الفرق
            </h2>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              كل تبرع، مهما كان حجمه، يساهم في تحسين حياة المحتاجين وبناء مستقبل أفضل لمجتمعنا
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate("/donate")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-full"
              >
                <Heart className="w-5 h-5 ml-2" />
                ابدأ التبرع الآن
              </Button>
              <Button 
                onClick={() => navigate("/contact")}
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-8 py-4 rounded-full"
              >
                تواصل معنا
              </Button>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة للصفحة السابقة
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;