'use client'
import { supabaseAdmin } from '@/lib/providers/supabase/supabase-lib-admin';
import { supabase } from '@/lib/site/constants';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useFormSubmissionTableStore } from './store';

export default function FormTableSearchBar() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const {
        setFilteredSubmissions, 
        filteredSubmissions, 
        selectedFormTypes, 
        selectAll, 
        setSelectAll, 
        setSelectedFormTypes, 
    } = useFormSubmissionTableStore()
    const search = async (searchTerm: string) => {
        try {
            // Make a request to Supabase to search for form submissions
            const { data, error } = await supabaseAdmin
                .from('form_submissions')
                .select('*')
                .ilike('email', `%${searchTerm}%`)

                //.textSearch('submission_search', searchTerm)
                //.limit(10);
            console.log(data, "SUPABASE DATA")
            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Error searching:', error);
            throw error;
        }
    };

    const { data, isLoading } = useQuery({
        queryKey: ['data', searchTerm],
        queryFn: () => search(searchTerm),
        enabled: Boolean(searchTerm), 
        onSuccess: (data) => {
            setFilteredSubmissions(data)
        }
    })

    console.log(data, "DATA")
    return (
        <div className="w-full md:w-1/2 relative">
            <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaSearch />
                    </div>
                    <input
                        autoComplete='off'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        id="simple-search"
                        className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full pl-10 p-2 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-red-300 dark:focus:border-red-300" placeholder="Search by email..." required />
                         <div className="absolute top-10 left-0 right-0 mt-6  bg-white max-h-[300px] overflow-y-scroll dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 shadow-2xl rounded-md z-[99990] shadow-zinc-300 dark:shadow-black search-results mx-auto">
                    {/* {data && data?.length > 0 && (
                        <div className='relative'>
                            <div className='p-1 pl-4 bg-zinc-100 dark:bg-black w-full text-black dark:text-white flex h-fit'>
                                <p className='text-sm font-bold'>Result</p>
                            </div>
                            {data.map((result: any) => (
                                <div  key={result.id} className="flex items-center p-2.5 border-b border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 relative z-[99999] cursor-pointer">                                  
                                    <div>
                                        <div className="text-black dark:text-white font-medium">
                                            {result.email}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}   */}
                </div>
                </div>
            </form>
        </div>)
}
