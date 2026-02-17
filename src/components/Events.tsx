"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const events = [
  {
    title: "AI Agents Hack",
    date: "Jan 2026",
    summary: "48 hours shipping autonomous workflows with 12 teams.",
    detail: "Teams shipped agent-led productivity tools and demoed live to founders and alumni."
  },
  {
    title: "Launchpad Night",
    date: "Dec 2025",
    summary: "Founder pitch night with 6 campus partners.",
    detail: "Live product demos with immediate feedback and pilot partnerships."
  },
  {
    title: "Design Sprint",
    date: "Nov 2025",
    summary: "Rapid UX research and prototyping week.",
    detail: "Builders partnered with mentors to compress research and validation into five days."
  },
];

const Events = () => {
  const [active, setActive] = useState<(typeof events)[number] | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="events" className="relative snap-start px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Events</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              A timeline of high-signal launches
            </h2>
          </div>
          <p className="max-w-lg text-sm text-slate-300">
            Each event is designed to move builders from idea to shipped product with real-world feedback.
          </p>
        </div>

        <div className="mt-12 grid gap-6 border-l border-white/10 pl-6">
          {events.map((event) => (
            <motion.button
              key={event.title}
              type="button"
              onClick={() => setActive(event)}
              className="glass group relative w-full rounded-3xl border border-white/10 p-6 text-left transition hover:-translate-y-2"
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="absolute -left-7.5 top-8 h-4 w-4 rounded-full bg-linear-to-br from-sky-400 to-lime-300" />
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{event.date}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{event.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{event.summary}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-sky-200">Click for preview</p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="glass max-w-lg rounded-3xl border border-white/10 p-8"
              initial={reducedMotion ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reducedMotion ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{active.date}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{active.title}</h3>
              <p className="mt-4 text-sm text-slate-200">{active.detail}</p>
              <button
                type="button"
                className="mt-6 rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.3em] text-slate-200"
                onClick={() => setActive(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Events;
