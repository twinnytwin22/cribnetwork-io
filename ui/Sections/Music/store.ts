import { create } from 'zustand'

export interface SyncFormState {
name: string
email: string
genres: string[]
twitter_url?: string
instagram_url?: string
playlist_url: string
syncInterest: boolean
genreValue?: string

}


export const useSyncFormStore = create<SyncFormState>((set) => ({
    name: "",
    playlist_url: '',
    email: "",
    genres: [],
    instagram_url: "",
    twitter_url: '',
    syncInterest: false,
    genreValue: "",

}))


