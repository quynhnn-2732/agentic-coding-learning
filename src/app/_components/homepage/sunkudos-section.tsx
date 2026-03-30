import Image from 'next/image'
import Link from 'next/link'
import { ArrowIcon } from '@/app/_components/icons/arrow-icon'

const KUDOS_DESC =
  'Hoạt động ghi nhận và cảm ơn đồng nghiệp - lần đầu tiên được diễn ra và dành cho tất cả Sunner. Hoạt động sẽ được triển khai vào tháng 11/2025, khuyến khích người Sun* chia sẻ những lời ghi nhận, cảm ơn đồng nghiệp trên hệ thống do BTC công bố. Đây sẽ là chất liệu để Hội đồng Heads tham khảo trong quá trình lựa chọn người đạt giải.'

export function SunkudosSection() {
  return (
    <section className="flex justify-center px-4 md:px-[144px]">
      {/* Outer centering wrapper — 1224×500 per Figma D1 outer */}
      <div className="w-full max-w-[1224px] flex items-center justify-center">
        {/* Inner frame with background — 1120×500 per Figma D1 inner */}
        <div className="relative w-full max-w-[1120px] min-h-[500px] overflow-hidden rounded-[8px]">
          {/* Background image — 1120×500px, rendered 1:1 without cropping */}
          <Image
            src="/images/homepage/kudos-section-bg.png"
            alt=""
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 1120px"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-[40px] w-full px-4 py-[60px] md:px-[52px] md:py-[46px]">
            {/* Left: text + CTA */}
            <div className="flex flex-col gap-[32px] max-w-[457px]">
              <p className="font-montserrat font-bold text-[24px] leading-[32px] text-white">
                Phong trào ghi nhận
              </p>
              <h2 className="font-montserrat font-bold text-[57px] leading-[64px] tracking-[-0.25px] text-[#FFEA9E]">
                Sun* Kudos
              </h2>
              <div className="flex flex-col gap-[8px]">
                <p className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.5px] text-white uppercase">
                  ĐIỂM MỚI CỦA SAA 2025
                </p>
                <p className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.5px] text-white">
                  {KUDOS_DESC}
                </p>
              </div>
              <Link
                href="/sun-kudos"
                className="flex items-center gap-[8px] w-fit px-[24px] py-[16px] bg-[#FFEA9E] rounded-[8px] font-montserrat font-bold text-[22px] leading-[28px] text-[#00101A] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] active:opacity-80 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E] focus-visible:ring-offset-2"
              >
                Chi tiết
                <ArrowIcon size={24} color="#00101A" />
              </Link>
            </div>

            {/* Right: KUDOS logo */}
            <div className="flex-shrink-0">
              <Image
                src="/images/homepage/kudos-logo.svg"
                alt="KUDOS"
                width={300}
                height={120}
                loading="lazy"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
