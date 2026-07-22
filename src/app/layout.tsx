// Build Trigger: 2026-07-22
// Build Trigger: 2026-07-22import type { Metadata } from 'next'import './globals.css'export const metadata: Metadata = {  title: '2026 好運接龍 | 大吉大利',  description: '迎接2026年好運，填寫資料獲取專屬好運祝福',  openGraph: {    title: '2026 好運接龍 | 大吉大利',    description: '迎接2026年好運，填寫資料獲取專屬好運祝福',  },}export default function RootLayout({ children }: { children: React.ReactNode }) {  return (    <html lang="zh-Hant">      <head>        <script dangerouslySetInnerHTML={{          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-XXXXXXX');`,        }} />        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />        <script dangerouslySetInnerHTML={{          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`,        }} />        <meta name="viewport" content="width=device-width, initial-scale=1" />        <link rel="icon" href="/favicon.ico" />      </head>      <body>{children}</body>    </html>  )}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "大師親自解析：您的十年大運何時降臨？",
  description: "預知流年轉機 · 開啟命定財庫",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
