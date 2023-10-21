import { create } from "zustand";

export interface ArtistTypes {
  artist_id: string | number;
  discography: string | any;
  image_url: string;
  contact_email?: string;
  subject?: string;
  message?: string;
  artist_name?: string;
  genres?: string[];
  biography?: string;
  social_media_links: any;
  contact_phone?: string;
  // Include contact_phone in the state
}

export interface UploadSongTypes {
  song_id?: string | number;
  title: string;
  artist_id: number | string;
  album?: string;
  release_year: number;
  genre: string;
  lyrics?: string;
  music_file_url: string;
  cover_art_url: string | null;
  keywords?: string[];
  artist_name: string;
  duration: string | null;
 // 

}

export interface UploadMusicFormProps {
  initialArtistState: ArtistTypes;
  initialState: UploadSongTypes;
  formData: UploadSongTypes;
  artistData: ArtistTypes;
  musicFile: string;
  status: string;
  audioSrc: string;
  imagePreview: string;
  imagePreviewOpen: boolean
  setArtistData: (artistData: ArtistTypes) => void;
  setFormData: (formData: UploadSongTypes) => void;
  setAudioSrc: (audioSrc: any) => void;
  setImagePreview: (imagePreview: any) => void;
  setImagePreviewOpen: (imagePreview: boolean) => void
  setStatus: (status: any) => void;
  setMusicFile: (musicFile: any) => void;
  updateGenres: (newGenres: string[]) => void;
  updateSongKeywords: (newKeywords: string[]) => void;
  formatTime: (time: number) => string

}

export const useMusicFormStore = create<UploadMusicFormProps>((set) => ({
  initialArtistState: {
    discography: null,
    social_media_links: null,
    artist_id: "",
    image_url: "",
    contact_email: "",
    subject: "",
    message: "",
    artist_name: "",
    genres: [],
    biography: "",
    contact_phone: "", // Include contact_phone in the state
  },

  initialState: {
    song_id: "",
    title: "",
    artist_id: "",
    album: "",
    release_year: 2023,
    genre: "",
    lyrics: "",
    artist_name: "",
    music_file_url: "",
    duration: "",
    keywords:[], 
    cover_art_url:''
  },
  formData: {
    song_id: "",
    title: "",
    artist_id: "",
    album: "",
    release_year: 2023,
    genre: "",
    lyrics: "",
    artist_name: "",
    music_file_url: "",
    duration: "",
    keywords:[],
    cover_art_url:''

  },
  artistData: {
    discography: null,
    social_media_links: null,

    image_url: "",
    artist_id: "",
    contact_email: "",
    subject: "",
    message: "",
    artist_name: "",
    genres: [],


    biography: "",
    contact_phone: "", // Include contact_phone in the state
  },
  imagePreviewOpen: false,

  musicFile: "",
  status: "",
  audioSrc: "",
  imagePreview:"",
  updateGenres: (newGenres) =>
  set((state) => ({
    formData: {
      ...state.formData,
      keywords: newGenres,
    },
  })),
  updateSongKeywords: (newKeywords) =>
  set((state) => ({
    formData: {
      ...state.formData,
      keywords: newKeywords,
    },
  })),
  formatTime: (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  },
  setImagePreviewOpen: (imagePreviewOpen: boolean) => {
    set({ imagePreviewOpen })},
  setArtistData: (artistData: ArtistTypes) => set({ artistData }),
  setFormData: (formData: UploadSongTypes) => set({ formData }),
  setImagePreview: (imagePreview: string) =>  set({imagePreview}),
  setAudioSrc: (audioSrc: string) => set({ audioSrc }),
  setMusicFile: (musicFile: string) => set({ musicFile }),
  setStatus: (status: string) => set({ status }),
}));
