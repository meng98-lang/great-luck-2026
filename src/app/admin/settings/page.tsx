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
  const [key, setKey] = useState<string>(SETTING_KEYS[0].key)
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
      <div className="min-h-screen bg-gradient-to-b from-[#1a0000] via-[#2d0000] to-[#1a0000] p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl text-[#d4af37] font-bold mb-8">系統設定</h1>

          <div className="bg-[#1a0a0a]/80 backdrop-blur rounded-2xl p-6 border border-[#d4af37]/30 mb-8">
            <h2 className="text-xl text-[#d4af37] font-bold mb-4">新增設定</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[#8b0000] font-bold mb-2">設定鍵 (Key)</label>
                <select
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full border border-amber-300 rounded px-4 py-2 focus:outline-none focus:border-red-600 bg-white"
                  required
                >
                  {SETTING_KEYS.map(({ key, label }) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#8b0000] font-bold mb-2">設定值 (Value)</label>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="輸入設定值"
                  className="w-full border border-amber-300 rounded px-4 py-2 focus:outline-none focus:border-red-600"
                  required
                />
              </div>
              <button type="submit" className="bg-[#8b0000] text-white px-6 py-2 rounded-full font-bold hover:bg-red-900 transition">
                保存設定
              </button>
              {saved && (
                <span className="text-green-400 ml-4">✅ 設定已保存</span>
              )}
            </form>
          </div>

          <div className="bg-[#1a0a0a]/80 backdrop-blur rounded-2xl p-6 border border-[#d4af37]/30">
            <h2 className="text-xl text-[#d4af37] font-bold mb-4">目前設定</h2>
            {Object.keys(settings).length === 0 ? (
              <p className="text-gray-400">尚無設定</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(settings).map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-gray-700 py-2">
                    <span className="text-[#d4af37] font-bold">{k}</span>
                    <span className="text-white">{v}</span>
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
