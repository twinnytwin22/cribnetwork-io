import HomeHeader from '@/ui/Headers/HomeHeader'
import Mission from '@/ui/Sections/Mission'
import OurTech from '@/ui/Sections/OurTech'
import Overview from '@/ui/Sections/Overview'
import Services from '@/ui/Sections/Services'
import SocialProof from '@/ui/Sections/SocialProof'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  bg-white dark:bg-black  w-full max-w-screen">
      <HomeHeader />
      <SocialProof />
      <Overview />
      <Mission />
      <Services />
      <OurTech />
    </main>
  )
}
