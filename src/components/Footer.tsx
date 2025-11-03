import { Link } from "react-router-dom";
import { Mail, Home, BookOpen, Shield, FileText, AlertTriangle } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-gradient-to-b from-transparent to-slate-950/50 border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-display text-2xl font-bold text-glow-cyan mb-3">
              Digital Logic & Design
            </h3>
            <p className="text-foreground/70 text-sm leading-relaxed max-w-md mb-4">
              Master digital logic design through interactive simulations and real-time visualizations.
              Learn Boolean algebra, combinational circuits, sequential logic, and more – all for free.
            </p>
            <p className="text-xs text-muted-foreground">
              © {currentYear} Digital Logic & Design. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Home className="w-4 h-4 text-primary" />
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-foreground/70 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-foreground/70 hover:text-primary transition-colors">
                  Learn Mode
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-foreground/70 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-foreground/70 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-foreground/70 hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-foreground/70 hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Tools Section */}
        <div className="border-t border-border/30 pt-8">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            Interactive Tools
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-sm">
            <Link to="/hamming-code" className="text-foreground/70 hover:text-primary transition-colors">
              Hamming Encoder
            </Link>
            <Link to="/hamming-decoder" className="text-foreground/70 hover:text-primary transition-colors">
              Hamming Decoder
            </Link>
            <Link to="/karnaugh-maps" className="text-foreground/70 hover:text-primary transition-colors">
              K-map Solver
            </Link>
            <Link to="/number-systems" className="text-foreground/70 hover:text-primary transition-colors">
              Number Systems
            </Link>
            <Link to="/boolean-algebra" className="text-foreground/70 hover:text-primary transition-colors">
              Boolean Algebra
            </Link>
            <Link to="/combinational" className="text-foreground/70 hover:text-primary transition-colors">
              Combinational Circuits
            </Link>
            <Link to="/sequential" className="text-foreground/70 hover:text-primary transition-colors">
              Sequential Circuits
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            Built for Engineers, Learners & Makers
          </p>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a href="mailto:learnwithhraghava@gmail.com" className="hover:text-primary transition-colors">
              learnwithhraghava@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};