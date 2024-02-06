'use client'

import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import Link from "next/link";



export default function LoginLogoutButtons() {

  const { data: session, status, update } = useSession()


  return (
    <>
      {session ? (<button className="bg-slate-500 rounded-md px-5 py-2 text-xs text-white" onClick={() => signOut()}>Logout</button>
      ) : (
        <>
          <Link href="/accounts/login" className="bg-blue-500 rounded-md px-5 py-2 text-xs text-white">Login</Link>
          <Link href="/accounts/register" className="border border-blue-500 rounded-md px-5 py-2 text-xs text-blue-500">Register</Link>
        </>
      )}
    </>
  )
}




