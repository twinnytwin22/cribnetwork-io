
import { getSiteSettings } from "@/lib/providers/sanity/sanity";
import AuthComponent from "@/ui/Auth/AuthComponent/AuthComponent";

async function page() {
  const settings = await getSiteSettings();

  return (
    <div className="h-screen items-center flex w-full bg-zinc-100 dark:bg-black">
      <AuthComponent settings={settings} />
    </div>
  );
}

export default page;
