import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground fill-current" />
            </div>
            <span className="text-2xl font-bold text-primary arabic-text">عطاء</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">
              الرئيسية
            </a>
            <a href="#projects" className="text-foreground hover:text-primary transition-colors font-medium">
              المشاريع
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              من نحن
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
              تواصل معنا
            </a>
          </div>

          <div className="hidden md:block">
            <Button 
              onClick={() => navigate("/donate")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              تبرع الآن
            </Button>
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
              <a
                href="#home"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </a>
              <a
                href="#projects"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                المشاريع
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                من نحن
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                تواصل معنا
              </a>
              <div className="px-3 py-2">
                <Button 
                  onClick={() => navigate("/donate")}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  تبرع الآن
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;