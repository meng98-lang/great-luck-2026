'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminGuard from '@/components/AdminGuard';

interface Lead {
  id: number;
  name: string;
  gender: string;
  birthDate: string;
  wealthGoal: string;
  ip: string;
  country: string;
  userAgent: string;
  subdomain: string;
  createdAt: string;
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/leads?t=' + Date.now())
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLeads(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const calculateAge = (birthDate: string) => {
    try {
      const birth = new Date(birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age >= 0 ? age : 'N/A';
    } catch (e) {
      return 'N/A';
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['国家', '姓名', '生辰八字', '年龄', '2026财运目标', '来源子域名', '提交时间'];
    const rows = leads.map(l => [
      l.country || '未知',
      l.name,
      l.birthDate,
      calculateAge(l.birthDate),
      l.wealthGoal || '未填',
      l.subdomain || '主站',
      new Date(l.createdAt).toLocaleString()
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#f7e8c3] p-8 font-serif">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8 border-b-2 border-[#8b0000] pb-4">
            <h1 className="text-3xl font-bold text-[#8b0000]">客户资料管理后台 (大运版)</h1>
            <div className="flex gap-4">
              <Link href="/admin/settings" className="px-6 py-2 bg-white border-2 border-[#d4af37] text-[#8b0000] rounded-full font-bold hover:bg-[#fff9e6] transition-colors">
                配置中心
              </Link>
              <button onClick={exportCSV} className="px-6 py-2 bg-[#8b0000] text-white rounded-full font-bold shadow-lg hover:bg-red-900 transition-colors">
                导出报表
              </button>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-[#d4af37]">
            <table className="min-w-full divide-y divide-[#d4af37]">
              <thead className="bg-[#fff9e6]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#8b0000] uppercase tracking-wider">国家</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#8b0000] uppercase tracking-wider">客户姓名</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#8b0000] uppercase tracking-wider">生辰八字</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#8b0000] uppercase tracking-wider">年龄</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#8b0000] uppercase tracking-wider">2026财运目标</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#8b0000] uppercase tracking-wider">来源子域名</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#8b0000] uppercase tracking-wider">提交时间</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d4af37]">
                {loading ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-[#5d4037]">正在读取命盘数据...</td></tr>
                ) : leads.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-[#5d4037]">暂无客户提交记录</td></tr>
                ) : leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#fff9e6] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#059669] font-bold">{lead.country || '未知'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#333]">{lead.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5d4037]">{lead.birthDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1d4ed8] font-bold">{calculateAge(lead.birthDate)} 岁</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#d97706] font-medium">{lead.wealthGoal || '未填'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#8b4513]">{lead.subdomain || '主站'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(lead.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
