import { supabase } from "@/lib/providers/supabase/supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { Auth } from "@supabase/auth-ui-react";
import React, { Suspense } from "react";
import { siteAccentColor } from "@/lib/site/constants";
import { useAuthProvider } from "../context/auth";
import AuthComponent from "@/ui/Auth/AuthComponent";

function page() {
    return (
        <div className="h-screen items-center flex w-full bg-zinc-100 dark:bg-black">
            <AuthComponent />
        </div>
    );
}

export default page;
