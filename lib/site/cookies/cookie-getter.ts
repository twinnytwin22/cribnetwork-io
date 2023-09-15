import { getCookie } from "cookies-next";

export async function getCookieConsent() {
  const consentCookie = getCookie('cribConsentCookie');
  
  if (consentCookie === 'accepted') {
    // Cookie exists, return its value
    return consentCookie;
  } else {
    // Cookie doesn't exist, handle accordingly (e.g., return a default value or handle the absence)
    // For example, you can return "false" to indicate no consent by default
    return 'false';
  }
}
