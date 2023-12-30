import { Database } from "@/types/Database";
import { BrowserCookieAuthStorageAdapter } from "@supabase/auth-helpers-shared";
import { createClient } from "@supabase/supabase-js";
import { supabaseSRkey, supabaseUrl } from "./providers/supabase/routerHandler";

export const redirectUrl = (location: Location) => {
const url = `${location.origin}/auth/callback`;
return url
}



  export const supabaseAuth = createClient<Database>(supabaseUrl, supabaseSRkey, {
    auth: {
      flowType: 'pkce',
      storage: new BrowserCookieAuthStorageAdapter()
      // storageKey: 'auth',
  
      //  persistSession: true,
      //detectSessionInUrl: true,
      //  autoRefreshToken: true
    }
  });