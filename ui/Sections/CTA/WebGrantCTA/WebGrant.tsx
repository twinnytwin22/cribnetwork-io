import { getSiteImage } from "@/utils/use-server";
import Image from "next/image";
import Link from "next/link";

function WebGrant() {
  return (
    <div className="bg-zinc-300 dark:bg-zinc-600 text-black dark:text-white relative">
      <Image
        //priority
        src={getSiteImage("/all-together.png")}
        alt="Background"
        fill
        quality={75}
        className="z-0 contrast-125 brightness-125 object-cover transform"
      />
      <div className="absolute inset-0 bg-black opacity-75 "></div>

      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 relative">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-white">
            Learn about our Small Business Build Grant
          </h2>
          <p className="mb-6 font-light text-zinc-300 md:text-lg">
            Each quarter one small business is chosen to receive free web
            services.
          </p>
          <Link
            href="/small-business/opportunities/build-grant"
            className="text-black bg-red-300 font-bold hover:bg-red-200 focus:ring-4 focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none focus:ring-red-400"
          >
            Apply.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WebGrant;
