'use client'
import { useAuthProvider } from '@/app/context/auth'
import { PortalPageTitle } from '@/lib/hooks/PortalPageTitle'
import Link from 'next/link'
import React from 'react'
import { BsGlobe2 } from 'react-icons/bs'
import { FaUser, FaCog, FaSignOutAlt, FaBook, FaFacebook, FaTwitter, FaGithub, FaDatabase, FaFileInvoice } from 'react-icons/fa'; // Import the icons you need
import { GrOverview } from 'react-icons/gr'
function DashboardSidebar({ isOpen }) {
  const { user, signOut, profile } = useAuthProvider()
  ///   console.log(user)
  const sidebarItems = [
    { title: 'Overview', icon: <BsGlobe2 className=' -rotate-12'/>, href: '/portal', target: '_self' },
    { title: 'Admin', icon: <FaCog />, condition: profile?.user_role === 'admin', href: 'https://cribnetwork.sanity.studio', target: '_blank' },
    { title: 'Database', icon: <FaDatabase />, condition: profile?.user_role === 'admin', href: 'https://supabase.com/dashboard/project/tvuqvrbxusmicpmjqpus', target: '_blank' },
    { title: 'Account', icon: <FaUser />, href: '/portal/account', target: '_self' },
    { title: 'Invoicing', icon: <FaFileInvoice />, hidden: true, href: '#', target: '_self' },
    { title: 'Learning', icon: <FaBook />, href: '/portal/learning', target: '_self' },
    { title: 'Sign Out', icon: <FaSignOutAlt />, onClick: signOut, target: '_self' },
    // Add more items as needed
  ];


  const socialRowItems = [
    { title: 'Facebook', icon: <FaFacebook />, href: 'https://facebook.com/thecribnetwork' },
    { title: 'Twitter', icon: <FaTwitter />, href: 'https://x.com/thecribnetwork' },
    { title: 'Github', icon: <FaGithub />, href: '#' },

  ]
  return (
    <aside
      className="fixed  left-0 z-0 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-zinc-200 md:translate-x-0 dark:bg-black dark:border-zinc-800"
      aria-label="SideNav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px-3 h-full ">
        {profile &&
          <div className='scale-75 -ml-2'>
            <PortalPageTitle
              title={`Hello, ${profile.full_name}`}
              subtitle={user.email}
              toolTip={false}
            />
          </div>}
        <ul className="space-y-2 mt-8 sm:ml-2">
          {sidebarItems.map((item) => (
            <li key={item.title} className={item.hidden ? 'hidden' : ''}>
              {item.onClick ? (
                <div
                  onClick={item.onClick}
                  className="flex items-center p-2 text-base font-medium text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group duration-300 ease-in-out"
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </div>
              ) : (
                <Link
                  target={item?.target}
                  href={item.href}
                  className="flex items-center p-2 text-base font-medium text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group duration-300 ease-in-out"
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-zinc-100 dark:bg-zinc-900 z-20 text-black dark:text-white border-t border-zinc-300 dark:border-zinc-700 duration-300 ease-in-out"
      >
        {socialRowItems.map((item) => (
          <Link key={item.title} href={item.href}>
            <div className=' hover:scale-110 ease-in-out duration-200'>
              {item.icon}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}

export default DashboardSidebar