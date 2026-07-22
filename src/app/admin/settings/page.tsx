'use client'

import { useState, useEffect } from 'react'
import AdminGuard from '@/components/AdminGuard'

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => setSettings(d.settings || {}))
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!key.trim()) return
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: value }),
      })
      const data = await res.json()
      setSettings(data.settings || {})
      setKey('')
      setValue('')
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      alert('保存失敗')
    }
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#f7e8c3] font-serif p-6">
        <h1 className="text-3xl font-bold text-red-800 mb-6 text-center">系統設定</h1>

        <div className="max-w-lg mx-auto space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-amber-900 mb-4">新增設定</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-amber-800 mb-1">設定鍵 (Key)</label>
                <input
                  type="text"
                  value={key}
                  onChange={e => setKey(e.target.value)}
                  placeholder="例如：siteTitle"
                  className="w-full border border-amber-300 rounded px-4 py-2 focus:outline-none focus:border-red-600"
                  required
                />
              </div>
              <div>
                <label className="block text-amber-800 mb-1">設定值 (Value)</label>
                <input
                  type="text"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder="輸入設定值"
                  className="w-full border border-amber-300 rounded px-4 py-2 focus:outline-none focus:border-red-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-700 text-white py-2 rounded font-bold hover:bg-red-800 transition"
              >
                保存設定
              </button>
              {saved && <p className="text-green-600 text-center">✅ 設定已保存</p>}
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-amber-900 mb-4">目前設定</h2>
            {Object.keys(settings).length === 0 ? (
              <p className="text-gray-500">尚無設定</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(settings).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center bg-amber-50 p-3 rounded">
                    <span className="font-medium text-amber-900">{k}</span>
                    <span className="text-gray-700">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
