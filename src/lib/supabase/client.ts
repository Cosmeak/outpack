import { createBrowserClient } from "@supabase/ssr";
import { redirect } from "next/navigation";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

type SupabaseSignOutScope = "global" | "local" | "others";
export const signOut = async (scope: SupabaseSignOutScope = "local") => {
  const supabase = createClient();
  await supabase.auth.signOut({ scope: scope });
  redirect("/auth/login");
};
