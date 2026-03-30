import Image from 'next/image'

export function KeyvisualBanner() {
  return (
    <div className="relative w-full h-[440px] md:min-h-[calc(100vh-80px)] overflow-hidden">
      <Image
        src="/images/homepage/hero-keyvisual.png"
        alt=""
        fill
        priority
        quality={100}
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Bottom gradient overlay to blend into dark page */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0) 52.79%)',
        }}
      />
      {/* ROOT FURTHER logo overlay — "KV" frame from Figma */}
      <div className="absolute left-4 md:left-[144px] top-[96px]">
        <Image
          src="/images/root-further-logo.png"
          alt="ROOT FURTHER"
          width={451}
          height={200}
          priority
          quality={100}
          className="w-[200px] md:w-[451px] h-auto"
        />
      </div>
      {/* A_Title overlay — subtitle + divider + page heading inside banner (Figma "Bìa" layout) */}
      <div className="absolute left-4 md:left-[144px] right-4 md:right-[144px] bottom-[40px] md:bottom-[80px] flex flex-col gap-[16px]">
        <span className="font-montserrat font-bold text-[24px] leading-[32px] text-white text-center">
          Sun* annual awards 2025
        </span>
        {/* Rectangle 26 — thin decorative divider between subtitle and heading */}
        <div className="w-full h-px bg-white/30" />
        <h1 className="font-montserrat font-bold text-[32px] md:text-[57px] leading-[40px] md:leading-[64px] tracking-[-0.25px] text-[#FFEA9E] text-center">
          Hệ thống giải thưởng SAA 2025
        </h1>
      </div>
    </div>
  )
}
