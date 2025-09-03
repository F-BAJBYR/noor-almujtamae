import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <Heart className="w-7 h-7 text-secondary-foreground fill-current" />
              </div>
              <span className="text-3xl font-bold arabic-text">عطاء</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              منصة سعودية مبتكرة تربط بين الأفراد والجهات لدعم المشاريع التنموية والخيرية 
              بأسلوب شفاف وذكي وسهل الاستخدام.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground transition-all"
                >
                  <Icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold arabic-text">روابط سريعة</h3>
            <ul className="space-y-3">
              {[
                "الرئيسية",
                "المشاريع",
                "من نحن",
                "كيف نعمل",
                "قصص النجاح",
                "المدونة"
              ].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold arabic-text">خدماتنا</h3>
            <ul className="space-y-3">
              {[
                "التبرع للمشاريع",
                "دعم الأسر المحتاجة",
                "المشاريع التنموية",
                "العمل التطوعي",
                "الإغاثة العاجلة",
                "التعليم والصحة"
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold arabic-text">تواصل معنا</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground/80 ltr">+966 11 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground/80 ltr">info@ataa.sa</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  الرياض، المملكة العربية السعودية<br />
                  حي الملقا، طريق الملك فهد
                </span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-semibold arabic-text">اشترك في النشرة الإخبارية</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-4 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:border-secondary"
                />
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6">
                  اشتراك
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-primary-foreground/80 text-sm">
              © ٢٠٢٤ منصة عطاء. جميع الحقوق محفوظة.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                الشروط والأحكام
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                سياسة الاسترداد
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;