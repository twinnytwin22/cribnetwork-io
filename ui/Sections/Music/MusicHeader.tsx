'use client'
import supabaseLoader from '@/lib/providers/supabase/image-loader';
import Image from 'next/image';
import { useEffect, useState } from 'react';
//import Button from 'ui/Buttons/Button/Button';
//import GoToMusicButton from 'ui/Buttons/GoToMusicButton/GoToMusicButton';

function HomeHeader() {
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        if(typeof window !== 'undefined'){
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }}, []);
    const image = '/site_images/globe-big_logo.svg'
    const imageLight = '/site_images/globe-big_logo-black.svg'
    const bgImage = '/site_images/globe-dot-bg.svg'
    const introP =`Welcome to Crib Music Global, where music finds its global stage. We are your one-stop destination for music licensing, administration, and supervision services. We are currently looking for musicians and composers that have amazing music. If you feel like that's you submit below!`
    return (
        <section className='min-h-[600px] h-full bg-white dark:bg-black flex items center overflow-hidden border-b border-zinc-200 dark:border-zinc-800 relative'>
            <Image
            loader={supabaseLoader}
               // priority
                src={bgImage}
                alt="Background"
                fill
                quality={75}
                className='-z-0 grayscale contrast-125 brightness-125 object-cover opacity-10 dark:opacity-30'
                style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            />

            <div>
            <div className='h-32 p-8 relative z-10'>
                <Image
                            loader={supabaseLoader}

                    src={imageLight}
                    className=" block dark:hidden w-full h-full mx-auto"
                    alt="Crib Logo"
                    width={345}
                    height={300}
                    priority
                />
                <Image
                            loader={supabaseLoader}

                    src={image}
                    className=" hidden dark:block w-full h-full mx-auto"
                    alt="Crib Logo"
                    width={345}
                    height={300}
                    priority
                />
                </div>
                <h1 className='relative text-4xl md:text-5xl lg:text-7xl font-medium font-owners text-center tracking-wider text-black dark:text-white'>Introducing<span className='text-transparent bg-clip-text bg-gradient-to-r to-red-400 from-red-200'> CRIB Music</span></h1>
                <p className=' px-4 max-w-2xl mx-auto text-center justify-center py-8 sm:text-lg font-light text-zinc-500 md:text-xl dark:text-zinc-300'>{introP}</p>
                
                <div className='mx-auto flex space-x-4 justify-center w-full relative z-20 py-8'>
                    {/* <GoToMusicButton/>
                    <Button href={'/services'} text={'Learn More'}/> */}
                </div>
            </div>
        </section>
    )
}

export default HomeHeader