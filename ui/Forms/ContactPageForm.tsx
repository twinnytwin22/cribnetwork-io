"use client";
import { bookingUrl } from "@/lib/site/constants";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useContactButtonStore } from "../Buttons/ContactButton/contactButtonStore";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  const [status, setStatus] = useState("");
  const store = useContactButtonStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    store.setOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        store.setOpen(false);

        toast.success("Your message was sent successfully");
      }
      setFormData({
        email: "",
        subject: "",
        message: "",
        first_name: "",
        last_name: "",
        phone_number: "",
      });
    } catch (err) {
      setStatus("error");
      console.log("Error sending email. Please try again later.");
    }
  };

  return (
    <div className="w-full p-12 mx-auto max-w-screen-md z-[100] h-full  isolate relative">
      <h1 className=" text-5xl tracking-tight font-bold text-center text-black dark:text-white font-owners">
        Let's Chat!
      </h1>
      <p className="text-center -mt-2 mb-8 text-black dark:text-white ">
        or email us at info@cribnetwork.io
      </p>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full space-y-8 font-medium"
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm text-black dark:text-white"
          >
            Email mail
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

        <div className="flex space-x-3 mx-auto w-full">
          <div className="w-full">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
              First Name
            </label>
            <input
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 required"
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
              Last Name
            </label>
            <input
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 required"
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div className="w-full">
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
              Subject
            </label>
            <input
              className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring block w-full p-2.5 required"
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-sm text-black dark:text-white"
          >
            Phone Number
          </label>
          <input
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-black dark:text-white text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring  block w-full p-2.5 required"
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-black dark:text-white"
          >
            Your message
          </label>
          <textarea
            className="shadow-sm bg-zinc-100 dark:bg-zinc-800 border h-full dark:text-white border-zinc-300 dark:border-zinc-600 text-black text-sm rounded-sm focus:ring-red-300 focus:border-red-300 focus:ring focus:border block w-full p-2.5 required"
            name="message"
            id="message"
            value={formData.message}
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
            <button className="py-3 font-owners px-5 tracking-wide text-xs md:text-sm font-semibold text-center text-black bg-red-300 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:scale-105">
              Schedule a Call{" "}
            </button>
          </Link>
        </div>
        {status === "error" && <p>Error sending email, please try again.</p>}
      </form>
    </div>
  );
};

export default ContactForm;
