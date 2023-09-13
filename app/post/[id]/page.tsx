import type { Metadata, ResolvingMetadata } from 'next'

import { getBlogPosts, imageBuilder } from '@/lib/providers/sanity/sanity'
import { PortableBlogText } from '@/ui/Components/PortableBlogText'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 

export const revalidate = 0


export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Read route params
  const {id } = params;

  // Fetch data
  const { res, slugs } = await getBlogPosts();

  if (slugs.includes(id)) {
    const relatedPost = res?.find((post: { slug: { current: string } }) =>
      post.slug.current === id
    );

    // Optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];
    const image = imageBuilder(relatedPost?.coverImage);

    return {
      title: relatedPost?.title,
      openGraph: {
        images: [image!]//, ...previousImages],
      },
    };
  }

  // Handle the case where 'id' is not found in 'slugs'
  return {
    title: 'Not Found', // You can customize this error title
    openGraph: {
    //  images: ['/default-error-image.jpg'], // You can customize this error image
    },
  };
}


export async function generateStaticParams() {
    const { slugs } = await getBlogPosts()
    return slugs.map((slug: string) => ({
      id: slug,
     // results: res
    }))
  }


async function Page({ params, searchParams }: Props) {
    const { success, slugs, res } = await getBlogPosts()

    if (success) {
        const { id: slug } = params
        //        console.log(res.slugs, 'SLUGS', slug, 'BROWSER SLUG')
        if (slugs.includes(slug)) {
            const relatedPost =
                res?.find((post: { slug: { current: string } }) =>
                    post.slug.current === slug)
            // console.log(relatedPost)
            return (
              <>
                
                <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-zinc-900 antialiased">
                  <div className="flex justify-between px-4 mx-auto max-w-screen-xl mt-8 w-full">
                 <ArticleComponent post={relatedPost}/>
                  </div>
                </main>
                

                </>
              
            )
        }
    }

    return (
      <section className="bg-white dark:bg-zinc-950 h-screen ">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex items-center h-full">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-zinc-900 md:text-4xl dark:text-white">Something&apos;s missing.</p>
            <p className="mb-4 text-lg font-light text-zinc-500 dark:text-zinc-400">Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page. </p>
            <Link href="/" className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</Link>
        </div>   
    </div>
</section>
    )
}

export default Page


function ArticleComponent({post}) {

  const image = imageBuilder(post?.coverImage)
  console.log(post, image)
  return (
    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
      <header className="mb-4 lg:mb-6 not-format">
        <address className="flex items-center mb-6 not-italic">
          <div className="inline-flex items-center mr-3 text-sm text-zinc-900 dark:text-white">
            <img className="mr-4 w-16 h-16 rounded-full hidden" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos" />
            <div>
              <a href="#" rel="author" className="text-xl font-bold text-zinc-900 dark:text-white">Randal Herndon</a>
              <p className="text-base text-zinc-500 dark:text-zinc-400">Full stack developer, educator & CEO CRIB, LLC</p>
              <p className="text-base text-zinc-500 dark:text-zinc-400"> 
              </p>
            </div>
          </div>
        </address>
        <h2 className="my-12 text-3xl font-extrabold leading-tight text-zinc-900 lg:mb-6 lg:text-4xl ei dark:text-white">{post?.title}</h2>
      </header>
   <Image src={image} alt={post.title} width={1000} height={600} className='aspect-video object-cover rounded-lg my-12'/>

    <PortableBlogText content={post?.content}/>
      <footer>
        <p className="mt-12 text-lg text-zinc-700 dark:text-zinc-400">
          Thanks for reading! If you have any questions or feedback, please do not hesitate to reach out.
        </p>
      </footer>
    </article>
  );
}

