'use client'
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/site/constants';
import { useHandleOutsideClick } from '@/lib/hooks/handleOutsideClick';
import { useRouter } from 'next/navigation';
const SearchBar = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any>({
        courses: [],
    });
    const [isOpen, setIsOpen] = useState(false)
    const [isInputFocused, setIsInputFocused] = useState(false); // New state variable to track input focus
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // This function will be called whenever searchTerm or isInputFocused changes
        if ((searchTerm?.length >= 2) && searchInputRef?.current) {
            //  console.log('Search Active', searchResults, searchTerm);
            // Call the search function here
            search();
        } else {
            setSearchResults({ courses: [] });
            setIsOpen(true);
        }
    }, [searchTerm, isInputFocused]);

    const search = async () => {
        // Make a request to Supabase to search for courses, irl_events, and drops separately
        let { data: coursesData, error: coursesError } = await supabase
            .from('courses')
            .select('*')
            .ilike('title', `%${searchTerm}%`)
            .limit(10);

        if (coursesError) {
            console.error('Error searching:', coursesError );
            return;
        }
        setSearchResults({ courses: coursesData });
    };

    const handleInputFocus = () => {
        setIsOpen((prev) => prev.valueOf());
    };

    useHandleOutsideClick(isOpen, setIsOpen, 'search-results')

    const handleLink = (href: string) => {
        router.push(href)
        setSearchTerm('')
        setIsOpen(false)
    }

    return (
        <form className="flex items-center flex-grow relative" >
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-zinc-500 dark:text-zinc-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    autoComplete='off'
                    type="text"
                    className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-red-200 focus:border-red-300 block w-full pl-10 p-2.5 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-100 dark:focus:border-red-300"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                    onFocus={handleInputFocus} // Add onFocus and onBlur event handlers
                    //   onBlur={handleInputBlur}
                    ref={searchInputRef}
                />
            </div>
            <SearchButton />
            {isOpen &&
                <div className="absolute top-10 left-0 right-0 mt-6  bg-white max-h-[300px] overflow-y-scroll dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 shadow-2xl rounded-md z-[99990] shadow-zinc-300 dark:shadow-black search-results mx-auto">

                    {searchResults?.courses?.length > 0 && (
                        <div className='relative'>
                            <div className='p-1 pl-4 bg-zinc-100 dark:bg-black w-full text-black dark:text-white flex h-fit'>
                                <p className='text-sm font-bold'>Courses</p>
                            </div>
                            {searchResults.courses.map((course: any) => (
                                <div onClick={(() => handleLink(`/portal/learning/course/${course.id}`))} key={course.id} className="flex items-center p-2.5 border-b border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 relative z-[99999] cursor-pointer">
                                    
                                    <div>
                                        <div className="text-black dark:text-white font-medium">
                                            {course.title}
                                        </div>
                                  
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

              
                </div>}
        </form>
    );
};


const SearchButton = () => {
    return (
        <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-black bg-red-300 rounded-md border border-red-300 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-zinc-100 dark:bg-red-300 dark:hover:bg-red-300 dark:focus:ring-zinc-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span className="sr-only">Search</span>
        </button>
    );
};

export default SearchBar;
