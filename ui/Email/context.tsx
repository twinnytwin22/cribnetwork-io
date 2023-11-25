"use client";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { UseThemeProps } from "next-themes/dist/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { forceRerender, getExistingDocs } from "./actions";
import { FileDocumentProps, getEditorProps } from "./lib";
import { useEditorStore } from "./store";

//const store = useEditorStore.getState();
const EditorContext = createContext<FileDocumentProps | any>(null);
export function EditorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, systemTheme, setTheme }: UseThemeProps = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = useState<boolean>(false);

  const {
    savedContent,
    setSavedContent,
    title,
    setTitle,
    fileManagerOpen,
    setFileManagerOpen,
    document: doc,
    setDocument,
    documents,
    setDocuments,
    setEditorProps,
    editorProps,
    setEditorRef,
    editorRef,
  } = useEditorStore();
  const isLoading = !editorProps || !mounted || !documents;

  useEffect(() => {
    setEditorProps(getEditorProps(currentTheme!));
    forceRerender(setMounted);
  }, [
    theme,
    mounted,
    editorProps,
    currentTheme,
    setEditorProps,
    setTheme,
    forceRerender,
    getEditorProps,
  ]);
  const getEditorMenuProps = useMemo(() => {
    return (editorRef: any) => ({
      setFileManagerOpen,
      editorRef,
      savedContent,
      setSavedContent,
      title,
      doc,
    });
  }, [
    setFileManagerOpen,
    savedContent,
    setSavedContent,
    title,
    doc,
    isLoading,
  ]);
  useEffect(
    () => editorProps && setMounted(true),
    [editorProps, getEditorProps, mounted],
  );

  const updateTitle = //useCallback(
    (e: any) => {
      const { value, name } = e.target;
      if (doc && (value || value !== "")) {
        setTitle(value);
        setDocument({
          ...doc,
          title: value,
        });
      }
      if (!doc && (value || value !== "")) {
        setDocument({
          title: value,
          id: null,
        });
      }

      if ((!value || value === "")) {
        setTitle(null);

        setDocument({
          title: null,
          id: null,
        });
      }
      
    }
  //   setTitle, setDocument, doc]
  // );
  

  const registerDocuments = async () => {
    const res = await getExistingDocs();

    if (res) {
      console.log(res, "registered docs");

      setDocuments(res);
    }
    const docs = useEditorStore.getState().documents;
    return docs;
  };

  const { data } = useQuery({
    queryKey: ["data"],
    queryFn: () => registerDocuments(),
  });
  const values = useMemo(
    () => ({
      savedContent,
      setSavedContent,
      title,
      setTitle,
      fileManagerOpen,
      setFileManagerOpen,
      doc,
      setDocument,
      documents,
      updateTitle,
      mounted,
      editorProps,
      setEditorProps,
      isLoading,
      getEditorMenuProps,
      setEditorRef,
    }),
    [
      savedContent,
      setSavedContent,
      title,
      setTitle,
      fileManagerOpen,
      setFileManagerOpen,
      doc,
      setDocument,
      documents,
      updateTitle,
      mounted,
      editorProps,
      setEditorProps,
      isLoading,
      getEditorMenuProps,
      theme,
      setEditorRef,
    ],
  );

  return (
    <EditorContext.Provider value={values}>{children}</EditorContext.Provider>
  );
}

export default function useEditorContext() {
  return useContext(EditorContext);
}
