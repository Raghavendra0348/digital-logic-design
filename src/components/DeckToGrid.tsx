import { motion, useScroll, useTransform } from "framer-motion";
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

// Responsive helpers
function useResponsiveGrid(cardsLength: number) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth < 1024 && windowWidth >= 640;

  let columns = 4;
  let spacingX = 250;
  let spacingY = 260;
  let height = 800;

  if (isMobile) {
    columns = 1;
    spacingX = 0;
    spacingY = 220;
    height = Math.max(400, cardsLength * 220);
  } else if (isTablet) {
    columns = 2;
    spacingX = 180;
    spacingY = 220;
    height = Math.max(500, Math.ceil(cardsLength / 2) * 220);
  } else {
    // Desktop: 2 rows, columns = ceil(cardsLength / 2)
    columns = Math.ceil(cardsLength / 2);
    spacingX = 220;
    spacingY = 220;
    height = Math.max(600, 2 * 220);
  }

  return { columns, spacingX, spacingY, height };
}

const colorMap = {
  cyan: { shadow: "0px 10px 30px rgba(0, 255, 255, 0.4)" },
  blue: { shadow: "0px 10px 30px rgba(0, 191, 255, 0.4)" },
  purple: { shadow: "0px 10px 30px rgba(128, 0, 128, 0.4)" },
  green: { shadow: "0px 10px 30px rgba(0, 255, 0, 0.3)" },
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
      title: "Combinational Circuits",
      description: "K-Maps, adders, multiplexers & minimization",
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

  // Responsive grid settings
  const { columns, spacingX, spacingY, height } = useResponsiveGrid(cards.length);

  // Random rotation per card (stable)
  const randomRotations = useMemo(
    () => cards.map(() => 10 * (Math.random() - 0.5)),
    [cards.length]
  );

  // Animate heading fade-in
  const headingOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.65, 0.8], [0, 1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0.2, 0.35], [40, 0]);

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-40 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black"
    >
      <motion.h2
        className="font-display text-3xl md:text-5xl text-center font-bold mb-8 md:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
        style={{
          opacity: headingOpacity,
          y: headingY,
        }}
      >
        Explore the Lab
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose your learning path and dive into interactive simulations
        </p>
      </motion.h2>

      <div
        className="relative w-full flex items-center justify-center"
        style={{ height }}
      >
        {cards.map((card, i) => {
          const row = Math.floor(i / columns);
          const col = i % columns;

          const targetX = (col - (columns - 1) / 2) * spacingX;
          const targetY = row * spacingY;

          // Animate: [0, 0.3] = deck, [0.3, 0.7] = grid, [0.7, 1] = deck
          const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, targetX, targetX, 0]);
          const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, targetY, targetY, 0]);
          const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);
          const rotate = useTransform(
            scrollYProgress,
            [0, 0.3, 0.7, 1],
            [randomRotations[i], 0, 0, randomRotations[i]]
          );
          const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

          const { shadow } = colorMap[card.color] || colorMap.blue;

          return (
            <motion.div
              key={i}
              style={{ x, y, scale, rotate, opacity, zIndex: cards.length - row }}
              className="absolute transition-transform duration-300"
              whileHover={{
              scale: 1.08,
              boxShadow: shadow,
              zIndex: cards.length + 2,
              }}
              transition={{
              type: "spring",
              damping: 15,
              stiffness: 120,
              }}
            >
              <NavigationCard
              title={card.title}
              description={card.description}
              icon={card.icon}
              to={card.to}
              color={card.color}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[120px] md:h-[200px] bg-gradient-to-t from-blue-500/10 to-transparent blur-3xl rounded-full" />
    </section>
  );
};
