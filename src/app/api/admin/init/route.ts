import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Lead table with wealth_goal
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "leads" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "gender" TEXT NOT NULL,
        "birth_date" TEXT NOT NULL,
        "wealth_goal" TEXT,
        "ip" TEXT,
        "country" TEXT,
        "user_agent" TEXT,
        "subdomain" TEXT,
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    
    // Settings table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "settings" (
        "id" SERIAL PRIMARY KEY,
        "key" TEXT UNIQUE NOT NULL,
        "value" TEXT NOT NULL
      );
    `);
    
    return NextResponse.json({ success: true, message: 'Great Luck DB Initialized' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
