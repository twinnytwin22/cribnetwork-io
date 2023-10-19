"use client";
import { useHandleOutsideClick } from "@/lib/hooks/handleOutsideClick";
import { useFormSubmissionTableStore } from "./store";

const SubmissionPreview = () => {
  const {
    selectedSubmission: submission,
    previewOpen,
    setPreviewOpen,
    setSelectedSubmission,
  } = useFormSubmissionTableStore();
  useHandleOutsideClick(previewOpen, setPreviewOpen, "submission-preview");
  const handleClosePreview = () => {
    setSelectedSubmission(null);
    setPreviewOpen(false);
  };

  return (
    <div className=" z-[60]  w-full p-3 rounded-lg top-14 right-0 ">
      <div className="">
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Submission
          </h2>
          <div>
            <p className="mb-2">
              <strong>Email:</strong> {submission?.email || ""}
            </p>
            <p className="mb-2">
              <strong>Form Type:</strong> {submission?.form_type || ""}
            </p>
            <p className="mb-2">
              <strong>First Name:</strong> {submission?.first_name || ""}
            </p>
            <p className="mb-2">
              <strong>Last Name:</strong> {submission?.last_name || ""}
            </p>
            <p className="mb-2">
              <strong>Phone Number:</strong> {submission?.phone_number || ""}
            </p>
            <p className="mb-2">
              <strong>Message:</strong> {submission?.message || ""}
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
