import React from 'react'
import Image from 'next/image'
import { getSiteImage } from '@/utils/use-server'
import { FaLinkedinIn } from 'react-icons/fa6'
import Link from 'next/link'

function MeetTheFounder() {

  const aboutFounder = [`

    Randal Herndon, our visionary founder, boasts over a decade of marketing experience. His expertise covers a wide array of digital marketing disciplines, including SEO, SEM, social media management, content marketing, and more. He's known for driving significant business growth through strategic tools like Moz, SEMrush, Google Ads, and Hootsuite.`, `
    
    Randal's impressive track record includes launching and activating three internal brands and three retail locations, resulting in over $3 million in monthly gross revenue for the Arizona market between 2019 and 2022. He also played a pivotal role in reducing external service expenses by at least $120,000 in 2020. His commitment to fostering community relationships led to recognition as a top workplace and numerous accolades.
    
    `, `As the Digital Marketing Manager and Founder of CRIB Network, Randal's expertise continues to shine, generating over $15 million in revenue between 2022 and 2023. With a degree in Media Communications from Webster University and proficiency in various software and tools, Randal is our driving force for marketing excellence.
    
    Randal Herndon is more than a founder; he's a marketing virtuoso, propelling our company to new heights.`]

  const image = getSiteImage('/founder.jpeg')

  return (
    <section className='bg-zinc-100 dark:bg-black w-full border-b border-zinc-300 dark:border-zinc-800'>
      <div className='md:grid md:grid-cols-2 max-w-7xl mx-auto text-zinc-600 dark:text-zinc-300 place-items-center'>
        <div className='p-8 md:p-16'>
          <h2 className='mb-4 text-3xl lg:text-4xl tracking-normal font-semibold font-owners text-zinc-900 dark:text-white'>Meet Our Founder,</h2>
          <h3 className='text-2xl font-owners font-semibold text-zinc-900 dark:text-white'>Randal Herndon</h3>

          {aboutFounder.map((text) => (<div key={text}><p>{text}</p><br /></div>))}
        </div>
        <div className='space-y-8'>

          <div className='mx-auto object-cover max-w-lg w-full relative order-first lg:order-last col-span-5  space-x-4'>
            <Image
              priority
              width={400}
              height={325}
              src={image}
              alt='mockup'
              className='mt-8 rounded-2xl object-cover w-max h-max border border-zinc-300 dark:border-zinc-800 shadow'
            />
          </div>
          <Link className='' href='https://www.linkedin.com/in/randalherndon/'>
          <div className='bg-blue-700 hover:bg-blue-800 duration-200 ease-in-out p-2 px-4 mt-8 rounded w-56 font-sm justify-around font-owners mx-auto text-white flex items-center space-x-2'><FaLinkedinIn/> Follow on Linkedin</div>
          </Link>
        </div>
      </div>


    </section>
  )
}

export default MeetTheFounder