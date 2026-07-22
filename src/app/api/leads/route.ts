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
      data: { name, gender, birthDate: String(birthDate), wealthGoal: String(wealthGoal), ip, userAgent, country, subdomain: subdomain || req.headers.get('host') || 'Unknown' },
    });
    const settings = await prisma.setting.findMany();
    const settingsMap = settings.reduce((acc: any, curr: any) => ({ ...acc, [currimport { NextRequest, NextResponse } from 'next/server';
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

 // Priority: WhatsApp > Line
 const waSetting = await prisma.setting.findUnique({ where: { key: 'WhatsApp号码' } });
 const waNumber = waSetting?.value || '8617706358414';
 
 const lineSetting = await prisma.setting.findUnique({ where: { key: 'Line链接' } });
 const lineUrl = lineSetting?.value;

 const message = `师傅您好，我是${name}，生辰是${birthDate}，性别${gender === 'male' ? '男' : '女'}，我2026年的财运目标是：${wealthGoal}。申请领取大运报告。`;

 let redirectUrl: string;
 if (waNumber) {
 redirectUrl = `https://api.whatsapp.com/send/?phone=${waNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
 } else if (lineUrl) {
 let cleanUrl = lineUrl;
 if (cleanUrl.includes('?')) cleanUrl = cleanUrl.split('?')[0];
 if (!cleanUrl.endsWith('/')) cleanUrl += '/';
 redirectUrl = `${cleanUrl}?text=${encodeURIComponent(message)}`;
 } else {
 redirectUrl = `https://api.whatsapp.com/send/?phone=8617706358414&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
 }

 return NextResponse.json({ success: true, redirectUrl });
 } catch (error: any) {
 console.error('API Error:', error);
 return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
 }
                                                                  }.key]: curr.value }), {});
    const waLink = settingsMap['WhatsApp链接'] || 'https://wa.me/8617706358414';
    const lineLink = settingsMap['Line链接'];
    let finalBaseUrl = waLink || lineLink;
    if (finalBaseUrl.includes('?')) finalBaseUrl = finalBaseUrl.split('?')[0];
    if (!finalBaseUrl.endsWith('/')) finalBaseUrl += '/';
    const message = `师傅您好，我是${name}，生辰是${birthDate}，性别${gender === 'male' ? '男' : '女'}，我的2026财运目标是：${wealthGoal}。申请领取报告。`;
    const redirectUrl = `${finalBaseUrl}?text=${encodeURIComponent(message)}`;
    return NextResponse.json({ success: true, redirectUrl });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
