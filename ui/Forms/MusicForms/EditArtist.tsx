"use client";
import { updateArtist } from "@/utils/db";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { ArtistTypes, useMusicFormStore } from "./store";

const EditArtistForm = ({ artists, id, songs }) => {
  const router = useRouter();
  const {
    artistData: formData,
    setArtistData: setFormData,
    status,
    setStatus,
    initialArtistState,
  } = useMusicFormStore();
  const currentArtist: ArtistTypes = artists.find(
    (artist: any) => artist.artist_id.toString() === id.toString(),
  );
  console.log(currentArtist);
  useEffect(() => {
    setStatus("loadingInitialState");
    setFormData(currentArtist);
    setStatus("ready");
  }, [currentArtist]);
  const handleChange = (e) => {
    const { value, name } = e.target;

    if (name === "genres") {
      console.log(name);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const artists: ArtistTypes = {
        artist_id: currentArtist.artist_id!!,
        artist_name: formData.artist_name, // Map the artist_name to the form input
        genres: formData.genres, // Map the genre to the form input
        biography: formData.biography, // Map the biography to the form input
        image_url: "",
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone, // You may add the contact_phone field to match the sample data
        social_media_links: null,
        discography: null,
      };
      // Assuming you have a function to post the artists data
      const res = await updateArtist({ updates: artists });

      // Simulate a successful response for demonstration
      //  const res = { ok: true };

      if (res?.ok) {
        setStatus("success");
        // store.setOpen(false)
        toast.success("Your message was sent successfully");
        router.refresh();
      }

      setFormData(initialArtistState);
    } catch (err) {
      setStatus("error");
      console.log("Error sending email. Please try again later.");
    }
  };

  return (
    <div className="w-full p-8 mx-auto z-[100] h-full isolate relative">
      <h1 className="text-2xl tracking-tight font-bold text-center text-black dark:text-white font-owners">
        Edit Artist
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full space-y-8 font-medium"
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm text-black dark:text-white"
          >
            Email
          </label>
          <input
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 required"
            type="email"
            id="email"
            name="contact_email"
            value={formData.contact_email || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="artist_name"
            className="block mb-2 text-sm text-black dark:text-white"
          >
            Artist Name
          </label>
          <input
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 required"
            type="text"
            id="artist_name"
            name="artist_name"
            value={formData.artist_name || ""}
            onChange={handleChange}
            //  required
          />
        </div>
        <div>
          <label
            htmlFor="genre"
            className="block mb-2 text-sm text-black dark:text-white"
          >
            Genres
          </label>
          <input
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 "
            type="text"
            id="genres"
            name="genres"
            value={formData.genres} // Clear the input value
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="genre"
            className="block mb-2 text-sm text-black dark:text-white"
          >
            Phone Number
          </label>
          <input
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 required"
            type="text"
            id="contact_phone"
            name="contact_phone"
            value={formData.contact_phone || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="biography"
            className="block mb-2 text-sm text-black dark:text-white"
          >
            Biography
          </label>
          <textarea
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border h-full dark:text-white border-zinc-300 dark:border-zinc-600 text-black text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring focus:border block w-full p-2.5 required"
            name="biography"
            id="biography"
            value={formData.biography || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="py-3 font-owners rounded px-5 text-xs tracking-wide md:text-sm font-semibold text-center text-black bg-red-300 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:scale-105"
          >
            Update
          </button>
        </div>
        {status === "error" && <p>Error sending email, please try again.</p>}
      </form>
    </div>
  );
};

export default EditArtistForm;
