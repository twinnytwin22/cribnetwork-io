import React from 'react'
//import Image from 'next/image';
import BlogPostsPreview from '@/ui/Sections/BlogPostsPreview';
import AboutHeader from '@/ui/Headers/AboutHeader';
import { getBlogPosts } from '@/lib/providers/sanity/sanity';
import CTA from '@/ui/Sections/CTA/CTA';

export const revalidate = 0

//const backgroundImage = "/images/azwindmill.jpg"
async function page() {
    const blogPosts = await getBlogPosts()
    if (blogPosts.success) {

        return (
            <React.Fragment>
                <AboutHeader />
                <BlogPostsPreview blogPosts={blogPosts.res} />
                <CTA/>
            </React.Fragment>

        )
    }
}

export default page








