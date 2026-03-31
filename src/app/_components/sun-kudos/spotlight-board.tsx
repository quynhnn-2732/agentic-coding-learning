"use client";

import { useEffect, useRef } from "react";
import type { SpotlightData } from "@/libs/types/kudos";
import { SearchIcon } from "@/app/_components/icons/search-icon";

interface SpotlightBoardProps {
  data: SpotlightData;
}

interface FloatingNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  name: string;
  fontSize: number;
  opacity: number;
}

const NAMES = [
  "Nguyễn Hoàng Long", "Trần Minh Châu", "Phạm Thị Hà", "Lê Quang Huy",
  "Nguyễn Bá Châu", "Huỳnh Dương Xuân", "Võ Thanh Tùng", "Đặng Thu Hương",
  "Bùi Minh Đức", "Hoàng Thị Mai", "Ngô Văn Thắng", "Trương Quốc Bảo",
  "Phan Anh Tuấn", "Lý Thị Ngọc", "Dương Minh Trí", "Vũ Đình Nam",
  "Đinh Thị Lan", "Cao Xuân Phong", "Hồ Văn Kiệt", "Mai Thanh Sơn",
  "Đỗ hoàng Hiệp", "Dương thùy An", "Mai phương Thủy", "Lê Kiều Trang",
  "Nguyễn Văn Quy", "Nguyễn Bá Chức", "Nguyễn Hoàng Linh",
];

const NODE_COUNT = 120;
const LINK_DISTANCE = 100; // only connect nodes closer than this

function createNodes(w: number, h: number): FloatingNode[] {
  const nodes: FloatingNode[] = [];
  const cols = Math.ceil(Math.sqrt(NODE_COUNT * (w / h)));
  const rows = Math.ceil(NODE_COUNT / cols);
  const cellW = w / cols;
  const cellH = h / rows;

  for (let i = 0; i < NODE_COUNT; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const weight = Math.random();
    const speed = 0.08 + Math.random() * 0.12;
    const angle = Math.random() * Math.PI * 2;
    nodes.push({
      x: cellW * col + cellW * 0.1 + Math.random() * cellW * 0.8,
      y: cellH * row + cellH * 0.1 + Math.random() * cellH * 0.8,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      name: NAMES[i % NAMES.length],
      fontSize: weight > 0.8 ? 10 : weight > 0.5 ? 7.5 : 5.5,
      opacity: 0.4 + weight * 0.35,
    });
  }
  return nodes;
}

export function SpotlightBoard({ data }: SpotlightBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<FloatingNode[]>([]);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;

    function setupCanvas() {
      const rect = container!.getBoundingClientRect();
      const newW = rect.width;
      const newH = rect.height;
      const oldW = sizeRef.current.w;
      const oldH = sizeRef.current.h;

      canvas!.width = newW * dpr;
      canvas!.height = newH * dpr;
      canvas!.style.width = `${newW}px`;
      canvas!.style.height = `${newH}px`;

      if (oldW > 0 && oldH > 0 && nodesRef.current.length > 0) {
        // Scale existing node positions to new dimensions
        const scaleX = newW / oldW;
        const scaleY = newH / oldH;
        for (const node of nodesRef.current) {
          node.x *= scaleX;
          node.y *= scaleY;
        }
      } else {
        nodesRef.current = createNodes(newW, newH);
      }

      sizeRef.current = { w: newW, h: newH };
    }

    setupCanvas();

    // Re-setup on fullscreen change
    function onFullscreenChange() {
      // Small delay to let the browser finish layout
      setTimeout(setupCanvas, 100);
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);

    function animate() {
      const ctx = canvas!.getContext("2d");
      if (!ctx) return;
      const nodes = nodesRef.current;
      const { w, h } = sizeRef.current;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Update positions — continuous floating
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls with padding
        if (node.x < 10 || node.x > w - 10) {
          node.vx *= -1;
          node.x = Math.max(10, Math.min(w - 10, node.x));
        }
        if (node.y < 10 || node.y > h - 10) {
          node.vy *= -1;
          node.y = Math.max(10, Math.min(h - 10, node.y));
        }

        // Clamp speed — no random drift to keep motion smooth
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        const maxSpeed = 0.2;
        const minSpeed = 0.06;
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed;
          node.vy = (node.vy / speed) * maxSpeed;
        } else if (speed < minSpeed) {
          node.vx = (node.vx / (speed || 0.01)) * minSpeed;
          node.vy = (node.vy / (speed || 0.01)) * minSpeed;
        }
      }

      // Draw links — only between nearby nodes (short proportional lines)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const alpha = 0.2 * (1 - dist / LINK_DISTANCE);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes — triangle + name
      for (const node of nodes) {
        const r = node.fontSize > 8 ? 2.5 : 2;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y - r);
        ctx.lineTo(node.x + r, node.y + r * 0.7);
        ctx.lineTo(node.x - r, node.y + r * 0.7);
        ctx.closePath();
        ctx.fillStyle = `rgba(255, 255, 255, ${node.opacity})`;
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${node.opacity})`;
        ctx.font = `bold ${node.fontSize}px Montserrat, sans-serif`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(node.name, node.x + r + 4, node.y);
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, [data]);

  const tickerItems = data.ticker.length > 0 ? data.ticker : [];

  return (
    <div className="px-4 md:px-[144px] mt-6">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden mx-auto"
        style={{
          maxWidth: "1152px",
          height: "548px",
          border: "1px solid #998C5F",
          borderRadius: "47px",
          backgroundColor: "#00070C",
        }}
      >
        {/* Spotlight background image from design */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url(/images/sun-kudos/spotlight-bg.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        />

        {/* Counter — top center */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-baseline gap-2 z-10">
          <span
            className="font-montserrat font-bold text-[36px] leading-[44px] text-white"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}
          >
            {data.total_kudos}
          </span>
          <span
            className="font-montserrat font-bold text-[22px] leading-[28px] tracking-wider text-white"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}
          >
            KUDOS
          </span>
        </div>

        {/* Search — top left */}
        <div className="absolute top-6 left-8 z-10">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              border: "0.68px solid #998C5F",
              backgroundColor: "rgba(0, 7, 12, 0.6)",
            }}
          >
            <SearchIcon size={14} />
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="bg-transparent text-white text-[11px] font-montserrat w-[100px] outline-none placeholder:text-white/40"
            />
          </div>
        </div>

        {/* Fullscreen toggle — bottom right */}
        <div className="absolute bottom-6 right-8 z-10">
          <button
            type="button"
            onClick={() => {
              const el = containerRef.current;
              if (!el) return;
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                el.requestFullscreen();
              }
            }}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10 cursor-pointer"
            style={{ backgroundColor: "rgba(0, 7, 12, 0.6)", border: "0.5px solid rgba(153, 140, 95, 0.5)" }}
            aria-label="Xem toàn màn hình"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Ticker — bottom left */}
        {tickerItems.length > 0 && (
          <div className="absolute bottom-4 left-8 right-20 z-10 flex flex-col gap-0.5">
            {tickerItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-white/40 text-[10px] font-montserrat font-medium whitespace-nowrap">
                  {item.time}
                </span>
                <span className="text-white/80 text-[10px] font-montserrat font-bold whitespace-nowrap">
                  {item.user_name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
