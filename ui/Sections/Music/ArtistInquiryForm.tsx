"use client";
import { allGenres } from "@/lib/site/allGenres";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { SyncFormState, useSyncFormStore } from "./store";

const MusicianForm: React.FC = () => {
    const router = useRouter();
    const { genres } = useSyncFormStore();
    const initialState = {
        name: "",
        playlist_url: "",
        email: "",
        genres: [],
        instagram_url: "",
        twitter_url: "",
        syncInterest: false,
    }
    const [formData, setFormData] = useState<SyncFormState>(initialState);
    useEffect(() => {
        setFormData(initialState);
    }, []);
    const setGenres = (genres) => useSyncFormStore.setState({ genres });
    const handleGenreSelect = (e) => {
        const selectedGenre = e.target.value;

        // Check if the selected genre is not already in the genreArray array
        if (!genres.includes(selectedGenre) && genres.length < 3) {
            setGenres([...genres, selectedGenre]);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };
    const removeGenre = (genre) => {
        const updatedGenres = genres.filter((g) => g !== genre);
        setGenres(updatedGenres);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const updates = { ...formData, genres: genres }

            // Handle form submission, e.g., sending data to your server
            console.log(updates);

            const res = await fetch('/api/music/syncArtistInquiry', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
              });

            if (res.ok) {
                toast.success('Your submission has been sent')
                setFormData(initialState)
            }
        } catch (error) {
            console.log(error)
        } finally {
            router.refresh()
        }
    };

    return (
        <section className="w-full bg-white dark:bg-zinc-950 text-black dark:text-white font-work-sans py-16">
            <div className="max-w-5xl mx-auto p-4">
                <h1 className="text-2xl font-medium mb-4 font-owners">
                    Musician Information Form
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            placeholder=""
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                        />
                        <label
                            className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            htmlFor="name"
                        >
                            Name / Artist Name
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            placeholder=""
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                        />
                        <label
                            className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            htmlFor="email"
                        >
                            Email
                        </label>
                    </div>
                    <div className="relative flex items-center justify-between gap-4 mb-6">
                        <div className="w-full">
                            <div className="flex space-x-2 items-center">
                                <label
                                    htmlFor="genres"
                                    className="block mb-2 text-sm font-medium text-black dark:text-white"
                                >
                                    Genres (select up to 3 your resonate most with)
                                </label>
                                {genres?.map((genre) => (
                                    <div className="text-xs font-work-sans" key={genre}>
                                        {genre}{" "}
                                        <button role="button" onClick={() => removeGenre(genre)}>
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <select
                                multiple
                                className="  shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 relative"
                                id="genres"
                                name="genres"
                                value={genres || []}
                                onChange={handleGenreSelect}
                            >
                                <option value="" disabled>
                                    Select Genres
                                </option>
                                {allGenres.map((genre: any) => (
                                    <option key={genre} value={genre} className="accent-red-300">
                                        {genre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            placeholder=""
                            type="text"
                            id="twitter_url"
                            name="twitter_url"
                            value={formData.twitter_url}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                        />{" "}
                        <label
                            className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            htmlFor="website"
                        >
                            Twitter @
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            placeholder=""
                            type="text"
                            id="instagram_url"
                            name="instagram_url"
                            value={formData.instagram_url}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                        />{" "}
                        <label
                            className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            htmlFor="website"
                        >
                            Instagram @
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            placeholder=""
                            type="text"
                            id="playlist_url"
                            name="playlist_url"
                            value={formData.playlist_url}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                        />{" "}
                        <label
                            className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            htmlFor="website"
                        >
                            Playlist Link
                        </label>
                        <p
                            id="helper-text-explanation"
                            className="flex md:items-center space-x-2 mt-2 text-sm text-zinc-500 dark:text-zinc-400"
                        >
                            <FiAlertCircle className="mr-2 w-5" />
                            {`Please provide a public, Soundcloud, Dropbox, or Disco link. No other format will be accepted.`}
                        </p>
                    </div>
                    <div className="flex items-center pl-4 border border-zinc-200 rounded dark:border-zinc-700 mb-6 accent-red-300">
                        <input
                            type="checkbox"
                            name="syncInterest"
                            checked={formData.syncInterest}
                            onChange={handleChange}
                        />{" "}
                        <label
                            htmlFor="bordered-checkbox-1"
                            className="w-full py-4 ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-300"
                        >
                            Would you be interested in live reviews of your music in the
                            context of sync?
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-red-300 text-white p-2 rounded hover:bg-red-400"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default MusicianForm;
