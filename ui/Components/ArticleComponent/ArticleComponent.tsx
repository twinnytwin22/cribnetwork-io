'use client'
import { imageBuilder } from "@/lib/providers/sanity/sanity";
import BlogSocialShare from "../BlogSocialShare";
import PortableBlogText from "../PortableBlogText";
import Image from "next/image";
import React, { useState } from "react";
import { BsShare } from "react-icons/bs";
import { useHandleOutsideClick } from "@/lib/hooks/handleOutsideClick";

function ArticleComponent({ post }) {
    const [showShare, setShowShare] = useState(false)
    const image = imageBuilder(post?.coverImage)
    console.log(post, image)

    useHandleOutsideClick(showShare, setShowShare, 'blog-button')
    return (
        <article className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            {showShare &&
                <React.Fragment>
                    <div className="fixed inset-0 bg-black opacity-50 w-screen h-screen "></div>
                    <div className='fixed w-full max-w-lg right-0 left-0 mx-auto blog-button'>
                        <BlogSocialShare title={post.title} />
                    </div>
                </React.Fragment>}
            <header className="mb-4 lg:mb-6 not-format">
                <address className="flex items-center mb-6 not-italic justify-between">
                    <div className="inline-flex items-center mr-3 text-sm text-zinc-900 dark:text-white">
                        <img className="mr-4 w-16 h-16 rounded-full hidden" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos" />
                        <div>
                            <a href="#" rel="author" className="text-xl font-bold text-zinc-900 dark:text-white">Randal Herndon</a>
                            <p className="text-base text-zinc-500 dark:text-zinc-400">Full stack developer, educator & CEO CRIB, LLC</p>
                            <p className="text-base text-zinc-500 dark:text-zinc-400">
                            </p>
                        </div>
                    </div>
                    <div onClick={(() => setShowShare(true))} className="text-black dark:text-white mt-6 text-3xl hover:scale-105 duration-200 ease-in-out cursor-pointer">
                        <BsShare/>
                    </div>
                </address>
                <h2 className="my-12 text-3xl font-extrabold leading-tight text-zinc-900 lg:mb-6 lg:text-4xl ei dark:text-white">{post?.title}</h2>
            </header>
            <Image src={image} alt={post.title} width={1000} height={600} className='aspect-video object-cover rounded-lg my-12 shadow-lg' />

            <PortableBlogText content={post?.content} />
            <footer>
                <p className="mt-12 text-lg text-zinc-600 dark:text-zinc-400">
                    Thanks for reading! If you have any questions or feedback, please do not hesitate to reach out.
                </p>
            </footer>
        </article>
    );
}

export default ArticleComponent