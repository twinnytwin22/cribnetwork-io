"use client";
import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import { useQuery } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import { UseThemeProps } from "next-themes/dist/types";
import { useEffect, useRef, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaFile } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Editor as TinyMCEEditor } from "tinymce";
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
  const getExistingDocs = async () => {
    const { data } = await supabaseAdmin.from("email_templates").select();

    if (data) {
      return data;
    }
  };
  const { data: existingDocs } = useQuery({
    queryKey: ["data"],
    queryFn: () => getExistingDocs(),
    enabled: mounted,
  });

  // console.log(data, 'EXD')
  const saveToDB = async () => {
    try {
      if (savedContent && editorRef.current) {
        const { data, error } = await supabaseAdmin
          .from("email_templates")
          .upsert({
            html: savedContent, //editorRef.current.getContent()
          })
          .select()
          .single();
        if (data) {
          toast.success("File saved to db");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const forceRerender = async () => {
    setMounted(false);
    requestAnimationFrame(() => setMounted(true));
  };

  useEffect(() => setMounted(true), []);
  // console.log(currentTheme, editorProps)
  useEffect(() => {
    setEditorProps(getEditorProps(currentTheme!));
    forceRerender();
  }, [currentTheme!!, mounted, editorProps]);

  const log = () => {
    if (editorRef.current) {
      setSavedContent(editorRef.current.getContent());
      if (savedContent) {
        toast.success("Saved");
      }
    }
    // console.log(savedContent)
  };

  const setNewContent = (e) => {
    const { value } = e.target;
    if (value) {
    console.log(value, "VALUE");
    const option =  existingDocs!.find(({ title }) => title === value);//HTML.find(({ title }) => title === value) ||
    console.log(savedContent);
    // Reset the editor content with the new content
    if (editorRef.current) {
      editorRef.current.setContent(option?.element!);
    }
  }
  };
  if (!mounted) {
    return null;
  }


  return (
    <div className="max-w-5xl mx-auto ">
      <div>
        {mounted && (
          <div className=" grayscale">
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
            onClick={log}
          >
            Log editor content
          </button>
          <button
            className="dark:text-black font-work-sans text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"
            onClick={saveToDB}
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
                onClick={setNewContent}
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
                <button value={doc.title} onClick={setNewContent} className="text-sm">
                  <FaFile className="text-4xl w-14 "/>
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
