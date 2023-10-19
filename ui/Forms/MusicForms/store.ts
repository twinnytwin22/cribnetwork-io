import { create } from 'zustand';

export interface UploadSongTypes {
    song_id?: string | number
    title: string;
    artist_id: number | string 
    album?: string 
    release_year: number 
    genre: string 
    lyrics?: string 
    music_file_url: string 
    cover_art_url?: string 
    keywords?: string[] 
    artist_name: string 
    duration: string | null

}

export interface UploadMusicFormProps {
    initialState: UploadSongTypes;
    formData: UploadSongTypes;
    musicFile: string;
    status: string;
    audioSrc: string;
    setFormData: (formData: any) => void;
    setAudioSrc: (audioSrc: any) => void;
    setStatus: (status: any) => void;
    setMusicFile: (musicFile: any) => void;

}

export const useMusicFormStore = create<UploadMusicFormProps>((set) => ({
    initialState: {
        song_id: '',
        title: '',
        artist_id: '',
        album: '',
        release_year: 2023,
        genre: '',
        lyrics: '',
        artist_name: '',
        music_file_url: '',
        duration: '',
    },
    formData: {
        song_id:'',
        title: '',
        artist_id: '',
        album: '',
        release_year: 2023,
        genre: '',
        lyrics: '',
        artist_name: '',
        music_file_url: '',
        duration: '',

    },
    musicFile: '',
    status: '',
    audioSrc: '',
    setFormData: (formData: UploadSongTypes) => set({formData}),
    setAudioSrc: (audioSrc:string) => set({audioSrc}),
    setMusicFile: (musicFile: string) => set({musicFile}),
    setStatus: (status: string) => set({status})


}));
