import { supabaseAdmin } from '@/lib/providers/supabase/supabase-lib-admin'
import PageTitle from '@/ui/Components/PageTitle/PageTitle'
import FormSubmissions from '@/ui/Sections/FormSubmissions/FormSubmissions'
import FormSubmissionsWrapper from '@/ui/Sections/FormSubmissions/FormSubmissionsWrapper'
import React, { Suspense } from 'react'



async function page() {

  const tableHeaders = ['Email', 'Type', 'Company', 'Name', 'Phone Number']
  const [{ data: submissions }, { data: formTypes }] = await Promise.all([
    supabaseAdmin.from('form_submissions').select(),
    supabaseAdmin.from('form_types').select()
  ])

  const formTableProps = {
    tableHeaders,
    data: submissions,
    formTypes
  }

  return (
    <div className='w-full px-8 h-full relative'>
      <PageTitle title={'Form Submissions'} />
      <Suspense>
        <FormSubmissionsWrapper {...formTableProps}>
          <FormSubmissions {...formTableProps} formTableProps={formTableProps} />
        </FormSubmissionsWrapper>
      </Suspense>
    </div>
  )
}



export default page