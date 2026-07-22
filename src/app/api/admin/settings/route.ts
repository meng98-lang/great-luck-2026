import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET all settings
export async function GET() {
  try {
    const rows = await prisma.setting.findMany();
    const settings: Record<string, string> = {};
    rows.forEach((r) => {
      settings[r.key] = r.value;
    });
    return NextResponse.json({ settings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST to update settings
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const updates: { key: string; value: string }[] = [];

    for (const [key, value] of Object.entries(body)) {
      if (typeof value !== 'string') continue;
      updates.push({ key, value });
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No valid settings provided' }, { status: 400 });
    }

    // Upsert each setting
    for (const { key, value } of updates) {
      await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }

    // Return all settings after update
    const rows = await prisma.setting.findMany();
    const settings: Record<string, string> = {};
    rows.forEach((r) => {
      settings[r.key] = r.value;
    });

    return NextResponse.json({ settings, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
