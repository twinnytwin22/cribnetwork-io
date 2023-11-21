import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import {
  getActiveProductsWithPrices,
  getSession,
  getSubscription,
} from "@/lib/providers/supabase/supabase-server";
import { supabase } from "@/lib/site/constants";
import PageTitle from "@/ui/Components/PageTitle/PageTitle";
import { LoadingContainer } from "@/ui/Sections/LoadingContainer";
import LearningPanel from "@/ui/Sections/PortalOverview/Panels/LearningPanel";
import MusiciansPanel from "@/ui/Sections/PortalOverview/Panels/MusiciansPanel";
import NotificationsPanel from "@/ui/Sections/PortalOverview/Panels/NotificationsPanel";
import UsersTable from "@/ui/Sections/PortalOverview/Panels/UsersTable";
import WelcomePanel from "@/ui/Sections/PortalOverview/Panels/WelcomePanel";
import { getAllArtists, getAllSongs } from "@/utils/use-server";
import Link from "next/link";
import React from "react";
import { FaUpload } from "react-icons/fa6";

export const dynamic = "force-dynamic";

async function Portal({ searchParams }: { searchParams: { q: string } }) {
  const search = searchParams.q ?? "";
  const getUsers = async () => {
    const { data: users } = await supabaseAdmin.from("users").select("*");
    if (users) {
      return users;
    }
  };
  const [session, products, subscription, users, songs, artists] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription(),
    getUsers(),
    getAllSongs(),
    getAllArtists(),
  ]);

  const adminEmails = ['randal.herndon@gmail.com', 'randal@cribnetwork.io']
  const currentArtist = !adminEmails.includes(session?.user.email!) ? artists.artists?.find(
    (artist: { contact_email: string }) => artist.contact_email === session?.user.email //"blvckheartmoney@gmail.com" //,
  ) : [];
  const currentArtistSongs = currentArtist && !adminEmails.includes(session?.user.email!)
    ? songs.songs?.filter((song) => song.artist_name === currentArtist?.artist_name)
    : songs.songs || [];

  const { data: enrollments, error } = await supabase
    .from("student_enrollments")
    .select("*, courses(*)")
    .eq("student_id", session?.user.id)
    .limit(5);

  return (
    <section className="w-screen h-full mx-auto relative">
      <PageTitle title="Your Overview" />
      <React.Suspense fallback={<LoadingContainer />}>
        <div className="hidden">
          <UsersTable users={users} />
        </div>
        <div className="grid grid-cols-6 col-span-6 gap-8 h-1/2  w-full px-10">
          <WelcomePanel subscription={subscription} href="/">
            <p className="text-zinc-800 dark:text-zinc-300 text-center">
              {session?.user.email}
            </p>
            <p className="text-zinc-800 dark:text-zinc-300 text-center">{""}</p>
          </WelcomePanel>
          {currentArtist &&
            <MusiciansPanel href="/crib-music">

              {currentArtistSongs.length > 0 ? (
                <div className="space-y-2 p-1 ">
                  <h2 className="text-center font-medium">Your Recent Uploads</h2>
                  <div className="space-y-2">
                    {currentArtistSongs.slice(0, 3).map((song) => (
                      <div
                      key={song.id}
                        className="flex items-center space-x-4 mx-auto justify-between p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 max-w-sm "
                      >
                        <p className="text-zinc-800 text-sm dark:text-zinc-300 text-center pl-2"
                          >
                          {song.title}
                        </p>
                        <button className=" border  mx-auto flex justify-center border-zinc-200 dark:border-zinc-800 cursor-pointer text-black dark:text-white rounded-full font-medium text-sm p-1 px-3 hover:scale-105 duration-300 ease-in-out">
                          {song.play_count}
                        </button>
                      </div>))}
                  </div></div>) :
                <p className="text-zinc-800 dark:text-zinc-300 text-center text-sm">
                  You have no music uploaded.
                </p>}
              <div>
                <Link href={'/portal/crib-music?mode=song'}>
                  <button className="bg-red-300 mx-auto flex justify-center items-center w-28 my-2 space-x-2 gap-2  cursor-pointer text-black rounded-full font-medium text-sm p-1 px-3 hover:scale-105 duration-300 ease-in-out">
                    Upload <FaUpload />
                  </button></Link>
              </div>
            </MusiciansPanel>}
          <LearningPanel href={"/portal/learning"}>
            {enrollments && enrollments?.length > 0 ? (
              <div className="space-y-2 p-1 ">
                <h2 className="text-center font-medium">Your courses</h2>
                {enrollments?.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center space-x-4 mx-auto justify-between p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 max-w-sm "
                  >
                    <p className="text-zinc-800 text-sm dark:text-zinc-300 text-center pl-2">
                      {course?.courses?.title}
                    </p>
                    <Link
                      className=" cursor-pointer"
                      href={`/portal/learning/course/${course.courses.id}`}
                    >
                      <button className="bg-red-300  cursor-pointer text-black rounded-full font-medium text-sm p-1 px-3 hover:scale-105 duration-300 ease-in-out">
                        Resume
                      </button>
                    </Link>
                  </div>
                ))}
                <Link
                  className=" cursor-pointer relative"
                  href={"/portal/learning/my"}
                  prefetch
                >
                  <p className="text-xs pl-8 p-2.5 underline text-black dark:text-white cursor-pointer">
                    View All
                  </p>
                </Link>
              </div>
            ) : (
              <p className="text-zinc-800 dark:text-zinc-300 text-center">
                You are not currently enrolled in any courses.
              </p>
            )}
          </LearningPanel>
          <NotificationsPanel span={6} hidden={false}>
            <div className="w-full"/>
            <p className="text-zinc-800 dark:text-zinc-300 text-center">
              You have no new notifications.
            </p>
          </NotificationsPanel>
        </div>
      </React.Suspense>
    </section>
  );
}

export default Portal;
