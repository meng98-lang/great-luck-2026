import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Create leads table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Lead" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "phone" TEXT,
        "email" TEXT,
        "wealthGoal" TEXT,
        "note" TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW()
      )
    `)

    // Create settings table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Settings" (
        "id" SERIAL PRIMARY KEY,
        "key" TEXT UNIQUE NOT NULL,
        "value" TEXT,
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `)

    return NextResponse.json({
      success: true,
      message: '資料庫初始化完成！已建立 leads 和 settings 表格。',
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: '初始化失敗：' + (error instanceof Error ? error.message : '未知錯誤'),
    }, { status: 500 })
  }
}
