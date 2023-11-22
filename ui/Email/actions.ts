import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import { toast } from "react-toastify";
import { HTML } from "./lib";

export const getExistingDocs = async () => {
  const { data } = await supabaseAdmin.from("email_templates").select();
  if (data) {
    return data;
  }
};
export const forceRerender = async (setMounted: (mounted: boolean) => void) => {
  setMounted(false);
  requestAnimationFrame(() => setMounted(true));
};

export const saveToDB = async (
  editorRef: any,
  savedContent: string,
  id?: string | null,
  title?: string | null
) => {
  try {
    if (savedContent && editorRef.current && !id) {
      const { data, error } = await supabaseAdmin
        .from("email_templates")
        .upsert({
          html: savedContent, //editorRef.current.getContent()
          title
        })
        .select()
        .single();
      if (data) {
        toast.success("File saved to db");
      }
    } else if (savedContent && editorRef && id!!) {
      const { data, error } = await supabaseAdmin
        .from("email_templates")
        .upsert({
          html: savedContent,
          title
        })
        .eq("id", id)
        .select()
        .single();
      if (data) {
        toast.success("File saved to db");
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
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
      console.log("Saved content:",savedContent);
      toast.success("Saved");
    }
  }
  // console.log(savedContent)
};

export const setNewContent = (e, existingDocs, editorRef) => {
  const { value } = e.target;
  if (value && existingDocs) {
    const option = [...HTML, ...existingDocs!].find(
      ({ title }) => title === value,
    );
    if (editorRef.current) {
      editorRef.current.setContent(option?.element!);
    }
  }
};
