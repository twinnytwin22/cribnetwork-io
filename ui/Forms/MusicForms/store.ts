import { create } from 'zustand';

export interface UploadSongTypes {
    title: string | undefined;
    artist_id: number | string | undefined;
    album: string | undefined;
    release_year: number | undefined;
    genre: string | undefined;
    lyrics?: string | undefined;
    music_file_url: string | undefined;
    cover_art_url?: string | undefined;
    keywords?: string[] | undefined | never[];
    artist_name: string | undefined;

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
        title: '',
        artist_id: '',
        album: '',
        release_year: 2023,
        genre: '',
        lyrics: '',
        artist_name: '',
        music_file_url: '',
    },
    formData: {
        title: '',
        artist_id: '',
        album: '',
        release_year: 2023,
        genre: '',
        lyrics: '',
        artist_name: '',
        music_file_url: '',
    },
    musicFile: '',
    status: '',
    audioSrc: '',
    setFormData: (formData: UploadSongTypes) => set({formData}),
    setAudioSrc: (audioSrc:string) => set({audioSrc}),
    setMusicFile: (musicFile: string) => set({musicFile}),
    setStatus: (status: string) => set({status})


}));
