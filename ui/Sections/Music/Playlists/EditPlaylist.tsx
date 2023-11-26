'use client'
import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import usePlaylistStore from "./store";

export const EditPlaylist = ({ playlists, songs, removeSongFromPlaylist, addSongToPlaylist }) => {
    const {
        editingPlaylist,
        editedSongs,
        setEditedPlaylistName,
        setEditingPlaylist, 
        setPlaylistName, 
        selectedSongs, 
        playlistName, 
        setSelectedSongs,
        setShowCreateForm
    } = usePlaylistStore()
    const playlist: any = editingPlaylist && playlists.find((playlist: { id: string }) => playlist.id === editingPlaylist)

    useEffect(() => {
    if(editingPlaylist){
        setPlaylistName(playlist.title)
        setSelectedSongs(playlist.ids) ///  set
    }
    },[editingPlaylist])
   // console.log(playlist)
    const cancelEdit = () => {
        setEditingPlaylist(null);
        setPlaylistName('')
        setSelectedSongs([])
        setShowCreateForm(false)
    };
    const updatePlaylist = (updatedPlaylist) => playlists.map((p) =>
        p.id === updatedPlaylist.id ? updatedPlaylist : p
    );
    const saveChanges = async () => {
        if (playlist) {
            const updates = {
                title: playlistName,
                ids: selectedSongs,
            };

            const { data, error } = await supabaseAdmin
                .from('playlists')
                .update(updates)
                .eq('id', editingPlaylist)
                .select()
                .single();
                console.log(data)
            if (data) {
              //  console.log('done')
                toast.success('Playlist updated');
                updatePlaylist(data);
            }

            if (error) {
                toast.error('Something went wrong');
            }
        };
    }
    return (
        <div className='bg-white dark:bg-black rounded p-4 my-8 relative mx-4'>
            <div className='w-full text-sm text-left text-zinc-500 dark:text-zinc-400 relative '>
                <h2>Edit Playlist</h2>
                <div className='group mb-4'>
                    <input
                        className='block py-1.5 px-0 w-72 text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer'
                        id='editedTitle'
                        name='editedTitle'
                        type='text'
                        value={playlistName || ""}
                        onChange={(e) => setEditedPlaylistName(e.target.value)}
                        placeholder=''
                    />
                    <label
                        className='peer-focus:font-medium absolute peer-focus:ml-3  text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                        htmlFor='editedTitle'
                    >
                        Playlist Name:
                    </label>
                </div>
                <ul className='relative'>
                    {/* Display the list of songs */}
                    {songs.map((song) => {
                        if (!song) return null;
                        const added = selectedSongs?.includes(song.id);

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
                                        className={`${!added
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
                <div className='flex py-2.5 items-center gap-4'>
                    Selected Songs: {editedSongs.length.toString()}
                    <button
                        className='bg-zinc-100 dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded'
                        onClick={saveChanges}
                    >
                        Save
                    </button>
                    <button
                        className='bg-zinc-100 dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded'
                        onClick={cancelEdit}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
