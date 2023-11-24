"use client";
import { useAuthProvider } from "@/app/context/auth";
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
  const { userRole } = useAuthProvider();

  return (
    <React.Fragment>
      {userRole === "user" && (
        <Panel title="Learning">
          {children}
          <div className="absolute bottom-8 left-8">
            {href && (
              <Link href={href}>
                <div className="flex items-center space-x-4 text-zinc-800 dark:text-zinc-300 ">
                  <p className="text-center font-medium hover:font-bold duration-300 ease-in-out">
                    Go to Learning
                  </p>
                  <FaRightLong />
                </div>
              </Link>
            )}
          </div>
        </Panel>
      )}
    </React.Fragment>
  );
}

export default LearningPanel;
