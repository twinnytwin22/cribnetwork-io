
import { PortalPageTitle } from '@/lib/hooks/PortalPageTitle'
import { getSession, getSubscription } from '@/lib/providers/supabase/supabase-server';
import AccountForm from '@/ui/Sections/Account'
import React from 'react'
async function AccountPage() {
    const [session, subscription] = await Promise.all([
        getSession(),
        getSubscription()
      ]);
    return session && (
        <section className='w-full h-full mx-auto relative'>
            <PortalPageTitle title='Account Settings' toolTip='Get ya mind right' />
            <div className='relative flex place-items-center min-h-full mx-auto w-full'>
                <AccountForm session={session} subscription={subscription}/>
            </div>
        </section>
    )
}

export default AccountPage


