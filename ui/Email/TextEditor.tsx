'use client'
import { Editor } from '@tinymce/tinymce-react';
import { editorProps } from './lib';
const Component: any = Editor

export default function TextEditor() {
   // const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Component
     {...editorProps}
    />
  );
}