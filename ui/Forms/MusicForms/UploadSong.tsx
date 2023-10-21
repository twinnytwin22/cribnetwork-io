import { useHandleOutsideClick } from "@/lib/hooks/handleOutsideClick";
import { allGenres } from "@/lib/site/allGenres";
import { addNewSong, downloadFile, uploadFile } from "@/utils/db";
import Image from "next/image";
import { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { useMusicFormStore } from "./store";

const UploadSongForm = ({ artists }) => {
  const {
    initialState,
    formData,
    setFormData,
    musicFile,
    setMusicFile,
    status,
    setStatus,
    audioSrc,
    setAudioSrc,
    imagePreview,
    imagePreviewOpen,
    updateSongKeywords,
    formatTime,
    setImagePreview,
    setImagePreviewOpen,
  } = useMusicFormStore();

  const handleLoadedMetadata = (event: ChangeEvent<HTMLAudioElement>) => {
    const audio = event.target;
    const audioDuration = formatTime(audio.duration);
    setFormData({ ...formData, duration: audioDuration });
  };

  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    if (name === "keywords") {
      const newKeywords = value.split(","); // Assuming keywords are comma-separated
      updateSongKeywords(newKeywords);
    }

    if (name === "music_file_url" || "cover_art_url") {
      return;
    }
    if (name === "artist_id") {
      // Find the selected artist to set artist_name
      const selectedArtist = artists.find((artist) => artist.id === value);
      //  console.log(selectedArtist, "SELECTED");
      // const keywordsArray = formData.keywords?.split(',');

      setFormData({
        ...formData,
        [name]: value,
        artist_name: selectedArtist,
        //   keywords: keywordsArray
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleClose = () => {
  //   store.setOpen(false);
  // };

  console.log(formData);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setStatus("loading");
      const res = await addNewSong({ updates: formData });

      if (res?.ok) {
        setStatus("success");
        setFormData(initialState);
        toast.success("Your message was sent successfully");
      }
    } catch (err) {
      setStatus("error");
      console.error("Error sending email. Please try again later.");
    } finally {
      const audio = await downloadFile({ path: musicFile, bucket: "tracks" });
      if (audio) {
        setAudioSrc(audio);
        setMusicFile(""); // Reset the music file state
      }
    }
  };

  const handleSongUpload = async (e: any) => {
    e.preventDefault();
    setStatus("loading");
    const file = e?.target.files[0]!; // Get the selected file

    if (file) {
      try {
        const uploadedSong = await uploadFile({ file, bucket: "tracks" });
        if (uploadedSong) {
          setFormData({ ...formData, music_file_url: uploadedSong });
          // console.log(uploadedSong);
          setStatus("");
          return;
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAudioSrc(e.target?.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const handleCoverUpload = async (e: any) => {
    e.preventDefault();
    setStatus("loading");
    const file = e?.target.files[0]!; // Get the selected file

    if (file) {
      try {
        const uploadedImage = await uploadFile({ file, bucket: "song_covers" });
        if (uploadedImage) {
          setFormData({ ...formData, cover_art_url: uploadedImage });
          // console.log(uploadedSong);
          setStatus("");
          return;
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  useHandleOutsideClick(imagePreviewOpen, setImagePreviewOpen, 'image-preview')
  return (
    <div className="w-full p-8 mx-auto z-[100] h-full isolate relative" style={{position: 'relative'}}>
      {imagePreview && imagePreviewOpen && (
        <div className="absolute z-[9999] flex items-center mx-8 w-full left-0 right-0">
          <div className="fixed inset-0 bg-black opacity-50 w-full mx-auto left-0 right-0"></div>
          <Image
            className="mx-auto relative rounded image-preview left-0 right-0 shadow-lg"
            src={imagePreview}
            alt="cover Image"
            width={500}
            height={500}
          />
        </div>
      )}
      <h1 className="text-2xl tracking-tight font-bold text-center text-black dark:text-white font-owners">
        Upload Song
      </h1>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full space-y-4 font-medium"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
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
            <label
              htmlFor="album"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
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
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="release_year"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
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

          <div className="relative flex justify-between gap-4">
            <div className="w-full">
              <label
                htmlFor="genre"
                className="block mb-2 text-sm font-medium text-black dark:text-white"
              >
                Genre
              </label>
              <select
                className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 relative"
                id="genre"
                name="genre"
                value={formData?.genre || ""}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Genre
                </option>
                {allGenres.map((genre: any) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="second-genre"
                className="block mb-2 text-sm font-medium text-black dark:text-white"
              >
                Secondary Genre
              </label>
              <select
                className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 relative"
                id="second-genre"
                name="second-genre"
                // value={formData?.genre || ""}
                // onChange={handleChange}
              >
                <option value="" disabled>
                  Select Genre
                </option>
                {allGenres.map((genre: any) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="md:flex gap-4 items-end h-fit w-full">
          <div className="h-fit md:w-1/2">
            <label
              htmlFor="artist_id"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
              Artist
            </label>
            <select
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 "
              id="artist_id"
              name="artist_id"
              value={formData.artist_id}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select an artist
              </option>
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
          {audioSrc && (
            <div className="h-fit scale-90">
              <audio
                controls
                src={audioSrc}
                onLoadedMetadata={handleLoadedMetadata}
              />
            </div>
          )}
        </div>
        <div className="flex h-fit space-x-4">
          <div className="w-full h-fit">
            <label
              htmlFor="music_file_url"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
              Music File URL
            </label>
            <input
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border h-full dark:text-white border-zinc-300 dark:border-zinc-600 text-black text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring focus:border block w-full px-2.5 p-2 "
              type="file"
              id="music_file_url"
              name="music_file_url"
              //  value={musicFile}
              onChange={(e) => handleSongUpload(e)}
            />
          </div>

          <div className="w-32">
            <label
              htmlFor="release_year"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
              Duration
            </label>
            <input
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm  block w-full p-2.5 "
              type="text"
              readOnly
              id="duration"
              name="duration"
              value={formData.duration || ""}
              //onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex h-fit space-x-4 rounded items-end">
          <div className="w-full h-fit">
            <label
              htmlFor="cover_art_url"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
              Cover Art URL
            </label>
            <input
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border h-full dark:text-white border-zinc-300 dark:border-zinc-600 text-black text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring focus:border block w-full p-2.5 "
              type="file"
              id="cover_art_url"
              name="cover_art_url"
              //   value={formData.cover_art_url || ''}
              onChange={(e) => handleCoverUpload(e)}
            />
          </div>
          {imagePreview && (
            <div
              onClick={() => {
                setImagePreviewOpen(true);
              }}
            >
              <Image
                src={imagePreview}
                width={50}
                height={50}
                alt={"Cover Image"}
              />
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="keywords"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
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
          <label
            htmlFor="lyrics"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
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
            disabled={status === "loading"}
            type="submit"
            className={`${
              status === "loading" ? "cursor-wait" : "cursor-pointer"
            } py-3 font-owners px-5 rounded text-xs tracking-wide md:text-sm font-semibold text-center text-black bg-red-300 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:scale-105`}
          >
            {status === "loading" ? "Please wait" : "Upload"}
          </button>
        </div>
        {status === "error" && <p>Error sending email, please try again.</p>}
      </form>
      <div></div>
    </div>
  );
};

export default UploadSongForm;
