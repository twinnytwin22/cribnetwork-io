import { Database } from "@/types/Database";
import { BrowserCookieAuthStorageAdapter } from "@supabase/auth-helpers-shared";
import { createClient } from "@supabase/supabase-js";
import { supabaseSRkey, supabaseUrl } from "./providers/supabase/routerHandler";

export const redirectUrl = (location: Location) => `${location.origin}/auth/callback`;
export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url + '/auth/callback'
}


export const supabaseAuth = createClient<Database>(supabaseUrl, supabaseSRkey, {
  auth: {
    flowType: "pkce",
    storage: new BrowserCookieAuthStorageAdapter(),
    // storageKey: 'auth',

    //  persistSession: true,
    //detectSessionInUrl: true,
    //  autoRefreshToken: true
  },
});
