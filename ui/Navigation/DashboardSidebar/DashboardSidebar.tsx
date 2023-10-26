"use client";
import { useAuthProvider } from "@/app/context/auth";
import { PortalPageTitle } from "@/lib/hooks/PortalPageTitle";
import { useContactButtonStore } from "@/ui/Buttons/ContactButton/contactButtonStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsGlobe2 } from "react-icons/bs";
import {
  FaBook,
  FaChartPie,
  FaCog,
  FaDatabase,
  FaFacebook,
  FaFileInvoice,
  FaGithub,
  FaSignOutAlt,
  FaTwitter,
  FaUser,
} from "react-icons/fa"; // Import the icons you need
import { FaMusic, FaWpforms } from "react-icons/fa6";
function DashboardSidebar() {
  const { user, signOut, profile, userRole, setUserRole} = useAuthProvider();
  const [showTooltip, setShowTooltip] = useState("");
  const setOpen = useContactButtonStore((state: any) => state.setOpen);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleSetTooltip = (title: string) => {
    setShowTooltip(title);
    return title;
  };
  const handleHideTooltip = () => {
    setShowTooltip("");
  };
  const vercel = "https://vercel.com/thecrib/crib-netowork-q2-23/deployments";
  const analyticsUrl = process.env.NEXT_PUBLIC_TINYBIRD_DASHBOARD_URL!!!;

  console.log(userRole)
  useEffect(() => {
    if (profile) {
      setUserRole(profile?.user_role);
    };
  }, [profile])
  const VercelIcon = () => (
    <svg
      className="w-4 h-4 "
      width="76"
      height="65"
      viewBox="0 0 76 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37.5274 0L75.0548 65H0L37.5274 0Z"
        fill="fill-black dark:fill-white"
        className="fill-black dark:fill-white"
      />
    </svg>
  );
  ///   console.log(user)
  const sidebarItems = [
    {
      title: "Overview",
      icon: <BsGlobe2 className=" -rotate-12" />,
      href: "/portal",
      target: "_self",
    },
    {
      title: "Account",
      icon: <FaUser />,
      href: "/portal/account",
      target: "_self",
    },
    {
      title: "Admin",
      icon: <FaCog />,
      user_role: 'admin',// admin | user 
      href: "https://cribnetwork.sanity.studio",
      target: "_blank",
    },
    {
      title: "Form Submissions",
      icon: <FaWpforms />,
      user_role: 'admin',// admin | user 
      href: "/portal/form-submissions",
      target: "_blank",
    },
    {
      title: "Music Uploads",
      icon: <FaMusic />,
      user_role: 'admin',// admin | user 
      href: "/portal/crib-music",
      target: "_self",
    },
    {
      title: "Database",
      icon: <FaDatabase />,
      user_role: 'admin',// admin | user 
      href: "https://supabase.com/dashboard/project/tvuqvrbxusmicpmjqpus",
      target: "_blank",
    },
    {
      title: "Deployments",
      icon: <VercelIcon />,
      user_role: 'admin',// admin | user 
      href: vercel,
      target: "_blank",
    },

    {
      title: "Analytics",
      icon: <FaChartPie />,
      user_role: 'admin',// admin | user 
      href: analyticsUrl! as string,
      target: "_self",
    },

    {
      title: "Invoicing",
      icon: <FaFileInvoice />,
      hidden: true,
      href: "#",
      target: "_self",
    },
    {
      title: "Learning",
      icon: <FaBook />,
      href: "/portal/learning",
      target: "_self",
    },
    {
      title: "Sign Out",
      icon: <FaSignOutAlt />,
      onClick: signOut,
      target: "_self",
    },
    // Add more items as needed
  ];
  const filteredSidebarItems = sidebarItems.map((item) => {
    if (
      item.hidden || // Hide items with hidden set to true
      (item.user_role === 'admin' && userRole !== 'admin') || // Hide admin-specific items for non-admin users
      (item.user_role === 'editor' && userRole !== ('editor' || 'admin')) || // Hide editor-specific items for non-editor users
      (item.user_role === 'user' && userRole !== ('user '|| 'editor' || 'admin')) // Hide user-specific items for non-user users
    ) {
      return null; // Return null for items that should be hidden
    }

    return (
      <li
        key={item.title}
        className={"relative z-50"}
      >
        {item.onClick ? (
          <div
            onClick={item.onClick}
            onMouseEnter={() => handleSetTooltip(item.title)}
            onMouseLeave={handleHideTooltip}
            className="flex items-center pl-4 lg:pl-2 p-2 text-base font-medium text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group duration-300 relative ease-in-out z-50"
          >
            {item.icon}
            <p className="ml-3 hidden lg:block">{item.title}</p>
          </div>
        ) : (
          <Link
            onMouseEnter={() => handleSetTooltip(item.title)}
            onMouseLeave={handleHideTooltip}
            target={item?.target}
            href={item.href}
            className="flex items-center pl-4 lg:pl-2 p-2 text-base font-medium text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group duration-300 ease-in-out relative z-50"
          >
            {item.icon}
            <span className="ml-3 hidden lg:block">{item.title}</span>
          </Link>
        )}
        {showTooltip && showTooltip === item.title && (
          <div className="absolute top-0 left-0 ml-2 w-48 max-w-72 p-2.5 rounded-sm z-50 shadow-md lg:hidden">
            <div className="relative">
              <p className="text-xs">{item.title}</p>
            </div>
          </div>
        )}
      </li>
    );
  });

  const socialRowItems = [
    {
      title: "Facebook",
      icon: <FaFacebook />,
      href: "https://facebook.com/thecribnetwork",
    },
    {
      title: "Twitter",
      icon: <FaTwitter />,
      href: "https://x.com/thecribnetwork",
    },
    { title: "Github", icon: <FaGithub />, href: "#" },
  ];


  return (
    <aside
      className="fixed  left-0 z-10 w-24 lg:w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-zinc-200 md:translate-x-0 dark:bg-black dark:border-zinc-800"
      aria-label="SideNav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px-3 h-full ">
        {profile && (
          <div className="scale-75 -ml-2 hidden lg:block">
            <PortalPageTitle
              title={`Hello, ${profile.full_name}`}
              subtitle={user.email}
              toolTip={false}
            />
          </div>
        )}
        {profile?.user_role === 'admin' &&
          <div className="text-black dark:text-white relative z-50 px-4 text-xs">
            <select
              id="view-as"
              className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setUserRole(e.target.value)}
              value={userRole!}
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
          </div>
        }

        <ul className="space-y-2 mt-8 sm:ml-2 relative z-50">
          {filteredSidebarItems}
        </ul>
      </div>

      <div className="absolute bottom-14 p-4 left-0 text-xs text-zinc-700 dark:text-zinc-300">
        <ul>
          <li>
            <Link
              href="/privacy-policy"
              className="mr-4 hover:underline md:mr-6"
            >
              Cookie & Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="mr-4 hover:underline md:mr-6 ">
              Terms
            </Link>
          </li>
          <li>
            <div
              onClick={handleOpenModal}
              className="mr-4 md:mr-6 hover:underline"
            >
              Contact
            </div>
          </li>
        </ul>
      </div>
      <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-zinc-100 dark:bg-zinc-900 z-20 text-black dark:text-white border-t border-zinc-300 dark:border-zinc-700 duration-300 ease-in-out">
        {socialRowItems.map((item) => (
          <Link key={item.title} href={item.href}>
            <div className=" hover:scale-110 ease-in-out duration-200">
              {item.icon}
            </div>
          </Link>
        ))}
      </div>

    </aside>
  );
}

export default DashboardSidebar;
