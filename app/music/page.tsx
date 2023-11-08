import allKeywords from "@/lib/site/seoKeywords";
import MusicianForm from "@/ui/Sections/Music/ArtistInquiryForm";
import FAQ from "@/ui/Sections/Music/FAQ";
import MusicHeader from "@/ui/Sections/Music/MusicHeader";
const metaImage = 'https://tvuqvrbxusmicpmjqpus.supabase.co/storage/v1/render/image/public/site_images/studio.jpg';

export const metadata = {
  metadataBase: new URL('https://cribnetwork.io'),

  title: "CRIB | CRIB Music Global",
  description: "Introducing CRIB Music Global",
  openGraph: {
    title: "CRIB | CRIB Music Global",
    description: "Introducing CRIB Music Global",
    url: "https://cribnetwork.io/music",
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
  generator: "CRIB",
  applicationName: "CRIB",
  referrer: "origin-when-cross-origin",
  keywords: allKeywords,
  authors: [{ name: "Randal Herndon" }],
 // colorScheme: "dark",
  creator: "Randal Herndon",
  publisher: "Randal Herndon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

function page() {


  return (
    <div className="relative">
        
<MusicHeader/>
<MusicianForm/>

<div id='faq' className='max-w-screen mx-auto border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black'>
<div id='faq' className='max-w-5xl mx-auto '>

<FAQ/>
</div>
    </div>
    </div>
  )
}

export default page