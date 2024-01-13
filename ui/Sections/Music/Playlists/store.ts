import { create } from "zustand";

interface PlaylistStore {
  playlistName: string;
  selectedSongs: string[];
  showCreateForm: boolean;
  editingPlaylist: null; // | PlaylistType; // Replace PlaylistType with the actual type of your playlist object
  editedPlaylistName: string;
  editedSongs: string[];
  setPlaylistName: (playlistName: string) => void;
  setSelectedSongs: (selectedSongs: any) => void;
  setShowCreateForm: (showCreateForm: boolean) => void;
  setEditingPlaylist: (editingPlaylist: any) => void;
  setEditedPlaylistName: (editedPlaylistName: string) => void;
  setEditedSongs: (editedSongs: string[]) => void;
}

const usePlaylistStore = create<PlaylistStore>((set) => ({
  playlistName: "",
  selectedSongs: [],
  showCreateForm: false,
  editingPlaylist: null,
  editedPlaylistName: "", // initial value
  editedSongs: [], // initial value
  setPlaylistName: (playlistName) => set({ playlistName }),
  setSelectedSongs: (selectedSongs) => set({ selectedSongs }),
  setShowCreateForm: (showCreateForm) => set({ showCreateForm }),
  setEditingPlaylist: (editingPlaylist) => set({ editingPlaylist }),
  setEditedPlaylistName: (editedPlaylistName) => set({ editedPlaylistName }),
  setEditedSongs: (editedSongs) => set({ editedSongs }),
}));

export default usePlaylistStore;
