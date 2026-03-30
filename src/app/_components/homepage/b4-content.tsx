import Image from 'next/image'

const TEXT_CLASS =
  'font-montserrat font-bold text-[24px] leading-[32px] text-white text-justify whitespace-pre-line'

const B4_BLOCK_1 = `Đứng trước bối cảnh thay đổi như vũ bão của thời đại AI và yêu cầu ngày càng cao từ khách hàng, Sun* lựa chọn chiến lược đa dạng hoá năng lực để không chỉ nỗ lực trở thành tinh anh trong lĩnh vực của mình, mà còn hướng đến một cái đích cao hơn, nơi mọi Sunner đều là "problem-solver" — chuyên gia trong việc giải quyết mọi vấn đề, tìm lời giải cho mọi bài toán của dự án, khách hàng và xã hội.

Lấy cảm hứng từ sự đa dạng năng lực, khả năng phát triển linh hoạt cùng tinh thần đào sâu để bứt phá trong kỷ nguyên AI, "Root Further" đã được chọn để trở thành chủ đề chính thức của Lễ trao giải Sun* Annual Awards 2025.

Vươn ra khỏi nét nghĩa bề mặt, "Root Further" chính là hành trình chúng ta không ngừng vươn xa hơn, cắm rễ mạnh hơn, chạm đến những tầng "địa chất" ẩn sâu để tiếp tục tồn tại, vươn lên và nuôi dưỡng đam mê kiến tạo giá trị luôn cháy bỏng của người Sun*. Muốn hình ảnh bộ rễ liên tục đâm sâu vào lòng đất, mạnh mẽ len lỏi qua từng lớp "trầm tích" để thẩm thấu những gì tinh tuý nhất, người Sun* cũng đang "hấp thụ" dưỡng chất từ thời đại và những thử thách của thị trường để làm mình mạnh mẽ hơn, mở rộng năng lực và mạnh mẽ "bén rễ" vào kỷ nguyên AI — một tầng "địa chất" hoàn toàn mới, phức tạp và đầy thách thức, nhưng cũng hội tụ vô vàn tiềm năng cùng cơ hội.`

const B4_BLOCK_2 = `Trước giông bão, chỉ những tán cây có bộ rễ đủ mạnh mới có thể trụ vững. Một tổ chức với những cá nhân tự tin vào năng lực đa dạng, sẵn sàng kiến tạo và đón nhận thử thách, làm chủ sự thay đổi là tổ chức không chỉ vững vàng trong biến động, mà còn khai thác được mọi lợi thế, chinh phục các thách thức của thời cuộc. Không đơn thuần là tên gọi của chương mới trên hành trình phát triển tổ chức, "Root Further" còn như một lời kêu gọi, động viên mỗi chúng ta hãy dám tin vào bản thân, dám đào sâu, khai mở mọi tiềm năng, dám phá bỏ giới hạn, dám trở thành phiên bản đa diện và xuất sắc nhất của mình. Bởi trong thời đại AI, đa dạng năng lực và tận dụng sức mạnh thời cuộc chính là điều kiện tiên quyết để trưởng thành.

Không ai biết trước ẩn sâu trong "lòng đất" của ngành công nghệ và thị trường hiện đại còn bao tầng "địa chất" bí ẩn. Chỉ biết rằng khi "Root Further" đã trở thành tinh thần cốt rễ, chúng ta sẽ không sợ hãi, mà càng thấy hào hức trước bất cứ vùng đất mới nào trên hành trình tiến về phía trước. Vì ta luôn tin rằng, trong chính những miền vô tận đó, là bao điều kỳ diệu và cơ hội vươn mình đang chờ ta.`

export function B4Content() {
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
        <p className={TEXT_CLASS}>{B4_BLOCK_1}</p>

        {/* Centered English quote */}
        <blockquote className="flex flex-col items-center gap-[4px] py-[16px]">
          <p className="font-montserrat font-bold text-[24px] leading-[32px] text-white text-center italic">
            &ldquo;A tree with deep roots fears no storm&rdquo;
          </p>
          <p className="font-montserrat font-bold text-[24px] leading-[32px] text-white text-center">
            (Cây sâu bền rễ, bão giông chẳng nề - Ngạn ngữ Anh)
          </p>
        </blockquote>

        {/* Text block 2 — justified paragraphs (448px in Figma) */}
        <p className={TEXT_CLASS}>{B4_BLOCK_2}</p>
      </div>
    </section>
  )
}
