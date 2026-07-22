'use client';
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
}

