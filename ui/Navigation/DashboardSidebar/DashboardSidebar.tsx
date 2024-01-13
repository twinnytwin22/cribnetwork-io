"use client";
import { useAuthProvider } from "@/app/context/auth";
import { UserRoleTypes, useAuthStore } from "@/app/context/auth/store";
import { PortalPageTitle } from "@/lib/hooks/PortalPageTitle";
import { useContactButtonStore } from "@/ui/Buttons/ContactButton/contactButtonStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { FiMail } from "react-icons/fi";
function DashboardSidebar() {
  const { user, signOut, profile, userRole, setUserRole } = useAuthProvider();
  const router = useRouter();
  // console.log(userRole)
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

  //console.log(userRole)
  useEffect(() => {
    if (profile) {
      setUserRole(profile?.user_role);
    }
  }, [profile]);
  //console.log(profile)
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

  interface ISideBarItems {
    title: string;
    icon: any;
    href?: string;
    target?: string;
    user_role: UserRoleTypes;
    hidden?: boolean;
    onClick?: () => Promise<void>;
  }
  const logOut = async () => {
    await signOut(),
      setTimeout(() => {
        console.log("timing out");
        useAuthStore.setState({ user: null });
        router.refresh();
      }, 2000);
  };
  ///   console.log(user)
  const sidebarItems: ISideBarItems[] = [
    {
      title: "Overview",
      icon: <BsGlobe2 className=" -rotate-12" />,
      href: "/portal",
      target: "_self",
      user_role: UserRoleTypes.user,
    },
    {
      title: "Account",
      icon: <FaUser />,
      href: "/portal/account",
      target: "_self",
      user_role: UserRoleTypes.user,
    },
    {
      title: "Admin",
      icon: <FaCog />,
      href: "https://cribnetwork.sanity.studio",
      target: "_blank",
      user_role: UserRoleTypes.admin,
    },
    {
      title: "Form Submissions",
      icon: <FaWpforms />,
      href: "/portal/form-submissions",
      target: "_blank",
      user_role: UserRoleTypes.admin,
    },
    {
      title: "Music Uploads",
      icon: <FaMusic />,
      href: "/portal/crib-music",
      target: "_self",
      user_role: UserRoleTypes.editor, // admin | user
    },
    {
      title: "Database",
      icon: <FaDatabase />,
      href: "https://supabase.com/dashboard/project/tvuqvrbxusmicpmjqpus",
      target: "_blank",
      user_role: UserRoleTypes.admin, // admin | user
    },
    {
      title: "Deployments",
      icon: <VercelIcon />,
      href: vercel,
      target: "_blank",
      user_role: UserRoleTypes.admin, // admin | user
    },

    {
      title: "Analytics",
      icon: <FaChartPie />,
      href: analyticsUrl! as string,
      target: "_self",
      user_role: UserRoleTypes.admin, // admin | user
    },

    {
      title: "Invoicing",
      icon: <FaFileInvoice />,
      hidden: true,
      href: "#",
      target: "_self",
      user_role: UserRoleTypes.admin,
    },
    {
      title: "Learning",
      icon: <FaBook />,
      href: "/portal/learning",
      target: "_self",
      user_role: UserRoleTypes.admin,
    },
    {
      title: "Email",
      icon: <FiMail />,
      href: "/portal/email",
      target: "_self",
      user_role: UserRoleTypes.admin,
    },
    {
      title: "Sign Out",
      icon: <FaSignOutAlt />,
      onClick: () => logOut(),
      target: "_self",
      user_role: UserRoleTypes.user,
    },
    // Add more items as needed
  ];

  const filteredSidebarItems = sidebarItems.map((item) => {
    const isUser =
      userRole === "user" && item.user_role.trim() === "user".trim();
    const isEditor =
      (userRole === ("editor" || "user" || "admin") &&
        (item.user_role.trim() === "editor".trim() ||
          item.user_role.trim() === "user".trim())) ||
      isUser;
    const isAdmin =
      (userRole === "admin" &&
        (item.user_role.trim() === "editor".trim() ||
          item.user_role.trim() === "admin".trim() ||
          item.user_role.trim() === "user".trim())) ||
      isEditor;
    // console.log(isAdmin, item.title, item.user_role, userRole) ;
    if (item.hidden) {
      return null; // Return null for items that should be hidden
    }
    return (
      <li hidden={!isAdmin} key={item.title} className={`relative z-50 `}>
        {item.onClick ? (
          <div
            onClick={item.onClick}
            onMouseEnter={() => handleSetTooltip(item.title)}
            onMouseLeave={handleHideTooltip}
            className="flex items-center pl-4 lg:pl-2 p-2 text-sm font-medium text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group duration-300 relative ease-in-out z-50"
          >
            {item.icon}
            <p className="ml-3 hidden lg:block">{item.title}</p>
          </div>
        ) : (
          <Link
            onMouseEnter={() => handleSetTooltip(item.title)}
            onMouseLeave={handleHideTooltip}
            target={item?.target}
            href={item.href!}
            className="flex items-center pl-4 lg:pl-2 p-2 text-sm font-medium text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group duration-300 ease-in-out relative z-50"
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
      className="fixed left-0  z-10 w-24 lg:w-64 h-screen py-14 transition-transform -translate-x-full bg-white border-r border-zinc-200 md:translate-x-0 dark:bg-black dark:border-zinc-800 font-work-sans"
      aria-label="SideNav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-black ">
        {profile && (
          <div className="scale-75 -ml-2 hidden font-owners tracking-widest lg:block">
            <PortalPageTitle
              title={`Hello, ${profile.full_name}`}
              subtitle={user.email}
              toolTip={false}
            />
          </div>
        )}
        {profile?.user_role === "admin" && (
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
        )}

        <ul className="space-y-2 mt-8 sm:ml-2 relative z-50 text-sm mb-10">
          {filteredSidebarItems}
        </ul>
      </div>

      <div className="absolute bottom-10 p-4 z-[999] left-0 text-xs bg-white dark:bg-black  text-zinc-700 dark:text-zinc-300">
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
      <div className="hidden z-[9999] absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-zinc-100 dark:bg-zinc-900  text-black dark:text-white border-t border-zinc-300 dark:border-zinc-700 duration-300 ease-in-out">
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
