import NavBar from '@/ui/Navigation/NavBar'
import './globals.css'
import Providers from '@/lib/providers'
import Footer from '@/ui/Navigation/Footer'

export const metadata = {
  title: 'CRIB',
  description: 'Connect. Revolutionize. Innovate. Boost.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className='max-w-screen w-full relative'>
        <Providers>
          <NavBar />
          {children}

          <Footer />
        </Providers></body>
    </html>
  )
}
