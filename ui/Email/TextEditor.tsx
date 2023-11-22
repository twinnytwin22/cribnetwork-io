"use client";
import { useQuery } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import { UseThemeProps } from "next-themes/dist/types";
import { useEffect, useRef, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaFile } from "react-icons/fa6";
import { Editor as TinyMCEEditor } from "tinymce";
import { forceRerender, getExistingDocs, log, saveToDB, setNewContent } from "./actions";
import { HTML, getEditorProps } from "./lib";
import { useEditorStore } from "./store";

const Component: any = Editor;

export default function TextEditor() {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const { theme, systemTheme }: UseThemeProps = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = useState<boolean>(false);
  const { savedContent, setSavedContent } = useEditorStore();
  const [editorProps, setEditorProps] = useState<any>({});
  const [fileManagerOpen, setFileManagerOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  const { data: existingDocs } = useQuery({
    queryKey: ["data"],
    queryFn: () => getExistingDocs(),
    enabled: mounted,
  });

  useEffect(() => {
    setEditorProps(getEditorProps(currentTheme!));
    forceRerender(setMounted);
  }, [currentTheme!!, mounted, editorProps]);


  if (!mounted) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto ">
      <div>
        {mounted && (
          <div className=" grayscale">
            <div className="group py-2">
              <input
                className="block py-1.5 px-0 w-72 text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                name="title"
                id="title"
                type="text"
              />
              <label
                className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                htmlFor="title"
              >
                Document Name
              </label>
            </div>
            <Component
              onEditorChange={setSavedContent}
              //tinymceScriptSrc="/tinymce/tinymce.min.js"
              onInit={(evt, editor) => (editorRef.current = editor)}
              {...editorProps}
            />
          </div>
        )}
        <div className="flex items-center space-x-4 justify-center mx-auto py-4">
          <button
            className="dark:text-black font-work-sans text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"
            onClick={() => log(editorRef, savedContent, setSavedContent)}
          >
            Log editor content
          </button>
          <button
            className="dark:text-black font-work-sans text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"
            onClick={() => saveToDB(editorRef, savedContent)}
            //name="submitbtn"
            type="button"
          >
            Save
          </button>
          <button
            className="dark:text-black font-work-sans text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"
            onClick={() => setFileManagerOpen(true)}
          >
            Open File Manager
          </button>
        </div>
      </div>
      <div className=" ">
        <div className="flex gap-4 w-full py-4 px-2  overflow-x-scroll">
          {HTML.map((option) => (
            <div
              className=" min-w-[350px]  p-6 bg-white border border-zinc-200 rounded-md shadow dark:bg-black dark:border-zinc-700 hover:ring-2 hover:ring-red-300 focus:ring-2 focus:ring-green-700 focus:outline-none"
              key={option.title}
            >
              <h2 className="font-owners font-medium tracking-wide ">
                {" "}
                {option.title}
              </h2>
              <p className="text-sm py-2">{option?.description}</p>
              <button
                value={option.title}
                className="dark:text-black mx-auto font-work-sans text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"
                onClick={(e) =>setNewContent(e, existingDocs, editorRef)}
              >
                Use
              </button>
            </div>
          ))}
        </div>
      </div>
      {fileManagerOpen && (
        <div className="file-manager fixed top-0 left-0 md:left-12 lg:left-24 right-0 w-full h-full flex justify-center items-center z-50 bg-opacity-50 bg-black mr-2 border border-zinc-200 dark:border-zinc-800  ">
          <div className="bg-black rounded h-1/2 w-1/2 border dark:border-zinc-800 border-zinc-300 p-2.5">
            <div className="block" onClick={() => setFileManagerOpen(false)}>
              <FaWindowClose />
            </div>
            {existingDocs?.map((doc) => (
              <div className="relative p-4" key={doc.id}>
                <button
                  value={doc.title}
                  onClick={(e) => setNewContent(e, existingDocs, editorRef)}
                  className="text-sm relative"
                >
                  <FaFile className="text-4xl w-14 " />
                  {doc?.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}