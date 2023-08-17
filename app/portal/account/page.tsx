
import { PortalPageTitle } from '@/lib/hooks/portalPageTitle'
import AccountForm from '@/ui/Sections/Account'
import React from 'react'
async function page() {
    return (
        <section className='w-full h-full mx-auto relative'>
            <PortalPageTitle title='Account Settings' toolTip='Get ya mind right' />
            <div className='relative flex place-items-center min-h-full mx-auto w-full'>
                <AccountForm />
            </div>
        </section>
    )
}

export default page


