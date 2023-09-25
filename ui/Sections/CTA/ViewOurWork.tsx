import React from 'react'

function ViewOurWork() {
    const cardClass = 'hover:shadow-zinc-200 hover:shadow-2xl dark:hover:shadow-zinc-800 max-w-md w-full mx-auto ease-in-out duration-500  ';
    const headingClass = 'text-2xl md:text-3xl font-medium text-center text-black dark:text-white font-owners';
    const pClass = 'text-zinc-800 dark:text-zinc-200 text-lg text-center';
    return (
        <section className="bg-white dark:bg-zinc-950 max-w-screen w-full border-b border-t border-zinc-200 dark:border-zinc-800 relative">
            <div className='flex justify-between max-w-screen-2xl mx-auto'>
                <div>
                    <h1 className={headingClass}>
                        Web Design
                        </h1>
                </div>
                <div>
                <h1 className={headingClass}>
                        Digital Marketing
                        </h1>
                </div>

                <div>
                <h1 className={headingClass}>
                        Technical Support
                        </h1>
                </div>
            </div>

        </section>
    )
}

export default ViewOurWork