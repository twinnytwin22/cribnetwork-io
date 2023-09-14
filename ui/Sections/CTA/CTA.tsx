import ContactButton from '@/ui/Buttons/ContactButton/ContactButton'
import React from 'react'

function CTA() {
  return (
<section className="bg-white dark:bg-zinc-950 max-w-screen w-full border-b border-t border-zinc-200 dark:border-zinc-800">
    <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-4xl lg:text-5xl tracking-tight font-medium leading-tight text-zinc-900 dark:text-white font-owners">Do you have a project?</h2>
            <p className="mb-6 font-light text-zinc-500 dark:text-zinc-400 md:text-lg">Try Flowbite Platform for 30 days. No credit card required.</p>
<ContactButton/>
        </div>
    </div>
</section> )
}

export default CTA