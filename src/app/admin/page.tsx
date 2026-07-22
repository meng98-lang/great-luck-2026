'use client'

import { useEffect, useState } from 'react'
import AdminGuard from '@/components/AdminGuard'

interface Lead {
  id: number
  name: string
  phone: string | null
  email: string | null
  wealthGoal: string | null
  createdAt: string
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/leads')
      const data = await res.json()
      setLeads(data.leads || [])
    } catch (err) {
      console.error('獲取數據失敗', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('確定要刪除這筆資料嗎？')) return
    try {
      await fetch('/api/admin/leads?id=' + id, { method: 'DELETE' })
      fetchLeads()
    } catch (err) {
      alert('刪除失敗')
    }
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#f7e8c3] font-serif p-6">
        <h1 className="text-3xl font-bold text-red-800 mb-6 text-center">管理後台 - 好運名單</h1>
        <div className="bg-white rounded-xl shadow-lg p-4 overflow-x-auto mb-4">
          <p className="text-gray-600 mb-2">共 {leads.length} 筆資料</p>
          {loading ? (
            <p className="text-center py-8">載入中…</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-amber-100">
                  <th className="border p-3 text-left">ID</th>
                  <th className="border p-3 text-left">姓名</th>
                  <th className="border p-3 text-left">電話</th>
                  <th className="border p-3 text-left">Email</th>
                  <th className="border p-3 text-left">富貴目標</th>
                  <th className="border p-3 text-left">時間</th>
                  <th className="border p-3 text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-amber-50">
                    <td className="border p-3">{lead.id}</td>
                    <td className="border p-3 font-medium">{lead.name}</td>
                    <td className="border p-3">{lead.phone || '-'}</td>
                    <td className="border p-3">{lead.email || '-'}</td>
                    <td className="border p-3">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                        {lead.wealthGoal || '未填寫'}
                      </span>
                    </td>
                    <td className="border p-3 text-sm text-gray-500">
                      {new Date(lead.createdAt).toLocaleString('zh-TW')}
                    </td>
                    <td className="border p-3">
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={7} className="border p-6 text-center text-gray-500">
                      尚無資料
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminGuard>
  )
}
