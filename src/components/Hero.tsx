"use client";

import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import HeroSignup from "./HeroSignup";

const floatingCards = [
  { title: "AI Sprint", subtitle: "7-day ship cycles", top: "18%", left: "8%" },
  { title: "Founder Match", subtitle: "Meet your co-builder", top: "48%", left: "4%" },
  { title: "Demo Night", subtitle: "Live product launches", top: "30%", right: "8%" },
  { title: "Mentor Grid", subtitle: "Weekly office hours", top: "62%", right: "4%" },
];

const Hero = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section id="hero" className="relative flex min-h-screen snap-start items-center justify-center overflow-hidden px-6 py-20">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950" />
      <div className="absolute inset-0 -z-10 opacity-70 [background:radial-gradient(circle_at_top,rgba(56,189,248,0.3),transparent_55%)]" />

      {floatingCards.map((card) => (
        <motion.div
          key={card.title}
          className="glass absolute hidden min-w-45 rounded-2xl px-4 py-3 text-xs text-slate-200 shadow-2xl lg:block"
          style={{ top: card.top, left: card.left, right: card.right }}
          animate={reducedMotion ? { y: 0 } : { y: [0, -10, 0] }}
          transition={reducedMotion ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-sm font-semibold text-white">{card.title}</p>
          <p className="text-xs text-slate-300">{card.subtitle}</p>
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <motion.p
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          Student Innovation Collective
        </motion.p>
        <motion.h1
          className="text-4xl font-semibold text-white sm:text-5xl lg:text-6xl"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.8 }}
        >
          Build the future of AI, startups, and products <span className="text-gradient">with your people</span>
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.9, delay: 0.2 }}
        >
          Nerds Room is a high-velocity student community for builders. Ship real products, launch startups, and learn through live experiments.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.9, delay: 0.3 }}
        >
          <MagneticButton
            href="#join"
            className="bg-linear-to-r from-sky-400 to-lime-300 text-slate-950 hover:from-sky-300 hover:to-lime-200"
          >
            Join the Community
          </MagneticButton>
          <MagneticButton
            href="#projects"
            className="border border-white/20 text-white hover:border-white/50"
          >
            Explore Projects
          </MagneticButton>
        </motion.div>

        <HeroSignup />
        <motion.div
          className="mt-12 flex w-full max-w-3xl items-center justify-center gap-3 overflow-hidden"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 1.2, delay: 0.4 }}
        >
          {["AI Labs", "Demo Days", "Founder Pods", "Build Sprints", "Open Source", "Mentor Grid"].map(
            (item) => (
              <div
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200"
              >
                {item}
              </div>
            )
          )}
        </motion.div>
        <motion.div
          className="mt-16 flex flex-col items-center text-xs uppercase tracking-[0.3em] text-slate-400"
          animate={reducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
          transition={reducedMotion ? { duration: 0 } : { duration: 2.8, repeat: Infinity }}
        >
          Scroll
          <span className="mt-2 h-6 w-px bg-linear-to-b from-slate-200 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
