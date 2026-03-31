import { HeroBadge } from '@/app/_components/sun-kudos/hero-badge'
import { CollectibleIcon } from '@/app/_components/sun-kudos/collectible-icon'

const BADGE_TIERS = [
  {
    tier: 'new' as const,
    threshold: 'Có 1-4 người gửi Kudos cho bạn',
    description: 'Hành trình lan tỏa điều tốt đẹp bắt đầu – những lời cảm ơn và ghi nhận đầu tiên đã tìm đến bạn.',
  },
  {
    tier: 'rising' as const,
    threshold: 'Có 5-9 người gửi Kudos cho bạn',
    description: 'Hình ảnh bạn đang lớn dần trong trái tim đồng đội bằng sự tử tế và cống hiến của mình.',
  },
  {
    tier: 'super' as const,
    threshold: 'Có 10–20 người gửi Kudos cho bạn',
    description: 'Bạn đã trở thành biểu tượng được tin tưởng và yêu quý, người luôn sẵn sàng hỗ trợ và được nhiều đồng đội nhớ đến.',
  },
  {
    tier: 'legend' as const,
    threshold: 'Có hơn 20 người gửi Kudos cho bạn',
    description: 'Bạn đã trở thành huyền thoại – người để lại dấu ấn khó quên trong tập thể bằng trái tim và hành động của mình.',
  },
]

const COLLECTIBLE_ICONS = [
  { name: 'REVIVAL', imageSrc: '/images/rules/icon-revival.png' },
  { name: 'TOUCH OF LIGHT', imageSrc: '/images/rules/icon-touch-of-light.png' },
  { name: 'STAY GOLD', imageSrc: '/images/rules/icon-stay-gold.png' },
  { name: 'FLOW TO HORIZON', imageSrc: '/images/rules/icon-flow-to-horizon.png' },
  { name: 'BEYOND THE BOUNDARY', imageSrc: '/images/rules/icon-beyond-the-boundary.png' },
  { name: 'ROOT FURTHER', imageSrc: '/images/rules/icon-root-further.png' },
]

export function RulesPanelContent() {
  return (
    <div className="flex flex-col gap-4">
      {/* Section 1: Người nhận Kudos */}
      <section className="flex flex-col gap-4">
        <h2 className="font-montserrat font-bold text-[22px] leading-7 text-[var(--color-accent-gold)]">
          NGƯỜI NHẬN KUDOS: HUY HIỆU HERO CHO NHỮNG ẢNH HƯỞNG TÍCH CỰC
        </h2>
        <p className="font-montserrat font-bold text-base leading-6 tracking-[0.5px] text-white text-justify">
          Dựa trên số lượng đồng đội gửi trao Kudos, bạn sẽ sở hữu Huy hiệu Hero tương ứng, được hiển thị trực tiếp cạnh tên profile
        </p>

        {BADGE_TIERS.map((tier) => (
          <div key={tier.tier} className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <HeroBadge tier={tier.tier} />
              <span className="font-montserrat font-bold text-base leading-6 tracking-[0.5px] text-white">
                {tier.threshold}
              </span>
            </div>
            <p className="font-montserrat font-bold text-sm leading-5 tracking-[0.1px] text-white text-justify">
              {tier.description}
            </p>
          </div>
        ))}
      </section>

      {/* Section 2: Người gửi Kudos */}
      <section className="flex flex-col gap-4">
        <h2 className="font-montserrat font-bold text-[22px] leading-7 text-[var(--color-accent-gold)]">
          NGƯỜI GỬI KUDOS: SƯU TẬP TRỌN BỘ 6 ICON, NHẬN NGAY PHẦN QUÀ BÍ ẨN
        </h2>
        <p className="font-montserrat font-bold text-base leading-6 tracking-[0.5px] text-white text-justify">
          Mỗi lời Kudos bạn gửi sẽ được đăng tải trên hệ thống và nhận về những lượt ❤️ từ cộng đồng Sunner. Cứ mỗi 5 lượt ❤️, bạn sẽ được mở 1 Secret Box, với cơ hội nhận về một trong 6 icon độc quyền của SAA.
        </p>

        <div className="flex flex-wrap gap-4 px-6 justify-between">
          {COLLECTIBLE_ICONS.map((icon) => (
            <CollectibleIcon key={icon.name} name={icon.name} imageSrc={icon.imageSrc} />
          ))}
        </div>

        <p className="font-montserrat font-bold text-base leading-6 tracking-[0.5px] text-white text-justify">
          Những Sunner thu thập trọn bộ 6 icon sẽ nhận về một phần quà bí ẩn từ SAA 2025.
        </p>
      </section>

      {/* Section 3: Kudos Quốc Dân */}
      <section className="flex flex-col gap-4">
        <h2 className="font-montserrat font-bold text-2xl leading-8 text-[var(--color-accent-gold)]">
          KUDOS QUỐC DÂN
        </h2>
        <p className="font-montserrat font-bold text-base leading-6 tracking-[0.5px] text-white text-justify">
          5 Kudos nhận về nhiều ❤️ nhất toàn Sun* sẽ chính thức trở thành Kudos Quốc Dân và được trao phần quà đặc biệt từ SAA 2025: Root Further.
        </p>
      </section>
    </div>
  )
}
