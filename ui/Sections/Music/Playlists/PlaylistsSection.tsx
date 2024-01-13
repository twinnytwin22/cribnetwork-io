"use client";
import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { CreateTable } from "./CreateTable";
import { EditPlaylist } from "./EditPlaylist";
import { PlaylistTable } from "./PlaylistTable";
import usePlaylistStore from "./store";

function PlaylistsSection({
  searchParams,
  router,
  pathname,
  createQueryString,
  artists,
  songs,
  playlists,
}) {
  const {
    playlistName,
    selectedSongs,
    showCreateForm,
    editingPlaylist,
    setPlaylistName,
    // setSelectedSongs,
    setShowCreateForm,
    setEditingPlaylist,
  } = usePlaylistStore();
  const setSelectedSongs = (songs) =>
    usePlaylistStore.setState({ selectedSongs: songs });
  const addSongToPlaylist = useCallback(
    (songId: string) => {
      const songs = (prevSelectedSongs) => [...prevSelectedSongs, songId];
      setSelectedSongs(songs(selectedSongs));
    },
    [setSelectedSongs, selectedSongs],
  );

  const removeSongFromPlaylist = useCallback(
    (songId: string) => {
      const songs = selectedSongs.filter((id) => id !== songId);
      setSelectedSongs(songs);
    },
    [setSelectedSongs, selectedSongs],
  );
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

  const playListProps = {
    playlistName,
    setPlaylistName,
    selectedSongs,
    songs,
    removeSongFromPlaylist,
    addSongToPlaylist,
    createPlaylist,
    playlists,
  };
  const cancelEdit = () => {
    setEditingPlaylist(null);
    setPlaylistName("");
    setSelectedSongs([]);
    setShowCreateForm(false);
  };
  return (
    <React.Fragment>
      <div className="flex items-center gap-4">
        <button
          hidden={!showCreateForm || editingPlaylist!}
          className="bg-zinc-100 dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded relative top-4 left-4"
          onClick={cancelEdit}
        >
          Cancel
        </button>
        <button
          hidden={showCreateForm || editingPlaylist!!}
          className="bg-zinc-100 dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded relative top-4 left-4"
          onClick={() => setShowCreateForm(true)}
        >
          Create Playlist
        </button>
      </div>
      {!editingPlaylist && showCreateForm && <CreateTable {...playListProps} />}
      {!editingPlaylist && !showCreateForm && (
        <PlaylistTable {...playListProps} />
      )}

      {editingPlaylist && <EditPlaylist {...playListProps} />}
    </React.Fragment>
  );
}

export default PlaylistsSection;
