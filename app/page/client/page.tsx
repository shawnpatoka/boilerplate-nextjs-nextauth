'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"

export default function ClientPage() {
  const [data, setData] = useState("This is some text from state.")
  const { data: session } = useSession()
  console.log("inside the client page:", session)

  return (
    <div className="mt-4">
      <h1 className="text-2xl">Client Page</h1>
      <p className="mt-3">{data}</p>
    </div>
  )
}