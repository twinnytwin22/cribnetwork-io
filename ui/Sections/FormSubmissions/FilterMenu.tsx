import React from 'react'
import { useFormSubmissionTableStore } from './store';

function FilterMenu({ formTypes }) {
    const { 
        previewOpen, 
        setPreviewOpen, 
        setSelectedSubmission, 
        setFilteredSubmissions, 
        filteredSubmissions, 
        setFilterMenuOpen, 
        filterMenuOpen , 
        selectedFormTypes, 
        selectAll, 
        setSelectAll, 
        setSelectedFormTypes, 

    } = useFormSubmissionTableStore()

    const handleTypeChange = (type: string) => {
        if (selectedFormTypes.includes(type)) {
            setSelectedFormTypes(selectedFormTypes.filter((t) => t !== type));
        } else {
            setSelectedFormTypes([...selectedFormTypes, type]);
        }

        // Check if all options are selected
        setSelectAll(selectedFormTypes.length === formTypes.length);
    };


    const filterSubmissions = () => {
        // Filter the submissions based on the selected types
        const filtered = filteredSubmissions.filter((submission: any) =>
            selectedFormTypes.includes(submission.form_type)
        );

        setFilteredSubmissions(filtered);
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            // If all options are currently selected, unselect all.
            setSelectedFormTypes([]);
        } else {
            // If not all options are selected, select all.
            setSelectedFormTypes(formTypes.map(({ type }) => type));
        }

        // Toggle the "Select All" checkbox.
        setSelectAll(!selectAll);
    };
    return (
        <div id="filterDropdown" className="z-[60] absolute w-48 p-3 bg-white rounded-lg top-14 right-0 shadow dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <h6 className="mb-3 text-sm font-medium text-zinc-900 dark:text-white">Choose Type</h6>
            <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                <li className="flex items-center">
                    <input
                        id="selectAll"
                        type="checkbox"
                        checked={selectAll}
                        onChange={() => toggleSelectAll()}
                        className="w-4 h-4 bg-zinc-100 border-zinc-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-zinc-700 focus:ring-2 dark:bg-zinc-600 dark:border-zinc-500"
                    />
                    <label htmlFor="selectAll" className="ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">Select All</label>
                </li>
                {formTypes?.map(({ type }) => (
                    <li key={type} className="flex items-center">
                        <input
                            id={type}
                            type="checkbox"
                            checked={selectedFormTypes.includes(type)}
                            onChange={() => handleTypeChange(type)}
                            className="w-4 h-4 bg-zinc-100 border-zinc-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-zinc-700 focus:ring-2 dark:bg-zinc-600 dark:border-zinc-500" />
                        <label htmlFor={type} className="ml-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">{type}</label>
                    </li>
                ))}

            </ul>
            <button onClick={() => filterSubmissions()} className='text-xs p-1 px-2 rounded bg-red-300 hover:bg-red-400 ease-in-out duration-300 text-black '>Apply</button>
        </div>
    )
}

export default FilterMenu