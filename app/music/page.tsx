import MusicianForm from "@/ui/Sections/Music/ArtistInquiryForm"
import FAQ from "@/ui/Sections/Music/FAQ"
import MusicHeader from "@/ui/Sections/Music/MusicHeader"

function page() {
  return (
    <div>
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