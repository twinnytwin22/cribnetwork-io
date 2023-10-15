'use client'

import React from 'react';
import UploadSongForm from './UploadSong';
import AddArtistForm from './AddArtist';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

function FormGroup() {
    const params = useSearchParams();
    const mode = params.get('mode');

    const getAllSongs = async () => {
        try {
            const songs = await fetch('https://cribmusic.xyz/api/v1/getAllArtists', {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json',

                 },
                 mode: 'no-cors'

            })
            //const data = songs.json()
            return songs
        } catch (error) {
            throw error
        }
    }

    const { data: songs } = useQuery({
        queryKey: ['data'],
        queryFn: () => getAllSongs()
    })

    return (
        <div className='max-w-5xl mx-auto'>
            <div className="flex space-x-3 ">
                <div className="text-sm font-medium text-center border-b dark:border-zinc-700 mx-8">
                    <ul className="flex flex-wrap -mb-px ">
                        <li className="mr-2">
                            <Link
                                href="/portal/crib-music/?mode=song"
                                aria-current={mode === 'song' ? 'page' : undefined}

                                className={`inline-block p-4 rounded-t-lg ${mode === 'song'
                                    ? 'text-red-300 border-b-2 border-red-400 dark:text-red-300 dark:border-red-300'
                                    : 'text-zinc-500 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300'
                                    }`}
                            >
                                Upload Song
                            </Link>
                        </li>
                        <li className="mr-2">
                            <Link
                                href="/portal/crib-music/?mode=artist"
                                className={`inline-block p-4 rounded-t-lg ${mode === 'artist'
                                    ? 'text-red-300 border-b-2 border-red-400 dark:text-red-300 dark:border-red-300'
                                    : 'text-zinc-500 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300'
                                    }`}
                                aria-current={mode === 'artist' ? 'page' : undefined}
                            >
                                Add Artist
                            </Link>
                        </li>
                        <li className="mr-2">
                            <Link
                                href="/portal/crib-music/?mode=data"
                                className={`inline-block p-4 rounded-t-lg ${mode === 'data'
                                    ? 'text-red-300 border-b-2 border-red-400 dark:text-red-300 dark:border-red-300'
                                    : 'text-zinc-500 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300'
                                    }`}
                                aria-current={mode === 'data' ? 'page' : undefined}
                            >
                                Data
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {mode === 'song' && <UploadSongForm />}
            {mode === 'artist' && <AddArtistForm />}
            {mode === 'data' && <div> {JSON.stringify(songs)}</div>}
        </div>
    );
}

export default FormGroup;
