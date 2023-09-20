
import { PortalPageTitle } from '@/lib/hooks/PortalPageTitle'
import { getSession, getSubscription } from '@/lib/providers/supabase/supabase-server';
import PageTitle from '@/ui/Components/PageTitle/PageTitle';
import AccountForm from '@/ui/Sections/Account'
import React from 'react'
async function AccountPage() {
    const [session, subscription] = await Promise.all([
        getSession(),
        getSubscription()
      ]);
    return session && (
        <section className='w-full h-full mx-auto relative'>
            <PageTitle title={'Your Account'}/>
            <div className='relative flex  mx-auto w-full'>
                <AccountForm session={session} subscription={subscription}/>
            </div>
        </section>
    )
}

export default AccountPage


