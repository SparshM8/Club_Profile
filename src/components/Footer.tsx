const Footer = () => {
  return (
    <footer className="border-t border-white/10 px-6 py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Nerds Room</p>
          <p className="mt-2 text-xs text-slate-400">Student Innovation Community for AI builders.</p>
        </div>
        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-slate-400">
          <a className="transition hover:text-white" href="#about">About</a>
          <a className="transition hover:text-white" href="#programs">Programs</a>
          <a className="transition hover:text-white" href="#projects">Projects</a>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <a className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition hover:-translate-y-1 hover:border-sky-400" href="#">
            X
          </a>
          <a className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition hover:-translate-y-1 hover:border-sky-400" href="#">
            in
          </a>
          <a className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition hover:-translate-y-1 hover:border-sky-400" href="#">
            gh
          </a>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-slate-500">2026 Nerds Room. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
