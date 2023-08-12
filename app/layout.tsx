
import NavBar from '@/ui/Navigation/NavBar'
import './globals.css'
import Providers from '@/lib/providers'
import Footer from '@/ui/Navigation/Footer'
import { getSiteSettings } from '@/lib/providers/sanity/sanity'

export const metadata = {
  title: 'CRIB',
  description: 'Connect. Revolutionize. Innovate. Boost.',
}



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const settings = await getSiteSettings()

  if (!settings) {
    return <p>Loading...</p>
  }
  return settings && (
    <html lang="en" suppressHydrationWarning>

      <body className='max-w-screen w-full relative'>
        <Providers>
          <NavBar settings={settings} />
          {children}

          <Footer />
        </Providers></body>
    </html>
  )
}
