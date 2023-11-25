import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import { MutableRefObject } from "react";
import { toast } from "react-toastify";
import { Editor } from "tinymce";
import { FileDocumentProps, HTML } from "./lib";

export const getExistingDocs = async () => {
  try {
    const { data } = await supabaseAdmin.from("email_templates").select();
    if (data) {
      return data as FileDocumentProps[];
    }
  } catch (error) {
    console.log(error);
  }
};
export const forceRerender = (setMounted: (mounted: boolean) => void) => {
  setMounted(false);
  requestAnimationFrame(() => setMounted(true));
};

export const saveToDB = async (
  editorRef: any,
  savedContent: string,
  title: string,
  id: string | null,
  setDocuments: (documents: FileDocumentProps[]) => void,
  setDocument: (document: FileDocumentProps) => void,
  // router: AppRouterInstance
) => {
  try {
    if (savedContent && editorRef.current && !id) {
      const { data, error } = await supabaseAdmin
        .from("email_templates")
        .upsert({
          element: savedContent, //editorRef.current.getContent()
          title,
        })
        .select()
        .single();
      if (data) {
        setDocument(data);
        // toast.success("File saved to db");
      }

      if (error) {
        console.log(error);
        if (error.code === "23505") {
          toast.error("Error saving: That name already exists");
        }
        return error;
      }
    } else if (savedContent && editorRef && id!!) {
      const { data, error } = await supabaseAdmin
        .from("email_templates")
        .update({
          element: savedContent,
          title,
        })
        .eq("id", id)
        .select()
        .single();
      if (data) {
        setDocument(data);
      }

      if (error) {
        console.log(error);
        return error;
      }
    }
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    const { data, error } = await supabaseAdmin
      .from("email_templates")
      .select("*");

    if (data) {
      setDocuments(data);
      toast.success("File saved to db");
    }
  }
};

export const log = (
  editorRef,
  savedContent: string,
  setSavedContent: (savedContent: string) => void,
) => {
  if (editorRef.current) {
    setSavedContent(editorRef.current.getContent());
    if (savedContent) {
      console.log("Saved content:", savedContent);
      toast.success("Saved");
    }
  }
  // console.log(savedContent)
};

export const setNewContent = (
  e: any,
  existingDocs: any[] | undefined,
  editorRef: MutableRefObject<Editor | null>,
  setTitle: (title: string) => void,
  setDocument: (document: any) => void,
) => {
  const { value } = e.target;
  if (value && existingDocs) {
    const option = [...HTML, ...existingDocs!].find(
      ({ title }) => title === value,
    );

    if (editorRef.current && option) {
      setTitle(option.title);
      setDocument(option);
      editorRef.current.setContent(option?.element!);
    }
    return option;
  }
};

export const sendEmail = () => {};
