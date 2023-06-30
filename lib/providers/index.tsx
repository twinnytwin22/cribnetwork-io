"use client";
import * as React from "react";
import dynamic from "next/dynamic";

import { Suspense } from "react";

const ThemeProvider = dynamic(
    async () => {
        const mod = await import("next-themes");
        return mod.ThemeProvider;
    },
);



export const Providers = ({ children, }: { children: React.ReactNode }) => {
    return (
        <Suspense>

            <ThemeProvider enableSystem={true} attribute="class" defaultTheme="dark">
                {children}

            </ThemeProvider>
        </Suspense>

    );
};

export default Providers;

