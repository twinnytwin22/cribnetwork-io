import Modal from '@/ui/3D/3DMainComponent'
import HomeHeader from '@/ui/Headers/HomeHeader'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  bg-white dark:bg-zinc-900 w-full">
      <HomeHeader />
    </main>
  )
}
