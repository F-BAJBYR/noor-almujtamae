import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import heroImage from "@/assets/hero-charity.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-light to-secondary-light overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="منصة العمل الخيري" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-right space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-primary arabic-text leading-tight">
                منصة عطاء
              </h1>
              <p className="text-xl md:text-2xl text-secondary font-semibold">
                لعمل خيري أكثر تأثيراً
              </p>
            </div>

            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-lg mx-auto md:mx-0">
              منصة سعودية مبتكرة تربط بين الأفراد والجهات لدعم المشاريع التنموية والخيرية 
              بأسلوب شفاف، ذكي، وسهل الاستخدام
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                ابدأ التبرع الآن
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-bold text-lg px-8 py-4 rounded-full transition-all"
              >
                <Play className="ml-2 h-5 w-5" />
                شاهد الفيديو التعريفي
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center md:justify-start text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>آمن ومضمون</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>شفافية كاملة</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>معتمد رسمياً</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6 animate-slide-up">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-primary mb-2">+٥٠٠</div>
              <div className="text-sm text-foreground/70">مشروع مكتمل</div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-secondary mb-2">+١٠٠ك</div>
              <div className="text-sm text-foreground/70">متبرع كريم</div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-primary mb-2">+٢٠م</div>
              <div className="text-sm text-foreground/70">ريال تبرعات</div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold text-secondary mb-2">+١٣</div>
              <div className="text-sm text-foreground/70">منطقة بالمملكة</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-secondary/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
    </section>
  );
};

export default HeroSection;