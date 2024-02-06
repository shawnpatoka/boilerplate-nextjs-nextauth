import Link from "next/link";
import { getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]/route'
import LoginLogoutButtons from "./LoginLogoutButtons";

export default async function Topbar() {
  const session = await getServerSession(authOptions)

  return (
    <div className="bg-white dark:bg-slate-600 w-full sticky top-0 z-10 p-4 border border-b-slate-200">
      <div className="container mx-auto text-gray-600 flex flex-col md:flex-row items-center justify-between">

        <div className="flex justify-center">
          <h1 className="text-gray-700 font-bold text-center">Boilerplate NextJS & NextAuth</h1>
        </div>

        <div className="flex items-center flex-col md:flex-row gap-2 mt-1 md:mt-0">
          <div className="flex gap-2">
            <Link href="/" className="px-2">Home</Link>
            <Link href="/page/client" className="px-2">Client Page</Link>
            <Link href="/page/server" className="px-2">Server Page</Link>
          </div>
          <div className="flex gap-2">
            <LoginLogoutButtons />
          </div>
        </div>

      </div>
    </div>
  )
}