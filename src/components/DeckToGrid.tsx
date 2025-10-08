import { motion, useScroll, useTransform, useSpring, useInView, MotionValue } from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";
import {
  Binary,
  CircuitBoard,
  Zap,
  BookOpen,
  Cpu,
  Shield,
  LucideIcon,
} from "lucide-react";
import { NavigationCard } from "@/components/NavigationCard";

// Enhanced floating particles with better performance
const FloatingParticles = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 4,
      color: ['cyan', 'blue', 'purple', 'green'][Math.floor(Math.random() * 4)] as keyof typeof colorMap,
    })), []
  );

  const particleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0, 0.6, 0.6, 0]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, ${colorMap[particle.color].particle}, transparent)`,
            opacity: particleOpacity,
          }}
          animate={{
            y: [-30, 30],
            x: [-15, 15],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced responsive grid system
function useResponsiveGrid(cardsLength: number) {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = dimensions.width < 768;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1200;
  const isDesktop = dimensions.width >= 1200;

  let config = {
    columns: 1,
    rows: cardsLength,
    cardWidth: 280,
    cardHeight: 200,
    gap: 24,
    containerHeight: 600,
  };

  if (isMobile) {
    config = {
      columns: 1,
      rows: cardsLength,
      cardWidth: Math.min(350, dimensions.width - 32),
      cardHeight: 200,
      gap: 24,
      containerHeight: Math.max(600, cardsLength * 250),
    };
  } else if (isTablet) {
    config = {
      columns: 2,
      rows: Math.ceil(cardsLength / 2),
      cardWidth: 320,
      cardHeight: 220,
      gap: 32,
      containerHeight: Math.max(700, Math.ceil(cardsLength / 2) * 280),
    };
  } else if (isDesktop) {
    config = {
      columns: Math.min(3, cardsLength),
      rows: Math.ceil(cardsLength / 3),
      cardWidth: 350,
      cardHeight: 240,
      gap: 40,
      containerHeight: Math.max(800, Math.ceil(cardsLength / 3) * 300),
    };
  }

  return { ...config, isMobile, isTablet, isDesktop };
}

const colorMap = {
  cyan: {
    shadow: "0px 10px 30px rgba(0, 255, 255, 0.4)",
    glow: "0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.3)",
    particle: "rgba(0, 255, 255, 0.8)"
  },
  blue: {
    shadow: "0px 10px 30px rgba(0, 191, 255, 0.4)",
    glow: "0 0 20px rgba(0, 191, 255, 0.6), 0 0 40px rgba(0, 191, 255, 0.3)",
    particle: "rgba(0, 191, 255, 0.8)"
  },
  purple: {
    shadow: "0px 10px 30px rgba(128, 0, 128, 0.4)",
    glow: "0 0 20px rgba(147, 51, 234, 0.6), 0 0 40px rgba(147, 51, 234, 0.3)",
    particle: "rgba(147, 51, 234, 0.8)"
  },
  green: {
    shadow: "0px 10px 30px rgba(0, 255, 0, 0.3)",
    glow: "0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.3)",
    particle: "rgba(34, 197, 94, 0.8)"
  },
};

// Separate component to handle card animations
interface AnimatedCardProps {
  card: {
    title: string;
    description: string;
    icon: LucideIcon;
    to: string;
    color: "cyan" | "blue" | "purple" | "green";
  };
  index: number;
  scrollYProgress: MotionValue<number>;
  cardWidth: number;
  cardHeight: number;
}

const AnimatedCard = ({ card, index, scrollYProgress, cardWidth, cardHeight }: AnimatedCardProps) => {
  const delay = index * 0.15;

  // Scroll-based animations - cards stay visible throughout scroll
  const cardOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.15, 0.95, 1],
    [0, 1, 1, 0]
  );

  const cardScale = useTransform(
    scrollYProgress,
    [0.05, 0.15, 0.95, 1],
    [0.9, 1, 1, 0.9]
  );

  const cardY = useTransform(
    scrollYProgress,
    [0.05, 0.15, 0.95, 1],
    [30, 0, 0, -30]
  );

  return (
    <motion.div
      className="relative group"
      style={{
        width: cardWidth,
        height: cardHeight,
      }}
      variants={{
        hidden: {
          opacity: 0,
          scale: 0.8,
          y: 40,
        },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            type: "spring",
            damping: 25,
            stiffness: 120,
            delay,
            duration: 0.6,
          }
        }
      }}
      animate={{
        y: [0, -3, 0],
      }}
      transition={{
        duration: 4 + (index * 0.2),
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay + 2,
      }}
    >
      <motion.div
        style={{
          opacity: cardOpacity,
          scale: useSpring(cardScale, { stiffness: 100, damping: 20 }),
          y: useSpring(cardY, { stiffness: 100, damping: 20 }),
        }}
        className="w-full h-full"
      >
        <NavigationCard
          title={card.title}
          description={card.description}
          icon={card.icon}
          to={card.to}
          color={card.color}
        />
      </motion.div>

      {/* Enhanced glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${colorMap[card.color].particle}, transparent 70%)`,
          filter: "blur(20px)",
          zIndex: -1,
        }}
      />
    </motion.div>
  );
};

