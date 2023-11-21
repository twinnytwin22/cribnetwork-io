import React, { Suspense } from "react";

const Panel = ({
  children,
  title,
  span,
}: {
  children: React.ReactNode;
  title?: string;
  span?: string;
}) => {
  return (
    <Suspense fallback="loading...">
      <div
        className={` xl:col-span-2 p-4 bg-white dark:bg-black rounded w-full border border-zinc-200 dark:border-zinc-800 relative col-span-6 md:col-span-${
          span ? span : "3"
        }`}
      >
        <h1 className="text-xl font-bold text-black dark:text-white text-center">
          {title}
        </h1>
        {children}
      </div>
    </Suspense>
  );
};

export default Panel;
