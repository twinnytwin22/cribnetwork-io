'use client'
import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import ContactForm from "../Sections/ContactPageForm";

const ContactModal = ({ handleClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center mx-8">
      <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="bg-zinc-50 dark:bg-black relative">
        <svg
          onClick={handleClose}
          className="w-6 absolute top-3 left-3"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <ContactForm handleClose={handleClose} />
      </div>
    </div>
  );
};

const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="">
      <button
        type="button"
        onClick={handleOpenModal}
        className="dark:text-black text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-sm text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"
      >
        Let's Chat
      </button>
      <AnimatePresence>
        {isOpen && <ContactModal handleClose={handleCloseModal} />}
      </AnimatePresence>
    </div>
  );
};

export default ContactButton;
