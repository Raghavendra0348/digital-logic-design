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

const colorThemes = {
  cyan: {
    gradient: "from-cyan-500/10 to-cyan-600/5",
    border: "border-cyan-500/20",
    hoverBorder: "hover:border-cyan-400/40",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-300",
    glow: "shadow-cyan-500/25",
    hoverGlow: "hover:shadow-cyan-400/40",
  },
  blue: {
    gradient: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-500/20",
    hoverBorder: "hover:border-blue-400/40",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-300",
    glow: "shadow-blue-500/25",
    hoverGlow: "hover:shadow-blue-400/40",
  },
  purple: {
    gradient: "from-purple-500/10 to-purple-600/5",
    border: "border-purple-500/20",
    hoverBorder: "hover:border-purple-400/40",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-300",
    glow: "shadow-purple-500/25",
    hoverGlow: "hover:shadow-purple-400/40",
  },
  green: {
    gradient: "from-green-500/10 to-green-600/5",
    border: "border-green-500/20",
    hoverBorder: "hover:border-green-400/40",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-300",
    glow: "shadow-green-500/25",
    hoverGlow: "hover:shadow-green-400/40",
  },
};

export const NavigationCard = ({
  title,
  description,
  icon: Icon,
  to,
  color,
}: NavigationCardProps) => {
  const theme = colorThemes[color];

  return (
    <Link to={to} className="block w-full h-full">
      <motion.div
        className={`
          relative overflow-hidden
          w-full h-full min-h-[200px] max-w-[350px]
          bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80
          ${theme.gradient}
          border ${theme.border} ${theme.hoverBorder}
          rounded-2xl p-6
          backdrop-blur-xl
          shadow-lg ${theme.glow} ${theme.hoverGlow}
          transition-all duration-500 ease-out
          group cursor-pointer
          hover:shadow-2xl
        `}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -8,
          scale: 1.02,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
          }
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated background orb */}
        <motion.div
          className={`
            absolute -top-10 -right-10 w-24 h-24 
            ${theme.iconBg} rounded-full blur-xl opacity-30
            group-hover:opacity-50 transition-opacity duration-500
          `}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center space-y-4 h-full justify-center">
          {/* Icon container */}
          <motion.div
            className={`
              relative p-4 rounded-xl
              ${theme.iconBg} backdrop-blur-sm
              border border-white/10 group-hover:border-white/20
              transition-all duration-300
              ${theme.iconColor}
              shadow-lg group-hover:shadow-xl
            `}
            whileHover={{
              rotate: [0, -10, 10, 0],
              scale: 1.1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut"
            }}
          >
            <Icon className="w-8 h-8 sm:w-10 sm:h-10" />

            {/* Pulse effect */}
            <motion.div
              className={`
                absolute inset-0 rounded-xl ${theme.iconBg} 
                opacity-0 group-hover:opacity-30
              `}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Text content */}
          <div className="space-y-3">
            <motion.h3
              className="text-xl font-bold text-white group-hover:text-slate-100 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {title}
            </motion.h3>

            <motion.p
              className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed max-w-[250px]"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {description}
            </motion.p>
          </div>
        </div>

        {/* Bottom shine effect */}
        <motion.div
          className={`
            absolute bottom-0 left-0 right-0 h-px 
            bg-gradient-to-r from-transparent via-white/20 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-500
          `}
        />
      </motion.div>
    </Link>
  );
};