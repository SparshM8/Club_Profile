"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const statsTarget = {
  builders: 280,
  pilots: 34,
  mentors: 48,
  launches: 19,
};

const testimonials = [
  {
    quote: "Nerds Room pushed me to ship my first AI product in under four weeks.",
    name: "Aarav Patel",
    role: "AI Builder"
  },
  {
    quote: "The community energy feels like a mini startup accelerator on campus.",
    name: "Leah Gomez",
    role: "Product Designer"
  },
  {
    quote: "Mentor access and demo nights turned our idea into a funded pilot.",
    name: "Nora Kim",
    role: "Founder"
  },
];

const Join = () => {
  const [stats, setStats] = useState({ builders: 0, pilots: 0, mentors: 0, launches: 0 });
  const [active, setActive] = useState(0);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setStats(statsTarget);
      return;
    }

    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setStats({
        builders: Math.floor(statsTarget.builders * progress),
        pilots: Math.floor(statsTarget.pilots * progress),
        mentors: Math.floor(statsTarget.mentors * progress),
        launches: Math.floor(statsTarget.launches * progress),
      });

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  const current = testimonials[active];

  return (
    <section id="join" className="relative snap-start px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="glass relative overflow-hidden rounded-4xl border border-white/10 p-10 md:p-14">
          <div className="absolute inset-0 bg-linear-to-r from-sky-500/20 via-indigo-500/20 to-lime-500/20" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Join the community</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              The next wave of founders starts here
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-slate-200">
              Get invited into an elite builder network with playbooks, mentors, and live shipping rituals.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-4">
              {[
                { label: "Builders", value: stats.builders },
                { label: "Pilots", value: stats.pilots },
                { label: "Mentors", value: stats.mentors },
                { label: "Launches", value: stats.launches },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-2xl font-semibold text-white">{item.value}+</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                href="#"
                className="bg-linear-to-r from-sky-400 to-lime-300 text-slate-950"
              >
                Apply for Access
              </MagneticButton>
              <MagneticButton
                href="#events"
                className="border border-white/20 text-white"
              >
                See Upcoming Events
              </MagneticButton>
            </div>

            <div className="mt-12 rounded-3xl border border-white/10 bg-black/30 p-6">
              <p className="text-sm text-slate-100">"{current.quote}"</p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-400">
                {current.name} - {current.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
