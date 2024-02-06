'use client'

import { SessionProvider } from "next-auth/react"


interface Props {
  children: React.ReactNode
  session?: any | null
}

export default function SessionContextProvider({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}