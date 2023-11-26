"use client";
import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";

function PlaylistsSection({
  searchParams,
  router,
  pathname,
  createQueryString,
  artists,
  songs,
}) {
  const [playlistName, setPlaylistName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);

  const addSongToPlaylist = (songId) => {
    setSelectedSongs((prevSelectedSongs) => [...prevSelectedSongs, songId]);
  };
  const createPlaylist = async () => {
    const updates = {
      // userId,
      title: playlistName,
      ids: selectedSongs,
    };
    const { data, error } = await supabaseAdmin
      .from("playlists")
      .insert(updates)
      .select();
    // Assuming you have a way to identify the current user, you can use it here
    // You can now send a request to your server to create the playlist
    // and add the selected songs to it, along with the playlist name
    // For simplicity, I'm just logging the data here
    if (data) {
      toast.success("Playlist created");
      setSelectedSongs([]);
    }
    if (error) {
      toast.error("Something went wrong");
    }
    console.log("Creating playlist:", {
      playlistName,
      selectedSongs,
    });
  };

  const removeSongFromPlaylist = (songId: string) => {
    setSelectedSongs((prevSelectedSongs: string[]) =>
      prevSelectedSongs.filter((id) => id !== songId),
    );
  };

  return (
    <div className=" bg-white dark:bg-black rounded p-4 my-8 relative mx-4">
      <div className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400 relative ">
        <h2>Create Playlist</h2>
        <div className="group mb-4">
          <input
            className="block py-1.5 px-0 w-72 text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
            id="title"
            name="title"
            type="text"
            value={playlistName || ""}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder=""
          />
          <label
            className="peer-focus:font-medium absolute peer-focus:ml-3  text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            htmlFor="title"
          >
            Playlist Name:
          </label>
        </div>
        <ul className="relative">
          {/* Display the list of songs */}
          {songs.map((song) => {
            const added = selectedSongs.includes(song.id);
            return (
              <li
                className="border-b dark:border-zinc-600 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-xs md:text-sm min-w-full font-work-sans flex justify-between"
                key={song.id}
              >
                <span className="text-black dark:text-white">
                  {" "}
                  {song.title} by {song.artist_name}{" "}
                </span>
                <div className="flex items-center space-x-2">
                  {added && (
                    <FaTrash
                      onClick={() => removeSongFromPlaylist(song.id)}
                      style={{ cursor: "pointer" }}
                    />
                  )}{" "}
                  <button
                    className={`${
                      !added
                        ? "bg-zinc-100 dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200"
                        : "bg-green-700 text-white"
                    } border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded`}
                    onClick={() => !added && addSongToPlaylist(song.id)}
                  >
                    {added ? "Added" : "Add"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        {/* Display the selected songs */}
        <div>Selected Songs: {selectedSongs.length.toString()}</div>
        {/* Button to create the playlist */}
        <button
          className="bg-zinc-100 dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded"
          onClick={createPlaylist}
        >
          Create Playlist
        </button>
      </div>
    </div>
  );
}

export default PlaylistsSection;
