"use client";
import { ContactModal } from "../../Sections/ContactModal/ContactModal";
import { useContactButtonStore } from "./contactButtonStore";

const ContactButton = () => {
  const isOpen = useContactButtonStore((state: any) => state.isOpen);
  const setOpen = useContactButtonStore((state: any) => state.setOpen);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <button
        type="button"
        onClick={handleOpenModal}
        className="dark:text-black font-work-sans text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"
      >
        Let's Chat
      </button>
      {isOpen && <ContactModal handleClose={handleCloseModal} />}
    </div>
  );
};

export default ContactButton;
