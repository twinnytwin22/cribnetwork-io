"use client";
import { useHandleOutsideClick } from "@/lib/hooks/handleOutsideClick";
import { createFormType } from "@/lib/providers/supabase/supabase-server";
import React from "react";
import FilterMenu from "./FilterMenu";
import SubmissionPreview from "./SubmissionsPreview";
import { useFormSubmissionTableStore } from "./store";

function FormSubmissionsWrapper({
  children,
  formTypes,
}: {
  children: React.ReactNode;
  formTypes: any;
}) {
  const {
    previewOpen,
    selectAll,
    setSelectAll,
    setPreviewOpen,
    setSelectedSubmission,
    selectedFormTypes,
    setSelectedFormTypes,
    setFilteredSubmissions,
    filteredSubmissions,
    setFilterMenuOpen,
    filterMenuOpen,
    newFormType,
    setNewFormType,
    formTypeInputOpen,
    setFormTypeInputOpen,
  } = useFormSubmissionTableStore();

  const handleCreateFormType = async () => {
    const createdType = await createFormType(newFormType);
    if (createdType) {
      console.log(createdType);
      setFormTypeInputOpen(false);
      setNewFormType("");
    }
  };

  useHandleOutsideClick(
    formTypeInputOpen,
    setFormTypeInputOpen,
    "form-type-input",
  );
  const triggersOpen = formTypeInputOpen || filterMenuOpen || previewOpen;
  return (
    <div className="relative">
      {triggersOpen && (
        <div
          id="submission-preview"
          className="submission-preview fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-70 dark:bg-opacity-70 bg-white dark:bg-black"
        >
          <div className="modal space-y-4 w-full max-w-3xl bg-white dark:bg-black max-h-2/3  -top-12 left-0 lg:left-32 relative rounded-lg text-black dark:text-white border border-zinc-200 dark:border-zinc-800 p-4 shadow-lg">
            {previewOpen && <SubmissionPreview />}
            {formTypeInputOpen && (
              <div className="space-y-4">
                <input
                  className="bg-zinc-50 border border-zinc-300 form-type-input text-zinc-900 text-sm rounded-lg focus:ring-red-300 focus:border-red-300 block w-full  p-2 dark:bg-zinc-950 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-red-300 dark:focus:border-red-300"
                  placeholder="Add new form type..."
                  required
                  autoComplete="off"
                  value={newFormType}
                  onChange={(e) => setNewFormType(e.target.value)}
                  type="text"
                />
                <button
                  className="text-xs p-1 px-2 rounded bg-red-300 hover:bg-red-400 ease-in-out duration-300 text-black "
                  onClick={handleCreateFormType}
                >
                  Create
                </button>
              </div>
            )}
            {filterMenuOpen && <FilterMenu formTypes={formTypes} />}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export default FormSubmissionsWrapper;
