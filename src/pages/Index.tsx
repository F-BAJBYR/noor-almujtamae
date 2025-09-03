import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Index = () => {
  const { user, userRole } = useAuth();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ProjectsSection />
      
      {/* Admin Access Section */}
      {user && (userRole === "admin" || userRole === "moderator") && (
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">مرحباً بك في لوحة التحكم</h2>
              <p className="text-muted-foreground mb-6">
                إدارة شاملة لمنصة الخير - دورك: {userRole === "admin" ? "مدير" : "مشرف"}
              </p>
              <Button asChild size="lg">
                <Link to="/admin">
                  الدخول للوحة التحكم
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;