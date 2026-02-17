"use client";

import MagneticButton from "./MagneticButton";
import Image from "next/image";

const Navbar = () => {
  const links = ["About", "Programs", "Events", "Projects", "Join"];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Nerds Room Logo"
            width={40}
            height={40}
            priority
            className="h-10 w-10 rounded-xl object-contain"
          />
          <div>
            <p className="text-sm font-semibold tracking-wide text-white">Nerds Room</p>
            <p className="text-xs text-slate-400">Student Innovation</p>
          </div>
        </div>
        <div className="hidden items-center gap-8 text-sm text-slate-300 lg:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="group relative transition-colors hover:text-white"
            >
              {link}
              <span className="absolute left-0 top-full mt-2 h-px w-full bg-linear-to-r from-sky-400 to-lime-300 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <MagneticButton
            href="#join"
            className="bg-white/10 text-white hover:bg-white/20"
          >
            Request Invite
          </MagneticButton>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
