import { NextIntlClientProvider } from 'next-intl'
import messages from '../../messages/vi.json'

export function IntlWrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="vi" messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
