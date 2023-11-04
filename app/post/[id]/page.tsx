import { getBlogPosts, imageBuilder } from "@/lib/providers/sanity/sanity";
import ArticleComponent from "@/ui/Components/ArticleComponent";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const revalidate = 0;

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // Read route params
  const { id } = params;

  // Fetch data
  const { res, slugs } = await getBlogPosts();

  if (slugs.includes(id)) {
    const relatedPost = res?.find(
      (post: { slug: { current: string } }) => post.slug.current === id,
    );

    // Optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];
    const image = imageBuilder(relatedPost?.coverImage);

    return {
      title: relatedPost?.title,
      openGraph: {
        images: [image!], //, ...previousImages],
      },
    };
  }

  // Handle the case where 'id' is not found in 'slugs'
  return {
    title: "Not Found", // You can customize this error title
    openGraph: {
      //  images: ['/default-error-image.jpg'], // You can customize this error image
    },
  };
}

export async function generateStaticParams() {
  const { slugs } = await getBlogPosts();
  return slugs.map((slug: string) => ({
    id: slug,
    // results: res
  }));
}

async function Page({ params, searchParams }: Props) {
  const { success, slugs, res } = await getBlogPosts();

  if (success) {
    const { id: slug } = params;
    //        console.log(res.slugs, 'SLUGS', slug, 'BROWSER SLUG')
    if (slugs.includes(slug)) {
      const relatedPost = res?.find(
        (post: { slug: { current: string } }) => post.slug.current === slug,
      );
      // console.log(relatedPost)
      return (
        <>
          <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-zinc-900 antialiased w-full max-w-screen relative ">
            <div className="flex justify-between px-4 mx-auto max-w-screen-2xl  mt-8 w-full gap-8">
              <ArticleComponent post={relatedPost} />
            </div>
          </main>
        </>
      );
    }
  }

  return (
    <section className="bg-white dark:bg-zinc-950 h-screen ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex items-center h-full">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-zinc-900 md:text-4xl dark:text-white">
            Something&apos;s missing.
          </p>
          <p className="mb-4 text-lg font-light text-zinc-500 dark:text-zinc-400">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page.{" "}
          </p>
          <Link
            href="/"
            className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Page;
