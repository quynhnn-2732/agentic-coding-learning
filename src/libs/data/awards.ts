import type { AwardDetail } from '@/libs/types/homepage'

export const awardsData: AwardDetail[] = [
  {
    id: '1',
    slug: 'top-talent',
    name: 'Top Talent',
    description:
      'Giải thưởng Top Talent vinh danh những cá nhân xuất sắc toàn diện – những người không ngừng khẳng định năng lực chuyên môn vững vàng, hiệu suất công việc vượt trội, luôn mang lại giá trị vượt kỳ vọng, được đánh giá cao bởi khách hàng và đồng đội. Với tinh thần sẵn sàng nhận mọi nhiệm vụ tổ chức giao phó, họ luôn là nguồn cảm hứng, thúc đẩy động lực và tạo ảnh hưởng tích cực đến cả tập thể.',
    imageUrl: '/images/homepage/award-top-talent.png',
    quantity: 10,
    unit: 'Cá nhân',
    prizeValue: '7.000.000 VNĐ',
  },
  {
    id: '2',
    slug: 'top-project',
    name: 'Top Project',
    description:
      'Tôn vinh dự án tiêu biểu đạt thành tựu xuất sắc về chất lượng, hiệu quả và tác động.',
    imageUrl: '/images/homepage/award-top-project.png',
    quantity: 2,
    unit: 'Tập thể',
    prizeValue: '15.000.000 VNĐ',
  },
  {
    id: '3',
    slug: 'top-project-leader',
    name: 'Top Project Leader',
    description:
      'Ghi nhận nhà lãnh đạo dự án xuất sắc với khả năng dẫn dắt đội nhóm đạt kết quả vượt mong đợi.',
    imageUrl: '/images/homepage/award-top-project-leader.png',
    quantity: 3,
    unit: 'Cá nhân',
    prizeValue: '7.000.000 VNĐ',
  },
  {
    id: '4',
    slug: 'best-manager',
    name: 'Best Manager',
    description:
      'Tôn vinh quản lý xuất sắc có tầm nhìn chiến lược, năng lực phát triển đội ngũ và kết quả kinh doanh nổi bật.',
    imageUrl: '/images/homepage/award-best-manager.png',
    quantity: 1,
    unit: 'Cá nhân',
    prizeValue: '10.000.000 VNĐ',
  },
  {
    id: '5',
    slug: 'signature-2025-creator',
    name: 'Signature 2025 - Creator',
    description:
      'Giải thưởng Signature vinh danh cá nhân hoặc tập thể thể hiện tinh thần đặc trưng mà Sun* hướng tới trong từng thời kỳ. Trong năm 2025, giải thưởng Signature vinh danh Creator - cá nhân/tập thể mang tư duy chủ động và nhạy bén, luôn nhìn thấy cơ hội trong thách thức và tiên phong trong hành động. Với tư duy kiến tạo và tinh thần "Creator" đặc trưng của Sun*, họ không chỉ phản ứng tích cực trước sự thay đổi mà còn chủ động tạo ra cải tiến, góp phần định hình chuẩn mực mới.',
    imageUrl: '/images/homepage/award-signature-creator.png',
    quantity: 1,
    unit: 'Cá nhân hoặc tập thể',
    prizeValue: { individual: '5.000.000 VNĐ', team: '8.000.000 VNĐ' },
  },
  {
    id: '6',
    slug: 'mvp',
    name: 'MVP',
    description:
      'Most Valuable Player — Vinh danh cá nhân có đóng góp giá trị nhất, tạo tác động lớn nhất cho tổ chức trong năm.',
    imageUrl: '/images/homepage/award-mvp.png',
    quantity: 1,
    unit: 'Cá nhân',
    prizeValue: '15.000.000 VNĐ',
  },
]
