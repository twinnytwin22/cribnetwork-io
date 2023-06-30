import React from 'react'

function ContactDrawer() {
    return (
        <div id="" className="fixed top-0 left-0 z-[999999] h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800" >

            <form action="#" className="mb-6 relative">
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                    <input type="text" id="subject" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Let us know how we can help you" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                    <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block">Send message</button>
            </form>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <a href="#" className="hover:underline">info@company.com</a>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                <a href="#" className="hover:underline">212-456-7890</a>
            </p>
        </div>

    )
}

export default ContactDrawer