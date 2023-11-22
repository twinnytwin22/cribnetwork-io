import TextEditor from "@/ui/Email/TextEditor";
export const dynamic = 'force-dynamic'

async function page() {
  return (
    <div className="h-screen mt-20 text-black dark:text-white w-full px-4"><TextEditor/></div>
  )
}

export default page