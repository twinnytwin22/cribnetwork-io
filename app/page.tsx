import HomeHeader from '@/ui/Headers/HomeHeader'
import Mission from '@/ui/Sections/Mission'
import Overview from '@/ui/Sections/Overview'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  bg-white dark:bg-zinc-900 w-full max-w-screen">
      <HomeHeader />
      <Mission />
      <Overview />
    </main>
  )
}
