"use client";
import { copyToClipboard } from "@/lib/hooks/copyToClipboard";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "next-share";
import { usePathname } from "next/navigation";
import {
  BsFacebook,
  BsLinkedin,
  BsTelegram,
  BsTwitter,
  BsWhatsapp,
} from "react-icons/bs";
function BlogSocialShare({ title }) {
  const path = usePathname();
  const shareUrl = "https://cribnetwork.io" + path;

  // console.log(shareUrl)
  const url = shareUrl;
  return (
    <div className="relative top-72 flex items-center justify-center min-w-full max-w-lg text-zinc-950 dark:text-white">
      <div className="bg-zinc-100 w-full p-4 rounded-xl dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-lg ">
        <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 py-3">
          <div className="flex items-center justify-center">
            <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
              Share
            </p>
          </div>
          <div className="bg-zinc-300 hover:bg-zinc-500 cursor-pointer hover:text-zinc-300 font-sans text-zinc-500 w-8 h-8 hidden items-center justify-center rounded-full">
            x
          </div>
        </div>

        <div className="my-4">
          <p className="text-sm">Share this link via</p>

          <div className="flex justify-around my-4">
            <div className="hover:text-white border hover:bg-[#1877f2] w-12 h-12 fill-[#1877f2] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-blue-500/50 cursor-pointer">
              <FacebookShareButton url={shareUrl}>
                <BsFacebook className=" hover:text-white" />
              </FacebookShareButton>
            </div>

            <div className="hover:text-white border hover:bg-[#1d9bf0] w-12 h-12 fill-[#1d9bf0] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer">
              <TwitterShareButton
                url={url}
                title={`Check out @djtwinnytwin's drop ${
                  !title ? "" : title
                } at:`}
                hashtags={["CribMusic,TheCrib"]}
              >
                <BsTwitter />
              </TwitterShareButton>
            </div>

            <div className="hover:text-white border hover:bg-blue-600 w-12 h-12 fill-blue-700 hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-blue-800 cursor-pointer">
              <LinkedinShareButton url={shareUrl}>
                <BsLinkedin />
              </LinkedinShareButton>
            </div>

            <div className="hover:text-white border hover:bg-[#25D366] w-12 h-12 fill-[#25D366] hover:fill-white border-green-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-green-500/50 cursor-pointer">
              <WhatsappShareButton url={shareUrl}>
                <BsWhatsapp />
              </WhatsappShareButton>
            </div>

            <div className="hover:text-white border hover:bg-[#229ED9] w-12 h-12 fill-[#229ED9] hover:fill-white border-sky-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer">
              <TelegramShareButton url={shareUrl}>
                <BsTelegram />
              </TelegramShareButton>
            </div>
          </div>

          <p className="text-sm">Or copy link</p>

          <div className="border-2 border-zinc-200 rounded dark:border-zinc-700 flex justify-between items-center mt-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-zinc-500 ml-2"
            >
              <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
              <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
            </svg>

            <input
              className="w-full outline-none bg-transparent"
              type="text"
              placeholder="link"
              value={shareUrl}
              readOnly
            />

            <button
              onClickCapture={() => copyToClipboard(shareUrl)}
              className="bg-red-300 text-black font-semibold rounded text-sm py-2 px-5 mr-2 hover:bg-red-400"
              onClick={() => {}}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogSocialShare;
