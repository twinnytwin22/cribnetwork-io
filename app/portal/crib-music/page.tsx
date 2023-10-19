import FormGroup from "@/ui/Forms/MusicForms/FormGroup";
import { getAllArtists, getAllSongs } from "@/utils/use-server";
export const dynamic = "force-dynamic";
async function Page() {
  const [artists, songs] = await Promise.all([getAllArtists(), getAllSongs()]);
  const props = {
    artists: artists?.artists,
    songs: songs?.songs,
  };

  return (
    <div className="w-screen relative mx-auto h-full ">
      <FormGroup {...props} />
    </div>
  );
}

export default Page;
