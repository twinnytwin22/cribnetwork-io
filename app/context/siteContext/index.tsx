"use client";
import { getCookieConsent } from "@/lib/site/cookies/cookie-getter";
import { setCookieConsent } from "@/lib/site/cookies/cookie-setter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";
import { MdCancel } from "react-icons/md";

export const SiteContext = createContext({});
export const useSiteContext = () => useContext(SiteContext);

function SiteContextProvider({ children }: { children: React.ReactNode }) {
  const [cookieConsentStatus, setCookieConsentStatus] = useState(false);
  const cookieMessage = `We use our own cookies as well as third-party cookies on our websites to enhance your experience, analyze our traffic, and for security and marketing. Select "Accept All" to allow them to be used. Read our Cookie Policy.`;

  const qc = useQueryClient();
  const { data: cookieConsent, isLoading } = useQuery({
    queryKey: ["cookieConsent"],
    queryFn: getCookieConsent,
    //  refetchOnMount: !!!showCookieConsentBar,
    // enabled: showCookieConsentBar!!
  });

  const handleCloseCookieBar = () => {
    setCookieConsentStatus(true);
  };

  const handleAcceptCookies = async () => {
    acceptCookiesMutation.mutate(true);
    handleCloseCookieBar();
  };

  const handleBlockCookies = async () => {
    blockCookiesMutation.mutate(false);
    handleCloseCookieBar();
  };
  const acceptCookiesMutation = useMutation({
    mutationFn: setCookieConsent,
    onSuccess: () => {
      // Invalidate the query to trigger a refresh of the cookieConsent data
      qc.invalidateQueries({ queryKey: ["cookieConsent"] });
    },
  });

  // Mutation for blocking cookies
  const blockCookiesMutation = useMutation({
    mutationFn: setCookieConsent,
    onSuccess: () => {
      // Invalidate the query to trigger a refresh of the cookieConsent data
      qc.invalidateQueries({ queryKey: ["cookieConsent"] });
    },
  });
  if (isLoading) {
    return null; // or loading indicator
  }

  // console.log(cookieConsent)

  const value = {
    cookieConsentStatus,
    handleCloseCookieBar,
    handleAcceptCookies,
    handleBlockCookies,
    cookieConsent,
  };
  // const options = 'accepted' || 'declined'

  const getInitialConsentStatus = () => {
    if (cookieConsent === "accepted") {
      return true;
    }
    if (cookieConsentStatus) {
      return true;
    }
    return false;
  };

  const initialConsentStatus = getInitialConsentStatus();
  return (
    <SiteContext.Provider value={value}>
      {children}
      <React.Fragment>
        {!initialConsentStatus && !isLoading && (
          <div className="fixed bottom-0 bg-black w-screen py-8 p-4 z-50 text-white">
            <div
              onClick={handleCloseCookieBar}
              className="mx-8 text-red-300 text-2xl hover:scale-110 duration-200 ease-in-out cursor-pointer md:hidden block"
            >
              <MdCancel />
            </div>
            <div className="md:flex items-center justify-between max-w-screen-2xl w-full mx-auto relative">
              <p className=" md:w-1/2 text-sm p-2.5 md:p-0 text-center md:text-left">
                {cookieMessage}
              </p>
              <div className="flex space-x-4 mx-auto justify-around font-owners text-sm font-medium ">
                <button className="hover:text-red-300 hidden">
                  Manage Settings
                </button>
                <button
                  onClick={handleBlockCookies}
                  className=" font-owners text-white bg-zinc-900 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-sm text-sm px-4 py-2 text-center mr-3 md:mr-0  ease-in-out duration-300"
                >
                  Block all cookies
                </button>
                <button
                  onClick={handleAcceptCookies}
                  className=" font-owners text-white bg-zinc-900 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-sm text-sm px-4 py-2 text-center mr-3 md:mr-0  ease-in-out duration-300"
                >
                  Accept All
                </button>
              </div>
              <div
                onClick={handleCloseCookieBar}
                className="mx-8 text-red-300 text-2xl hover:scale-110 duration-200 ease-in-out cursor-pointer hidden md:block"
              >
                <MdCancel />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    </SiteContext.Provider>
  );
}

export default SiteContextProvider;
