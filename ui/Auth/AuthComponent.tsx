"use client"
import { supabase } from "@/lib/providers/supabase/supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { Auth } from "@supabase/auth-ui-react";
import React, { Suspense } from "react";
import { siteAccentColor } from "@/lib/site/constants";
import { useAuthProvider } from "@/app/context/auth";

function AuthComponent() {
    const { user } = useAuthProvider();
    return (
        <div className="max-w-md mx-auto items-center w-full">
            {!user && (
                <Auth
                    supabaseClient={supabase}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: { brand: "black", brandAccent: siteAccentColor },
                            },
                        },
                    }}
                    redirectTo="http://localhost:3000/auth/callback"

                />
            )}
        </div>
    );
}

export default AuthComponent;
