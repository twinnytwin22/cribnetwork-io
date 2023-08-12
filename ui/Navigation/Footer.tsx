import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
    return (
        <footer className="bg-white rounded-lg shadow dark:bg-black w-full">
            <div className="w-full max-w-screen-2xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="/" className="flex items-center">
                        <Image src="/images/SMALL_W_criblogo.png" className="h-8 mr-3 hidden dark:block" alt="Crib Logo" width={145} height={100} priority />
                        <Image src="/images/SMALL_B_criblogo.png" className="h-8 mr-3 dark:hidden block" alt="Crib Logo" width={145} height={100} priority />

                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-zinc-500 sm:mb-0 dark:text-zinc-400">
                        <li>
                            <Link href="/about" className="mr-4 hover:underline md:mr-6">About</Link>
                        </li>
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                        </li>
                        <li>
                            <Link href="/login" className="mr-4 hover:underline md:mr-6">Sign In</Link>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-zinc-200 sm:mx-auto dark:border-zinc-700 lg:my-8" />
                <span className="block text-sm text-zinc-500 sm:text-center dark:text-zinc-400">© 2023 <a href="/" className="hover:underline">CRIB™</a>. All Rights Reserved. Crib, LLC</span>
            </div>
        </footer>
    );
}

export default Footer;
