import { TrendingUp, Heart, Users, Building2 } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Heart,
      number: "٢٠,٥٤٢,٠٠٠",
      label: "ريال إجمالي التبرعات",
      description: "منذ إطلاق المنصة",
      color: "text-gray-900"
    },
    {
      icon: Users,
      number: "١٢٣,٤٥٦",
      label: "متبرع كريم",
      description: "من جميع أنحاء المملكة",
      color: "text-gray-900"
    },
    {
      icon: Building2,
      number: "٨٩٤",
      label: "مشروع مكتمل",
      description: "تم تنفيذها بنجاح",
      color: "text-gray-900"
    },
    {
      icon: TrendingUp,
      number: "٩٨%",
      label: "معدل نجاح المشاريع",
      description: "شفافية ومتابعة مستمرة",
      color: "text-gray-900"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-light to-secondary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary arabic-text mb-4">
            أرقام تتحدث عن تأثيرنا
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            إنجازات حقيقية تعكس ثقة المجتمع وتأثير العمل الخيري المنظم
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-light to-secondary-light flex items-center justify-center text-gray-900">
                <stat.icon className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 arabic-text">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-foreground arabic-text">
                  {stat.label}
                </div>
                <div className="text-sm text-foreground/70">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-primary rounded-full"></div>
            </div>
            <h3 className="text-lg font-bold text-primary">شفافية كاملة</h3>
            <p className="text-foreground/70 text-sm">
              تتبع مفصل لكل ريال يتم التبرع به وتقارير دورية عن تقدم المشاريع
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto bg-secondary/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">3</span>
            </div>
            <h3 className="text-lg font-bold text-secondary">أعلى معايير الأمان السيبراني</h3>
            <p className="text-foreground/70 text-sm">
              وحماية البيانات المالية والشخصية
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-primary rounded-full"></div>
            </div>
            <h3 className="text-lg font-bold text-primary">اعتماد رسمي</h3>
            <p className="text-foreground/70 text-sm">
              منصة معتمدة من الجهات الحكومية المختصة بالعمل الخيري في المملكة
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;