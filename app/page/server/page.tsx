import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


export default async function ServerPage() {
  const session = await getServerSession(authOptions)

  const firstName = session?.user.first_name as string

  return (
    <div className="mt-4">
      <h1 className="text-2xl mb-2">Server Page</h1>
      <hr />
      <p className="mt-3">Hey, {firstName}. This is a server component.</p>
    </div>
  )
}