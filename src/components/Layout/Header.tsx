import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Menu, X, Heart, GraduationCap, Users, Phone, LogIn, MessageCircle, LogOut } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, session, loading } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const navigation = [
    { name: "Home", href: "/", icon: Heart },
    { name: "About", href: "/about", icon: Heart },
    { name: "Services", href: "/services", icon: Users },
    { name: "Training", href: "/training", icon: GraduationCap },
    { name: "Blog", href: "/blog", icon: MessageCircle },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-foreground">BRCTC</h1>
            <p className="text-xs text-muted-foreground">Bridge to Renewal</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          {!loading && (
            <>
              {session ? (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/chat">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
              )}
            </>
          )}
          <Button variant="hero" size="sm" asChild>
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="container py-4">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-3">
                {!loading && (
                  <>
                    {session ? (
                      <>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/chat" onClick={() => setIsMenuOpen(false)}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Chat
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => { handleSignOut(); setIsMenuOpen(false); }}>
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                          <LogIn className="h-4 w-4 mr-2" />
                          Sign In
                        </Link>
                      </Button>
                    )}
                  </>
                )}
                <Button variant="hero" size="sm" asChild>
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;