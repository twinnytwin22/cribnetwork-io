import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { addNewSong, downloadFile, uploadFile } from "@/utils/db";
import { UploadSongTypes, useMusicFormStore } from "./store";



const UploadSongForm = ({ artists }) => {
  const {
    initialState,
    formData,
    setFormData,
    musicFile,
    setMusicFile,
    status, setStatus,
    audioSrc,
    setAudioSrc
  } = useMusicFormStore()
  const [] = useState<UploadSongTypes>(initialState);


  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "music_file_url") {
      return;
    }
    if (name === "artist_id") {
      // Find the selected artist to set artist_name
      const selectedArtist = artists.find((artist) => artist.id === value)
      console.log(selectedArtist, "SELECTED")
      setFormData({
        ...formData,
        [name]: value,
        artist_name: selectedArtist
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  // const handleClose = () => {
  //   store.setOpen(false);
  // };


console.log(formData)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updates = {
      ...formData,
      music_file_url: musicFile, // Set the music_file_url
    };

    try {
      setStatus('loading')
      const res = await addNewSong({ updates });

      if (res?.ok) {
        setStatus("success");
        setFormData(initialState);
        toast.success("Your message was sent successfully");
      }
    } catch (err) {
      setStatus("error");
      console.error("Error sending email. Please try again later.");
    } finally {
      const audio = await downloadFile({ path: musicFile, bucket: 'tracks' })
      if (audio) {
        setAudioSrc(audio);
        setMusicFile(''); // Reset the music file state

      }
    }
  };

  const handleSongUpload = async (e: any) => {
    setStatus('loading')
    const file = e?.target.files[0]!; // Get the selected file
    if (file) {
      
      try {
        const uploadedSong = await uploadFile({ file, bucket: 'tracks' });
        if (uploadedSong) {
          setMusicFile(uploadedSong);
          console.log(uploadedSong);
          setStatus('')
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="w-full p-8 mx-auto z-[100] h-full isolate relative">
      <h1 className="text-2xl tracking-tight font-bold text-center text-black dark:text-white font-owners">
        Upload Song
      </h1>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full space-y-4 font-medium"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-black dark:text-white">
              Song Title
            </label>
            <input
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 "
              type="text"
              id="title"
              name="title"
              value={formData?.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="album" className="block mb-2 text-sm font-medium text-black dark:text-white">
              Album
            </label>
            <input
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 "
              type="text"
              id="album"
              name="album"
              value={formData.album}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label htmlFor="release_year" className="block mb-2 text-sm font-medium text-black dark:text-white">
              Release Year
            </label>
            <input
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 "
              type="text"
              id="release_year"
              name="release_year"
              value={formData.release_year}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="genre" className="block mb-2 text-sm font-medium text-black dark:text-white">
              Genre
            </label>
            <input
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 "
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">

          <div className="h-fit">
            <label htmlFor="artist_id" className="block mb-2 text-sm font-medium text-black dark:text-white">
              Artist
            </label>
            <select
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 "
              id="artist_id"
              name="artist_id"
              value={formData.artist_id}
              onChange={handleChange}
            >
              <option value="" disabled>Select an artist</option>
              {artists.map((artist) => (
                <option key={artist.artist_id} value={artist.artist_id}>
                  {artist.artist_name}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="h-fit">
            <label htmlFor="duration" className="block mb-2 text-sm font-medium text-black dark:text-white">
              Duration
            </label>
            <input
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border h-full dark:text-white border-zinc-300 dark:border-zinc-600 text-black text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring focus:border block w-full p-2.5 "
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </div> */}

          {/* <div className="h-fit hidden">
            <label htmlFor="licensing_options" className="block mb-2 text-sm font-medium text-black dark:text-white">
              Licensing Options
            </label>
            <input
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border h-full dark:text-white border-zinc-300 dark:border-zinc-600 text-black text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring focus:border block w-full p-2.5 "
              type="text"
              id="licensing_options"
              name="licensing_options"
              value={formData.licensing_options}
              onChange={handleChange}
            />
          </div> */}
        </div>

        <div>
          <label htmlFor="music_file_url" className="block mb-2 text-sm font-medium text-black dark:text-white">
            Music File URL
          </label>
          <input
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border h-full dark:text-white border-zinc-300 dark:border-zinc-600 text-black text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring focus:border block w-full p-2.5 "
            type="file"
            id="music_file_url"
            name="music_file_url"
            //  value={musicFile}
            onChange={(e) => handleSongUpload(e)}
          />
        </div>

        <div>
          <label htmlFor="cover_art_url" className="block mb-2 text-sm font-medium text-black dark:text-white">
            Cover Art URL
          </label>
          <input
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border h-full dark:text-white border-zinc-300 dark:border-zinc-600 text-black text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring focus:border block w-full p-2.5 "
            type="text"
            id="cover_art_url"
            name="cover_art_url"
            value={formData.cover_art_url}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="keywords" className="block mb-2 text-sm font-medium text-black dark:text-white">
            Keywords
          </label>
          <input
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border h-full dark:text-white border-zinc-300 dark:border-zinc-600 text-black text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring focus:border block w-full p-2.5 "
            type="text"
            id="keywords"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lyrics" className="block mb-2 text-sm font-medium text-black dark:text-white">
            Lyrics
          </label>
          <input
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border h-full dark:text-white border-zinc-300 dark:border-zinc-600 text-black text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring focus:border block w-full p-2.5 "
            type="text"
            id="lyrics"
            name="lyrics"
            value={formData.lyrics}
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-3">
          <button
            disabled={status ==='loading'}
            type="submit"
            className={`${status === 'loading' ? 'cursor-wait' : 'cursor-pointer'} py-3 font-owners px-5 rounded text-xs tracking-wide md:text-sm font-semibold text-center text-black bg-red-300 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:scale-105`}
          >
            {status === 'loading' ? 'Please wait' : 'Upload'}
          </button>

        </div>
        {status === "error" && <p>Error sending email, please try again.</p>}
      </form>
      <div>
        {audioSrc &&
          <audio controls src={audioSrc} />}
      </div>
    </div>
  );
};

export default UploadSongForm;
