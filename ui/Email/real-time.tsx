"use client";
import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useEffect } from "react";
import { FileDocumentProps } from "./lib";
import { useEditorStore } from "./store";

const RealTimeDocs = ({ documents }: { documents: FileDocumentProps[] }) => {
  const setDocuments = (documents: FileDocumentProps[]) =>
    useEditorStore.setState({ documents });
  useEffect(() => {
    const channel = supabaseAdmin
      .channel("email_templates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "email_templates" },
        (
          payload: RealtimePostgresChangesPayload<{
            [key: string]: any;
          }>,
        ) => {
          console.log("Change received!", payload);
        },
      )
      .subscribe();

    return () => {
      setDocuments(documents);
      supabaseAdmin.removeChannel(channel);
    };
  }, [supabaseAdmin, documents, setDocuments]);

  return <>{}</>;
};

export default RealTimeDocs;
