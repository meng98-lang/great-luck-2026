'use client'

import { useState } from 'react'

const ADMIN_PASSWORD = 'm900925'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleLogin = () => {
    if (input === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (authenticated) return <>{children}</>

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7e8c3] font-serif">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">管理員登入</h1>
        <input
          type="password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false) }}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          placeholder="請輸入管理密碼"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-amber-600"
        />
        {error && <p className="text-red-600 text-sm mb-4">密碼錯誤，請重試</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-amber-700 text-white py-2 rounded hover:bg-amber-800 transition"
        >
          登入
        </button>
      </div>
    </div>
  )
}
