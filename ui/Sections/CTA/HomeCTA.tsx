import ContactButton from '@/ui/Buttons/ContactButton/ContactButton'
import React from 'react'
import Image from 'next/image'
import { getSiteImage } from '@/utils/use-server'

function HomeCTA() {
    const cta = `Whether you have a project in mind, need a new website, or are interested in our marketing services, we're eager to listen and assist you!`
    return (
        <section className="bg-white dark:bg-zinc-950 max-w-screen w-full border-b border-t border-zinc-200 dark:border-zinc-800 relative">
            <Image
                
                //priority
                src={getSiteImage('/projectmanage.png')}
                alt="Background"
                fill
                quality={75}
                className='z-0  contrast-125 brightness-125 object-cover transform'
            />
            <div className="absolute inset-0 bg-black opacity-50 "></div>
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 relative z-10">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h2 className="mb-4 text-4xl lg:text-5xl tracking-tight font-medium leading-tight text-white font-owners">Do you have a project?</h2>
                    <p className="mb-6 font-light text-zinc-300 md:text-xl">{cta}</p>
                    <ContactButton />
                </div>
            </div>
        </section>)
}

export default HomeCTA