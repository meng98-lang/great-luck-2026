import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await prisma.setting.findMany();
    const settings: Record<string, string> = {};
    rows.forEach((r) => {
      settings[r.key] = r.value;
    });

    return NextResponse.json({
      lineLink: settings['lineLink'] || 'https://line.me',
      whatsappLink: settings['whatsappLink'] || 'https://wa.me',
      masterPhotoUrl: settings['masterPhotoUrl'] || '',
      facebookPixel: settings['facebookPixel'] || '',
      tiktokPixel: settings['tiktokPixel'] || '',
      googleTracking: settings['googleTracking'] || '',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
