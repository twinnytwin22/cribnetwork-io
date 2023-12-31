import React from "react";
//import Image from 'next/image';
import { getBlogPosts } from "@/lib/providers/sanity/sanity";
import AboutHeader from "@/ui/Headers/AboutHeader";
import BlogPostsPreview from "@/ui/Sections/BlogPreview/BlogPostsPreview";
import CTA from "@/ui/Sections/CTA/HomeCTA";
import MeetTheFounder from "@/ui/Sections/MeetTheFounder/MeetTheFounder";
import { getSiteImage } from "@/utils/use-server";

export const revalidate = 0;

//const backgroundImage = "/images/azwindmill.jpg"
async function page() {
  const blogPosts = await getBlogPosts();
  if (blogPosts.success) {
    const image1 = getSiteImage("/programmer-close.jpg");
    const image2 = getSiteImage("/programmer-far.jpg");

    const images = {
      image1,
      image2,
    };
    return (
      <React.Fragment>
        <AboutHeader images={images} />
        <MeetTheFounder />
        <BlogPostsPreview blogPosts={blogPosts.res} />
        <CTA />
      </React.Fragment>
    );
  }
}

export default page;
