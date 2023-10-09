import React from 'react'
import { FaSearch } from 'react-icons/fa'

export default function FormTableSearchBar() {
  return (
    <div className="w-full md:w-1/2">
    <form className="flex items-center">
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
             <FaSearch/>
            </div>
            <input type="text" id="simple-search" className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required/>
        </div>
    </form>
</div>  )
}
