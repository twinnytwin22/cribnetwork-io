"use client"
import { useAuthProvider } from "@/app/context/auth";
import EditArtistForm from "@/ui/Forms/MusicForms/EditArtist";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AccountForm from "./AccountForm";

function AccountFormGroup({ songs, artists, session, subscription, props }) {
    const { userRole, user } = useAuthProvider();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const mode = searchParams.get("mode");
    //const edit = searchParams.get("edit");
    //const id = searchParams.get("id");
    // const currentArtist = artists.find(
    //     (artist: { contact_email: string }) => artist.contact_email === user.email,
    // );
    return (
        <div className="max-w-5xl mx-auto relative">

            <div className="w-full mx-auto">
                <div className="text-sm font-normal text-center border-b dark:border-zinc-700 mx-8">
                    <ul className="flex flex-wrap -mb-px ">
                    <li  className="mr-2">
                            <Link
                                href={`${pathname}/?mode=account`}
                                className={`inline-block p-4 rounded-t-lg ${(!mode || mode === "account")
                                        ? "text-red-300 border-b-2 border-red-400 dark:text-red-300 dark:border-red-300"
                                        : "text-zinc-500 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300"
                                    }`}
                                aria-current={(!mode || mode === "account") ? "page" : undefined}
                            >
                                Edit Account
                            </Link>
                        </li>
                        <li className="mr-2" hidden={userRole === "admin"}>
                            <Link
                                href={`${pathname}/?mode=artist-account`}
                                aria-current={mode === "artist-account" ? "page" : undefined}
                                className={`inline-block p-4 rounded-t-lg ${mode === "artist-account"
                                        ? "text-red-300 border-b-2 border-red-400 dark:text-red-300 dark:border-red-300"
                                        : "text-zinc-500 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300"
                                    }`}
                            >
                                Edit Artist Profile
                            </Link>
                        </li>
                     


                    </ul>
                </div>
                {(!mode || mode === "account") &&
                <div className="py-8">
                    <AccountForm {...props} />
                </div>}
                {mode === "artist-account" && userRole !== "admin" &&
                 <EditArtistForm {...props} user={user} />}
            </div>
        </div>
    )
}

export default AccountFormGroup