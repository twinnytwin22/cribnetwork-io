import { create } from "zustand";
import { FileDocumentProps } from "./lib";
interface IEditorProps {
  mounted: boolean;
  savedContent: any | null;
  title: string | null;
  editorProps: any;
  fileManagerOpen: boolean;
  document: FileDocumentProps;
  documents: FileDocumentProps[];

  setFileManagerOpen: (fileManagerOpen: boolean) => void;
  setMounted: (mounted: boolean) => void;
  setSavedContent: (savedContent: any) => void;
  setTitle: (title: string | null) => void;
  setEditorProps: (editorProps: any) => any;
  setDocument: (document: FileDocumentProps) => void;
  setDocuments: (documents: FileDocumentProps[]) => void;
}

export const useEditorStore = create<IEditorProps>((set) => ({
  mounted: false,
  savedContent: null,
  document: {
    title: "",
  },
  documents: [],
  editorProps: {},
  title: null,
  fileManagerOpen: false,
  setDocuments: (documents: FileDocumentProps[]) => set({ documents }),

  setDocument: (document: FileDocumentProps) => set({ document }),
  setFileManagerOpen: (fileManagerOpen: boolean) => set({ fileManagerOpen }),
  setTitle: (title) => set({ title }),
  setMounted: (mounted) => set({ mounted }),
  setSavedContent: (savedContent: any) => set({ savedContent }),
  setEditorProps: (editorProps) => set({ editorProps }),
}));
