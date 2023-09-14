import { getSiteSettings } from '@/lib/providers/sanity/sanity'
import { PortableBlogText } from '@/ui/Components/PortableBlogText'
import PortableText from '@/ui/Components/PortableText'
import React from 'react'

export const revalidate = 0

async function page() {
    const settings = await getSiteSettings()

    if (!settings) {
      return <p>Loading...</p>
    }

    console.log(settings)
  return settings &&  (
    <div className='mt-16'>
        <div className='p-8 max-w-5xl mx-auto'>
         <PortableBlogText content={settings?.termsConditions}/>
        </div>
        </div>
  )
}

export default page