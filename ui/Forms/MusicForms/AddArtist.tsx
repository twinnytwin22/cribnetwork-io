import { bookingUrl } from "@/lib/site/constants";
import Link from "next/link";
import React, { FormEvent } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useContactButtonStore } from "@/ui/Buttons/ContactButton/contactButtonStore";
import { addMewArtist } from "@/utils/db";

const AddArtistForm = () => {
  const [formData, setFormData] = useState<any | null >({
    email: "",
    subject: "",
    message: "",
    artist_name: "", // New field: Artist Name
    genres: [], // New field: Genre
    biography: "",
    phone_number: '', // New field: Biography
  });
  const [status, setStatus] = useState("");
  const store = useContactButtonStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleGenreChange = (e) => {
    const value = e.target.value;
    if (value.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        genres: [...prevData.genres, value],
      }));
    }
  };
  
  const handleRemoveGenre = (index) => {
    setFormData((prevData) => {
      const updatedGenres = [...prevData.genres];
      updatedGenres.splice(index, 1);
      return {
        ...prevData,
        genres: updatedGenres,
      };
    });
  };
  
  const handleClose = () => {
    store.setOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const artists = [
        {
          artist_id: 1,
          artist_name: formData.artist_name, // Map the artist_name to the form input
          genres: formData.genres, // Map the genre to the form input
          biography: formData.biography, // Map the biography to the form input
          image_url: null,
          contact_email: formData.email,
          phone_number: formData.phone_number, // You may add the phone_number field to match the sample data
          social_media_links: null,
          discography: null,
        },
      ];

      // Assuming you have a function to post the artists data
      const res = await addMewArtist(artists);

      // Simulate a successful response for demonstration
    //  const res = { ok: true };

      if (res.ok) {
        setStatus("success");
        store.setOpen(false);
        toast.success("Your message was sent successfully");
      }

      setFormData({
        email: "",
        subject: "",
        message: "",
        artist_name: "",
        genres: [],
        biography: "",
        phone_number: "", // Include phone_number in the state
      });
    } catch (err) {
      setStatus("error");
      console.log("Error sending email. Please try again later.");
    }
  };

  return (
    <div className="w-full p-12 mx-auto z-[100] h-full isolate relative">
      <h1 className="text-5xl tracking-tight font-bold text-center text-black dark:text-white font-owners">
        Add New Artist
      </h1>
      <p className="text-center -mt-2 mb-8 text-black dark:text-white">
        or email us at info@cribnetwork.io
      </p>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full space-y-8 font-medium"
      >
        <div>
          <label htmlFor="email" className="block mb-2 text-sm text-black dark:text-white">
            Email
          </label>
          <input
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 required"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="artist_name" className="block mb-2 text-sm text-black dark:text-white">
            Artist Name
          </label>
          <input
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 required"
            type="text"
            id="artist_name"
            name="artist_name"
            value={formData.artist_name}
            onChange={handleChange}
          //  required
          />
        </div>
        <div>
  <label htmlFor="genre" className="block mb-2 text-sm text-black dark:text-white">
    Genres
  </label>
  <input
    className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 "
    type="text"
    id="genre"
    name="genre"
    value="" // Clear the input value
    onChange={handleGenreChange}
  />
  <div>
    {formData.genres.map((genre, index) => (
      <span key={index} className="inline-block bg-red-100 text-red-600 px-2 py-1 m-1 rounded-full">
        {genre}
        <button type="button" onClick={() => handleRemoveGenre(index)}>Remove</button>
      </span>
    ))}
  </div>
</div>






        <div>
          <label htmlFor="genre" className="block mb-2 text-sm text-black dark:text-white">
Phone Number          
</label>
          <input
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 required"
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="biography" className="block mb-2 text-sm text-black dark:text-white">
            Biography
          </label>
          <textarea
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border h-full dark:text-white border-zinc-300 dark:border-zinc-600 text-black text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring focus:border block w-full p-2.5 required"
            name="biography"
            id="biography"
            value={formData.biography}
            onChange={handleChange}
            required
          />
        </div>


        <div className="flex space-x-3">
          <button
            type="submit"
            className="py-3 font-owners px-5 text-xs tracking-wide md:text-sm font-semibold text-center text-black bg-red-300 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:scale-105"
          >
            Send message
          </button>
          <Link href={bookingUrl}>
            <button
              className="py-3 font-owners px-5 tracking-wide text-xs md:text-sm font-semibold text-center text-black bg-red-300 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:scale-105"
            >
              Schedule a Call
            </button>
          </Link>
        </div>
        {status === "error" && <p>Error sending email, please try again.</p>}
      </form>
    </div>
  );
};

export default AddArtistForm;
