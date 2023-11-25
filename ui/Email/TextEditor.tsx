"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaFile, FaFolder, FaPaperPlane } from "react-icons/fa6";
import { GoLog } from "react-icons/go";
import { MdOutlineSaveAlt } from "react-icons/md";
import { Editor as TinyMCEEditor } from "tinymce";
import { LoadingContainer } from "../Sections/LoadingContainer";
import { log, saveToDB, setNewContent } from "./actions";
import useEditorContext from "./context";
import { FileDocumentProps, HTML } from "./lib";
import { useEditorStore } from "./store";

const Component: any = Editor;

export default function TextEditor() {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const router = useRouter();
  const {
    setSavedContent,
    title,
    setTitle,
    fileManagerOpen,
    setFileManagerOpen,
    setDocument,
    documents: existingDocs,
    updateTitle,
    mounted,
    editorProps,
    getEditorMenuProps,
    savedContent,
    isLoading
  } = useEditorContext();

  //console.log(savedContent);

  const editorMenuProps = getEditorMenuProps(editorRef);
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto ">
        <LoadingContainer/>
        </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto ">
      <div>
        {mounted && editorProps && (
          <div className=" grayscale">
            <div className="group py-2 ml-3">
              <input
                className="block py-1.5 px-0 w-72 text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer"
                name="title"
                id="title"
                type="text"
                value={title || ""}
                placeholder=""
                onChange={(e) => setTitle(e.target.value)}
                // onBlur={() => console.log('blur blur blur')}
              />
              <label
                className="peer-focus:font-medium absolute peer-focus:ml-3  text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                htmlFor="title"
              >
                Document Name
              </label>
            </div>
            <div className="flex relative">
              <EditorMenu {...editorMenuProps} />
              <div className="w-full will-change-auto">
                <Component
                  value={savedContent}
               //   initialValue={savedContent || ""}
                  onEditorChange={setSavedContent}
                  //tinymceScriptSrc="/tinymce/tinymce.min.js"
                  onInit={(evt: any, editor: TinyMCEEditor | null) =>
                    (editorRef.current = editor)
                  }
                  {...editorProps}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className=" ">
        <div className="flex gap-4 w-full py-4 px-2  overflow-x-scroll">
          {HTML.map((option: FileDocumentProps) => (
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
                value={option.title || ""}
                className="dark:text-black mx-auto font-work-sans text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"
                onClick={(e) =>
                  setNewContent(
                    e,
                    existingDocs,
                    editorRef,
                    setTitle,
                    setDocument,
                  )
                }
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
            <div className="flex flex-wrap items-center gap-4">
              {existingDocs?.map((doc: FileDocumentProps) => (
                <div className="relative p-4" key={doc.id}>
                  <button
                    value={doc.title || ""}
                    onClick={(e) =>
                      setNewContent(
                        e,
                        existingDocs,
                        editorRef,
                        setTitle,
                        setDocument,
                      )
                    }
                    className="text-sm relative"
                  >
                    <FaFile className="text-4xl w-14 " />
                    {doc?.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const EditorMenu = ({ editorRef, doc }: any) => {
  const router = useRouter();
  const {
    documents,
    setDocument,
    setTitle,
    setDocuments,
    title,
    savedContent,
    setFileManagerOpen,
    setSavedContent,
  } = useEditorStore();
  return (
    <div className="flex flex-col w-fit items-center space-y-4  px-4 font-extrabold  invert">
      <button
        className="dark:text-black font-work-sans text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded text-lg p-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"
        // onClick={() => setFileManagerOpen(true)}
      >
        <FaPaperPlane />
      </button>
      <button
        className="dark:text-black font-work-sans text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded text-lg p-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"
        onClick={() => setFileManagerOpen(true)}
      >
        <FaFolder />
      </button>
      <button
        disabled={!title}
        className="dark:text-black font-work-sans text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded text-lg p-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"
        onClick={(e) => {
          saveToDB(
            editorRef,
            savedContent,
            title ? title : doc.title,
            doc.id ? doc.id : null,
            setDocuments,
            setDocument,
            //router,
          );
          setNewContent(e, documents, editorRef, setTitle, setDocument);
        }}
        type="button"
      >
        <MdOutlineSaveAlt />
      </button>
      <button
        className="dark:text-black font-work-sans text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded text-lg p-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"
        onClick={() => log(editorRef, savedContent, setSavedContent)}
      >
        <GoLog />
        {/* Log editor content */}
      </button>
    </div>
  );
};
