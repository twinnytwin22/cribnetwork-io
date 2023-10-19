import Link from "next/link";
import React from "react";
import { FaRightLong } from "react-icons/fa6";
import Panel from "./Panel";

function LearningPanel({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <Panel title="Learning">
      {children}
      <div className="absolute bottom-8 left-8">
        {href && (
          <Link href={href}>
            <div className="flex items-center space-x-4 text-zinc-800 dark:text-zinc-300 ">
              <p className="text-center font-semibold hover:font-bold duration-300 ease-in-out">
                Go to Learning
              </p>
              <FaRightLong />
            </div>
          </Link>
        )}
      </div>
    </Panel>
  );
}

export default LearningPanel;
