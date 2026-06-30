import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { Heading } from "../ui/heading";
import { SubHeading } from "../ui/sub-heading";
import { BlurryBackground } from "@/components/ui/blurry-background";
import { SpotlightCard } from "../ui/spotlight-card";
import { Atom, FlaskConical, GraduationCap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const leftToRightVariants = {
  hidden: { opacity: 0, filter: "blur(20px)", x: -300 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    x: 0,
    transition: { duration: 1.0, ease: "easeInOut" },
  },
};

const rightToLeftVariants = {
  hidden: { opacity: 0, filter: "blur(20px)", x: 300 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    x: 0,
    transition: { duration: 1.0, ease: "easeInOut" },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 40 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { type: "spring", bounce: 0.35, duration: 0.8 },
  },
};

const brandPillars = [
  {
    icon: Sparkles,
    titleKey: "logo.items.1.title",
    descKey: "logo.items.1.description",
    color: "from-violet-500/20 to-indigo-500/20",
    iconColor: "text-violet-500",
  },
  {
    icon: FlaskConical,
    titleKey: "logo.items.2.title",
    descKey: "logo.items.2.description",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
  },
  {
    icon: GraduationCap,
    titleKey: "logo.items.3.title",
    descKey: "logo.items.3.description",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
  },
];

function AnimatedLogoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setTilt({ x: -y, y: x });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const orbits = [
    { size: 280, duration: 20, border: "border-violet-400/30", dots: 3 },
    { size: 340, duration: 28, border: "border-blue-400/25", dots: 4, reverse: true },
    { size: 400, duration: 36, border: "border-indigo-400/20", dots: 5 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-full aspect-square max-w-[420px] mx-auto"
      style={{ perspective: "1000px" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-indigo-500/20 blur-3xl scale-90" />

      {/* Orbital rings */}
      {orbits.map((orbit, i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute rounded-full border border-dashed",
            orbit.border
          )}
          style={{ width: orbit.size, height: orbit.size }}
          animate={
            shouldReduceMotion
              ? {}
              : { rotate: orbit.reverse ? -360 : 360 }
          }
          transition={{
            duration: orbit.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Array.from({ length: orbit.dots }).map((_, dotIndex) => {
            const angle = (360 / orbit.dots) * dotIndex;
            return (
              <motion.div
                key={dotIndex}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 shadow-lg shadow-violet-500/50"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${angle}deg) translateX(${orbit.size / 2}px) translate(-50%, -50%)`,
                }}
                animate={
                  shouldReduceMotion
                    ? {}
                    : { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }
                }
                transition={{
                  duration: 2 + dotIndex * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </motion.div>
      ))}

      {/* Center logo card */}
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Shine sweep */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <motion.div
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              animate={shouldReduceMotion ? {} : { x: ["-200%", "400%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />
          </div>

          <div className="relative flex items-center justify-center p-8 rounded-3xl border border-white/20 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-2xl shadow-violet-500/20">
            <img
              src="/logo.png"
              alt="GeNiUS Academy Logo"
              className="object-contain w-40 h-40 md:w-48 md:h-48 drop-shadow-lg"
            />

            {/* Corner atoms */}
            <motion.div
              className="absolute -top-3 -right-3 p-2 rounded-full bg-violet-500/90 text-white shadow-lg"
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Atom className="w-5 h-5" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {!shouldReduceMotion &&
        Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-violet-400/60"
            style={{
              top: `${15 + (i * 11) % 70}%`,
              left: `${10 + (i * 13) % 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
    </div>
  );
}

function LogoSection() {
  const { t } = useTranslation();

  const gradientColors = {
    from: "oklch(0.55 0.2 280)",
    to: "oklch(0.65 0.18 240)",
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.12, delayChildren: 0.1 },
        },
      }}
      className="relative py-16 overflow-hidden bg-logoSection md:py-28"
    >
      <BlurryBackground
        gradientColors={gradientColors}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 px-6 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <div className="space-y-8">
            <motion.div variants={leftToRightVariants}>
              <Badge className="px-4 py-1 mb-4 text-sm font-medium text-neutral-700 bg-neutral-100 border-neutral-200 hover:bg-neutral-200 dark:text-neutral-200 dark:bg-neutral-700 dark:border-neutral-600 dark:hover:bg-neutral-600">
                {t("logo.badge")}
              </Badge>
            </motion.div>

            <motion.div variants={leftToRightVariants}>
              <Heading className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl text-neutral-900 dark:text-neutral-50">
                {t("logo.title")}
              </Heading>
            </motion.div>

            <motion.div variants={leftToRightVariants}>
              <SubHeading className="text-lg tracking-wide text-balance md:text-xl text-neutral-600 dark:text-neutral-400">
                {t("logo.description")}
              </SubHeading>
            </motion.div>

            {/* Brand pillars */}
            <motion.div
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }}
              className="grid gap-4 sm:grid-cols-1"
            >
              {brandPillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <motion.div key={i} variants={cardItemVariants}>
                    <SpotlightCard
                      spotlightColor="#6366f130"
                      className="p-5 !rounded-2xl"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "flex items-center justify-center shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br",
                            pillar.color
                          )}
                        >
                          <Icon className={cn("w-5 h-5", pillar.iconColor)} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-heading">
                            {t(pillar.titleKey)}
                          </h3>
                          <p className="mt-1 text-sm text-subheading">
                            {t(pillar.descKey)}
                          </p>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Color palette */}
            <motion.div variants={leftToRightVariants} className="flex items-center gap-3">
              <span className="text-sm font-medium text-subheading">
                {t("logo.palette")}
              </span>
              <div className="flex gap-2">
                {["#1E4196", "#2E65EB", "#6366F1", "#8B5CF6"].map((color) => (
                  <motion.div
                    key={color}
                    whileHover={{ scale: 1.15, y: -2 }}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md cursor-default dark:border-neutral-700"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Animated logo showcase */}
          <motion.div variants={rightToLeftVariants}>
            <AnimatedLogoShowcase />
            <motion.p
              variants={rightToLeftVariants}
              className="mt-6 text-center text-lg font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-600 to-indigo-600 dark:from-violet-400 dark:via-blue-400 dark:to-indigo-400"
            >
              {t("logo.tagline")}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default LogoSection;
