"use client";
import { useAuthProvider } from "@/app/context/auth";
import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import { deleteFile } from "@/utils/db";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FaEye, FaMusic, FaTrash } from "react-icons/fa6";
import { FcCancel, FcCheckmark } from "react-icons/fc";
import AddArtistForm from "./AddArtist";
import EditArtistForm from "./EditArtist";
import EditSongForm from "./EditSong";
import UploadSongForm from "./UploadSong";

function FormGroup({ artists, songs, }) {
  const { userRole, user } = useAuthProvider();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const mode = searchParams.get("mode");
  const edit = searchParams.get("edit");
  const id = searchParams.get("id");
  const currentArtist = artists.find(
    (artist: { contact_email: string }) => artist.contact_email === user.email,
  );
  const filteredSongs = currentArtist
    ? songs.filter((song) => song.artist_name === currentArtist?.artist_name)
    : [];

  //const {setImagePreviewOpen, imagePreviewOpen, imagePreview } = useMusicFormStore()
  //console.log(pathname);
  console.log(user);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  //console.log(artists)

  const queryProps = {
    searchParams,
    router,
    pathname,
    createQueryString,
    artists,
    songs: userRole === "admin" ? songs : filteredSongs,
    id,
  };
  const homeProps = ["data", null];
  return (
    artists &&
    songs && (
      <div className="max-w-5xl mx-auto relative">
        <div className="flex space-x-3 ">
          <div className="text-sm font-normal text-center border-b dark:border-zinc-700 mx-8">
            <ul className="flex flex-wrap -mb-px ">
              <li className="mr-2">
                <Link
                  href={`${pathname}/?mode=data`}
                  className={`inline-block p-4 rounded-t-lg ${
                    homeProps.includes(mode)
                      ? "text-red-300 border-b-2 border-red-400 dark:text-red-300 dark:border-red-300"
                      : "text-zinc-500 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300"
                  }`}
                  aria-current={homeProps.includes(mode) ? "page" : undefined}
                >
                  Overview
                </Link>
              </li>
              <li className="mr-2">
                <Link
                  href={`${pathname}/?mode=song`}
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
              <li hidden={userRole !== "admin"} className="mr-2">
                <Link
                  href={`${pathname}/?mode=artist`}
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
                  href="https://cribmusic.xyz/music"
                  target="blank"
                  className={`flex items-center space-x-2 p-4 rounded-t-lg dark:text-zinc-300 text-zinc-500 border-b-2 border-transparent hover:text-red-400 hover:border-red-100 dark:hover:text-zinc-300`}
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
        {homeProps.includes(mode) && !edit && (
          <div className="space-y-4 p-8">
            <div hidden={userRole !== "admin"}>
              <h2 className="font-semibold font-owners text-lg">Artists</h2>
              <ArtistsTable {...queryProps} />
            </div>
            <div>
              <h2 className="font-semibold font-owners text-lg">Songs</h2>
              <SongsTable {...queryProps} />
            </div>
          </div>
        )}
        {edit === "song" && (
          <div className="space-y-24 p-8">
            <EditSongForm {...queryProps} />
          </div>
        )}
        {edit === "artist" && (
          <div className="space-y-24 p-8">
            <EditArtistForm {...queryProps} user={user} />
          </div>
        )}
      </div>
    )
  );
}

export default FormGroup;

const ArtistsTable = ({
  searchParams,
  router,
  pathname,
  createQueryString,
  artists,
  songs,
}) => {
  const handleDeleteArtist = async (artistId) => {
    try {
      let { error } = await supabaseAdmin
        .from("artists")
        .delete()
        .eq("id", artistId);
      if (error) {
        throw new Error(JSON.stringify(error));
      }
      //  await deleteFile({path, bucket: 'tracks'})
    } catch (error) {
      throw error;
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="bg-white dark:bg-black relative shadow-md sm:rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-800">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="table-container overflow-x-auto w-full">
          <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
            <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400 font-owners tracking-widest">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Artist Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Genres
                </th>
                <th scope="col" className="px-4 py-3">
                  Contact Email
                </th>
                <th scope="col" className="px-4 py-3">
                  Contact Phone
                </th>
                <th scope="col" className="px-4 py-3 ">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="px-4 py-3 ">
                  <span className="sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody className=" font-work-sans text-xs">
              {artists.map((artist) => (
                <tr
                  className="border-b dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-black text-xs md:text-sm min-w-full"
                  key={artist.id}
                >
                  <td className="px-4 py-2 font-normal text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">
                    {artist.artist_name}
                  </td>
                  <td className="px-4 py-2 font-normal text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">
                    {artist.genres.toString()}
                  </td>
                  <td className="px-4 py-2 font-normal text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">
                    {artist.contact_email}
                  </td>
                  <td className="px-4 py-2 font-normal text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">
                    {artist.contact_phone}
                  </td>
                  <td
                    onClick={() => {
                      router.push(
                        pathname +
                          "?" +
                          createQueryString("edit", "artist") +
                          "&" +
                          `id=${artist.id}`,
                      );
                    }}
                    className="px-4 py-2 hover:underline font-normal text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer"
                  >
                    Edit
                  </td>
                  <td
                    onClick={() => handleDeleteArtist(artist.id)}
                    className="px-4 py-2 hover:underline font-normal text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer"
                  >
                    <FaTrash />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SongsTable = ({ router, pathname, createQueryString, songs }) => {
  const handleDeleteSong = async (songId, path) => {
    try {
      let { error } = await supabaseAdmin
        .from("songs")
        .delete()
        .eq("id", songId);
      if (error) {
        throw new Error(JSON.stringify(error));
      }
      await deleteFile({ path, bucket: "tracks" });
    } catch (error) {
      throw error;
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="bg-white dark:bg-black relative shadow-md sm:rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-800">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="table-container overflow-x-auto w-full">
          <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
            <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400 font-owners tracking-widest">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Title
                </th>
                <th scope="col" className="px-4 py-3">
                  Artist
                </th>
                <th scope="col" className="px-4 py-3">
                  Release Year
                </th>
                <th scope="col" className="px-4 py-3">
                  <FaMusic />
                </th>
                <th scope="col" className="px-4 py-3 ">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="px-4 py-3 ">
                  <span className="sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody className=" font-work-sans text-xs">
              {songs.map((song) => {
                const usersSongs = song.artist_name;
                return (
                  <tr
                    className="border-b dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-black text-xs md:text-sm min-w-full"
                    key={song.id}
                  >
                    <td className="px-4 py-2 font-normal text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">
                      {song.title}
                    </td>
                    <td className="px-4 py-2 font-normal text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">
                      {song.artist_name}
                    </td>
                    <td className="px-4 py-2 font-normal text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">
                      {song.release_year}
                    </td>
                    <td className="px-4 py-2 font-normal text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer">
                      {song.music_file_url.length > 1 ? (
                        <FcCheckmark />
                      ) : (
                        <FcCancel />
                      )}
                    </td>
                    <td
                      onClick={() => {
                        router.push(
                          pathname +
                            "?" +
                            createQueryString("edit", "song") +
                            "&" +
                            `id=${song.id}`,
                        );
                      }}
                      className="px-4 py-2 hover:underline font-normal text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer"
                    >
                      Edit
                    </td>
                    <td
                      onClick={() =>
                        handleDeleteSong(song.id, song.music_file_url)
                      }
                      className="px-4 py-2 hover:underline font-normal text-zinc-900 whitespace-nowrap dark:text-white cursor-pointer"
                    >
                      <FaTrash />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
