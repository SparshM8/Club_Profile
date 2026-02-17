"use client";

import { useState } from "react";
import MagneticButton from "./MagneticButton";

export default function HeroSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Thanks — you're on the list!");
        setEmail("");
      } else {
        const json = await res.json();
        setStatus("error");
        setMessage(json?.error || "Something went wrong. Try again later.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error — please try again.");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mt-8 flex w-full max-w-xl items-center gap-3 rounded-xl bg-white/3 p-2 pr-1 backdrop-blur-md"
      role="form"
      aria-label="Join the Nerds Room waitlist"
    >
      <label htmlFor="signup-email" className="sr-only">
        Email address
      </label>
      <input
        id="signup-email"
        type="email"
        aria-label="Email address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@university.edu"
        className="flex-1 rounded-md bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none"
      />
      <MagneticButton className="bg-linear-to-r from-sky-400 to-lime-300 text-slate-950" type="submit">
        {status === "loading" ? "Joining..." : "Join Waitlist"}
      </MagneticButton>

      <div className="ml-3 min-w-45 text-left text-xs text-slate-300">
        <div aria-live="polite">{message}</div>
      </div>
    </form>
  );
}
