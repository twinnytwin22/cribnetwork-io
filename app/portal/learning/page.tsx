import React from 'react'
import Pricing from '@/ui/Sections/Subscriptions/Pricing'
import { getActiveProductsWithPrices, getSession, getSubscription } from '@/lib/providers/supabase/supabase-server'
async function Learning() {
    const [session, products, subscription] = await Promise.all([
        getSession(),
        getActiveProductsWithPrices(),
        getSubscription()
      ]);
    return !subscription && (

        <section className='w-full h-full mx-auto relative'>
         
            <div className='relative flex place-items-center min-h-full mx-auto w-full'>
                <Pricing
                   session={session}
                   products={products}
                   subscription={subscription}
                   user={session?.user}
                />
            </div>
        </section>
    )
}

export default Learning