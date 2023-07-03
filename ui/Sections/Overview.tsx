import React from 'react'
import Circles from '../Misc/NetworkBall'

function Overview() {
    return (
        <section className="bg-white dark:bg-black w-full overflow-x-hidden">
            <div className='grid md:grid-cols-2 w-full  max-w-screen-2xl mx-auto py-24 items-center'>
                <div className='w-full max-w-2xl px-4 items-center'>
                    <div className='border-b border-zinc-600 w-full mb-8 hidden'>
                        <h1 className="mb-4  font-normal tracking-normal  text-zinc-900 text-4xl lg:text-5xl dark:text-white max-w-screen-lg mx-auto font-[owners]">
                            Full Omni Channel Support
                        </h1>
                        <p className="mb-8 text-lg max-w-lg w-full font-normal text-zinc-500 lg:text-xl  dark:text-zinc-300 ">Here at CRIB we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                    </div>
                    <ul className='space-y-4 text-black dark:text-white'>
                        <li className='flex p-4 rounded-sm  dark:bg-zinc-950 bg-zinc-100 space-x-3 items-center'>
                            <svg className="w-5 h-5 bg-blue-100 rounded-full lg:w-6 lg:h-6  fill-blue-400 -mt-2" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                            </svg>
                            <p className='mb-2 text-xl font-light dark:text-white font-[owners]'>Services.</p>
                        </li>
                        <li>
                            <p className="mb-8 text-lg max-w-lg w-full font-normal text-zinc-500 lg:text-xl  dark:text-zinc-300 ">Here at CRIB we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>

                        </li>
                        <li className='flex p-4 rounded-sm dark:bg-zinc-950 bg-zinc-100  space-x-3 items-center'>

                            <svg className="w-5 h-5 bg-purple-100 rounded-full lg:w-6 lg:h-6   fill-purple-400 -mt-2" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                            </svg>
                            <p className='mb-2 text-xl font-bold dark:text-white font-[owners]'>Technology.</p>
                        </li>
                        <li>
                            <p className="mb-8 text-lg max-w-lg w-full font-normal text-zinc-500 lg:text-xl  dark:text-zinc-300 ">Here at CRIB we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>

                        </li>
                        <li className='flex p-4 rounded-sm dark:bg-zinc-950 bg-zinc-100  space-x-3 items-center'>
                            <svg className="w-5 h-5 bg-red-50 rounded-full lg:w-6 lg:h-6  fill-red-400 -mt-2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>

                            <p className='mb-2 text-xl font-bold dark:text-white font-[owners]'>Impact.</p>
                        </li>
                        <li>
                            <p className="mb-8 text-lg max-w-lg w-full font-normal text-zinc-500 lg:text-xl  dark:text-zinc-300 ">Here at CRIB we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>

                        </li>
                    </ul>


                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
                    <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
                </div>
            </div>

        </section>
    )
}

export default Overview