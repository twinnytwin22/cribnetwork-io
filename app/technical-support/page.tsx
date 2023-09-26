import ContactButton from '@/ui/Buttons/ContactButton/ContactButton'
import HomeCTA from '@/ui/Sections/CTA/HomeCTA'
import { getSiteImage } from '@/utils/use-server'
import Image from 'next/image'
import React from 'react'

export const dynamic = 'force-dynamic'


async function page () {
  //HEADINGS
  
// HEADINGS
const digitalMarketingH = `Digital Marketing: `;
const ppcCampaignsH = `PPC Campaigns`;
const emailMarketingH = `Email Marketing`;
const socialMediaMarketingH = `Social Media Marketing`;
const seoH = `Search Engine Optimization (SEO)`;

// SUBHEADINGS
const digitalMarketingSub = `Driving Digital Transformation with Advanced Technology`;
const ppcCampaignsSub = `Maximizing Visibility with Pay-Per-Click Advertising`;
const emailMarketingSub = `Engage, Convert, Repeat: Email Marketing That Works`;
const socialMediaMarketingSub = `Connecting with Your Audience on Social Media`;
const seoSub = `Boosting Rankings and Visibility on Search Engines`;

// PARAGRAPHS
const digitalMarketingP = `In the ever-evolving landscape of digital marketing, staying ahead is not just an option; it's a necessity. At [Your Company Name], we are your partners in driving digital transformation with advanced technology. Our solutions revolutionize operations, maximizing efficiency, agility, and growth. From AI-driven automation to immersive experiences, stay ahead in the digital era.`;

const ppcCampaignsP = `When it comes to maximizing your online visibility, Pay-Per-Click (PPC) campaigns are a powerful tool. Our experts craft tailored PPC strategies to ensure your ads reach the right audience at the right time. We optimize campaigns for ROI, driving traffic, and achieving your conversion goals.`;

const emailMarketingP = `Email marketing is the art of engaging, converting, and retaining customers. Our email marketing campaigns are meticulously designed to deliver results. We create compelling content, optimize delivery, and track performance to help you build lasting relationships with your audience.`;

const socialMediaMarketingP = `Social media has become the heart of online communication. Our social media marketing strategies focus on connecting with your audience on platforms like Facebook, Instagram, Twitter, and more. We create content that resonates, engage with your followers, and drive brand loyalty.`;

const seoP = `Ranking high on search engines is crucial for online success. Our SEO experts use proven strategies to boost your website's visibility. From keyword optimization to content creation and link building, we'll help you climb the search engine rankings and capture organic traffic.`;


  const whyUs = `Why Choose Us
  At [Your Company Name], we are committed to excellence in every aspect of web design. Here's why you should choose us:
  Experience: With years of industry experience, we've honed our skills to perfection.
  Dedicated Team: Our passionate team of designers, developers, and support staff are always ready to assist you.
  Client-Centric Approach: Your success is our priority. We listen to your needs and tailor solutions accordingly.
  Cutting-Edge Technology: We stay ahead of the curve with the latest design trends and technologies.
  Results-Driven: Our focus is on delivering websites and applications that drive real results for your business.`
  
  //IMAGES
  const introImage = getSiteImage(`/digital-marketing.png`)!
  const customWepImage = getSiteImage(`/dwd-mock.png`)!
  const cmsWepImage = getSiteImage(`/curl-mockup.png`)!
  const webAppImage = getSiteImage(`/subport-mock.png`)!
  const microImage = getSiteImage(`/web-micro.jpeg`)!
 
  return (
    <div className='w-full mt-12'>
      <section className='bg-zinc-100 dark:bg-zinc-950 w-full border-b border-zinc-300 dark:border-zinc-800'>
        <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl font-semibold tracking-tight leading-none md:text-5xl xl:text-6xl text-black dark:text-white font-owners'>
             {digitalMarketingH}{' '}
            </h1>
            <p className='max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic'>
              {digitalMarketingSub}
            </p>
            <p className='font-light text-zinc-500 sm:text-lg dark:text-zinc-400 mb-4'>
              {digitalMarketingP}
            </p>
            <ContactButton />
          </div>
          <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
            <img
              src={introImage}
              alt='mockup'
              className='m-8 rounded-2xl'
            />
          </div>
        </div>
      </section>
      <section className='bg-white dark:bg-black  border-b border-zinc-300 dark:border-zinc-800'>
        <div className='gap-16 flex flex-col items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6'>
          <div className='font-light  text-zinc-500 sm:text-lg dark:text-zinc-400 order-last lg:order-first'>
            <h2 className='mb-4 text-4xl tracking-tight font-semibold text-zinc-900 dark:text-white  font-owners'>
              {seoH}
            </h2>
            <p className='max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic'>
              {seoSub}
            </p>

            <p className='mb-4'>{seoP}</p>
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
              {emailMarketingH}
            </h2>
            <p className='max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic'>
              {emailMarketingSub}
            </p>

            <p className='mb-4'>{emailMarketingP}</p>
            <ContactButton />

          </div>
        </div>
      </section>
      <section className='bg-white dark:bg-black  border-b border-zinc-300 dark:border-zinc-800'>
      <div className='gap-16 flex flex-col items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6'>
      <div className='font-light  text-zinc-500 sm:text-lg dark:text-zinc-400 order-last lg:order-first'>
            <h2 className='mb-4 text-4xl tracking-tight font-semibold text-zinc-900 dark:text-white  font-owners'>
              {socialMediaMarketingH}
            </h2>
            <p className='max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic'>
              {socialMediaMarketingSub}
            </p>

            <p className='mb-4'>{socialMediaMarketingP}</p>
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
              {ppcCampaignsH}
            </h2>
            <p className='max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic'>
              {ppcCampaignsP}
            </p>

            <p className='mb-4'>z{ppcCampaignsP}</p>
            <ContactButton />

          </div>
        </div>
        <HomeCTA/>
      </section>
    </div>
  )
}

export default page
