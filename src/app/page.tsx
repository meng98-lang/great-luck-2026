'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const DEFAULT_MASTER_IMAGE = 'https://sc04.alicdn.com/kf/H96a2f544424a4e5ca321e36ffff4bcf9B.jpg';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    birthDate: '',
    wealthGoal: '',
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [lineLink, setLineLink] = useState('https://line.me');
  const [whatsappLink, setWhatsappLink] = useState('https://wa.me');
  const [masterPhotoUrl, setMasterPhotoUrl] = useState(DEFAULT_MASTER_IMAGE);

  useEffect(() => {
    fetch('/api/settings/public?t=' + Date.now())
      .then(res => res.json())
      .then(data => {
        if (data.lineLink) setLineLink(data.lineLink);
        if (data.whatsappLink) setWhatsappLink(data.whatsappLink);
        if (data.masterPhotoUrl) setMasterPhotoUrl(data.masterPhotoUrl);
      })
      .catch(() => {
        // Keep defaults on error
      });
  }, []);

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
        } else {
          window.location.href = lineLink;
        }
      } catch (error) {
        window.location.href = lineLink;
      }
    }, 3000);
  };

  if (isCalculating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7e8c3] p-4 text-center">
        <div className="relative w-48 h-48 mb-8">
          <div className="absolute inset-0 border-4 border-[#d4af37] rounded-full animate-spin-slow border-t-transparent"></div>
          <div className="absolute inset-4 border-4 border-[#8b0000] rounded-full animate-spin-slow [animation-direction:reverse] border-b-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#8b0000] font-bold text-xl">正在推算...</span>
          </div>
        </div>
        <h2 className="text-2xl font-serif text-[#8b0000] mb-4">正在為您解析命盤</h2>
        <p className="text-gray-600 max-w-xs">大師正在結合丙午年運勢為您推演大運走勢，請稍等片刻...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7e8c3] font-serif text-[#333]">
      <div className="max-w-md mx-auto pt-10 px-4 pb-20">
        <div className="text-center mb-6">
          <div className="w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg border-2 border-[#d4af37] shadow-lg">
            <img
              src={masterPhotoUrl || DEFAULT_MASTER_IMAGE}
              alt="Master"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_MASTER_IMAGE;
              }}
            />
          </div>
          <h1 className="text-3xl font-bold text-[#8b0000] mb-2">大師親自解析：您的十年大運何時降臨？</h1>
          <p className="text-[#5d4037] text-lg">預知流年轉機 · 開啟命定財庫</p>
        </div>

        <div className="bg-[#fff9e6] border-2 border-[#d4af37] p-6 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#8b0000] font-bold text-lg mb-2">您的姓名</label>
              <input
                required
                type="text"
                placeholder="請輸入姓名"
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
              立即開始免費測算
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
