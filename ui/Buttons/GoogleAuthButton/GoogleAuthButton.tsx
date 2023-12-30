'use client'

import { useAuthProvider } from "@/app/context/auth"
import { usePathname, useRouter } from "next/navigation"
import { FaGoogle } from "react-icons/fa6"

function GoogleAuthButton() {
    const pathname = usePathname()
    const router = useRouter()
    const { signInWithGoogle } = useAuthProvider()

    return (
        <div
            className="flex items-center border rounded space-x-2 p-2 border-zinc-300 dark:border-zinc-800 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 duration-300 ease-in-out"
            onClick={() => signInWithGoogle(router)}>
            <FaGoogle />
            <p>{pathname.startsWith('/login') ? "Sign with Google" : "Sign up Google"}

            </p>
        </div>
    )
}

export default GoogleAuthButton