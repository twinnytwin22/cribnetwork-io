import React from 'react'
import ContactButton from '@/ui/Buttons/ContactButton/ContactButton'
import HomeCTA from '@/ui/Sections/CTA/HomeCTA'
import Image from 'next/image'
import { getSiteImage } from '@/utils/use-server'

export const dynamic = 'force-static'
async function page () {
  //HEADINGS
  const introH = `Web Design Services:`
  const customWepH = `Custom Web Design`
  const cmsWepH = `CMS Website Design`
  const webAppH = `Web and Mobile Application Design`
  const microH = `Website Updates and Maintenance`

  //SUBHEADING
  const introSub = `Crafting Your Digital Presence`
  const customWebSub = `Your Vision, Our Expertise`
  const cmsWebSub = `Simplicity Meets Functionality`
  const webAppSub = `Innovation at Your Fingertips`
  const microSub = `Stay Ahead, Stay Secure`
  //PARAGRAPHS
  const introP = `We understand that a compelling online presence is pivotal in today's fast-paced digital landscape. Whether you're looking for a custom website, a content management system (CMS) solution, web and mobile application design, or ongoing website updates and maintenance, we have the expertise to cater to your unique needs. Explore our comprehensive web design services and discover how we can help you stand out in the digital world.`
  const customWebP = `In the realm of web design, nothing beats the allure of a custom-made website tailored to your brand's identity and goals. Our seasoned designers and developers collaborate closely with you to bring your vision to life. From eye-catching visuals to seamless user experiences, we create websites that not only captivate but also convert visitors into loyal customers.`
  const cmsWebP = `For those seeking a more hands-on approach to website management, our CMS website design services are the perfect fit. We specialize in popular platforms like Shopify, WordPress, Wix, and Squarespace. Harness the power of user-friendly interfaces and a wide array of plugins to effortlessly update and expand your online presence.`
  const webAppP = `In the digital age, applications are the lifeblood of many businesses. Our web and mobile application design team combines creativity and technical prowess to develop user-friendly, responsive, and feature-rich applications. Whether it's for iOS, Android, or web-based platforms, we ensure your app delivers a seamless experience to your audience. `
  const microP = `Your website is a dynamic entity that needs continuous care. Our website updates and maintenance services ensure that your online presence remains up-to-date, secure, and efficient. From content updates to security patches, we've got your back, allowing you to focus on what you do best—growing your business. `
  
  const whyUs = `Why Choose Us
  At [Your Company Name], we are committed to excellence in every aspect of web design. Here's why you should choose us:
  Experience: With years of industry experience, we've honed our skills to perfection.
  Dedicated Team: Our passionate team of designers, developers, and support staff are always ready to assist you.
  Client-Centric Approach: Your success is our priority. We listen to your needs and tailor solutions accordingly.
  Cutting-Edge Technology: We stay ahead of the curve with the latest design trends and technologies.
  Results-Driven: Our focus is on delivering websites and applications that drive real results for your business.`
  
  //IMAGES
  const introImage = getSiteImage(`/web-design.jpeg`)
  const customWepImage = getSiteImage(`/dwd-mock.png`)
  const cmsWepImage = getSiteImage(`/curl-mockup.png`)
  const webAppImage = getSiteImage(`/subport-mock.png`)
  const microImage = getSiteImage(`/web-micro.jpeg`)
 
  return (
    <div className='w-full mt-12'>
      <section className='bg-zinc-100 dark:bg-zinc-950 w-full border-b border-zinc-300 dark:border-zinc-800'>
        <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl font-semibold tracking-tight leading-none md:text-5xl xl:text-6xl text-black dark:text-white font-owners'>
             {introH}{' '}
            </h1>
            <p className='max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic'>
              {introSub}
            </p>
            <p className='font-light text-zinc-500 sm:text-lg dark:text-zinc-400 mb-4'>
              {introP}
            </p>
            <ContactButton />
          </div>
          <div className='mx-auto object-cover max-w-lg w-full relative order-first lg:order-last'>
            <Image
              width={400}
              height={325}
              src={introImage}
              alt='mockup'
              className='mt-8 rounded-2xl object-cover w-max h-max'
            />
          </div>
        </div>
      </section>
      <section className='bg-white dark:bg-black  border-b border-zinc-300 dark:border-zinc-800'>
        <div className='gap-16 flex flex-col items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6'>
          <div className='font-light  text-zinc-500 sm:text-lg dark:text-zinc-400 order-last lg:order-first'>
            <h2 className='mb-4 text-4xl tracking-tight font-semibold text-zinc-900 dark:text-white  font-owners'>
              {customWepH}
            </h2>
            <p className='max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic'>
              {customWebSub}
            </p>

            <p className='mb-4'>{customWebP}</p>
            <ContactButton />

          </div>
          <div className='mx-auto object-cover max-w-lg w-full relative order-first lg:order-last'>
            <Image
              width={400}
              height={325}
              src={customWepImage}
              alt='mockup'
              className='mt-8 rounded-2xl object-cover w-max h-max'
            />
          </div>
        </div>
      </section>
      <section className='bg-zinc-100 dark:bg-zinc-950 w-full border-b border-zinc-300 dark:border-zinc-800'>
        <div className='gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6'>
        <div className='object-cover max-w-lg w-full relative mx-auto'>
            <Image
              width={400}
              height={325}
              src={cmsWepImage}
              alt='mockup'
              className='my-8 rounded-2xl object-cover w-max h-max'
            />
          </div>
          <div className='font-light text-zinc-500 sm:text-lg dark:text-zinc-400'>
            <h2 className='mb-4 text-4xl tracking-tight font-semibold text-zinc-900 dark:text-white  font-owners'>
              {cmsWepH}
            </h2>
            <p className='max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic'>
              {cmsWebSub}
            </p>

            <p className='mb-4'>{cmsWebP}</p>
            <ContactButton />

          </div>
        </div>
      </section>
      <section className='bg-white dark:bg-black  border-b border-zinc-300 dark:border-zinc-800'>
      <div className='gap-16 flex flex-col items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6'>
      <div className='font-light  text-zinc-500 sm:text-lg dark:text-zinc-400 order-last lg:order-first'>
            <h2 className='mb-4 text-4xl tracking-tight font-semibold text-zinc-900 dark:text-white  font-owners'>
              {webAppH}
            </h2>
            <p className='max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic'>
              {webAppSub}
            </p>

            <p className='mb-4'>{webAppP}</p>
            <ContactButton />

          </div>
          <div className='mx-auto object-cover max-w-lg w-full relative order-first lg:order-last'>
            <Image
              width={400}
              height={325}
              src={webAppImage}
              alt='mockup'
              className='mt-8 rounded-2xl object-cover w-max h-max'
            />
          </div>
        </div>
      </section>
      <section
        id='about'
        className='bg-zinc-100 dark:bg-zinc-950 w-full border-b border-zinc-300 dark:border-zinc-800'
      >
        <div className='gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6'>
        <div className='object-cover max-w-lg w-full relative mx-auto'>
            <Image
              width={400}
              height={325}
              src={microImage}
              alt='mockup'
              className='my-8 rounded-2xl object-cover w-max h-max'
            />
          </div>
          <div className='font-light text-zinc-500 sm:text-lg dark:text-zinc-400'>
            <h2 className='mb-4 text-4xl tracking-tight font-semibold text-zinc-900 dark:text-white  font-owners'>
              {microH}
            </h2>
            <p className='max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic'>
              {microSub}
            </p>

            <p className='mb-4'>z{microP}</p>
            <ContactButton />

          </div>
        </div>
        <HomeCTA/>
      </section>
    </div>
  )
}

export default page
