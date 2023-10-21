"use client";
import Link from "next/link";
import { useEffect } from "react";
import AddFormType from "./AddFormType";
import FormSubmissionsTable from "./FormSubmissionsTable";
import FormSubmissionsTablePagination from "./FormSubmissionsTablePagination";
import FormTableFilterButton from "./FormTableFilterButton";
import FormTableSearchBar from "./FormTableSearchBar";
import { useFormSubmissionTableStore } from "./store";

function FormSubmissions({ data, formTableProps, formTypes }) {
  const {
  
    setSelectedFormTypes,
  
  } = useFormSubmissionTableStore();

  useEffect(() => {
    setSelectedFormTypes(formTypes);
  }, []);

  const formProps = {
    formTypes,
  };

  return (
    <div className="relative">
      <div className="bg-white dark:bg-black relative shadow-md sm:rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <FormTableSearchBar />
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <AddFormType />
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button
              
                id="actionsDropdownButton"
                data-dropdown-toggle="actionsDropdown"
                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-zinc-900 focus:outline-none bg-white rounded-lg border border-zinc-200 hover:bg-zinc-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-zinc-200 dark:focus:ring-zinc-700 dark:bg-zinc-950 dark:text-zinc-400 dark:border-zinc-600 dark:hover:text-white dark:hover:bg-zinc-700"
                type="button"
              >
                <svg
                  className="-ml-1 mr-1.5 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
                Actions
              </button>
              <div
                id="actionsDropdown"
                className="hidden z-10 w-44 bg-white rounded divide-y divide-zinc-100 shadow dark:bg-zinc-950 dark:divide-zinc-600"
              >
                <ul
                  className="py-1 text-sm text-zinc-700 dark:text-zinc-200"
                  aria-labelledby="actionsDropdownButton"
                >
                  <li>
                    <Link
                      href="#"
                      className="block py-2 px-4 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white"
                    >
                      Mass Edit
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <Link
                    href="#"
                    className="block py-2 px-4 text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:text-zinc-200 dark:hover:text-white"
                  >
                    Delete all
                  </Link>
                </div>
              </div>
              <FormTableFilterButton />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <FormSubmissionsTable {...formTableProps} />
        </div>
        <nav
          className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-1 p-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
            Showing
            <span className="font-semibold text-zinc-900 dark:text-white">
              1-{data?.length}
            </span>
            of
            <span className="font-semibold text-zinc-900 dark:text-white">
              {data?.length}
            </span>
          </span>
          <FormSubmissionsTablePagination />
        </nav>
      </div>
    </div>
  );
}

export default FormSubmissions;
