import { useHandleOutsideClick } from "@/lib/hooks/handleOutsideClick";
import { allGenres } from "@/lib/site/allGenres";
import { filmMoods } from "@/lib/site/allMoods";
import { getCoverImage } from "@/lib/site/constants";
import { downloadFile, updateSong, uploadFile } from "@/utils/db";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useMusicFormStore } from "./store";
import { UploadSongTypes } from "./types";
const EditSongForm = ({ artists, id, songs }) => {
  const {
    initialState,
    formData,
    setFormData,
    genreArray,
    moodArray,
    //musicFile,
    // setMusicFile,
    status,
    setStatus,
    audioSrc,
    setAudioSrc,
    imagePreview,
    imagePreviewOpen,
    // updateSongKeywords,
    formatTime,
    setImagePreview,
    setImagePreviewOpen,
  } = useMusicFormStore();
  // const setGenreValue = (genreValue) => useMusicFormStore.setState({ genreValue })
  const setGenreArray = (genreArray) =>
    useMusicFormStore.setState({ genreArray });
  //const setMoodValue = (moodValue) => useMusicFormStore.setState({ moodValue })
  const setMoodArray = (moodArray) => useMusicFormStore.setState({ moodArray });

  const handleGenreSelect = (e) => {
    const selectedGenre = e.target.value;

    // Check if the selected genre is not already in the genreArray array
    if (!genreArray.includes(selectedGenre) && genreArray.length < 3) {
      setGenreArray([...genreArray, selectedGenre]);
    }
  };

  const handleMoodSelect = (e) => {
    const selectedMood = e.target.value;

    // Check if the selected mood is not already in the moodArray array
    if (!moodArray?.includes(selectedMood) && moodArray.length < 3) {
      setMoodArray([...moodArray, selectedMood]);
    }
  };
  const currentSong: UploadSongTypes = songs.find(
    (song: any) => song.id.toString() === id.toString(),
  );
  const router = useRouter();
  useEffect(() => {
    if (currentSong) {
      setStatus("loadingInitialState");
      setFormData(currentSong);
      setStatus("ready");
      setGenreArray(currentSong?.genres! || []);
      setMoodArray(currentSong?.moods! || []);
      setImagePreview(getCoverImage(currentSong.cover_art_url!));
    }
  }, [currentSong]);
  // console.log(currentSong, "SONG");
  const handleLoadedMetadata = (event: ChangeEvent<HTMLAudioElement>) => {
    const audio = event.target;
    const audioDuration = formatTime(audio.duration);
    setFormData({ ...formData, duration: audioDuration });
  };
  const { data } = useQuery({
    queryKey: ["data", formData.music_file_url],
    queryFn: () =>
      downloadFile({ path: formData.music_file_url, bucket: "tracks" }),
    enabled: !!formData && formData?.music_file_url.length > 1,
    // onSuccess: (data) => {
    // },
    refetchOnMount: false,
  });

  useEffect(() => {
    if (audioSrc) {
      return;
    }
    if (data && !audioSrc) {
      setAudioSrc(data);
    }
  }, [data, audioSrc]);

  //console.log(data)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    //console.log(name, value, "CHANGE EVENT");

    if (name === "artist_id") {
      // Find the selected artist to set artist_name
      const selectedArtist = artists.find((artist) => artist.id === value);
      // console.log(selectedArtist, "SELECTED");
      setFormData({
        ...formData,
        [name]: value,
        artist_name: selectedArtist.artist_name,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleClose = () => {
  //   store.setOpen(false);
  // };

  //console.log(formData)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedArtist = artists.find(
      (artist) => artist.id === formData.artist_id,
    );

    const updates = {
      ...formData,
      music_file_url: formData.music_file_url,
      artist_name: selectedArtist?.artist_name,
      genres: genreArray,
      moods: moodArray,
    };

    try {
      setStatus("loading");
      const res = await updateSong({
        updates,
      });

      if (res?.ok) {
        setStatus("success");
        // setFormData(initialState);
        toast.success("Updated successfully");
        router.refresh();
      }
    } catch (err) {
      setStatus("error");
      console.error("Error:", JSON.stringify(err));
    } finally {
      router.back();
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
  useHandleOutsideClick(imagePreviewOpen, setImagePreviewOpen, "image-preview");

  // Function to remove a selected genre
  const removeGenre = (genre) => {
    const updatedGenres = genreArray.filter((g) => g !== genre);
    setGenreArray(updatedGenres);
  };

  // Function to remove a selected mood
  const removeMood = (mood) => {
    const updatedMoods = moodArray.filter((m) => m !== mood);
    setMoodArray(updatedMoods);
  };

  const handleSongTypeChange = (e) => {
    const { value } = e.target;

    if (value === "lyrics-instrumental") {
      setFormData({ ...formData, has_lyrics: true, instrumental: false });
    }

    if (value === "instrumental") {
      setFormData({ ...formData, has_lyrics: false, instrumental: true });
    }

    //console.log(value, formData, "FORMDATA");
  };
  return (
    <div className="w-full p-8 mx-auto z-[100] h-full isolate relative font-work-sans">
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
      <h1 className="text-2xl tracking-tight font-medium text-center text-black dark:text-white font-owners">
        Edit Song&nbsp;&nbsp;|&nbsp; {formData.title}
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
              value={formData?.title || ""}
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
              value={formData?.album || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
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
              value={formData?.release_year || ""}
              onChange={handleChange}
            />
          </div>
          <div className="h-fit w-full">
            <label
              htmlFor="artist_id"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
              Artist
            </label>
            <select
              disabled
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 "
              id="artist_id"
              name="artist_id"
              value={formData?.artist_id || ""}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select an artist
              </option>
              {artists.map((artist) => (
                <option key={artist.id} value={artist.id}>
                  {artist.artist_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="md:flex gap-4 items-end h-fit w-full">
          {audioSrc && (
            <div className="h-fit scale-90">
              <audio
                controls
                src={audioSrc}
                onLoadedMetadata={handleLoadedMetadata}
              />
            </div>
          )}

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

        <div className="relative flex items-center justify-between gap-4">
          <div className="w-full">
            <div className="flex space-x-2 items-center">
              <label
                htmlFor="genres"
                className="block mb-2 text-sm font-medium text-black dark:text-white"
              >
                Genres (select up to 3)
              </label>
              {genreArray?.map((genre) => (
                <div
                  className="text-xs font-work-sans items-center h-fit flex"
                  key={genre}
                >
                  {genre}{" "}
                  <button
                    role="button"
                    className="text-lg ml-2"
                    onClick={() => removeGenre(genre)}
                  >
                    <FaDeleteLeft />
                  </button>
                </div>
              ))}
            </div>
            <select
              multiple
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 relative"
              id="genres"
              name="genres"
              value={genreArray || []}
              onChange={handleGenreSelect}
            >
              <option value="" disabled>
                Select Genres
              </option>
              {allGenres.map((genre: any) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="relative flex items-center justify-between gap-4 h-fit">
          <div className="w-full">
            <div className="flex space-x-4 items-center">
              <label
                htmlFor="moods"
                className="block mb-2 text-sm font-medium text-black dark:text-white"
              >
                Moods (select up to 3)
              </label>
              {moodArray?.map((mood) => (
                <div
                  className="text-xs font-work-sans items-center h-fit flex"
                  key={mood}
                >
                  {mood}{" "}
                  <button
                    role="button"
                    className="text-lg ml-2"
                    onClick={() => removeMood(mood)}
                  >
                    <FaDeleteLeft />
                  </button>
                </div>
              ))}
            </div>
            <select
              multiple
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 relative"
              id="moods"
              name="moods"
              value={moodArray || []}
              onChange={handleMoodSelect}
            >
              <option value="" disabled>
                Select Moods
              </option>
              {filmMoods.map((mood: any) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center w-full space-x-4">
          <div className="flex w-full items-center pl-4 border border-zinc-300 rounded dark:border-zinc-700">
            <input
              onChange={handleSongTypeChange}
              name="song-type"
              id="instrumental"
              type="radio"
              checked={formData?.instrumental}
              className="w-4 h-4 text-blue-600 bg-zinc-100 border-zinc-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
              value={"instrumental"}
            />
            <label
              className="w-full py-4 ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-300"
              htmlFor="instrumental"
            >
              Instrumental Only
            </label>
          </div>
          <div className="flex w-full items-center pl-4 border border-zinc-300 rounded dark:border-zinc-700">
            <input
              onChange={handleSongTypeChange}
              name="song-type"
              id="lyrics-instrumental"
              type="radio"
              checked={formData?.has_lyrics}
              className="w-4 h-4 text-blue-600 bg-zinc-100 border-zinc-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
              value={"lyrics-instrumental"}
            />
            <label
              className="w-full py-4 ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-300"
              htmlFor="lyrics-instrumental"
            >
              Has Lyrics
            </label>
          </div>
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
            value={formData?.lyrics || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-3">
          <button
            disabled={status === "loading"}
            type="submit"
            className={`${
              status === "loading" ? "cursor-wait" : "cursor-pointer"
            } py-3 font-owners px-5 rounded text-xs tracking-wide md:text-sm font-medium text-center text-black bg-red-300 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:scale-105`}
          >
            {status === "loading" ? "Please wait" : "Update"}
          </button>
        </div>
        {status === "error" && <p>Error sending email, please try again.</p>}
      </form>
    </div>
  );
};

export default EditSongForm;
