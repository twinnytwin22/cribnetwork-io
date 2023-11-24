import { getPageContent } from "@/lib/providers/sanity/sanity";
import { fbUrl, instagramUrl, twitterUrl } from "@/lib/site/constants";
import HomeHeader from "@/ui/Headers/HomeHeader/HomeHeader";
import GovernmentCTA from "@/ui/Sections/CTA/GovernmentCTA";
import CTA from "@/ui/Sections/CTA/HomeCTA";
import { LoadingContainer } from "@/ui/Sections/LoadingContainer";
import Mission from "@/ui/Sections/Mission";
import Overview from "@/ui/Sections/Overview";
import Services from "@/ui/Sections/Services";
import SocialProof from "@/ui/Sections/SocialProof";
import { getSiteImage } from "@/utils/use-server";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

const metaImage = getSiteImage("/share.png");
export const metadata = {
  metadataBase: new URL("https://cribnetwork.io"),

  openGraph: {
    title: "CRIB | Digital Services",
    description: "Innovating the Digital Experience.",
    url: "https://cribnetwork.io",
    siteName: "CRIB",
    images: [
      {
        url: metaImage,
        width: 800,
        height: 600,
      },
      {
        url: metaImage,
        width: 1800,
        height: 1600,
        alt: "Home",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const revalidate = 60;
export default async function Home() {
  const [{ pages }] = await Promise.all([getPageContent()]);
  const homePageContent = pages?.find((page: any) => page?.title === "Home");
  const homeHeaderContent = homePageContent?.sections.find(
    (section: any) => section?.heading === "Home Header",
  );
  const overViewContent = homePageContent?.sections.find(
    (section: any) => section?.heading === "Overview",
  );

  // console.log(homeHeaderContent, "HOME");

  if (homePageContent) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between  bg-white dark:bg-black  w-full max-w-screen">
        <React.Fragment>
          <React.Suspense fallback={<LoadingContainer />}>
            <HomeHeader content={homeHeaderContent.items[0]} />
            <SocialProof />
            <Overview content={overViewContent} />
            <CTA />
          </React.Suspense>
          <Mission />
          <Services />
          <GovernmentCTA />

          {/* <OurTech />*/}
          <div className="fixed z-50 top-1/2 left-10 h-screen">
            <div className="relative space-y-4 p-4 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 scale-125 bg-white dark:bg-zinc-950 hidden lg:block transition-opacity duration-200 ease-in-out ani">
              <div>
                <Link href={fbUrl}>
                  <FaFacebook className="hover:text-red-300 duration-300 ease-in-out" />
                </Link>
              </div>

              <div>
                <Link href={twitterUrl}>
                  <FaTwitter className="hover:text-red-300 duration-300 ease-in-out" />
                </Link>
              </div>
              <div>
                <Link href={instagramUrl}>
                  <FaInstagram className="hover:text-red-300 duration-300 ease-in-out" />
                </Link>
              </div>
            </div>
          </div>
        </React.Fragment>
      </main>
    );
  } else {
    return <p>Loading...</p>;
  }
}
