"use client";

import dynamic from "next/dynamic";

const ClientCursorGlow = dynamic(() => import("./CursorGlow"), { ssr: false });

export default function CursorLoader() {
  return <ClientCursorGlow />;
}
