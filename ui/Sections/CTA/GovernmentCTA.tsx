import ContactButton from '@/ui/Buttons/ContactButton/ContactButton'
import React from 'react'
import Image from 'next/image'

function GovernmentCTA() {
  return (
<section className="bg-white dark:bg-zinc-900 max-w-screen w-full relative border-b border-t border-zinc-200 dark:border-zinc-700" >
<Image
        priority
        src={'/images/govsector.jpeg'}
        alt="Background"
        fill
        quality={75}
        className='z-0  contrast-125 brightness-125 object-cover transform'
      //  style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
            <div className="absolute inset-0 bg-black opacity-75 "></div>

    <div className="py-8 px-4 mx-auto max-w-screen-lg sm:py-16 lg:px-6 relative z-10">
        <div className="justify-end flex flex-col items-end w-full mx-auto">
            <h2 className="mb-4 text-4xl tracking-tight font-medium font=owners text-white">Also serving the government sector.</h2>
            <p className="mb-8 font-light sm:text-xl text-zinc-300 font-owners tracking-wider">Empowering Government Initiatives Through Technology Solutions</p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
         <ContactButton/> 
            </div>
        </div>
    </div>
</section>  )
}

export default GovernmentCTA