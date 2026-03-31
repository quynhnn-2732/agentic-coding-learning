import { getTranslations } from 'next-intl/server'

export async function Footer() {
  const t = await getTranslations('Footer')

  return (
    <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-center px-[90px] py-[40px] border-t border-divider">
      <p className="font-montserrat-alt font-bold text-base leading-6 text-text-white text-center">
        {t('copyright')}
      </p>
    </footer>
  )
}
