'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsChevronCompactDown } from 'react-icons/bs'
import { FaEye } from 'react-icons/fa6'
import SubmissionPreview from './SubmissionsPreview'
import { useFormSubmissionTableStore } from './store'

function FormSubmissionsTable({ data, tableHeaders }) {
    const { 
        previewOpen, 
        setPreviewOpen, 
        setSelectedSubmission, 
        setFilteredSubmissions, 
        filteredSubmissions, 
        setFilterMenuOpen, 
        filterMenuOpen 
    } = useFormSubmissionTableStore()
    const handleShowPreview = (submission: any) => {
        setSelectedSubmission(submission);
        setPreviewOpen(true);
      };

    
    useEffect(() => {
    setFilteredSubmissions(data)
    },[])
    
    
    return (
        <div>
        <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
            <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400">
                <tr>
                    {tableHeaders.map((header: any) => (
                        <th key={header} scope="col" className="px-4 py-3">{header}</th>))}
                    <th scope="col" className="px-4 py-3">
                        <span className="sr-only">View</span>
                    </th>
                    <th scope="col" className="px-4 py-3">
                        <span className="sr-only">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {filteredSubmissions?.map((submission: any) => (
                    <tr key={submission.id} className="">
                        <th scope="row" className="px-4 py-3 font-medium text-zinc-900 whitespace-nowrap dark:text-white">{submission.email}</th>
                        <td className="px-4 py-3">{submission.form_type}</td>
                        <td className="px-4 py-3">{submission?.company_name || "---"}</td>
                        <td className="px-4 py-3">{submission.first_name + submission.last_name}</td>
                        <td className="px-4 py-3">{submission.phone_number.toString()}</td>
                        <td className="px-4 py-3  items-center justify-end">
                            <button onClick={() => handleShowPreview(submission)} id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-zinc-500 hover:text-zinc-800 rounded-lg focus:outline-none dark:text-zinc-400 dark:hover:text-zinc-100" type="button">
                                <FaEye />

                            </button>
                            
                        </td>
                        <td className="px-4 py-3 flex items-center justify-end">
                            <button  id="submission-option-button" data-dropdown-toggle="submission-option" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-zinc-500 hover:text-zinc-800 rounded-lg focus:outline-none dark:text-zinc-400 dark:hover:text-zinc-100" type="button">
                                <BsChevronCompactDown />
                            </button>
                            <div id="submission-option" className="hidden z-10 w-44 bg-white rounded divide-y divide-zinc-100 shadow dark:bg-zinc-700 dark:divide-zinc-600">
                                <ul className="py-1 text-sm text-zinc-700 dark:text-zinc-200" aria-labelledby="submission-option-button">
                                    <li>
                                        <Link href="#" className="block py-2 px-4 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white">Show</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="block py-2 px-4 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white">Edit</Link>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <Link href="#" className="block py-2 px-4 text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:text-zinc-200 dark:hover:text-white">Delete</Link>
                                </div>
                            </div>
                        </td>
                    </tr>))}

            </tbody>
        </table>
            
        
        </div>
        )
}

export default FormSubmissionsTable

