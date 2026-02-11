import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Admin client — used for writes (inserting articles)
// Protected by server-only guard: will throw at build time if imported from client code
export function getServiceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
  }
  return createClient(url, serviceRoleKey);
}
