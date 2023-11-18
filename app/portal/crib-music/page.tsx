import FormGroup from "@/ui/Forms/MusicForms/FormGroup";
import { LoadingContainer } from "@/ui/Sections/LoadingContainer";
import { getAllArtists, getAllSongs } from "@/utils/use-server";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

async function Page() {
  const [artists, songs] = await Promise.all([getAllArtists(), getAllSongs()]);
  const props = {
    artists: artists?.artists,
    songs: songs?.songs,
  };

  return (
    <div className="w-screen relative mx-auto h-full ">
      <Suspense fallback={<LoadingContainer />}>
        <FormGroup {...props} />
      </Suspense>
    </div>
  );
}

export default Page;
