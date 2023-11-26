'use client'

import usePlaylistStore from "./store";

export const PlaylistTable = ({playlists}) => {
    const {
        playlistName,
        selectedSongs,
        showCreateForm,
        editingPlaylist,
        setPlaylistName,
        setSelectedSongs,
        setShowCreateForm,
        setEditingPlaylist,
      } = usePlaylistStore();
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
                <button
                  className={`${"bg-zinc-100 dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200"} border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded`}
                  onClick={() => setEditingPlaylist(playlist.id)}
                >
                  {"Edit"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };