import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { CircuitBackground } from "@/components/CircuitBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, BookOpen, Mail } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "404 - Page Not Found | Digital Electronics Hub";
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const quickLinks = [
    { title: "Home", description: "Return to homepage", icon: Home, path: "/" },
    { title: "Learn", description: "Browse learning resources", icon: BookOpen, path: "/learn" },
    { title: "Contact", description: "Get in touch with us", icon: Mail, path: "/contact" },
  ];

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <CircuitBackground />
        
        <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-8xl md:text-9xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              404
            </h1>
            <p className="text-2xl md:text-3xl font-heading text-foreground mb-4">
              Circuit Disconnected
            </p>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              The page you're looking for doesn't exist in our digital network. Let's get you back on track.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link to={link.path} key={link.path}>
                  <Card className="glass border-primary/20 hover:border-primary/50 transition-all duration-300 hover:glow-cyan h-full group">
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/">
              <Button variant="hero" size="lg">
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </Button>
            </Link>
          </div>

          {location.pathname && (
            <p className="text-center mt-8 text-sm text-muted-foreground">
              Attempted path: <code className="glass px-2 py-1 rounded">{location.pathname}</code>
            </p>
          )}
        </div>
      </main>
  );
};

export default NotFound;
