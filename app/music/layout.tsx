"use client";
import { useHandleOutsideClick } from "@/lib/hooks/handleOutsideClick";
import BlogSocialShare from "@/ui/Components/BlogSocialShare";
import { useSyncFormStore } from "@/ui/Sections/Music/store";
import React from "react";

function Layout({ children }) {
  const { showShare } = useSyncFormStore();
  //console.log(showShare)
  const setShowShare = (state) =>
    useSyncFormStore.setState({ showShare: state });
  useHandleOutsideClick(showShare, setShowShare, "share-crib-music");

  return (
    <div className="relative">
      {showShare && (
        <React.Fragment>
          <div className="fixed inset-0 bg-black opacity-50 w-screen h-screen z-50 "></div>
          <div className="fixed w-full max-w-lg right-0 left-0 mx-auto blog-button z-50 share-crib-music">
            <BlogSocialShare title={"Introducing Crib Music Global"} />
          </div>
        </React.Fragment>
      )}
      {children}
    </div>
  );
}

export default Layout;
