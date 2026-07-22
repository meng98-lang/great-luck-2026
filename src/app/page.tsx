'use client'

import { useState } from 'react'
import { Sparkles, Coins, Star, Send } from 'lucide-react'

export default function Home() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', wealthGoal: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
    } catch (err) {
      alert('提交失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f7e8c3] font-serif flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🧧</div>
          <h1 className="text-4xl font-bold text-red-800 mb-4">🎉 好運已送出！</h1>
          <p className="text-xl text-amber-900 mb-6">您的富貴目標已記錄，2026年必定大吉大利、心想事成！</p>
          <p className="text-lg text-amber-800">好運正在傳遞中… 🐉✨</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f7e8c3] font-serif">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-red-800 via-red-700 to-amber-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="text-6xl absolute top-10 left-10">🪭</div>
          <div className="text-6xl absolute top-20 right-20">🏮</div>
          <div className="text-5xl absolute bottom-10 left-1/4">🧧</div>
          <div className="text-5xl absolute bottom-20 right-1/3">🐉</div>
        </div>
        <div className="relative py-16 px-4 text-center">
          <Sparkles className="inline-block w-8 h-8 mb-2 text-yellow-300" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-wider">
            2026 好運接龍
          </h1>
          <p className="text-2xl md:text-3xl font-medium mb-2 text-yellow-200">
            大吉大利 · 富貴滿堂
          </p>
          <p className="text-lg text-red-100 max-w-md mx-auto">
            填寫您的資料，將好運傳遞給更多朋友，共同迎接2026好運年！
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-lg mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-red-800">
          <div className="text-center mb-8">
            <Star className="inline-block w-6 h-6 text-yellow-500 mr-2" />
            <span className="text-xl font-bold text-red-800">迎接好運</span>
            <Star className="inline-block w-6 h-6 text-yellow-500 ml-2" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-amber-900 font-medium mb-1">姓名</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={handleChange('name')}
                placeholder="請輸入您的姓名"
                className="w-full border-2 border-amber-300 rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none transition bg-amber-50"
              />
            </div>
            <div>
              <label className="block text-amber-900 font-medium mb-1">電話</label>
              <input
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder="請輸入您的電話"
                className="w-full border-2 border-amber-300 rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none transition bg-amber-50"
              />
            </div>
            <div>
              <label className="block text-amber-900 font-medium mb-1">電子郵件</label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="請輸入您的電子郵件"
                className="w-full border-2 border-amber-300 rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none transition bg-amber-50"
              />
            </div>
            <div>
              <label className="block text-amber-900 font-medium mb-1">
                <Coins className="inline-block w-5 h-5 text-yellow-600 mr-1" />
                富貴目標
              </label>
              <input
                type="text"
                value={form.wealthGoal}
                onChange={handleChange('wealthGoal')}
                placeholder="例如：買房、百萬年薪、創業成功"
                className="w-full border-2 border-yellow-400 rounded-lg px-4 py-3 focus:border-red-600 focus:outline-none transition bg-yellow-50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-700 to-amber-600 text-white py-4 rounded-lg font-bold text-xl hover:from-red-800 hover:to-amber-700 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                '提交中…'
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  送出好運 🧧
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-amber-800 text-sm">
        <p>🐉 2026 好運接龍 · 大吉大利 · 富貴滿堂 🐉</p>
        <p className="mt-1">將好運傳遞給身邊的每一個人 ✨</p>
      </footer>
    </main>
  )
}
