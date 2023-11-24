import Link from "next/link";
import React from "react";
import { FaRightLong } from "react-icons/fa6";
import Panel from "./Panel";

function MusiciansPanel({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <Panel title="Music">
      {children}
      <div className="absolute bottom-8 left-8 w-full right-0">
        {href && (
          <Link href={href}>
            <div className="flex items-center space-x-4 text-zinc-800 dark:text-zinc-300 ">
              <p className="text-center font-medium hover:font-bold duration-300 ease-in-out">
                Go to Music
              </p>
              <FaRightLong />
            </div>
          </Link>
        )}
      </div>
    </Panel>
  );
}

export default MusiciansPanel;
