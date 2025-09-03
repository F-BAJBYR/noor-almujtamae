import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Heart, CreditCard, Smartphone, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Donate = () => {
  const navigate = useNavigate();
  const [donationType, setDonationType] = useState("quick");
  const [amount, setAmount] = useState("100");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    isAnonymous: false
  });

  const quickAmounts = ["50", "100", "250", "500", "1000"];

  useEffect(() => {
    // SEO basics
    document.title = "التبرع - منصة عطاء";
    const desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (desc) {
      desc.setAttribute("content", "تبرع عبر Stripe بأمان وسهولة لدعم مشاريع منصة عطاء.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "تبرع عبر Stripe بأمان وسهولة لدعم مشاريع منصة عطاء.";
      document.head.appendChild(m);
    }
    const canonical = (document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null) || document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", window.location.origin + "/donate");
    if (!canonical.parentElement) document.head.appendChild(canonical);

    // Show toast based on payment status
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    if (status === "success") {
      toast({ title: "تم الدفع بنجاح", description: "شكرًا لكرمك!" });
    } else if (status === "cancel") {
      toast({ title: "تم إلغاء العملية", description: "يمكنك المحاولة مرة أخرى في أي وقت." });
    }
  }, []);

  const handleDonate = async () => {
    try {
      const finalAmountStr = donationType === "custom" ? customAmount : amount;
      const finalAmount = parseFloat(finalAmountStr || "0");
      if (!finalAmount || finalAmount <= 0) {
        toast({ title: "قيمة غير صالحة", description: "الرجاء إدخال مبلغ تبرع صحيح.", });
        return;
      }

      const amountMinor = Math.round(finalAmount * 100); // SAR -> halalas
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: {
          amount: amountMinor,
          currency: "sar",
          donor: {
            name: donorInfo.name,
            email: donorInfo.email,
            phone: donorInfo.phone,
            isAnonymous: donorInfo.isAnonymous,
          },
          payment_method: paymentMethod,
          success_url: `${window.location.origin}/donate?status=success`,
          cancel_url: `${window.location.origin}/donate?status=cancel`,
        },
      });

      if (error) {
        console.error(error);
        toast({ title: "حدث خطأ", description: "تعذّر إنشاء عملية الدفع. حاول مرة أخرى." });
        return;
      }

      if (data?.url) {
        window.open(data.url, "_blank"); // Open Stripe Checkout in new tab
      } else {
        toast({ title: "تعذّر المتابعة", description: "لم يتم استلام رابط الدفع." });
      }
    } catch (e) {
      console.error(e);
      toast({ title: "خطأ غير متوقع", description: "حدثت مشكلة غير متوقعة. حاول لاحقًا." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-light to-secondary-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-primary ml-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary arabic-text">
                تبرع الآن
              </h1>
            </div>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              مساهمتك تصنع الفرق في حياة المحتاجين وتساهم في بناء مجتمع أفضل
            </p>
          </div>
        </section>

        {/* Donation Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Donation Options */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-background to-background/95">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-primary arabic-text flex items-center gap-3">
                    <Heart className="w-7 h-7 text-primary" />
                    اختر مبلغ التبرع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Donation Type */}
                  <RadioGroup value={donationType} onValueChange={setDonationType}>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="quick" id="quick" />
                      <Label htmlFor="quick" className="text-lg">مبالغ سريعة</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom" className="text-lg">مبلغ مخصص</Label>
                    </div>
                  </RadioGroup>

                  {/* Quick Amounts */}
                  {donationType === "quick" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {quickAmounts.map((quickAmount) => (
                        <Button
                          key={quickAmount}
                          variant={amount === quickAmount ? "default" : "outline"}
                          onClick={() => setAmount(quickAmount)}
                          className="h-12 text-lg font-semibold"
                        >
                          {quickAmount} ر.س
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Custom Amount */}
                  {donationType === "custom" && (
                    <div className="space-y-2">
                      <Label htmlFor="customAmount">المبلغ بالريال السعودي</Label>
                      <Input
                        id="customAmount"
                        type="number"
                        placeholder="أدخل المبلغ..."
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="text-lg h-12"
                      />
                    </div>
                  )}

                  <Separator />

                  {/* Payment Methods */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">طريقة الدفع</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard className="w-5 h-5" />
                            <span>بطاقة ائتمانية / مدى</span>
                          </Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <RadioGroupItem value="stcpay" id="stcpay" />
                          <Label htmlFor="stcpay" className="flex items-center gap-2 cursor-pointer">
                            <Smartphone className="w-5 h-5" />
                            <span>STC Pay</span>
                          </Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                            <Building2 className="w-5 h-5" />
                            <span>تحويل بنكي</span>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Donor Information */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary arabic-text">
                    معلومات المتبرع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input
                        id="name"
                        placeholder="أدخل اسمك الكامل..."
                        value={donorInfo.name}
                        onChange={(e) => setDonorInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@domain.com"
                        value={donorInfo.email}
                        onChange={(e) => setDonorInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الجوال</Label>
                      <Input
                        id="phone"
                        placeholder="05xxxxxxxx"
                        value={donorInfo.phone}
                        onChange={(e) => setDonorInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="h-12"
                      />
                    </div>

                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={donorInfo.isAnonymous}
                        onChange={(e) => setDonorInfo(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="anonymous">تبرع مجهول</Label>
                    </div>
                  </div>

                  <Separator />

                  {/* Donation Summary */}
                  <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold text-foreground">ملخص التبرع</h4>
                    <div className="flex justify-between">
                      <span>مبلغ التبرع:</span>
                      <span className="font-bold text-primary">
                        {donationType === "custom" ? customAmount || "0" : amount} ر.س
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>رسوم المعالجة:</span>
                      <span className="text-sm text-muted-foreground">مجاناً</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>المبلغ الإجمالي:</span>
                      <span className="text-primary">
                        {donationType === "custom" ? customAmount || "0" : amount} ر.س
                      </span>
                    </div>
                  </div>

                  {/* Donate Button */}
                  <Button 
                    onClick={handleDonate}
                    className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90"
                    disabled={!donorInfo.name || !donorInfo.email || (!amount && !customAmount)}
                  >
                    <Heart className="w-5 h-5 ml-2" />
                    تأكيد التبرع
                  </Button>

                  {/* Back Button */}
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(-1)}
                    className="w-full h-12 text-lg font-medium"
                  >
                    <ArrowLeft className="w-5 h-5 ml-2" />
                    العودة للصفحة السابقة
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary arabic-text mb-4">
                لماذا تثق في منصة عطاء؟
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-primary">آمان مضمون</h3>
                <p className="text-foreground/70">
                  جميع المعاملات محمية بأعلى معايير الأمان والتشفير
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-secondary/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-secondary rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-secondary">شفافية كاملة</h3>
                <p className="text-foreground/70">
                  تتبع مفصل لكيفية استخدام تبرعاتك وتقارير دورية
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-primary">اعتماد رسمي</h3>
                <p className="text-foreground/70">
                  منصة معتمدة من الجهات الحكومية المختصة
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;