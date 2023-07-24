"use client";
import * as React from "react";
import dynamic from "next/dynamic";

import { Suspense } from "react";
import { AuthContextProvider } from "@/app/context/auth";
import InvoiceContextProvider from "@/app/context/invoice";

const ThemeProvider = dynamic(
    async () => {
        const mod = await import("next-themes");
        return mod.ThemeProvider;
    },
);



export const Providers = ({ children, }: { children: React.ReactNode }) => {
    return (
        <AuthContextProvider>
            <Suspense>

                <ThemeProvider enableSystem={true} attribute="class" defaultTheme="dark">
                    <InvoiceContextProvider>
                        {children}
                    </InvoiceContextProvider>
                </ThemeProvider>
            </Suspense>
        </AuthContextProvider>

    );
};

export default Providers;

