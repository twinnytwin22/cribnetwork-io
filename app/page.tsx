import HomeHeader from '@/ui/Headers/HomeHeader'
import Mission from '@/ui/Sections/Mission'
import Overview from '@/ui/Sections/Overview'
import Overview2 from '@/ui/Sections/Overview2'
import Services from '@/ui/Sections/Services'
import SocialProof from '@/ui/Sections/SocialProof'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  bg-white dark:bg-zinc-900 w-full max-w-screen">
      <HomeHeader />
      <SocialProof />
      <Overview2 />
      <Mission />
      <Services />
    </main>
  )
}
