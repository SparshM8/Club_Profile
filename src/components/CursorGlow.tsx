"use client";

import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user reduced-motion preference
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (glowRef.current) glowRef.current.style.display = "none";
      if (ringRef.current) ringRef.current.style.display = "none";
      return;
    }

    let raf = 0;
    const state = { x: 0, y: 0, tx: 0, ty: 0 };

    const update = () => {
      state.x += (state.tx - state.x) * 0.12;
      state.y += (state.ty - state.y) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${state.x}px, ${state.y}px) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${state.x}px, ${state.y}px) translate(-50%, -50%)`;
      }

      raf = 0;
    };

    const handleMove = (event: MouseEvent) => {
      state.tx = event.clientX;
      state.ty = event.clientY;

      if (!raf) {
        raf = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default CursorGlow;
