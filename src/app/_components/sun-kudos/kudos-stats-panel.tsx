import type { KudosStats } from "@/libs/types/kudos";

interface KudosStatsPanelProps {
  stats: KudosStats;
}

export function KudosStatsPanel({ stats }: KudosStatsPanelProps) {
  const rows = [
    { label: "Số Kudos bạn nhận được:", value: stats.received_count },
    { label: "Số Kudos bạn đã gửi:", value: stats.sent_count },
    { label: "Số lần nhận được 👍:", value: stats.heart_count },
    { label: "5 Secret Box bạn đã mở:", value: stats.secret_box_opened },
    { label: "Số Secret Box chưa mở:", value: stats.secret_box_unopened },
  ];

  return (
    <div
      className="flex flex-col gap-4 rounded-[17px] p-6"
      style={{
        backgroundColor: "#00070C",
        border: "1px solid #998C5F",
      }}
    >
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between"
        >
          <span className="font-montserrat font-bold text-sm leading-6 tracking-[0.5px] text-white">
            {row.label}
          </span>
          <span
            className="font-montserrat font-bold text-[36px] leading-[44px]"
            style={{ color: "#FFEA9E" }}
          >
            {row.value}
          </span>
        </div>
      ))}

      <button
        type="button"
        className="w-full mt-2 flex items-center justify-center gap-2 py-4 rounded-lg font-montserrat font-bold text-[16px] leading-6 text-[#00101A] transition-opacity hover:opacity-90 cursor-pointer"
        style={{ backgroundColor: "#FFEA9E" }}
      >
        Mở Secret Box 🎁
      </button>
    </div>
  );
}
