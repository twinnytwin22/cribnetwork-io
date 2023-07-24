import { impactSvg, serviceSvg, techIcon } from '@/lib/site/icons'
import React from 'react'
import { TbFileArrowRight } from 'react-icons/tb'
import { FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
function Overview2() {
    const cardClass = 'hover:shadow-zinc-200 hover:shadow-2xl dark:hover:shadow-zinc-800 max-w-md w-full mx-auto ease-in-out duration-500 p-12 px-16'
    const headingClass = 'text-2xl md:text-3xl font-bold text-center text-black dark:text-white font-owners'
    const pClass = 'text-zinc-800 dark:text-zinc-200 text-lg text-center'

    return (
        <div className='bg-white dark:bg-black w-full py-24 px-8 border-b border-zinc-300 dark:border-zinc-800'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-screen-2xl w-full mx-auto place-items-start'>
                <div className={cardClass}>
                    <div className='w-32 mx-auto dark:invert'>{serviceSvg}</div>

                    <h1 className={headingClass}>Services.</h1>
                    <p className={pClass}>Tailored multichannel solutions powered by innovative technology.
                        Stand out in today's competitive landscape with our comprehensive services
                        for seamless integration, exceptional customer engagement, and measurable results.</p>
                    <a href='#services' className='flex items-center space-x-2 font-bold mx-auto justify-center text-zinc-900 dark:text-zinc-100'>

                        <h1 className='font-owners'>
                            Learn More
                        </h1>
                        <FaArrowRight />
                    </a>
                </div>
                <div className={cardClass}>
                    <img className='w-32 mx-auto dark:invert' src={techIcon} />

                    <h1 className={headingClass}>Technology.</h1>
                    <p className={pClass}>Driving digital transformation with advanced technology.
                        Our solutions revolutionize operations, maximizing efficiency, agility, and growth.
                        From AI-driven automation to immersive experiences, stay ahead in the digital era.</p>
                    <div className='flex items-center space-x-2 font-bold mx-auto justify-center text-zinc-900 dark:text-zinc-100'>
                        <h1 className='font-owners'>
                            Learn More
                        </h1>
                        <FaArrowRight />
                    </div>
                </div>
                <div className={cardClass}>
                    <div className='w-32 mx-auto dark:invert'>{impactSvg}</div>
                    <h1 className={headingClass}>Impact.</h1>
                    <p className={pClass}>Empowering businesses for success. Unlock your full potential
                        with our transformative multichannel services and innovative technology.
                        Enhance customer experiences, drive revenue growth, and achieve sustainable
                        success with our seamless solutions.</p>
                    <div className='flex items-center space-x-2 font-bold mx-auto justify-center text-zinc-900 dark:text-zinc-100'>
                        <h1 className='font-owners'>
                            Learn More
                        </h1>
                        <FaArrowRight />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview2
