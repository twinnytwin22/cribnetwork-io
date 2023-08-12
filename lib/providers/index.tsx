"use client";
import * as React from "react";
import dynamic from "next/dynamic";

import { Suspense } from "react";
import { AuthContextProvider } from "@/app/context/auth";
import InvoiceContextProvider from "@/app/context/invoice";
import SiteContextProvider from "@/app/context/siteContext";

const ThemeProvider = dynamic(
    async () => {
        const mod = await import("next-themes");
        return mod.ThemeProvider;
    },
);



export const Providers = ({ children, }: { children: React.ReactNode }) => {
    return (
        <AuthContextProvider>
            <SiteContextProvider>
                <Suspense>

                    <ThemeProvider enableSystem={true} attribute="class" defaultTheme="dark">
                        <InvoiceContextProvider>
                            {children}
                        </InvoiceContextProvider>
                    </ThemeProvider>
                </Suspense>
            </SiteContextProvider>
        </AuthContextProvider>

    );
};

export default Providers;

