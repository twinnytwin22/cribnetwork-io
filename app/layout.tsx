import Providers from "@/lib/providers";
import { getSiteSettings } from "@/lib/providers/sanity/sanity";
import allKeywords from "@/lib/site/seoKeywords";
import Footer from "@/ui/Navigation/Footer";
import NavBar from "@/ui/Navigation/NavBar/NavBar";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata = {
  title: "CRIB",
  description: "Connect. Revolutionize. Innovate. Boost.",

  generator: "CRIB",
  applicationName: "CRIB",
  referrer: "origin-when-cross-origin",
  keywords: allKeywords,
  authors: [{ name: "Randal Herndon" }],
  colorScheme: "dark",
  creator: "Randal Herndon",
  publisher: "Randal Herndon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  if (!settings) {
    return <p>Loading...</p>;
  }
  return (
    settings && (
      <html lang="en" suppressHydrationWarning>
        {process.env.NODE_ENV !== 'development' && <Script
        
          defer
          src="https://unpkg.com/@tinybirdco/flock.js"
          data-host="https://api.us-east.tinybird.co"
          data-token={process.env.NEXT_PUBLIC_TINYBIRD_TRACKER_TOKEN}
        ></Script>}{" "}
        <body className="max-w-screen w-full relative bg-white dark:bg-black">
          <Providers>
            <NavBar settings={settings} />
            <main className="relative">
              {children}
              <ToastContainer theme="dark" />
            </main>

            <Footer settings={settings} />
          </Providers>
        </body>
      </html>
    )
  );
}
