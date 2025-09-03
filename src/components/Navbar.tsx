import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Menu, X, Shield, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userRole, signOut } = useAuth();

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground fill-current" />
              </div>
              <span className="text-2xl font-bold text-primary arabic-text">عطاء</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              الرئيسية
            </Link>
            <Link to="/#projects" className="text-foreground hover:text-primary transition-colors font-medium">
              المشاريع
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              من نحن
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              تواصل معنا
            </Link>
            
            {/* Admin Link for authorized users */}
            {user && (userRole === "admin" || userRole === "moderator") && (
              <Link
                to="/admin"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                <Shield className="h-4 w-4" />
                لوحة التحكم
                <Badge variant={userRole === "admin" ? "destructive" : "secondary"} className="text-xs">
                  {userRole === "admin" ? "مدير" : "مشرف"}
                </Badge>
              </Link>
            )}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Button variant="outline" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  تسجيل الخروج
                </Button>
                <Button 
                  onClick={() => navigate("/donate")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  تبرع الآن
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/auth">
                    <LogIn className="h-4 w-4 mr-2" />
                    تسجيل الدخول
                  </Link>
                </Button>
                <Button 
                  onClick={() => navigate("/donate")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  تبرع الآن
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-accent transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                to="/#projects"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                المشاريع
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                من نحن
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                تواصل معنا
              </Link>
              
              {/* Mobile Admin Link */}
              {user && (userRole === "admin" || userRole === "moderator") && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="h-4 w-4" />
                  لوحة التحكم
                  <Badge variant={userRole === "admin" ? "destructive" : "secondary"} className="text-xs">
                    {userRole === "admin" ? "مدير" : "مشرف"}
                  </Badge>
                </Link>
              )}
              
              <div className="px-3 py-2 space-y-2">
                {user ? (
                  <>
                    <Button variant="outline" onClick={signOut} className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      تسجيل الخروج
                    </Button>
                    <Button 
                      onClick={() => {
                        navigate("/donate");
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    >
                      تبرع الآن
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        تسجيل الدخول
                      </Link>
                    </Button>
                    <Button 
                      onClick={() => {
                        navigate("/donate");
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    >
                      تبرع الآن
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;