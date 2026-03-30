import Image from 'next/image'
import { Countdown } from './countdown'
import { EventInfo } from './event-info'
import { CtaButtons } from './cta-buttons'

const EVENT_DATETIME = process.env.NEXT_PUBLIC_EVENT_DATETIME ?? ''
const EVENT_LOCATION = process.env.NEXT_PUBLIC_EVENT_LOCATION ?? ''

export function HeroSection() {
  return (
    // Background is managed at page level (3.5_Keyvisual + Cover + bottom-fade)
    <section className="relative min-h-[calc(100vh-80px)]">
      {/* Content — Frame 487 + surroundings */}
      <div className="relative z-10 flex flex-col px-4 pt-[80px] md:px-[144px] md:pt-[96px]">
        {/* Frame 487: ROOT FURTHER + Countdown + EventInfo + CTA */}
        <div className="flex flex-col gap-[40px] max-w-[1224px]">
          {/* B.1_Key Visual — ROOT FURTHER logo */}
          <Image
            src="/images/root-further-logo.png"
            alt="ROOT FURTHER"
            width={451}
            height={200}
            priority
            quality={100}
          />

          {/* B1_Countdown */}
          <Countdown targetDateIso={EVENT_DATETIME} />

          {/* B2_Event Info */}
          <EventInfo
            datetimeIso={EVENT_DATETIME}
            location={EVENT_LOCATION}
          />

          {/* B3_CTA buttons */}
          <CtaButtons />
        </div>
      </div>
    </section>
  )
}
