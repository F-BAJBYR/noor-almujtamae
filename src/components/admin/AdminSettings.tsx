import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  Bell, 
  Mail, 
  Shield, 
  Database, 
  Palette,
  Globe,
  CreditCard
} from "lucide-react";

const AdminSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "منصة الخير",
    siteDescription: "منصة لإدارة المشاريع الخيرية والتبرعات",
    contactEmail: "admin@charity.com",
    enableNotifications: true,
    enableEmailUpdates: true,
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    maxProjectsPerUser: 10,
    minDonationAmount: 5,
    platformFee: 2.5,
    welcomeMessage: "مرحباً بكم في منصة الخير"
  });
  
  const { toast } = useToast();

  const handleSave = async (section: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "تم حفظ الإعدادات",
      description: `تم تحديث إعدادات ${section} بنجاح`,
    });
    
    setIsLoading(false);
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">إعدادات النظام</h2>
        <p className="text-muted-foreground">إدارة إعدادات المنصة والتكوين العام</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <CardTitle>الإعدادات العامة</CardTitle>
          </div>
          <CardDescription>إعدادات أساسية للمنصة</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">اسم الموقع</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => updateSetting("siteName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">البريد الإلكتروني للتواصل</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => updateSetting("contactEmail", e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="siteDescription">وصف الموقع</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => updateSetting("siteDescription", e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="welcomeMessage">رسالة الترحيب</Label>
            <Textarea
              id="welcomeMessage"
              value={settings.welcomeMessage}
              onChange={(e) => updateSetting("welcomeMessage", e.target.value)}
              rows={2}
            />
          </div>
          
          <Button onClick={() => handleSave("عام")} disabled={isLoading}>
            {isLoading ? "جاري الحفظ..." : "حفظ الإعدادات العامة"}
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>إعدادات الإشعارات</CardTitle>
          </div>
          <CardDescription>إدارة الإشعارات والتنبيهات</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>تفعيل الإشعارات</Label>
              <p className="text-sm text-muted-foreground">إرسال إشعارات للمستخدمين</p>
            </div>
            <Switch
              checked={settings.enableNotifications}
              onCheckedChange={(checked) => updateSetting("enableNotifications", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>التحديثات عبر البريد الإلكتروني</Label>
              <p className="text-sm text-muted-foreground">إرسال تحديثات المشاريع عبر البريد</p>
            </div>
            <Switch
              checked={settings.enableEmailUpdates}
              onCheckedChange={(checked) => updateSetting("enableEmailUpdates", checked)}
            />
          </div>
          
          <Button onClick={() => handleSave("الإشعارات")} disabled={isLoading}>
            {isLoading ? "جاري الحفظ..." : "حفظ إعدادات الإشعارات"}
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>إعدادات الأمان</CardTitle>
          </div>
          <CardDescription>إدارة إعدادات الأمان والوصول</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>وضع الصيانة</Label>
              <p className="text-sm text-muted-foreground">تعطيل الموقع مؤقتاً للصيانة</p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => updateSetting("maintenanceMode", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>السماح بالتسجيل</Label>
              <p className="text-sm text-muted-foreground">السماح للمستخدمين الجدد بالتسجيل</p>
            </div>
            <Switch
              checked={settings.allowRegistration}
              onCheckedChange={(checked) => updateSetting("allowRegistration", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>تأكيد البريد الإلكتروني</Label>
              <p className="text-sm text-muted-foreground">طلب تأكيد البريد عند التسجيل</p>
            </div>
            <Switch
              checked={settings.requireEmailVerification}
              onCheckedChange={(checked) => updateSetting("requireEmailVerification", checked)}
            />
          </div>
          
          <Button onClick={() => handleSave("الأمان")} disabled={isLoading}>
            {isLoading ? "جاري الحفظ..." : "حفظ إعدادات الأمان"}
          </Button>
        </CardContent>
      </Card>

      {/* Platform Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <CardTitle>إعدادات المنصة</CardTitle>
          </div>
          <CardDescription>إعدادات المشاريع والتبرعات</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxProjects">أقصى عدد مشاريع لكل مستخدم</Label>
              <Input
                id="maxProjects"
                type="number"
                value={settings.maxProjectsPerUser}
                onChange={(e) => updateSetting("maxProjectsPerUser", parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="minDonation">أقل مبلغ تبرع ($)</Label>
              <Input
                id="minDonation"
                type="number"
                value={settings.minDonationAmount}
                onChange={(e) => updateSetting("minDonationAmount", parseFloat(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platformFee">رسوم المنصة (%)</Label>
              <Input
                id="platformFee"
                type="number"
                step="0.1"
                value={settings.platformFee}
                onChange={(e) => updateSetting("platformFee", parseFloat(e.target.value))}
              />
            </div>
          </div>
          
          <Button onClick={() => handleSave("المنصة")} disabled={isLoading}>
            {isLoading ? "جاري الحفظ..." : "حفظ إعدادات المنصة"}
          </Button>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            <CardTitle>معلومات النظام</CardTitle>
          </div>
          <CardDescription>معلومات حول حالة النظام والأداء</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>إصدار النظام</Label>
              <p className="text-sm text-muted-foreground">1.0.0</p>
            </div>
            
            <div className="space-y-2">
              <Label>آخر تحديث</Label>
              <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString("ar-SA")}</p>
            </div>
            
            <div className="space-y-2">
              <Label>حالة قاعدة البيانات</Label>
              <p className="text-sm text-green-600">متصلة ✓</p>
            </div>
            
            <div className="space-y-2">
              <Label>مساحة التخزين المستخدمة</Label>
              <p className="text-sm text-muted-foreground">2.4 GB / 100 GB</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;