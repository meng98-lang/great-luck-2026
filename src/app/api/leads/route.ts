import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, gender, birthDate, wealthGoal, subdomain } = body;
    const ip = req.headers.get('x-forwarded-for') || '0.0.0.0';
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const country = req.headers.get('x-vercel-ip-country') || 'Unknown';

    await prisma.lead.create({ 
      data: {
        name,
        gender,
        birthDate: String(birthDate),
        wealthGoal: String(wealthGoal),
        ip,
        userAgent,
        country,
        subdomain: subdomain || req.headers.get('host') || 'Unknown',
      },
    });

    const lineSetting = await prisma.setting.findUnique({ where: { key: 'Line链接' } });
    const baseUrl = lineSetting?.value || 'https://line.me/R/oaMessage/@758wcfpy/';
    
    let cleanUrl = baseUrl;
    if (cleanUrl.includes('?')) cleanUrl = cleanUrl.split('?')[0];
    if (!cleanUrl.endsWith('/')) cleanUrl += '/';

    const message = `师傅您好，我是${name}，生辰是${birthDate}，性别${gender === 'male' ? '男' : '女'}，我2026年的财运目标是：${wealthGoal}。申请免费领取大运报告。`;
    const redirectUrl = `${cleanUrl}?text=${encodeURIComponent(message)}`;

    return NextResponse.json({ success: true, redirectUrl });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
