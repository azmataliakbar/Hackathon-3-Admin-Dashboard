// src/app/login/page.tsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Hardcoded credentials for demo
    if (email === "azmatali@heavenhills.com" && password === "giaic123***") {
      localStorage.setItem("isAuthenticated", "true")
      router.push("/admin/dashboard")
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="mt-2 mb-4">
          <h2 className="text-3xl md:text-5xl text-black font-bold text-center shadow-md">
            Welcome To Admin Control
          </h2>
        </div>

        <div className="max-w-md w-full space-y-6 p-6 sm:p-8 bg-white rounded-lg shadow-lg">
          <div>
            <h2 className="text-2xl md:text-3xl text-red-500 font-bold text-center">
              Heaven Hills Furniture
            </h2>
          </div>

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-base md:text-lg font-bold text-blue-500"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm md:text-base"
                placeholder="Heaven_Hills_Furniture"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-base md:text-lg font-bold text-blue-500"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm md:text-base"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg md:text-xl font-bold text-white bg-black hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          </form>
          <h6 className="text-gray-300 text-center">Author: Azmat Ali</h6>
        </div>
      </div>
    </div>
  )
}


