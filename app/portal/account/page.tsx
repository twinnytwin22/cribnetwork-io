import {
  getSession,
  getSubscription,
} from "@/lib/providers/supabase/supabase-server";
import PageTitle from "@/ui/Components/PageTitle/PageTitle";
import AccountFormGroup from "@/ui/Sections/Account/AccountFormGroup";
import { getAllArtists, getAllSongs } from "@/utils/use-server";
import { Suspense } from "react";
async function AccountPage() {
  const [session, subscription, artists, songs] = await Promise.all([
    getSession(),
    getSubscription(),
    getAllArtists(),
    getAllSongs()
  ]);

  const userFormProps = {
    session, 
    subscription,
    artists: artists.artists, 
    songs, 
    
  }
  return (
    userFormProps && (
      <section className="w-screen relative mx-auto h-full ">
      <PageTitle title={"Your Account"} />
      <Suspense>
          <AccountFormGroup {...userFormProps} props={userFormProps} />
          </Suspense>
      </section>
    )
  );
}

export default AccountPage;
