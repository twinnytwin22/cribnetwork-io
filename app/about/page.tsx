import React from 'react'
//import Image from 'next/image';
import BlogPostsPreview from '@/ui/Sections/BlogPreview/BlogPostsPreview';
import AboutHeader from '@/ui/Headers/AboutHeader';
import { getBlogPosts } from '@/lib/providers/sanity/sanity';
import CTA from '@/ui/Sections/CTA/HomeCTA';
import { getSiteImage } from '@/utils/use-server';
import MeetTheFounder from '@/ui/Sections/MeetTheFounder/MeetTheFounder';

export const revalidate = 0

//const backgroundImage = "/images/azwindmill.jpg"
async function page() {
    const blogPosts = await getBlogPosts()
    if (blogPosts.success) {
   const image1 = getSiteImage("/programmer-close.jpg")
    const image2 = getSiteImage("/programmer-far.jpg")

    const images ={
        image1,
        image2
    }
        return (
            <React.Fragment>
                <AboutHeader images={images}/>
                <MeetTheFounder/>
                <BlogPostsPreview blogPosts={blogPosts.res} />
                <CTA/>
            </React.Fragment>

        )
    }
}

export default page








