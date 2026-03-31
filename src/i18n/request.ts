import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

const SUPPORTED_LOCALES = ['vi', 'en'] as const
const DEFAULT_LOCALE = 'vi'

export default getRequestConfig(async () => {
  const store = await cookies()
  const raw = store.get('locale')?.value
  const locale = raw && SUPPORTED_LOCALES.includes(raw as (typeof SUPPORTED_LOCALES)[number])
    ? raw
    : DEFAULT_LOCALE

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
