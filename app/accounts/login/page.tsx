'use client'

import { useState } from "react"
import { signIn, SignInResponse } from "next-auth/react"
import { useRouter } from "next/navigation"


export default function LoginPage() {

  const [username, setUsername] = useState("dev@shawnpatoka.com")
  const [password, setPassword] = useState("11111")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const router = useRouter()



  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const result: SignInResponse | undefined = await signIn('credentials', {
        email: username,
        password: password,
        // callbackUrl: '/serverpage',
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage(result?.error)
        setIsLoading(false)
      }

      if (!result?.error) {
        router.push('/page/server')
      }

    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  };


  return (
    <div className="w-full mt-5 flex justify-center">
      <div className="bg-white rounded-md p-4 w-full sm:w-[600px] mx-5">
        <form className="space-y-6" onSubmit={loginUser}>
          <h1 className="text-2xl text-slate-900 font-normal">Login</h1>
          {errorMessage && (
            <div className="bg-red-100 border border-red-200 text-red-600 rounded-md p-4 w-full text-center">
              {errorMessage}
            </div>
          )}

          <div className="mt-4">
            <label className="text-sm font-bold text-gray-700">Username</label>
            <input type="email" className="w-full border border-slate-200 rounded-md p-3" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mt-4">
            <label className="text-sm font-bold text-gray-700">Password</label>
            <input type="password" className="w-full border border-slate-200 rounded-md p-3" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className={(isLoading ? 'bg-sky-300 ' : 'bg-sky-500 hover:bg-sky-500/95 ') + ' w-full text-center py-4 text-white text-sm rounded-md mt-4'} disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
        </form>
      </div>
    </div>
  )
}