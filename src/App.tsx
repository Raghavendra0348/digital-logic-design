import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import KarnaughMaps from "./pages/KarnaughMaps";
import Learn from "./pages/Learn";
import CounterDesign from "./pages/CounterDesign";
import DigitalClock from "./pages/DigitalClock";
import ArithmeticCircuits from "./pages/ArithmeticCircuits";

import FAQ from "./pages/FAQ";
import HammingCodeArticle from "./pages/blog/HammingCodeArticle";
import BooleanAlgebraArticle from "./pages/blog/BooleanAlgebraArticle";
import SequentialVsCombinationalArticle from "./pages/blog/SequentialVsCombinationalArticle";
import NumberSystemsConversionArticle from "./pages/blog/NumberSystemsConversionArticle";
import KarnaughMapsTutorialArticle from "./pages/blog/KarnaughMapsTutorialArticle";
import FlipFlopsAndLatchesArticle from "./pages/blog/FlipFlopsAndLatchesArticle";

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
          <Route path="/karnaugh-maps" element={<KarnaughMaps />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/counter-design" element={<CounterDesign />} />
          <Route path="/digital-clock" element={<DigitalClock />} />
          <Route path="/arithmetic-circuits" element={<ArithmeticCircuits />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog/understanding-hamming-code" element={<HammingCodeArticle />} />
          <Route path="/blog/boolean-algebra-fundamentals" element={<BooleanAlgebraArticle />} />
          <Route path="/blog/sequential-vs-combinational" element={<SequentialVsCombinationalArticle />} />
          <Route path="/blog/number-systems-conversion-guide" element={<NumberSystemsConversionArticle />} />
          <Route path="/blog/karnaugh-maps-tutorial" element={<KarnaughMapsTutorialArticle />} />
          <Route path="/blog/flip-flops-and-latches-guide" element={<FlipFlopsAndLatchesArticle />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
