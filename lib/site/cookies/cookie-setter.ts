import { deleteCookie, setCookie } from "cookies-next";

export async function setCookieConsent(consent: boolean) {
  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = oneDay * 7;
  const expires = Date.now() - oneDay;

  if (consent) {
    setCookie("cribConsentCookie", "accepted", { maxAge: oneWeek });
    return true;
    //  console.log(cookie.get('cribConsentCookie'))
  } else {
    deleteCookie("cribConsentCookie");
    return false;
  }
  // return getCookie('cribConsentCookie')
}

export async function setArtistInquiryCookie(submitted: boolean) {
  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = oneDay * 7;
  const oneYear = oneDay * 365;
  const expires = Date.now() - oneDay;

  if (submitted) {
    setCookie("artistInquiryCookie", "submitted", { maxAge: oneYear });
    return true;
    //  console.log(cookie.get('cribConsentCookie'))
  } else {
    deleteCookie("artistInquiryCookie");
    return false;
  }
  // return getCookie('cribConsentCookie')
}
