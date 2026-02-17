"use client";

import { motion, useReducedMotion } from "framer-motion";

const cards = [
  {
    title: "Builder Labs",
    description: "Weekly build sprints focused on AI agents, product MVPs, and rapid shipping."
  },
  {
    title: "Founder Pods",
    description: "Small teams pair up with mentors to validate ideas, test traction, and launch."
  },
  {
    title: "Collab Network",
    description: "A shared talent graph for designers, engineers, and operators to co-build."
  },
  {
    title: "Showcase Ops",
    description: "Monthly demo nights with partners, investors, and campus leaders."
  }
];

const About = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" className="relative snap-start px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">About the community</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            A launchpad for student builders who want to move fast
          </h2>
          <p className="mt-4 text-slate-300">
            We connect ambitious students with mentors, resources, and a high-energy peer group. Every week is designed to ship.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2"
          initial={reducedMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: reducedMotion ? { opacity: 1 } : { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              className="glass group rounded-3xl border border-white/10 p-6 transition hover:-translate-y-2 hover:border-sky-400/50"
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-sm font-semibold text-sky-200">
                {card.title.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