export const DeckToGrid = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const cards: Array<{
    title: string;
    description: string;
    icon: LucideIcon;
    to: string;
    color: "cyan" | "blue" | "purple" | "green";
  }> = [
      {
        title: "Hamming Encoder",
        description: "Error detection and correction visualization",
        icon: Shield,
        to: "/hamming-code",
        color: "cyan",
      },
      {
        title: "Hamming Decoder",
        description: "Detect and correct errors interactively",
        icon: Zap,
        to: "/hamming-decoder",
        color: "blue",
      },
      {
        title: "K-Map Solver",
        description: "Karnaugh Map simplification and optimization",
        icon: CircuitBoard,
        to: "/karnaugh-maps",
        color: "purple",
      },
      {
        title: "Combinational Circuits",
        description: "Adders, multiplexers & circuit minimization",
        icon: CircuitBoard,
        to: "/combinational",
        color: "purple",
      },
      {
        title: "Boolean Algebra",
        description: "Truth tables, logic gates & simplification",
        icon: Zap,
        to: "/boolean-algebra",
        color: "blue",
      },
      {
        title: "Number Systems",
        description: "Binary, Decimal, Octal & Hex conversions",
        icon: Binary,
        to: "/number-systems",
        color: "cyan",
      },
      {
        title: "Learn Mode",
        description: "Interactive tutorials and guided theory",
        icon: BookOpen,
        to: "/learn",
        color: "blue",
      },
      {
        title: "Sequential Circuits",
        description: "Flip-flops, latches & timing diagrams",
        icon: Cpu,
        to: "/sequential",
        color: "green",
      },
    ];

  // Enhanced responsive grid settings
  const gridConfig = useResponsiveGrid(cards.length);
  const { columns, rows, cardWidth, cardHeight, gap, containerHeight, isMobile, isTablet } = gridConfig;

  // Smooth heading animations - stays visible longer
  const headingOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const headingScale = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.9, 1, 1, 0.95]);

  // Static background animation - stays visible throughout
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0, 0.4, 0.4, 0]);

  // Cards entrance timing
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-40 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black"
    >
      {/* Static background overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-green-500/10"
        style={{
          opacity: bgOpacity,
        }}
      />

      {/* Additional static background layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tl from-purple-500/5 via-transparent to-cyan-500/5"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.95, 1], [0, 0.3, 0.3, 0]),
        }}
      />

      {/* Floating particles */}
      <FloatingParticles scrollYProgress={scrollYProgress} />

      <motion.div
        className="text-center relative z-10"
        style={{
          opacity: headingOpacity,
          y: headingY,
          scale: headingScale,
        }}
      >
        <motion.h2
          className="font-display text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          Explore the Lab
        </motion.h2>
        <motion.p
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Choose your learning path and dive into interactive simulations
        </motion.p>
      </motion.div>

      <motion.div
        ref={cardsRef}
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          minHeight: containerHeight,
          perspective: 1000,
        }}
        initial="hidden"
        animate={cardsInView ? "visible" : "hidden"}
      >
        <div
          className={`
            grid gap-${gap / 4} 
            ${isMobile ? 'grid-cols-1 place-items-center' : ''}
            ${isTablet ? 'grid-cols-2 place-items-center' : ''}
            ${!isMobile && !isTablet ? `grid-cols-${Math.min(columns, 3)} place-items-center` : ''}
            auto-rows-fr
          `}
          style={{
            gap: `${gap}px`,
          }}
        >
          {cards.map((card, i) => (
            <AnimatedCard
              key={`${card.title}-${i}`}
              card={card}
              index={i}
              scrollYProgress={scrollYProgress}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
            />
          ))}
        </div>
      </motion.div>

      {/* Enhanced bottom glow effects */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95vw] max-w-[1000px] h-[150px] md:h-[250px] bg-gradient-to-t from-blue-500/15 via-cyan-500/10 to-transparent blur-3xl rounded-full"
        style={{
          opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.9, 1], [0, 0.8, 0.8, 0]),
          scale: useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.9, 1.1, 0.9]),
        }}
      />

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[60vw] max-w-[600px] h-[80px] md:h-[120px] bg-gradient-to-t from-purple-500/20 to-transparent blur-2xl rounded-full"
        style={{
          opacity: useTransform(scrollYProgress, [0.2, 0.4, 0.95, 1], [0, 0.6, 0.6, 0]),
        }}
      />
    </section>
  );
};
