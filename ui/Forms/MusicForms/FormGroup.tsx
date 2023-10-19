"use client";
import React, { useCallback } from "react";
import UploadSongForm from "./UploadSong";
import AddArtistForm from "./AddArtist";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaCircleXmark, FaEye, FaMusic } from "react-icons/fa6";
import {FcCancel, FcCheckmark} from 'react-icons/fc'
import EditSongForm from "./EditSong";

function FormGroup({ artists, songs }) {
  const searchParams = useSearchParams();
  const router = useRouter()
  const pathname = usePathname()
  const mode = searchParams.get("mode");
  const edit = searchParams.get('edit');
  const id = searchParams.get("id");

  console.log(id)
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  //console.log(artists)

  const queryProps = {
    searchParams, 
    router, 
    pathname, 
    createQueryString, 
    artists, 
    songs,
    id
  }
  return (
    artists &&
    songs && (
      <div className="max-w-5xl mx-auto">
        <div className="flex space-x-3 ">
          <div className="text-sm font-medium text-center border-b dark:border-zinc-700 mx-8">
            <ul className="flex flex-wrap -mb-px ">
              <li className="mr-2">
                <Link
                  href="/portal/crib-music/?mode=song"
                  aria-current={mode === "song" ? "page" : undefined}
                  className={`inline-block p-4 rounded-t-lg ${
                    mode === "song"
                      ? "text-red-300 border-b-2 border-red-400 dark:text-red-300 dark:border-red-300"
                      : "text-zinc-500 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300"
                  }`}
                >
                  Upload Song
                </Link>
              </li>
              <li className="mr-2">
                <Link
                  href="/portal/crib-music/?mode=artist"
                  className={`inline-block p-4 rounded-t-lg ${
                    mode === "artist"
                      ? "text-red-300 border-b-2 border-red-400 dark:text-red-300 dark:border-red-300"
                      : "text-zinc-500 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300"
                  }`}
                  aria-current={mode === "artist" ? "page" : undefined}
                >
                  Add Artist
                </Link>
              </li>
              <li className="mr-2">
                <Link
                  href="/portal/crib-music/?mode=data"
                  className={`inline-block p-4 rounded-t-lg ${
                    mode === "data"
                      ? "text-red-300 border-b-2 border-red-400 dark:text-red-300 dark:border-red-300"
                      : "text-zinc-500 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300"
                  }`}
                  aria-current={mode === "data" ? "page" : undefined}
                >
                  Data
                </Link>
              </li>
              <li className="mr-2">
                <Link
                  href="https://cribmusic.xyz/music"
                  target="blank"
                  className={`flex items-center space-x-2 p-4 rounded-t-lg text-zinc-300 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300`}
                >
                  View Site
                  <FaEye className="ml-2" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {mode === "song" && !edit && <UploadSongForm artists={artists} />}
        {mode === "artist" && !edit && <AddArtistForm />}
        {mode === "data" && !edit && (
          <div className="space-y-24 p-8">
            <ArtistsTable {...queryProps} />
            <SongsTable {...queryProps} />
          </div>
        )}
        {edit === 'song' &&  <div className="space-y-24 p-8"><EditSongForm {...queryProps}/></div> }
        {edit === 'artist' && <div className="space-y-24 p-8">EDIT MODE - ARTIST</div> }

      </div>
    )
  );
}

export default FormGroup;

const ArtistsTable = ({ searchParams, router, pathname, createQueryString, artists, songs }) => {
  return (
    <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
      <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400">
        <tr>
          <th className="text-left">Artist Name</th>
          <th className="text-left">Biography</th>
          <th className="text-left">Contact Email</th>
          <th className="text-left">Contact Phone</th>
        </tr>
      </thead>
      <tbody>
        {artists.map((artist) => (
          <tr key={artist.artist_id}>
            <td>{artist.artist_name}</td>
            <td>{artist.biography}</td>
            <td>{artist.contact_email}</td>
            <td>{artist.contact_phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SongsTable = ({ searchParams, router, pathname, createQueryString, artists, songs }) => {
  return (
    <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
      <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400">
        <tr>
          <th scope="col" className="px-4 py-3">
            Title
          </th>
          <th scope="col" className="px-4 py-3">
            Album
          </th>
          <th scope="col" className="px-4 py-3">
            Release Year
          </th>
          <th scope="col" className="px-4 py-3">
            <FaMusic/>
          </th>
          <th scope="col" className="px-4 py-3 ">
                    <span className="sr-only">Edit</span>
                  </th>
        </tr>
      </thead>
      <tbody>
        {songs.map((song) => (
          <tr
            className="border-b dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-black text-xs md:text-sm min-w-full"
            key={song.song_id}
          >
            <td className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">
              {song.title}
            </td>
            <td className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">
              {song.album}
            </td>
            <td className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">
              {song.release_year}
            </td>
            <td className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">
              {song.music_file_url.length > 1 ? <FcCheckmark/> : <FcCancel/>}
            </td>
            <td 
              onClick={() => { router.push(pathname + '?' + createQueryString('edit', 'song') + '&' + `id=${song.song_id}`)}}
            
            className="px-4 py-2 hover:underline font-medium text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">
              Edit
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
