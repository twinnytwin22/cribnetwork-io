'use client'
import React from 'react'
import { BsChevronCompactDown } from 'react-icons/bs'
import { FaDownLong, FaFilter } from 'react-icons/fa6'
import { useFormSubmissionTableStore } from './store'

function FormTableFilterButton() {
  const {
    // previewOpen,
    // setPreviewOpen,
    // setSelectedSubmission,
    setFilteredSubmissions,
    filteredSubmissions,
    setFilterMenuOpen,
    selectedFormTypes,
    filterMenuOpen
  } = useFormSubmissionTableStore()

  const handleShowFilterMenu = () => {
    if (filterMenuOpen) {
      setFilterMenuOpen(false)
      return
    } else {
      setFilterMenuOpen(true)
      return
    }

  }


  return (
    <button onClick={() => setFilterMenuOpen(!filterMenuOpen)} id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-zinc-900 focus:outline-none bg-white rounded-lg border border-zinc-200 hover:bg-zinc-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-zinc-200 dark:focus:ring-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-600 dark:hover:text-white dark:hover:bg-zinc-700 space-x-2" type="button">
      <FaFilter />
      <div className='p-0.5' />
      Filter
      <BsChevronCompactDown />
    </button>
  )
}

export default FormTableFilterButton