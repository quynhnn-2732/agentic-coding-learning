import Image from 'next/image'

export function KudosKeyvisual() {
  return (
    <div
      className="absolute top-0 left-0 right-0 h-[512px] overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <Image
        src="/images/sun-kudos/keyvisual-bg.png"
        alt=""
        width={2882}
        height={2044}
        priority
        unoptimized
        className="w-full h-full object-fill"
      />
      {/* Diagonal gradient overlay — darkens left side for text readability (per Figma: 25deg) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(25.44deg, #00101A 14.74%, rgba(0, 19, 32, 0) 67.8%)',
        }}
      />
    </div>
  )
}
