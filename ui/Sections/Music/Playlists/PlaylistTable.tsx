'use client'

import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import Link from "next/link";
import { FaEye, FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import usePlaylistStore from "./store";

export const PlaylistTable = ({playlists}) => {
    const {
        setEditingPlaylist,
      } = usePlaylistStore();

      const deletePlaylist = async (id: string) => {
        const { data, error } = await supabaseAdmin
        .from('playlists')
        .delete()
        .eq('id', id)
        .select()
        .single();
        console.log(data)
    if (data) {
      //  console.log('done')
        toast.success('Playlist removed');
    }
      }
    return (
      <div className=" bg-white dark:bg-black rounded p-4 my-8 relative mx-4">
        <div className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400 relative ">
          <ul className="relative">
            {playlists.map((playlist: {id: string, title: string}) => (
              <li
                className="border-b dark:border-zinc-600 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-xs md:text-sm min-w-full font-work-sans flex justify-between"
                key={playlist.id}
              >
                <span className="text-black dark:text-white">
                  {" "}
                  {playlist.title}
                </span>
                <div className="flex items-center gap-4">
                    <Link href={"https://cribmusic.xyz/playlist/" + playlist.id}>
                        <FaEye/>
                    </Link>
                    <div className="text-black dark:text-white cursor-pointer" onClick={() => deletePlaylist(playlist.id)}>
                    <FaTrash/>
                    </div>
                <button
                  className={`${"bg-zinc-100 dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200"} border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded`}
                  onClick={() => setEditingPlaylist(playlist.id)}
                >
                  {"Edit"}
                </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };