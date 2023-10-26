import { create } from "zustand";
import {
  ArtistTypes,
  SocialMediaLinkTypes,
  UploadMusicFormProps,
  UploadSongTypes,
} from "./types";

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
    release_year: null,
    genres: [],
    lyrics: "",
    artist_name: "",
    music_file_url: "",
    duration: "",
    moods: [],
    cover_art_url: "",
    instrumental: true, 
    has_lyrics: false,
  },
  formData: {
    song_id: "",
    title: "",
    artist_id: "",
    album: "",
    release_year: 2023,
    genres: [],
    lyrics: "",
    artist_name: "",
    music_file_url: "",
    duration: "",
    moods: [],
    cover_art_url: "",
    instrumental: true, 
    has_lyrics: false,
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
  initialSocialLinkState: {
    applemusic_url: "",
    spotify_url: "",
    instagram_url: "",
    x_url: "",
    soundcloud_url: "",
    website_url: "",
  },
  socialLinkState: {
    applemusic_url: "",
    spotify_url: "",
    instagram_url: "",
    x_url: "",
    soundcloud_url: "",
    website_url: "",
  },
  imagePreviewOpen: false,

  musicFile: "",
  status: "",
  audioSrc: "",
  imagePreview: "",
  moodValue: "",
  moodArray: [],
  genreValue: "",
  genreArray: [],
  updateGenres: (newGenres) =>
    set((state) => ({
      formData: {
        ...state.formData,
        keywords: newGenres,
      },
    })),

  // set((state) => ({
  //   formData: {
  //     ...state.formData,
  //     keywords: newKeywords,
  //   },
  // })),
  formatTime: (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  },
  setImagePreviewOpen: (imagePreviewOpen: boolean) => {
    set({ imagePreviewOpen });
  },
  setArtistData: (artistData: ArtistTypes) => set({ artistData }),
  //setGenreArray: (genreArray: string[]) => set([...genreArray, genreValue]),
  setSocialLinkState: (state: SocialMediaLinkTypes) =>
    set({ socialLinkState: state }),
  setFormData: (formData: UploadSongTypes) => set({ formData }),
  setImagePreview: (imagePreview: string) => set({ imagePreview }),
  setAudioSrc: (audioSrc: string) => set({ audioSrc }),
  setMusicFile: (musicFile: string) => set({ musicFile }),
  setStatus: (status: string) => set({ status }),
}));
const data = [
  "apple-img1",
  "apple-img2",
  "apple-img3",
  "apple-img4",
  "apple-img5",
  "dell-img1",
  "dell-img2",
  "dell-img3",
  "hp-img1",
  "hp-img2",
];

const output = data.reduce((prev, curr) => {
  // get the keyname
  const [keyName] = curr.split("-");
  if (prev[keyName]) {
    // If the property exists then push to Images array
    prev[keyName].Images.push(curr);
  } else {
    // If the property name does not exist,
    // create it and add the initial value in the format you want
    prev[keyName] = { Images: [curr] };
  }
  return prev;
}, {});
