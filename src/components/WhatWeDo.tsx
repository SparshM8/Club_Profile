"use client";

import { motion, useReducedMotion } from "framer-motion";

const panels = [
  {
    title: "AI Systems",
    tag: "Agents + LLMs",
    copy: "Hands-on labs shipping copilots, automation workflows, and AI products.",
  },
  {
    title: "Startup Studio",
    tag: "Validation + MVP",
    copy: "Build with co-founders, test traction fast, and launch in public.",
  },
  {
    title: "Product Design",
    tag: "UX + UI",
    copy: "Design critiques, research sprints, and rapid prototyping.",
  },
  {
    title: "Full Stack",
    tag: "Web + Cloud",
    copy: "Modern stacks, edge deployment, and scale-ready architecture.",
  },
  {
    title: "Data Labs",
    tag: "Insight + Ops",
    copy: "Data pipelines, dashboards, and real-time analytics.",
  },
];

const WhatWeDo = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section id="programs" className="relative snap-start px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">What we do</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Programs built like a product roadmap
            </h2>
          </div>
          <p className="max-w-lg text-sm text-slate-300">
            Scroll horizontally to explore the pillars powering Nerds Room. Each panel is a dedicated track with weekly shipping rituals.
          </p>
        </div>

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6">
          {panels.map((panel) => (
            <motion.div
              key={panel.title}
              className="glass min-w-70 snap-center rounded-3xl border border-white/10 p-6 md:min-w-105"
              whileHover={reducedMotion ? undefined : { y: -6 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{panel.tag}</p>
              <h3 className="mt-4 text-xl font-semibold text-white">{panel.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{panel.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
