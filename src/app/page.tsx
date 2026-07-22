'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    birthDate: '',
    wealthGoal: '',
  });
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(async () => {
      try {
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            subdomain: window.location.hostname,
          }),
        });
        const data = await res.json();
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        }
      } catch (error) {
        // fallback handled by API
      }
    }, 3000);
  };

  if (isCalculating) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#1a0000] via-[#2d0000] to-[#1a0000] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#d4af37] border-t-transparent mx-auto mb-6"></div>
          <h1 className="text-2xl text-[#d4af37] font-bold mb-4">正在推算...</h1>
          <p className="text-white/70 text-lg">正在為您解析命盤</p>
          <p className="text-white/50 text-sm mt-2">大師正在結合丙午年運勢為您推演大運走勢，請稍等片刻...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a0000] via-[#2d0000] to-[#1a0000] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-[#d4af37] font-bold mb-2">大師親自解析：您的十年大運何時降臨？</h1>
          <p className="text-white/70">預知流年轉機 · 開啟命定財庫</p>
        </div>

        <div className="bg-[#1a0a0a]/80 backdrop-blur rounded-2xl p-6 border border-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[#8b0000] font-bold text-lg mb-2">您的姓名</label>
              <input
                required
                type="text"
                placeholder="請輸入您的姓名"
                className="w-full p-4 rounded-lg border-2 border-[#d4af37] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b0000] text-lg"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[#8b0000] font-bold text-lg mb-2">您的性別</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`flex-1 p-4 rounded-lg border-2 border-[#d4af37] font-bold text-lg ${formData.gender === 'male' ? 'bg-[#8b0000] text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setFormData({ ...formData, gender: 'male' })}
                >
                  男
                </button>
                <button
                  type="button"
                  className={`flex-1 p-4 rounded-lg border-2 border-[#d4af37] font-bold text-lg ${formData.gender === 'female' ? 'bg-[#8b0000] text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setFormData({ ...formData, gender: 'female' })}
                >
                  女
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[#8b0000] font-bold text-lg mb-2">出生日期</label>
              <input
                required
                type="date"
                className="w-full p-4 rounded-lg border-2 border-[#d4af37] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b0000] text-lg"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[#8b0000] font-bold text-lg mb-2">您的 2026 年財運目標</label>
              <input
                required
                type="text"
                placeholder="例如：創業成功、收入翻倍、購置房產"
                className="w-full p-4 rounded-lg border-2 border-[#d4af37] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b0000] text-lg"
                value={formData.wealthGoal}
                onChange={(e) => setFormData({ ...formData, wealthGoal: e.target.value })}
              />
            </div>

            <button type="submit" className="w-full bg-[#8b0000] text-white py-4 'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    birthDate: '',
    wealthGoal: '',
  });
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(async () => {
      try {
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            subdomain: window.location.hostname,
          }),
        });
        const data = await res.json();
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        }
      } catch (error) {
        // fallback handled by API
      }
    }, 3000);
  };

  if (isCalculating) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#1a0000] via-[#2d0000] to-[#1a0000] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#d4af37] border-t-transparent mx-auto mb-6"></div>
          <h1 className="text-2xl text-[#d4af37] font-bold mb-4">正在推算...</h1>
          <p className="text-white/70 text-lg">正在為您解析命盤</p>
          <p className="text-white/50 text-sm mt-2">大師正在結合丙午年運勢為您推演大運走勢，請稍等片刻...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a0000] via-[#2d0000] to-[#1a0000] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-[#d4af37] font-bold mb-2">大師親自解析：您的十年大運何時降臨？</h1>
          <p className="text-white/70">預知流年轉機 · 開啟命定財庫</p>
        </div>

        <div className="bg-[#1a0a0a]/80 backdrop-blur rounded-2xl p-6 border border-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[#8b0000] font-bold text-lg mb-2">您的姓名</label>
              <input
                required
                type="text"
                placeholder="請輸入您的姓名"
                className="w-full p-4 rounded-lg border-2 border-[#d4af37] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b0000] text-lg"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[#8b0000] font-bold text-lg mb-2">您的性別</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`flex-1 p-4 rounded-lg border-2 border-[#d4af37] font-bold text-lg ${formData.gender === 'male' ? 'bg-[#8b0000] text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setFormData({ ...formData, gender: 'male' })}
                >
                  男
                </button>
                <button
                  type="button"
                  className={`flex-1 p-4 rounded-lg border-2 border-[#d4af37] font-bold text-lg ${formData.gender === 'female' ? 'bg-[#8b0000] text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setFormData({ ...formData, gender: 'female' })}
                >
                  女
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[#8b0000] font-bold text-lg mb-2">出生日期</label>
              <input
                required
                type="date"
                className="w-full p-4 rounded-lg border-2 border-[#d4af37] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b0000] text-lg"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[#8b0000] font-bold text-lg mb-2">您的 2026 年財運目標</label>
              <input
                required
                type="text"
                placeholder="例如：創業成功、收入翻倍、購置房產"
                className="w-full p-4 rounded-lg border-2 border-[#d4af37] bg-white focus:outline-none focus:ring-2 focus:ring-[#8b0000] text-lg"
                value={formData.wealthGoal}
                onChange={(e) => setFormData({ ...formData, wealthGoal: e.target.value })}
              />
            </div>

            <button type="submit" className="w-full bg-[#8b0000] text-white py-4 rounded-full font-bold text-xl shadow-[0_5px_15px_rgba(139,0,0,0.4)] hover:bg-red-900 active:scale-95 transition-all">
              立即開始精準測算
            </button>
          </form>
        </div>

        <div className="mt-8 pt-8 border-t border-[#d4af37] text-center">
          <div className="flex justify-center gap-6 text-sm text-[#5d4037] mb-4">
            <Link href="/about" className="hover:underline">關於我們</Link>
            <Link href="/contact" className="hover:underline">聯繫我們</Link>
            <Link href="/privacy" className="hover:underline">隱私條例</Link>
          </div>
          <p className="text-gray-500 text-xs">© 2026 大運占測版 版權所有</p>
        </div>
      </div>
    </main>
  );
                                              }rounded-full font-bold text-xl shadow-[0_5px_15px_rgba(139,0,0,0.4)] hover:bg-red-900 active:scale-95 transition-all">
              立即開始精準測算
            </button>
          </form>
        </div>

        <div className="mt-8 pt-8 border-t border-[#d4af37] text-center">
          <div className="flex justify-center gap-6 text-sm text-[#5d4037] mb-4">
            <Link href="/about" className="hover:underline">關於我們</Link>
            <Link href="/contact" className="hover:underline">聯繫我們</Link>
            <Link href="/privacy" className="hover:underline">隱私條例</Link>
          </div>
          <p className="text-gray-500 text-xs">© 2026 大運占測版 版權所有</p>
        </div>
      </div>
    </main>
  );
                                                                    }
