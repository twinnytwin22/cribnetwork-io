"use client";
import supabaseLoader from "@/lib/providers/supabase/image-loader";
import { allGenres } from "@/lib/site/allGenres";
import { getArtistInquiryCookie } from "@/lib/site/cookies/cookie-getter";
import { setArtistInquiryCookie } from "@/lib/site/cookies/cookie-setter";
import { checkArtistInquirySubmission } from "@/utils/db";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsShare } from "react-icons/bs";
import {
  FaBell,
  FaCookie,
  FaDiscord,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa6";
import { FiAlertCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { SyncFormState, useSyncFormStore } from "./store";
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const MusicianForm: React.FC = () => {
  const router = useRouter();
  const { genres, initialState, step, cookieStatus, showShare } =
    useSyncFormStore();
  const [formData, setFormData] = useState<SyncFormState>(initialState);
  const setGenres = (genres) => useSyncFormStore.setState({ genres });
  const setStep = (step) => useSyncFormStore.setState({ step });
  const setShowShare = (state) =>
    useSyncFormStore.setState({ showShare: state });

  const { data: artistInquiryCookie, isLoading } = useQuery({
    queryKey: ["artistInquiryCookie"],
    queryFn: getArtistInquiryCookie,
    //  refetchOnMount: !!!showCookieConsentBar,
    // enabled: showCookieConsentBar!!
  });
  const resetData = () => {
    setStep(1);
    setFormData(initialState);
    setGenres([]);
  };
  useEffect(() => {
    resetData();
  }, []);

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
  const handleArtistEmailCheck = async () => {
    const email = formData.email!;

    if (!email.match(emailRegex)) {
      alert("Please provide a valid email");
      return;
    }
    try {
      const submitted = await checkArtistInquirySubmission(email);
      if (submitted) {
        await setArtistInquiryCookie(true);
        setStep(3);
      } else {
        setStep(2);
      }
    } catch (error) {
      throw error;
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updates = {
        ...formData,
        genres: genres,
        form_type: "Sync Artist Inquiry",
      };
      //  console.log(updates);

      const res = await fetch("/api/submissions/syncArtistInquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (res) {
        toast.success("Your submission has been sent");
        await setArtistInquiryCookie(true);
        setFormData(initialState);
        setGenres([]);
        //setStep(3)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setStep(3);
      router.refresh();
    }
  };

  const getInitialCookieStatus = () => {
    if (artistInquiryCookie === "submitted") {
      return true;
    }
    if (cookieStatus) {
      return true;
    }
    return false;
  };
  const hasCookie = getInitialCookieStatus();

  const renderStep1 = () => {
    return (
      <form className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-medium mb-4 font-owners">
          Enter Email to Get Started.
        </h1>
        <div className="relative z-0 w-full mb-6 group">
          <input
            required
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
        <button
          type="button"
          className="bg-red-300 text-black px-2.5 p-1 rounded hover:bg-red-400 text-sm font-semibold"
          onClick={handleArtistEmailCheck}
        >
          Next
        </button>
      </form>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-medium mb-4 font-owners">
          Musician Information Form
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              required
              placeholder=""
              type="text"
              id="artist_name"
              name="artist_name"
              value={formData.artist_name}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
            />
            <label
              className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              htmlFor="artist_name"
            >
              Name / Artist Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              disabled
              placeholder=""
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-zinc-700 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-zinc-200 dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
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
              id="twitter_hash"
              name="twitter_hash"
              value={formData.twitter_hash}
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
              id="instagram_hash"
              name="instagram_hash"
              value={formData.instagram_hash}
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
              required
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
              {`Please provide a public, Soundcloud, Dropbox, Disco, or Personal Sync Portfolio URL. Links from streaming sites other than Soundcloud will not be accepted. `}
            </p>
          </div>
          <div className="flex items-center pl-4 border border-zinc-200 rounded dark:border-zinc-700 mb-6 accent-red-300">
            <input
              type="checkbox"
              name="sync_interest"
              checked={formData.sync_interest}
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
            className="bg-red-300 text-black px-2.5 p-1 rounded hover:bg-red-400 text-sm font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    );
  };

  const renderStep3 = () => {
    const image = "/site_images/studio.jpg";

    const eventDates = [
     
      {
        date: "December 3, 2023",
      },
    ];

    return (
      <div>
        <div className="w-full max-w-xl mx-auto grid md:grid-cols-2 gap-4">
          <div>
            <div className="aspect-video rounded-t">
              <Image
                loader={supabaseLoader}
                src={image}
                className="aspect-video object-cover w-full h-full mx-auto rounded-t"
                alt="Crib Logo"
                width={345}
                height={300}
                priority
              />
            </div>
            <div className="border mx-auto border-zinc-300 dark:border-zinc-800 rounded-b  overflow-hidden relative bg-white dark:bg-black p-8">
              <h2 className="text-2xl text-center font-semibold text-zinc-800 dark:text-white mb-4">
                Sync Sunday
              </h2>
              <h3 className="text-center font-semibold">Upcoming Date:</h3>
              <p className="text-sm text-center mb-6"> {eventDates[0].date}</p>
              <div className="flex items-center justify-center mx-auto">
                <Link href={"https://lu.ma/event/evt-kPpL1DxtCQp624U"}>
                  <button className="bg-red-300 mx-auto text-black px-2.5 p-1 rounded hover:bg-red-400 text-sm font-semibold flex items-center space-x-2 duration-300 ease-in-out">
                    RSVP
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="border border-zinc-300 dark:border-zinc-800 rounded overflow-hidden relative bg-white dark:bg-black p-8">
              <div className="text-black dark:text-white my-2  flex items-center space-x-2 font-bold">
                {" "}
                Share with a friend.
                <BsShare
                  className="ml-4 hover:scale-125 duration-200 ease-in-out cursor-pointer"
                  onClick={() => setShowShare(true)}
                />
              </div>
              <div className="mb-4">
                <p className="text-zinc-800 dark:text-zinc-200 mb-4">
                  Sync Sunday is back. We'll be reviewing music live and
                  providing feedback in the context of sync.
                </p>
                <p className="text-zinc-700 dark:text-zinc-300 mb-2">
                  Event Dates:
                </p>
                <ul className="text-sm">
                  {eventDates.map((eventDate) => (
                    <li key={eventDate.date} className="mb-1">
                      <p className="flex items-center">
                        <span className="mr-2 text-zinc-800 dark:text-zinc-200">
                          <FaBell />
                        </span>
                        {eventDate.date}
                      </p>
                    </li>
                  ))}

                  {/* Add more dates as needed */}
                </ul>
              </div>
            </div>
            <div className="flex mx-auto items-center py-4 justify-center space-x-4 text-xl">
              <Link href={"https://x.com/cribmusicglobal"}>
                <FaTwitter />
              </Link>
              <Link href={"https://discord.com/invite/2kRJmu3RYS"}>
                <FaDiscord />
              </Link>
              <Link href={"https://www.instagram.com/cribmusicglobal/"}>
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
        {process.env.NODE_ENV === "development" && (
          <button
            className="bg-red-300 mx-auto text-black px-2.5 p-1 rounded hover:bg-red-400 text-sm font-semibold flex items-center space-x-2"
            type="button"
            onClick={() => setArtistInquiryCookie(false)}
          >
            {" "}
            <FaCookie />
            DELETE COOKIE
          </button>
        )}
      </div>
    );
  };

  return (
    <section className="w-full bg-white dark:bg-zinc-950 text-black dark:text-white font-work-sans py-16">
      <div className="px-4">
        {step === 1 && !hasCookie && renderStep1()}
        {step === 2 && !hasCookie && renderStep2()}
        {(step === 3 || hasCookie) && renderStep3()}
      </div>
    </section>
  );
};

export default MusicianForm;
