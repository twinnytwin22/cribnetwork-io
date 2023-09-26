'use client'
import React from 'react'
import { useContactButtonStore } from '@/ui/Buttons/ContactButton/contactButtonStore';
import Image from 'next/image';
import ContactButton from '@/ui/Buttons/ContactButton/';
import { getSiteImage } from '@/app/web-development/page';

function AboutHeader() {
    const setOpen = useContactButtonStore((state: any) => state.setOpen);
    const handleOpenModal = () => {
        setOpen(true);
    };

    return (
        <section className="bg-white dark:bg-zinc-950 py-8">
            <div className="grid max-w-screen-xl mt-16 px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 w-full">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-xl mb-4 text-3xl leading-snug font-owners font-semibold tracking-normal md:text-4xl xl:text-5xl dark:text-white text-zinc-600">Providing practical & scalable solutions.</h1>
                    <p className="max-w-2xl mb-6 font-light text-zinc-500 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-400 font-owners">From proprietary technology solutions, to creative design services, find out why companies trust CRIB, to simplify their technology, marketing and media stack. </p>

               <ContactButton/>
                </div>
                <div className='w-full mx-auto col-span-5'>
                    <ImageMask />
                </div>
            </div>
        </section>)
}

export default AboutHeader

const ImageMask = () => {
    return (

        <div className="grid grid-cols-2 gap-4 mt-8">
            <Image width={150} height={350} className="w-full object-cover h-[350px] hover:-translate-y-8 duration-300 ease-in-out rounded-lg" src={getSiteImage("/programmer-close.jpg")} alt="office content 1" />
            <Image width={150} height={350} className="mt-4 w-full lg:mt-10 h-[350px] object-cover rounded-lg hover:-translate-y-8 duration-300 ease-in-out" src={getSiteImage("/programmer-far.jpg")} alt="office content 2" />
        </div>


    );
};