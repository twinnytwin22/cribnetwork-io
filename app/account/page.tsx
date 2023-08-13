import { supabaseAdmin } from '@/lib/providers/supabase/supabase-lib-admin'
import { supabase } from '@/lib/site/constants'
import AccountForm from '@/ui/Sections/Account'
import React from 'react'
async function page() {

    const { data: session } = await supabaseAdmin.auth.getSession()
    return (
        <div>
            <AccountForm session={session?.session} />
        </div>
    )
}

export default page