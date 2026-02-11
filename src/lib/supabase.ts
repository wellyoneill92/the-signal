import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

// Public client — used for reads (articles, feedback summaries)
// Returns null if env vars aren't set (e.g. during Vercel build)
export function getSupabase(): SupabaseClient | null {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    _supabase = createClient(url, key);
  }
  return _supabase;
}
