import { getCookie } from "cookies-next";

export async function getCookieConsent() {
  const consentCookie = getCookie("cribConsentCookie");

  if (consentCookie === "accepted") {
    // Cookie exists, return its value
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(consentCookie);
      }, 500),
    );
  } else {
    return "false";
  }
}

export async function getArtistInquiryCookie() {
  const artistInquiryCookie = getCookie("artistInquiryCookie");

  if (artistInquiryCookie === "submitted") {
    // Cookie exists, return its value
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(artistInquiryCookie);
      }, 500),
    );
  } else {
    return "false";
  }
}
