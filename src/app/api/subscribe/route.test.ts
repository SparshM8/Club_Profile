import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { POST } from "./route";
import fs from "fs/promises";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "subscribers.json");

async function readSubscribers() {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    return JSON.parse(raw) as Array<{ email: string; date: string }>;
  } catch (e) {
    return [];
  }
}

beforeEach(async () => {
  // ensure a clean state
  try {
    await fs.rm(dataFile);
  } catch (e) {
    // ignore
  }
});

afterEach(async () => {
  try {
    await fs.rm(dataFile);
  } catch (e) {
    // ignore
  }
});

describe("POST /api/subscribe route", () => {
  it("returns 400 for invalid email", async () => {
    const req = new Request("http://localhost/api/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "nope" }),
    });

    const res: any = await POST(req as any);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Invalid email");
  });

  it("accepts a valid email and writes to local file when Supabase not configured", async () => {
    const testEmail = `test+${Date.now()}@example.com`;
    const req = new Request("http://localhost/api/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: testEmail }),
    });

    const res: any = await POST(req as any);
    expect([200, 201]).toContain(res.status);
    const body = await res.json();
    expect(body.success).toBe(true);

    const subs = await readSubscribers();
    expect(subs.some((s) => s.email === testEmail)).toBe(true);
  });
});