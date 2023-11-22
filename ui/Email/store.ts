import { produce } from 'immer';
import { create } from 'zustand';
interface IEditorProps {
mounted: boolean
savedContent: any | null
editorProps: any
setMounted: (mounted: boolean) => void
setSavedContent: (savedContent: any) => void
setEditorProps: (editorProps: any) => any
}

export const useEditorStore = create<IEditorProps>((set) => ({
mounted: false, 
savedContent: null,
editorProps: {},
setMounted: (mounted) => set({mounted}),
setSavedContent: (content) => set(produce((state) => {
    state.savedContent = content;
  })),
  setEditorProps: (editorProps) => set({editorProps}),
}))
