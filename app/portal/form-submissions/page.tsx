import { supabaseAdmin } from '@/lib/providers/supabase/supabase-lib-admin'
import PageTitle from '@/ui/Components/PageTitle/PageTitle'
import FormSubmissions from '@/ui/Sections/FormSubmissions/FormSubmissions'
import React, { Suspense } from 'react'



async function page() {
    const {data} = await supabaseAdmin
    .from('form_submissions')
    .select()

    const {data: formTypes} = await supabaseAdmin
    .from('form_types')
    .select() 

    const tableHeaders = ['Email', 'Type', 'Company', 'Name', 'Phone Number']

    const formTableProps = {
        tableHeaders, 
        data,
        formTypes
    }

   return (
    <div className='w-full px-8 h-full'>
            <PageTitle title={'Form Submissions'}/>
<Suspense>
    <FormSubmissions {...formTableProps} formTableProps={formTableProps}/>
    </Suspense>
    </div>
  )
}



export default page