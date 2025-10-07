import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import NumberSystems from "./pages/NumberSystems";
import BooleanAlgebra from "./pages/BooleanAlgebra";
import Combinational from "./pages/Combinational";
import Sequential from "./pages/Sequential";
import HammingCode from "./pages/HammingCode";
import HammingDecoder from "./pages/HammingDecoder";
import Learn from "./pages/Learn";
import NotFound from "./pages/NotFound";
import HammingCodeArticle from "./pages/blog/HammingCodeArticle";
import BooleanAlgebraArticle from "./pages/blog/BooleanAlgebraArticle";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/hamming-code" element={<HammingCode />} />
          <Route path="/hamming-decoder" element={<HammingDecoder />} />
          <Route path="/number-systems" element={<NumberSystems />} />
          <Route path="/boolean-algebra" element={<BooleanAlgebra />} />
          <Route path="/combinational" element={<Combinational />} />
          <Route path="/sequential" element={<Sequential />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/blog/understanding-hamming-code" element={<HammingCodeArticle />} />
          <Route path="/blog/boolean-algebra-fundamentals" element={<BooleanAlgebraArticle />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
