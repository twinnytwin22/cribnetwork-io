import { produce } from 'immer';
import { create } from 'zustand';
interface IEditorProps {
mounted: boolean
savedContent: any | null
title: string | null
editorProps: any
fileManagerOpen: boolean
setFileManagerOpen: (fileManagerOpen: boolean) => void
setMounted: (mounted: boolean) => void
setSavedContent: (savedContent: any) => void
setTitle: (title: any) => void
setEditorProps: (editorProps: any) => any
}

export const useEditorStore = create<IEditorProps>((set) => ({
mounted: false, 
savedContent: null,
editorProps: {},
title: null,
fileManagerOpen: false,
setFileManagerOpen: (fileManagerOpen: boolean) => set({fileManagerOpen}),
setTitle: (title) => set(produce((state) => {state.title = title})),
setMounted: (mounted) => set({mounted}),
setSavedContent: (content) => set(produce((state) => {
    state.savedContent = content;
  })),
  setEditorProps: (editorProps) => set({editorProps}),
}))
