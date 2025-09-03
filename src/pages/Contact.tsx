import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("تم إرسال الرسالة:", formData);
    // Here we would handle form submission
    alert("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "الهاتف",
      info: "+966 11 123 4567",
      description: "متاح من السبت إلى الخميس"
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      info: "info@ataa.org.sa",
      description: "نرد خلال 24 ساعة"
    },
    {
      icon: MapPin,
      title: "العنوان",
      info: "الرياض، المملكة العربية السعودية",
      description: "مكتبنا الرئيسي"
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      info: "٩:٠٠ ص - ٥:٠٠ م",
      description: "السبت إلى الخميس"
    }
  ];

  const departments = [
    { name: "الاستفسارات العامة", email: "info@ataa.org.sa" },
    { name: "الدعم التقني", email: "support@ataa.org.sa" },
    { name: "الشراكات", email: "partnerships@ataa.org.sa" },
    { name: "الشكاوى", email: "complaints@ataa.org.sa" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-light to-secondary-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary arabic-text mb-6">
              تواصل معنا
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              نحن هنا للإجابة على استفساراتكم ومساعدتكم في رحلة العطاء. 
              تواصلوا معنا عبر أي من الطرق التالية
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <info.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-primary font-semibold mb-1">
                      {info.info}
                    </p>
                    <p className="text-sm text-foreground/70">
                      {info.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary arabic-text">
                    أرسل لنا رسالة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">الاسم الكامل *</Label>
                        <Input
                          id="name"
                          required
                          placeholder="أدخل اسمك الكامل"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="example@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الجوال</Label>
                        <Input
                          id="phone"
                          placeholder="05xxxxxxxx"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">موضوع الرسالة *</Label>
                        <Input
                          id="subject"
                          required
                          placeholder="موضوع رسالتك"
                          value={formData.subject}
                          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">الرسالة *</Label>
                      <Textarea
                        id="message"
                        required
                        placeholder="اكتب رسالتك هنا..."
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="min-h-[120px] resize-none"
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90"
                    >
                      <Send className="w-5 h-5 ml-2" />
                      إرسال الرسالة
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <div className="space-y-8">
                {/* Departments */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary arabic-text">
                      الأقسام المتخصصة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {departments.map((dept, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="font-medium">{dept.name}</span>
                        <a 
                          href={`mailto:${dept.email}`}
                          className="text-primary hover:text-primary/80 text-sm font-medium"
                        >
                          {dept.email}
                        </a>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary arabic-text">
                      إجراءات سريعة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      onClick={() => navigate("/donate")}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12"
                    >
                      <Heart className="w-5 h-5 ml-2" />
                      تبرع الآن
                    </Button>
                    <Button 
                      onClick={() => navigate("/about")}
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold h-12"
                    >
                      تعرف علينا أكثر
                    </Button>
                    <Button 
                      onClick={() => navigate("/")}
                      variant="outline"
                      className="w-full font-bold h-12"
                    >
                      استكشف المشاريع
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary arabic-text mb-4">
                الأسئلة الشائعة
              </h2>
              <p className="text-xl text-foreground/70">
                إجابات على أكثر الأسئلة شيوعاً
              </p>
            </div>
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    كيف يمكنني التأكد من وصول تبرعي للمستحقين؟
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">
                    نوفر نظام تتبع شامل لجميع التبرعات مع تقارير دورية وصور من المشاريع المنفذة. 
                    كما يمكنك متابعة تقدم المشروع الذي تبرعت له من خلال حسابك على المنصة.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    هل يمكنني التبرع بشكل شهري؟
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">
                    نعم، نوفر خيار التبرع الشهري المتكرر لجميع المشاريع. 
                    يمكنك تحديد المبلغ والتاريخ المناسب لك وسيتم خصم التبرع تلقائياً كل شهر.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    هل منصة عطاء معتمدة رسمياً؟
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">
                    نعم، منصة عطاء معتمدة من الجهات الحكومية المختصة بالعمل الخيري في المملكة 
                    العربية السعودية وتخضع لرقابة وإشراف مستمر لضمان الشفافية.
                  </p>
                </CardContent>
              </Card>
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

export default Contact;