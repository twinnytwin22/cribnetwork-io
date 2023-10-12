'use client'
import React from 'react';
import { useFormSubmissionTableStore } from './store';
import { useHandleOutsideClick } from '@/lib/hooks/handleOutsideClick';

const SubmissionPreview = () => {
  const { selectedSubmission: submission, previewOpen, setPreviewOpen, setSelectedSubmission } = useFormSubmissionTableStore();
  useHandleOutsideClick(previewOpen, setPreviewOpen, 'submission-preview')
  const handleClosePreview = () => {
    setSelectedSubmission(null);
    setPreviewOpen(false);
  };

  return (
    <div id='submission-preview' className="submission-preview fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-70 dark:bg-opacity-70 bg-white dark:bg-black">
      <div className="modal w-full max-w-3xl bg-white dark:bg-black max-h-2/3 overflow-y-scroll left-0 lg:left-32 relative rounded-lg text-black dark:text-white border border-zinc-200 dark:border-zinc-800 p-4 shadow-lg">
      <svg
                    onClick={handleClosePreview}
                    className="w-6 relative top-3 left-3 z-[99999] text-black dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">Submission</h2>
          <div>
            <p className="mb-2">
              <strong>Email:</strong> {submission?.email || '' }
            </p>
            <p className="mb-2">
              <strong>Form Type:</strong> {submission?.form_type|| '' }
            </p>
            <p className="mb-2">
              <strong>First Name:</strong> {submission?.first_name|| '' }
            </p>
            <p className="mb-2">
              <strong>Last Name:</strong> {submission?.last_name|| '' }
            </p>
            <p className="mb-2">
              <strong>Phone Number:</strong> {submission?.phone_number|| '' }
            </p>
            <p className="mb-2">
              <strong>Message:</strong> {submission?.message|| '' }
            </p>
          </div>
          {submission.form_questions?.map(({ question, response }, index) => (
            <div key={index} className="mt-4">
              <h2 className="text-lg font-semibold">Question {index + 1}:</h2>
              <p className="mb-2">{question}</p>
              <h2 className="text-lg font-semibold">Response {index + 1}:</h2>
              <p className="mb-2">{response}</p>
            </div>
          ))}
        </div>
       
      </div>
    </div>
  );
};

export default SubmissionPreview;
