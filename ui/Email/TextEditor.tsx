"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
import { LoadingContainer } from "../Sections/LoadingContainer";
import { getEditorProps } from "./lib";

const Component: any = Editor;

export default function TextEditor() {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = useState(false);
  const [savedContent, setSavedContent] = useState<any>(null)
  const router = useRouter();

  const [editorProps, setEditorProps] = useState<any>(null);
  function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(milliseconds); // Resolving the promise after the specified delay
      }, milliseconds);
    });
  }
  const forceRerender = async () => {
    setMounted(false);
    requestAnimationFrame(() => setMounted(true));
  };

  useEffect(() => 
    setMounted(true)
  , []);
  // console.log(currentTheme, editorProps)
  useEffect(() => {
    setEditorProps(getEditorProps(currentTheme!));
    forceRerender();

 
  }, [currentTheme!!,mounted, editorProps]);

  const log = () => {
    if (editorRef.current) {
      setSavedContent(editorRef.current.getContent());
    }
  };

  const setNewContent = () => {
    // Reset the editor content with the new content
    if (editorRef.current) {
      editorRef.current.setContent(HTML[0].element);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {!mounted && <LoadingContainer />}
      {mounted && (
        <Component
       
          onInit={(evt, editor) => (editorRef.current = editor)}
          {...editorProps}
        />
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
          onClick={setNewContent}
        >
          Set New Content
        </button>
      </div>
    </div>
  );
}

// ... (rest of the code remains unchanged)
const HTML = [
  {
    element: `
        <p class="p3">XXXX,</p>
        <p class="p3">I hope this reaches you well, and your week is off to a great start. My name is XXXX,, and I&rsquo;m am a composer / songwriter that specializes in XXXGENREXXXX music. I&rsquo;m reaching out because I saw you were the supervisor on XXSHOWXXFILMXX and I wanted to connect you to my catalog. What I like about a lot of the songs that were placed on XXSHOWXX, and many of your previous works, is the contrasting, yet cohesive soundtrack, which made it an experience to watch.<span class="Apple-converted-space">&nbsp; </span>You&rsquo;re great at what you do.</p>
        <p class="p3">I believe my catalog and background in XXGENREXX would fit well within your library and song selection. If welcomed, I&rsquo;m attaching a few samples of my work audio and video for you to view. Also, I&rsquo;m always will to expand more on who I am, and get to know about you, your process, and how you select music. Music supervision is also an aspiration of mine. I&rsquo;m looking forward to hearing back from you, and connecting. Thanks for your time.</p>
        <p class="p3">Randal Herndon</p>
        <p class="p3">Founder / Composer</p>
        <p class="p3">Crib Music Global</p>
        <p class="p3"><a href="http://cribmusic.xyz">cribmusic.xyz</a></p>
        <p class="p2">&nbsp;</p>`,
  },
];
