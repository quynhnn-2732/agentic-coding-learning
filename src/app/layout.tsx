import type { Metadata } from 'next'
import { Montserrat, Montserrat_Alternates } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
})

const montserratAlt = Montserrat_Alternates({
  variable: '--font-montserrat-alt',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SAA 2025 — Sun Annual Awards',
  description: 'Sun Annual Awards 2025',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${montserrat.variable} ${montserratAlt.variable} antialiased`}>
        <noscript>
          <div style={{ padding: '20px', textAlign: 'center', color: '#fff', background: '#00101A' }}>
            Vui lòng bật JavaScript để sử dụng ứng dụng này.
          </div>
        </noscript>
        {children}
      </body>
    </html>
  )
}
