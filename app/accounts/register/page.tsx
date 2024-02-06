export default function Register() {
  return (
    <div className="w-full mt-5 flex justify-center">
      <div className="bg-white rounded-md p-4 w-full sm:w-[600px] mx-5">
        <h1 className="text-2xl text-slate-900 font-normal">Register</h1>
        <div className="mt-4">
          <label className="text-sm font-bold text-gray-700">Username</label>
          <input type="email" className="w-full border border-slate-200 rounded-md p-3" />
        </div>
        <div className="mt-4">
          <label className="text-sm font-bold text-gray-700">Password</label>
          <input type="password" className="w-full border border-slate-200 rounded-md p-3" />
        </div>
        <div className="mt-4">
          <label className="text-sm font-bold text-gray-700">Verify Password</label>
          <input type="password" className="w-full border border-slate-200 rounded-md p-3" />
        </div>
        <button className="w-full text-center py-4 bg-sky-500 hover:bg-sky-500/95 text-white text-sm rounded-md mt-4">Register</button>

      </div>
    </div>
  )
}