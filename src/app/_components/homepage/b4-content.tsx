import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

const TEXT_CLASS =
  'font-montserrat font-bold text-[24px] leading-[32px] text-white text-justify whitespace-pre-line'

export async function B4Content() {
  const t = await getTranslations('Homepage')
  return (
    <section className="flex justify-center px-4 md:px-[144px]">
      <div className="flex flex-col items-center gap-[32px] max-w-[1152px] w-full px-4 py-[60px] md:px-[104px] md:py-[120px] rounded-[8px]">
        {/* ROOT FURTHER logo — two overlapping layers */}
        <div className="relative flex items-center justify-center" style={{ width: 290, height: 134 }}>
          <Image
            src="/images/homepage/root-further-b4-1.png"
            alt="ROOT FURTHER"
            width={189}
            height={67}
            quality={100}
            className="absolute top-0 left-1/2 -translate-x-1/2"
            loading="lazy"
          />
          <Image
            src="/images/homepage/root-further-b4-2.png"
            alt=""
            width={290}
            height={67}
            quality={100}
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            loading="lazy"
          />
        </div>

        {/* Text block 1 — justified paragraphs (512px in Figma) */}
        <p className={TEXT_CLASS}>{t('b4Block1p1')}{'\n\n'}{t('b4Block1p2')}</p>

        {/* Centered English quote */}
        <blockquote className="flex flex-col items-center gap-[4px] py-[16px]">
          <p className="font-montserrat font-bold text-[24px] leading-[32px] text-white text-center italic">
            &ldquo;{t('b4Quote')}&rdquo;
          </p>
          <p className="font-montserrat font-bold text-[24px] leading-[32px] text-white text-center">
            {t('b4QuoteVi')}
          </p>
        </blockquote>

        {/* Text block 2 — justified paragraphs (448px in Figma) */}
        <p className={TEXT_CLASS}>{t('b4Block2')}</p>
      </div>
    </section>
  )
}
