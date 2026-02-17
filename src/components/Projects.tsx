"use client";

import { useState } from "react";
import TiltCard from "./TiltCard";

const projects = [
  {
    title: "Neural Study Assistant",
    category: "AI",
    summary: "Personalized tutoring copilot that adapts in real time.",
    stack: "React, Python, TensorFlow"
  },
  {
    title: "Green City Marketplace",
    category: "Startup",
    summary: "A marketplace for hyper-local sustainable produce.",
    stack: "Next.js, Node, Postgres"
  },
  {
    title: "Pulse Design System",
    category: "Design",
    summary: "Component system built for shipping fast across teams.",
    stack: "Figma, Storybook"
  },
  {
    title: "Realtime Signal Lab",
    category: "Data",
    summary: "Streaming insights dashboard for live experiments.",
    stack: "D3, WebSockets"
  },
  {
    title: "Stackflow Studio",
    category: "Web",
    summary: "Multi-tenant product studio for campus builders.",
    stack: "React, Supabase"
  },
  {
    title: "LaunchOps CRM",
    category: "Startup",
    summary: "Founder workflow automation for early revenue teams.",
    stack: "Next.js, Prisma"
  },
];

const categories = ["All", "AI", "Startup", "Design", "Data", "Web"] as const;

type Category = (typeof categories)[number];

const Projects = () => {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? projects : projects.filter((item) => item.category === active);

  return (
    <section id="projects" className="relative snap-start px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Projects</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Shipping like a product studio
            </h2>
          </div>
          <p className="max-w-lg text-sm text-slate-300">
            A gallery of experiments, MVPs, and launch-ready products built inside Nerds Room.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
                active === category
                  ? "bg-linear-to-r from-sky-400 to-lime-300 text-slate-950"
                  : "border border-white/15 text-slate-300 hover:border-white/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((project) => (
            <TiltCard
              key={project.title}
              className="glass group relative overflow-hidden rounded-3xl border border-white/10 p-6"
            >
              <div className="absolute right-6 top-6 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-slate-300">
                {project.category}
              </div>
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{project.summary}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-slate-400">{project.stack}</p>
              <div className="mt-6 h-1 w-full rounded-full bg-linear-to-r from-sky-400 via-indigo-400 to-lime-300 opacity-0 transition group-hover:opacity-100" />
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
