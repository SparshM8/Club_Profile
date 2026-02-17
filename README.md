# Nerds Room Landing Experience

A premium, futuristic landing page for a student innovation community focused on AI, startups, and builders.

## Tech Stack

- Next.js (App Router)
- Tailwind CSS v4
- Framer Motion
- TypeScript

## Local Development

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Project Structure

- `src/app/page.tsx` - main landing page layout
- `src/components` - reusable UI sections and interaction components
- `src/app/globals.css` - global theme, effects, and animation utilities

## Notes

- Update copy and data arrays in each section component to match your client.
- The design uses glassmorphism, glow effects, scroll snap sections, and hover-driven motion.

## New: Newsletter / Waitlist API

- A simple subscribe endpoint is available at `POST /api/subscribe` that accepts JSON { "email": "you@domain.com" } and writes to `data/subscribers.json` (local dev only).
- The hero now includes an inline signup (`HeroSignup`) that posts to this endpoint.

## Analytics (optional)

- Add `NEXT_PUBLIC_GA_ID` to your environment to enable Google Analytics (gtag). The layout will only inject GA when the env var is present.

## Newsletter / Supabase (optional)

- To persist subscribers to a hosted DB, set these environment variables in your deployment platform:
  - `SUPABASE_URL` — your Supabase project URL (e.g. `https://xyz.supabase.co`)
  - `SUPABASE_SERVICE_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`) — server-only service key
- Create a `subscribers` table with columns: `email text` (unique) and `created_at timestamptz`.
  - Example SQL:

```sql
create table if not exists subscribers (
  email text primary key,
  created_at timestamptz default now()
);
```

- If Supabase env vars are present the API route `/api/subscribe` will insert there; otherwise it falls back to `data/subscribers.json` (local dev).

## Social preview / OG image

- A `public/og-image.svg` is included and `metadataBase` is used to resolve absolute OG URLs.
- Set `NEXT_PUBLIC_METADATA_BASE` (e.g. `https://yourdomain.com`) in production so social previews use the correct absolute URL.

## Deploying to Vercel (CI)

1. Connect this repository to Vercel (https://vercel.com/new).
2. Add the following repository secrets in Vercel/GitHub Actions (if you want CI -> Vercel automatic deploy):
   - `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (used by the included GitHub Action)
   - `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` (optional)
   - `NEXT_PUBLIC_GA_ID` (optional)
   - `NEXT_PUBLIC_METADATA_BASE` (optional)
3. Push to `main` — the `.github/workflows/vercel-deploy.yml` will attempt to deploy when secrets are provided.

CI: A basic GitHub Actions CI is included to validate builds on push (see `.github/workflows/ci.yml`).
