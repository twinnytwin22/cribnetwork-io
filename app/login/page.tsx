"use client";
import { supabase } from "@/lib/providers/supabase/supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { Auth } from "@supabase/auth-ui-react";
import React, { Suspense } from "react";
import { siteAccentColor } from "@/lib/site/constants";
import { useAuthProvider } from "../context/auth";

function page() {
    const { user } = useAuthProvider();
    console.log(user)
    return (
        <div className="h-screen items-center flex w-full bg-zinc-100 dark:bg-black">
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
        </div>
    );
}

export default page;
