import { services } from '@/lib/site/services'
import React from 'react'

function Services() {
    return (
        <div id="services" className='py-24 w-screen bg-white dark:bg-black border-b border-zinc-300 dark:border-zinc-800'>
            <h1 className="mb-12 text-4xl lg:text-5xl text-center  font-normal tracking-normal  text-zinc-900  dark:text-white max-w-screen-lg mx-auto font-[owners]">
                Multi-Channel Support In One Place. </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-center sm:text-left px-4 gap-16 place-items-start max-w-screen-xl w-full mx-auto text-zinc-900 dark:text-zinc-200'>
                {services.map((service: any) => (
                    <div key={service.title} className='flex hover:-translate-y-3 duration-300 ease-in-out'>
                        <div className='pr-2.5'>{React.createElement(service.icon, { size: 32 })}</div>
                        <div>
                            <p className='font-bold'>{service.title}</p>
                            <p className='text-sm w-48'>{service.description}</p>
                        </div>
                    </div>))}
            </div>
        </div>
    )
}

export default Services