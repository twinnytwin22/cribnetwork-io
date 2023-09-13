import { getBlogPosts, imageBuilder } from '@/lib/providers/sanity/sanity'
import { PortableBlogText } from '@/ui/Components/PortableBlogText'
import React from 'react'
import Image from 'next/image'
export const revalidate = 0

export async function generateStaticParams() {
    const { slugs } = await getBlogPosts()
    return slugs.map((slug: string) => ({
      id: slug,
     // results: res
    }))
  }


async function Page({ params }: { params: { id?: string, slug: string } }) {
    const res = await getBlogPosts()

    if (res.success) {
        const { id: slug } = params
        //        console.log(res.slugs, 'SLUGS', slug, 'BROWSER SLUG')
        if (res.slugs.includes(slug)) {
            const relatedPost =
                res.res?.find((post: { slug: { current: string } }) =>
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
        <div className='h-screen items-center flex'>
            <p>No valid blog post found.</p>
        </div>
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

