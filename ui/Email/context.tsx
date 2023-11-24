"use client";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { UseThemeProps } from "next-themes/dist/types";
import React, {
  ButtonHTMLAttributes,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { forceRerender, getExistingDocs } from "./actions";
import { FileDocumentProps, getEditorProps } from "./lib";
import { useEditorStore } from "./store";

const store = useEditorStore.getState();
const EditorContext = createContext<FileDocumentProps | any>(store);
export function EditorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, systemTheme }: UseThemeProps = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = useState<boolean>(false);
  const [editorProps, setEditorProps] = useState<any>({});

  useEffect(() => setMounted(true), []);

  const updateTitle = (e) => {
    const { value, name }: ButtonHTMLAttributes<HTMLButtonElement> = e.target;
    if (doc && value) {
      setTitle(value as string);
      setDocument({
        ...doc,
        title: value as string,
      });
    }
    if (!doc) {
      setDocument({
        title: value as string,
        id: null,
      });
    }
  };

  useEffect(() => {
    setEditorProps(getEditorProps(currentTheme!));
    forceRerender(setMounted);
  }, [theme, mounted, editorProps, currentTheme, setEditorProps]);

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
  } = useEditorStore();
  const isLoading = !editorProps || !mounted || !documents;
  const getEditorMenuProps = (editorRef: any) => ({
    setFileManagerOpen,
    editorRef,
    savedContent,
    setSavedContent,
    title,
    doc,
  });

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
      theme
    ],
  );

  return (
    <EditorContext.Provider value={values}>{children}</EditorContext.Provider>
  );
}

export default function useEditorContext() {
  return useContext(EditorContext);
}
