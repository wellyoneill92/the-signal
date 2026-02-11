import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Admin client — used for writes (inserting articles)
// Safe: SUPABASE_SERVICE_ROLE_KEY has no NEXT_PUBLIC_ prefix,
// so Next.js will never expose it to client bundles
export function getServiceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
  }
  return createClient(url, serviceRoleKey);
}
