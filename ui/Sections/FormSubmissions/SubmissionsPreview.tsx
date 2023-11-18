"use client";
import { convertDatetime } from "@/lib/hooks/convertDatetime";
import { useHandleOutsideClick } from "@/lib/hooks/handleOutsideClick";
import Link from "next/link";
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

  function createTwitterProfileLink(handle, platform) {
    // Remove the '@' symbol if it's included in the handle
    const handleWithoutAt = handle.startsWith("@")
      ? handle.substring(1)
      : handle;

    // Construct the Twitter profile URL
    const twitterProfileLink = `https://${platform}.com/${handleWithoutAt}`;

    return twitterProfileLink;
  }
  const profileLink = (handle: string, platform: string) =>
    createTwitterProfileLink(handle, platform);

  const dateCreated = convertDatetime(submission.created_at)?.supaDate;
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
              <strong>Date Created:</strong> {dateCreated || ""}
            </p>
            {submission?.first_name && (
              <p className="mb-2">
                <strong>First Name:</strong> {submission?.first_name || ""}
              </p>
            )}
            {submission?.last_name && (
              <p className="mb-2">
                <strong>Last Name:</strong> {submission?.last_name || ""}
              </p>
            )}
            {submission?.artist_name && (
              <p className="mb-2">
                <strong>Artist Name / Name:</strong>{" "}
                {submission?.artist_name || ""}
              </p>
            )}
            {submission?.genres && submission?.genres.length > 0 && (
              <p className="mb-2">
                <strong>Genres:</strong> {submission?.genres.toString() || ""}
              </p>
            )}
            {submission?.playlist_url && (
              <p className="mb-2">
                <strong>Playlist URL:</strong>{" "}
                <Link className="underline" href={submission.playlist_url}>
                  {submission?.playlist_url || ""}
                </Link>
              </p>
            )}
            {submission?.phone_number && (
              <p className="mb-2">
                <strong>Phone Number:</strong> {submission?.phone_number || ""}
              </p>
            )}
            {submission?.instagram_hash && (
              <p className="mb-2">
                <strong>Instagram URL:</strong>{" "}
                <Link
                  className="underline"
                  href={profileLink(submission.instagram_hash, "instagram")}
                >
                  {" "}
                  {submission?.instagram_hash || ""}
                </Link>
              </p>
            )}
            {submission?.twitter_hash && (
              <p className="mb-2">
                <strong>Twitter URL:</strong>{" "}
                <Link
                  className="underline"
                  href={profileLink(submission.twitter_hash, "twitter")}
                >
                  {" "}
                  {submission?.twitter_hash || ""}
                </Link>
              </p>
            )}
            {submission?.message && (
              <p className="mb-2">
                <strong>Message:</strong> {submission?.message || ""}
              </p>
            )}
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
