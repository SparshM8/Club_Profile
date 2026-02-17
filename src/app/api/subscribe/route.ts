import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type SupabaseResult = { error?: { message?: string } } | { id: string };

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // If Supabase env is configured, try to persist there first
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/subscribers`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify({ email, created_at: new Date().toISOString() }),
        });

        const json = (await res.json()) as SupabaseResult;
        if (!res.ok) {
          console.warn("Supabase insert failed, falling back to local file", json);
          // fall through to local storage
        } else {
          return NextResponse.json({ success: true, source: "supabase" }, { status: 201 });
        }
      } catch (err) {
        console.warn("Supabase call failed, falling back to local file", err);
        // continue to local file fallback
      }
    }

    // Local file fallback (dev/test)
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });
    const file = path.join(dataDir, "subscribers.json");

    let list: Array<{ email: string; date: string }> = [];
    try {
      const raw = await fs.readFile(file, "utf8");
      list = JSON.parse(raw) as any[];
    } catch (e) {
      // file may not exist yet — that's fine
    }

    // prevent duplicates
    if (!list.find((s) => s.email.toLowerCase() === email.toLowerCase())) {
      list.push({ email, date: new Date().toISOString() });
      await fs.writeFile(file, JSON.stringify(list, null, 2), "utf8");
    }

    return NextResponse.json({ success: true, source: "file" }, { status: 201 });
  } catch (err) {
    console.error("/api/subscribe error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
