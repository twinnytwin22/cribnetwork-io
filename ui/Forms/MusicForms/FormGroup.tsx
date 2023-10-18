'use client'
import React from 'react'
import UploadSongForm from './UploadSong'
import AddArtistForm from './AddArtist'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaEye } from 'react-icons/fa6'

function FormGroup ({ artists, songs }) {
  const params = useSearchParams()
  const mode = params.get('mode')

  //console.log(artists)
  return (
    artists &&
    songs && (
      <div className='max-w-5xl mx-auto'>
        <div className='flex space-x-3 '>
          <div className='text-sm font-medium text-center border-b dark:border-zinc-700 mx-8'>
            <ul className='flex flex-wrap -mb-px '>
              <li className='mr-2'>
                <Link
                  href='/portal/crib-music/?mode=song'
                  aria-current={mode === 'song' ? 'page' : undefined}
                  className={`inline-block p-4 rounded-t-lg ${
                    mode === 'song'
                      ? 'text-red-300 border-b-2 border-red-400 dark:text-red-300 dark:border-red-300'
                      : 'text-zinc-500 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300'
                  }`}
                >
                  Upload Song
                </Link>
              </li>
              <li className='mr-2'>
                <Link
                  href='/portal/crib-music/?mode=artist'
                  className={`inline-block p-4 rounded-t-lg ${
                    mode === 'artist'
                      ? 'text-red-300 border-b-2 border-red-400 dark:text-red-300 dark:border-red-300'
                      : 'text-zinc-500 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300'
                  }`}
                  aria-current={mode === 'artist' ? 'page' : undefined}
                >
                  Add Artist
                </Link>
              </li>
              <li className='mr-2'>
                <Link
                  href='/portal/crib-music/?mode=data'
                  className={`inline-block p-4 rounded-t-lg ${
                    mode === 'data'
                      ? 'text-red-300 border-b-2 border-red-400 dark:text-red-300 dark:border-red-300'
                      : 'text-zinc-500 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300'
                  }`}
                  aria-current={mode === 'data' ? 'page' : undefined}
                >
                  Data
                </Link>
              </li>
              <li className='mr-2'>
                <Link
                  href='https://cribmusic.xyz'
                  target='blank'
                  className={`flex items-center space-x-2 p-4 rounded-t-lg text-zinc-300 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300`}
                >
                  View Site
                  <FaEye className='ml-2' />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {mode === 'song' && <UploadSongForm artists={artists} />}
        {mode === 'artist' && <AddArtistForm />}
        {mode === 'data' && (
          <div className='space-y-24'>
            <ArtistsTable artists={artists} />
            <SongsTable songs={songs} />
          </div>
        )}
      </div>
    )
  )
}

export default FormGroup

const ArtistsTable = ({ artists }) => {
  return (
    <table className='min-w-full'>
      <thead>
        <tr>
          <th className='text-left'>Artist Name</th>
          <th className='text-left'>Biography</th>
          <th className='text-left'>Contact Email</th>
          <th className='text-left'>Contact Phone</th>
        </tr>
      </thead>
      <tbody>
        {artists.map(artist => (
          <tr key={artist.artist_id}>
            <td>{artist.artist_name}</td>
            <td>{artist.biography}</td>
            <td>{artist.contact_email}</td>
            <td>{artist.contact_phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const SongsTable = ({ songs }) => {
  return (
    <table className='min-w-full'>
      <thead>
        <tr>
          <th className='text-left'>Title</th>
          <th className='text-left'>Album</th>
          <th className='text-left'>Release Year</th>
        </tr>
      </thead>
      <tbody>
        {songs.map(song => (
          <tr key={song.song_id}>
            <td>{song.title}</td>
            <td>{song.album}</td>
            <td>{song.release_year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
