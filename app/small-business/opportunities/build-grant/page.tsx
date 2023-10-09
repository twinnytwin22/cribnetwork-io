import BuildGrantForm from '@/ui/Forms/BuildGrantForm'
import { getSiteImage } from '@/utils/use-server'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export const dynamic = 'force-dynamic'

function page() {


    const image = getSiteImage('/all-hands.jpg')
    const grantReqs = [
        "Small business (less 1 million in yearly revenue).",
        "Already own your domain name or have plans to get one soon.",
        'Lack the resources to develop the website you envision.',
        'Ready to take your branding and business to the next level.'
    ]


    const aboutYou = `You embody the essence of a dedicated small business owner, brimming with passion and determination. You possess a clear understanding of your identity, your audience, and the meaningful impact you make on the world. You are primed to achieve your next significant objective and are fully aware of how to leverage this grant to make it happen.`
    return image && (
        <div className='min-h-[80vh] text-black dark:text-white mt-12 bg-white dark:bg-black'>
            <section className=' relative min-h-[300px] overflow-hidden flex place-items-center w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800'>
                <Image
                    priority
                    src={image}
                    alt="Background"
                    fill
                    quality={75}
                    className='z-0  contrast-125 brightness-125 object-cover transform'
                //  style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                />
                            <div className="absolute inset-0 bg-black opacity-75 "></div>

                <div className='mx-auto relative z-10'>
                    <h1 className='text-5xl font-owners font-semibold text-white text-center'>
                        Build Grant
                    </h1>
                </div>
            </section>
            <section>
                <div className='md:grid md:grid-cols-2 max-w-7xl mx-auto'>
                    <div className='p-16'>
                        <h1 className='text-3xl font-owners font-semibold '>About you.</h1>
                        <p className='mb-8 text-zinc-500 dark:text-zinc-400 '>{aboutYou}</p>
                        <ul className="space-y-4 text-left text-zinc-500 dark:text-zinc-400 mx-auto w-full">
                            {grantReqs.map((req) => (
                            <li key={req} className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                                <span>{req}</span>
                            </li>))}
                           
                       
                        </ul>

                    </div>
                    <div className='p-16'>
                        <h1 className='text-3xl font-owners font-semibold'>Get Started.</h1>
                       <BuildGrantForm/>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default page