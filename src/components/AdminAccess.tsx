import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, BarChart3, Settings, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AdminAccess = () => {
  const { user, userRole } = useAuth();

  if (!user || (userRole !== "admin" && userRole !== "moderator")) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
          <CardTitle>الوصول للوحة التحكم</CardTitle>
          <CardDescription>
            هذا القسم متاح فقط للمديرين والمشرفين
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            لتصبح مديراً، يرجى التواصل مع فريق الدعم أو قم بإنشاء أول حساب في المنصة
          </p>
          <Button asChild>
            <Link to="/auth">
              تسجيل الدخول
              <ArrowRight className="h-4 w-4 mr-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold">مرحباً بك في لوحة التحكم</h2>
        <p className="text-muted-foreground mt-2">
          إدارة شاملة لمنصة الخير - دورك: {userRole === "admin" ? "مدير" : "مشرف"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Users className="h-8 w-8 text-primary mx-auto" />
            <CardTitle className="text-lg">إدارة المستخدمين</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              عرض وإدارة المستخدمين وتعيين الأدوار
            </p>
            <Button asChild className="w-full">
              <Link to="/admin">
                الدخول للوحة التحكم
                <ArrowRight className="h-4 w-4 mr-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <BarChart3 className="h-8 w-8 text-primary mx-auto" />
            <CardTitle className="text-lg">التقارير والإحصائيات</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              مراقبة الأداء وتحليل البيانات
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin">
                عرض التقارير
                <ArrowRight className="h-4 w-4 mr-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Shield className="h-8 w-8 text-primary mx-auto" />
            <CardTitle className="text-lg">إدارة المشاريع</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              إنشاء وتحرير المشاريع الخيرية
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin">
                إدارة المشاريع
                <ArrowRight className="h-4 w-4 mr-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Settings className="h-8 w-8 text-primary mx-auto" />
            <CardTitle className="text-lg">إعدادات النظام</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              تكوين إعدادات المنصة العامة
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin">
                الإعدادات
                <ArrowRight className="h-4 w-4 mr-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary/5">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">نصائح مهمة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <strong>المستخدم الأول:</strong> يحصل تلقائياً على دور مدير
              </div>
              <div>
                <strong>الأمان:</strong> فقط المديرون يمكنهم تعيين الأدوار
              </div>
              <div>
                <strong>البيانات:</strong> جميع العمليات محمية بنظام أمان متقدم
              </div>
              <div>
                <strong>النسخ الاحتياطي:</strong> يتم حفظ البيانات تلقائياً
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAccess;