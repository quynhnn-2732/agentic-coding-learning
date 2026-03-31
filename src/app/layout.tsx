import type { Metadata } from 'next'
import { Montserrat, Montserrat_Alternates } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { WriteKudoProvider } from '@/app/_components/sun-kudos/write-kudo/write-kudo-context'
import { WidgetButton } from '@/app/_components/homepage/widget-button'
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${montserrat.variable} ${montserratAlt.variable} antialiased`}>
        <noscript>
          <div style={{ padding: '20px', textAlign: 'center', color: '#fff', background: '#00101A' }}>
            Vui lòng bật JavaScript để sử dụng ứng dụng này.
          </div>
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <WriteKudoProvider>
            {children}
            <WidgetButton />
          </WriteKudoProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
