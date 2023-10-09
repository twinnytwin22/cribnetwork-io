'use client'
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify';

function BuildGrantForm() {

    const initialState = {
        email: "",
        subject: "",
        message: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        website: '',
        company_name: '',
        linkedin_profile: '',
    }
    const [formData, setFormData] = useState(initialState);
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updates = {
                ...formData,
                form_type: 'Build Grant', 
                subject: 'Build Grant'
            }
            const res = await fetch("/api/submissions/general", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            });
            if (res.ok) {
                setStatus("success");
                toast.success("Your message was sent successfully");
            }
            setFormData(initialState);
        } catch (err) {
            setStatus("error");
            console.log("Error sending email. Please try again later.");
        }
    };
    return (
        <form onSubmit={((e) => handleSubmit(e))} className=' w-full mx-auto'>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        value={formData.first_name}
                        onChange={handleChange}
                        type="text" name="first_name" id="first_name" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                    <label htmlFor="first_name" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        value={formData.last_name}
                        onChange={handleChange}
                        type="text" name="last_name" id="last_name" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                    <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                </div>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input
                    value={formData.email}
                    onChange={handleChange}
                    type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input
                    value={formData.website}
                    onChange={handleChange}
                    type="url" name="website" id="website" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                <label htmlFor="website" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your website URL</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input
                    value={formData.linkedin_profile}
                    onChange={handleChange}
                    type="url" name="linkedin_profile" id="linkedin_profile" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                <label htmlFor="linkedin_profile" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">LinkedIn Profile</label>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        value={formData.phone_number}
                        onChange={handleChange}
                        type="tel"  name="phone_number" id="phone_number" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                    <label htmlFor="phone_number" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        value={formData.company_name}
                        onChange={handleChange}
                        type="text" name="company_name" id="company_name" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                    <label htmlFor="company_name" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
                </div>
            </div>
            <button type="submit" className="text-black bg-red-400 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-300 dark:hover:bg-red-400 dark:focus:ring-red-400">Submit</button>
        </form>)
}

export default BuildGrantForm