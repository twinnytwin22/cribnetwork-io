import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import { v4 as uuid } from "uuid";

export const getAllArtists = async () => {
  try {
    const res = await fetch(`/api/v1/music/getAllArtists/`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*"
      },

      //  mode: 'no-cors',
    });

    if (res.ok) {
      const artists = await res.json();

      //const data = songs.json()
      return artists;
    }
  } catch (error) {
    throw error;
  }
};
export const getAllSongs = async () => {
  try {
    const res = await fetch(`/api/v1/music/getAllSongs/`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*"
      },

      //  mode: 'no-cors',
    });

    if (res.ok) {
      const songs = await res.json();

      //const data = songs.json()
      return songs;
    }
  } catch (error) {
    throw error;
  }
};
export const getAllPlaylists = async () => {
  try {
    const res = await fetch(`/api/v1/music/getAllPlaylists/`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*"
      },

      //  mode: 'no-cors',
    });

    if (res.ok) {
      const playlists = await res.json();

      //const data = playlists.json()
      return playlists;
    }
  } catch (error) {
    throw error;
  }
};

export const addMewArtist = async ({ updates }: any) => {
  try {
    const res = await fetch(`/api/v1/music/addNewArtist`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(updates).length.toString(),

        // "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ updates }),

      //  mode: 'no-cors',
    });

    if (res.ok) {
      const artist = await res.json();

      //const data = songs.json()
      return artist;
    }
  } catch (error) {
    throw error;
  }
};

export const updateArtist = async ({ updates }: any) => {
  const { id: artistId } = updates;
  try {
    const res = await fetch(`/api/v1/music/editArtist`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(updates).length.toString(),

        // "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ updates, artistId }),

      //  mode: 'no-cors',
    });

    if (res.ok) {
      const artist = await res.json();

      //const data = songs.json()
      return { artist, ok: true };
    }
  } catch (error) {
    throw error;
  }
};
export const updateSong = async ({ updates }: any) => {
  const { songId } = updates;
  try {
    const res = await fetch(`/api/v1/music/editSong`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        //  "Content-Length": JSON.stringify(updates).length.toString(),

        // "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ updates, songId }),

      //  mode: 'no-cors',
    });

    if (res.ok) {
      const song = await res.json();

      //const data = songs.json()
      return { song, ok: true };
    }
  } catch (error) {
    throw error;
  }
};

export const addNewSong = async ({ updates }: any) => {
  try {
    const res = await fetch(`/api/v1/music/addNewSong`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        //  "Content-Length": JSON.stringify(updates).length.toString(),

        // "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ updates }),

      //  mode: 'no-cors',
    });

    if (res.ok) {
      const song = await res.json();

      //const data = songs.json()
      return { song, ok: true };
    }
  } catch (error) {
    throw error;
  }
};
export async function deleteFile({
  path,
  bucket,
}: {
  path: string;
  bucket: string;
}) {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([path]);
    if (error) {
      throw error;
    }

    // const url = URL.createObjectURL(data)
    return data;
  } catch (error) {
    console.log("Error deleting image: ", error);
    return error;
  }
}

export async function downloadFile({
  path,
  bucket,
}: {
  path: string;
  bucket: string;
}) {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .download(path);
    if (error) {
      throw error;
    }

    const url = URL.createObjectURL(data);
    return url;
  } catch (error) {
    console.log("Error downloading image: ", error);
  }
}
export const uploadFile = async ({
  event,
  file,
  bucket,
}: {
  event?: any;
  file: any;
  bucket: string;
}) => {
  try {
    if (!file) {
      throw new Error("You must select a file to upload.");
    }
    const uid = uuid();
    const fileExt = file.name.split(".").pop();
    // Replace spaces in the file name with underscores
    const fileNameWithoutSpaces = file.name.replace(/ /g, "_");
    const fileNameWithoutExtension = fileNameWithoutSpaces.replace(
      /\.\w+$/,
      "",
    ); // Remove existing extension
    const filePath = `${uid}-${fileNameWithoutExtension}.${fileExt}`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    return filePath;
  } catch (error) {
    console.log(error);
    // You may want to re-throw the error to handle it at a higher level
    throw error;
  }
};

export const checkArtistInquirySubmission = async (email: string) => {
  try {
    const { data: submission, error: submissionError } = await supabaseAdmin
      .from("form_submissions")
      .select()
      .match({
        email,
        form_type: "Sync Artist Inquiry",
      })
      .maybeSingle();

    if (submission) {
      return submission;
    }

    if (submissionError) {
      console.log(submissionError);
    }
  } catch (error) {
    console.log(error);
  }
};
