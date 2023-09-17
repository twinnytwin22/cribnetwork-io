import { getPageContent } from '@/lib/providers/sanity/sanity'
import { fbUrl, instagramUrl, twitterUrl } from '@/lib/site/constants'
import HomeHeader from '@/ui/Headers/HomeHeader/HomeHeader'
import CTA from '@/ui/Sections/CTA/CTA'
import GovernmentCTA from '@/ui/Sections/CTA/GovernmentCTA'
import Mission from '@/ui/Sections/Mission'
import OurTech from '@/ui/Sections/OurTech'
import Overview from '@/ui/Sections/Overview'
import Services from '@/ui/Sections/Services'
import SocialProof from '@/ui/Sections/SocialProof'
import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa6'

export const dynamic = 'force-static'
export const preferredRegion = 'auto'

//export const revalidate = 60
export default async function Home() {

  const [content] = await Promise.all([
    getPageContent()
  ])
  const section = content?.homePage.sections

  if (content) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between  bg-white dark:bg-black  w-full max-w-screen">
        <React.Fragment>
          <React.Suspense>
            <HomeHeader content={section[0].items[0]} />
            <SocialProof />
            <Overview content={section[1]} />
            <CTA/>
          </React.Suspense>
          <Mission />
          <Services />
          <GovernmentCTA/>

        {/* <OurTech />*/} 
          <div className='fixed z-50 top-1/2 left-10 h-screen'>
            <div className='relative space-y-4 p-4 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 scale-125 bg-white dark:bg-zinc-950 hidden lg:block transition-opacity duration-200 ease-in-out ani'>
              <div>
                <Link href={fbUrl}>
                  <FaFacebook className='hover:text-red-300 duration-300 ease-in-out' />
                </Link>
              </div>
              <div>
                <Link href={twitterUrl}>
                  <FaTwitter className='hover:text-red-300 duration-300 ease-in-out' />
                </Link>
              </div>
              <div>
                <Link href={instagramUrl}>
                  <FaInstagram className='hover:text-red-300 duration-300 ease-in-out' />
                </Link>
              </div>
            </div>
          </div>
        </React.Fragment>

      </main>
    )
  }
  else {
    return <p>Loading...</p>
  }
}