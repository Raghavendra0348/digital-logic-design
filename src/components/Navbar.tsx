import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "Hamming Encoder", path: "/hamming-code" },
    { name: "Hamming Decoder", path: "/hamming-decoder" },
    { name: "K-Map Solver", path: "/karnaugh-maps" },
    { name: "Learn", path: "/learn" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const toolLinks = [
    { name: "Number Systems", path: "/number-systems" },
    { name: "Boolean Algebra", path: "/boolean-algebra" },
    { name: "Combinational", path: "/combinational" },
    { name: "Sequential", path: "/sequential" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold hidden sm:inline">
              Logic<span className="text-primary">Glow</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-4">
            {/* Main Navigation */}
            <div className="flex items-center gap-0.5">
              {mainLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${isActive(link.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Tools Dropdown - Only show if there are remaining tools */}
            {toolLinks.length > 0 && (
              <div className="relative group">
                <button className="px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors flex items-center gap-1">
                  More Tools
                  <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute top-full right-0 mt-2 w-52 bg-background/95 backdrop-blur border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {toolLinks.map((link, index) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`block px-4 py-2.5 text-sm transition-colors ${isActive(link.path)
                          ? "bg-primary/10 text-primary border-r-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          } ${index === 0 ? 'rounded-t-lg' : ''} ${index === toolLinks.length - 1 ? 'rounded-b-lg' : ''}`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="xl:hidden">
              <Button variant="ghost" size="icon">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 sm:w-80">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="font-display text-xl font-bold">
                    Logic<span className="text-primary">Glow</span>
                  </span>
                </div>

                {/* Main Navigation */}
                <div className="space-y-1">
                  <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Main Navigation
                  </h3>
                  {mainLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive(link.path)
                        ? "bg-primary/10 text-primary border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* Additional Tools Navigation */}
                {toolLinks.length > 0 && (
                  <div className="space-y-1">
                    <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Additional Tools
                    </h3>
                    {toolLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive(link.path)
                          ? "bg-primary/10 text-primary border-l-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
