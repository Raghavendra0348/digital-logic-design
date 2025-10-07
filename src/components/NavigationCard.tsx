import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface NavigationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color: "cyan" | "blue" | "purple" | "green";
  // delay prop is removed as its effect is handled by the parent component (DeckCards)
}

const colorClasses = {
  // Assuming these variables (primary, secondary, etc.) are defined in your Tailwind config
  cyan: "border-primary/30 hover:border-primary glow-cyan",
  blue: "border-secondary/30 hover:border-secondary glow-blue",
  purple: "border-accent/30 hover:border-accent glow-purple",
  green: "border-success/30 hover:border-success glow-green",
};

const iconColorClasses = {
  cyan: "text-primary",
  blue: "text-secondary",
  purple: "text-accent",
  green: "text-success",
};

export const NavigationCard = ({
  title,
  description,
  icon: Icon,
  to,
  color,
}: NavigationCardProps) => {
  return (
    // Removed the outer motion.div to let the parent DeckCards control the position/animation
    <Link to={to}>
      <motion.div
        className={`glass-strong p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer group w-[300px] h-[300px] flex flex-col justify-center ${colorClasses[color]}`}
        // The whileHover/whileTap animations provide a nice interactive feel
        whileHover={{ y: -5 }} 
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            className={`p-4 rounded-full glass ${iconColorClasses[color]}`}
            // Cool continuous rotation animation for the icon
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", repeatDelay: 3 }}
          >
            <Icon className="w-12 h-12" />
          </motion.div>
          <div>
            <h3 className="font-display text-xl font-bold mb-2 text-glow-cyan">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};