'use client'

import { useState, useEffect } from 'react'
import AdminGuard from '@/components/AdminGuard'

const SETTING_KEYS = [
  { key: 'lineLink', label: 'LINE链接' },
  { key: 'whatsappLink', label: 'WhatsApp链接' },
  { key: 'facebookPixel', label: 'Facebook Pixel' },
  { key: 'tiktokPixel', label: 'TikTok Pixel' },
  { key: 'googleTagManager', label: 'Google Tag Manager' },
  { key: 'masterPhotoUrl', label: '大师照片URL' },
] as const

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [key, setKey] = useState(SETTING_KEYS[0].key)
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
      setValue('')
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      alert('保存失敗')
    }
  }

  return (
    <AdminGuard>
      <h1 className="text-3xl font-bold text-red-900 mb-8">系統設定</h1>

      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-2xl font-semibold text-red-800 mb-4">新增設定</h2>
        <form onSubmit={handleSave} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-gray-700 font-medium mb-2">設定鍵 (Key)</label>
            <select
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full border border-amber-300 rounded px-4 py-2 focus:outline-none focus:border-red-600"
            >
              {SETTING_KEYS.map(({ key, label }) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">設定值 (Value)</label>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="輸入設定值"
              className="w-full border border-amber-300 rounded px-4 py-2 focus:outline-none focus:border-red-600"
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            保存設定
          </button>
          {saved && (
            <span className="ml-3 text-green-600">✅ 設定已保存</span>
          )}
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold text-red-800 mb-4">目前設定</h2>
        {Object.keys(settings).length === 0 ? (
          <p className="text-gray-500">尚無設定</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(settings).map(([k, v]) => (
              <div key={k} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="font-mono text-sm font-semibold min-w-[200px]">{k}</span>
                <span className="text-sm break-all">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminGuard>
  )
}
