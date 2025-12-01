import { motion } from "framer-motion";
import { Binary, Boxes, CircuitBoard, Zap, BookOpen, Cpu, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationCard } from "@/components/NavigationCard";
import { CircuitBackground } from "@/components/CircuitBackground";
import heroImage from "@/assets/hero-circuit.jpg";
import {  DeckToGrid } from "@/components/DeckToGrid";
import { AdSenseAd } from "@/components/AdSenseAd";


<AdSenseAd 
  slot="7812693991042173"
  format="auto"
  responsive={true}
/>
const Index = () => {
  return (
    <div className="min-h-screen relative">
      <CircuitBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Animated Title */}
            <motion.div
              className="mb-6"
              animate={{ 
                textShadow: [
                  "0 0 20px hsl(var(--glow-cyan) / 0.5)",
                  "0 0 40px hsl(var(--glow-cyan) / 0.8)",
                  "0 0 20px hsl(var(--glow-cyan) / 0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-4">
                <span className="text-glow-cyan">Digital Logic</span>
                <br />
                <span className="text-glow-blue">& Design</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto"
            >
              Master Digital Logic Design through{" "}
              <span className="text-primary font-semibold">interactive simulations</span>.
              Explore encoders, decoders, number conversions, Boolean algebra, and sequential circuits with{" "}
              <span className="text-secondary font-semibold">real-time visualizations</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Button variant="hero" size="xl" asChild>
                <a href="#playground">
                  <Zap className="w-5 h-5" />
                  Open Playground
                </a>
              </Button>
              <Button variant="circuit" size="xl" asChild>
                <a href="#learn">
                  <BookOpen className="w-5 h-5" />
                  Start Learning
                </a>
              </Button>
            </motion.div>

            {/* Feature Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 text-sm"
            >
              {["Real-time Simulation", "Visual Learning", "Interactive Tools", "Step-by-Step Guides"].map((feature, i) => (
                <span key={i} className="glass px-4 py-2 rounded-full border border-primary/20 text-foreground/90">
                  {feature}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Navigation Cards Section */}
      <section id="playground" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
           
          </motion.div>

           <DeckToGrid />
        
        </div>
      </section>

      {/* Learn Section Preview */}
      <section id="learn" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-strong p-12 rounded-2xl max-w-4xl mx-auto text-center border-2 border-primary/20"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-glow-cyan">
              Learn Mode
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Access comprehensive theory notes, interactive quizzes, and step-by-step tutorials
              for every digital logic concept. From basics to advanced topics.
            </p>
            <Button variant="neon" size="lg" asChild>
              <a href="/learn">
                <Boxes className="w-5 h-5" />
                Explore Learning Resources
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Index;
