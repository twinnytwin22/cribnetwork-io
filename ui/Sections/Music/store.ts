import { create } from 'zustand'

export interface SyncFormState {
artist_name: string
email: string
genres: string[]
twitter_hash?: string
instagram_hash?: string
playlist_url: string
sync_interest: boolean
genreValue?: string
initialState: any
step: number | null
cookieStatus: boolean
showShare: boolean
}


export const useSyncFormStore = create<SyncFormState>((set) => ({

    fornData: {
        artist_name: "",
        playlist_url: '',
        email: "",
        genres: [],
        instagram_hash: "",
        twitter_hash: '',
        sync_interest: false,
    },
    initialState: {
        artist_name: "",
        playlist_url: '',
        email: "",
        genres: [],
        instagram_hash: "",
        twitter_hash: '',
        sync_interest: false,
    },
    artist_name: "",
    playlist_url: '',
    email: "",
    genres: [],
    instagram_hash: "",
    twitter_hash: '',
    sync_interest: false,
    genreValue: "",
    step:1,
    cookieStatus: false, 
    showShare: false
}))


