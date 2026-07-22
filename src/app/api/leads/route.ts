import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, wealthGoal } = body

    if (!name) {
      return NextResponse.json({ error: '姓名為必填欄位' }, { status: 400 })
    }

    const lead = await prisma.lead.create({
      data: { name, phone, email, wealthGoal },
    })

    const lineMessage = encodeURIComponent(
      '🧧 2026好運接龍！我剛填寫了我的富貴目標：「' + (wealthGoal || '迎接好運') + '」，快來一起接龍，把好運傳遞下去！

👉 https://great-luck-2026.vercel.app'
    )

    return NextResponse.json({
      success: true,
      lead,
      redirect: 'https://line.me/R/msg/text/?' + lineMessage,
    })
  } catch (error) {
    return NextResponse.json({ error: '提交失敗' }, { status: 500 })
  }
}
