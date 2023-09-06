"use client";
import React from "react";
import { useAuthProvider } from "@/app/context/auth";
import { usePathname } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { imageBuilder } from "@/lib/providers/sanity/sanity";
function AuthComponent({settings}) {
    const pathname = usePathname()
   // console.log(settings)
    const logo = imageBuilder(settings?.logo)

    const { user, isLoading } = useAuthProvider();
    if (isLoading) {
        return (<></>)
    }

    if (!user && (pathname.startsWith('/login'))) {
        return (<LoginForm logo={logo} />);
    }

    if (!user && (pathname.startsWith('/register'))) {
        return (<SignUpForm logo={logo} />);
    }
    return <></>
}

export default AuthComponent;

