"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import type { Kudo, Hashtag, Department } from "@/libs/types/kudos";
import { fetchHighlightedKudos } from "@/libs/data/kudos-queries";
import { HighlightKudoCard } from "./highlight-kudo-card";
import { ChevronDownIcon } from "@/app/_components/icons/chevron-down-icon";

interface HighlightCarouselProps {
  initialKudos: Kudo[];
  hashtags: Hashtag[];
  departments: Department[];
}

export function HighlightCarousel({
  initialKudos,
  hashtags,
  departments,
}: HighlightCarouselProps) {
  const t = useTranslations("HighlightCarousel");
  const swiperRef = useRef<SwiperType | null>(null);
  const hashtagRef = useRef<HTMLDivElement>(null);
  const departmentRef = useRef<HTMLDivElement>(null);
  const [kudos, setKudos] = useState<Kudo[]>(initialKudos);
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter state
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );
  const [showHashtagDropdown, setShowHashtagDropdown] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const totalSlides = kudos.length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (hashtagRef.current && !hashtagRef.current.contains(e.target as Node)) {
        setShowHashtagDropdown(false);
      }
      if (departmentRef.current && !departmentRef.current.contains(e.target as Node)) {
        setShowDepartmentDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterChange = useCallback(
    async (hashtag: string | null, department: string | null) => {
      setIsFiltering(true);
      try {
        const result = await fetchHighlightedKudos(
          hashtag ?? undefined,
          department ?? undefined,
        );
        setKudos(result);
        swiperRef.current?.slideTo(0);
        setActiveIndex(0);
      } finally {
        setIsFiltering(false);
      }
    },
    [],
  );

  const handleHashtagSelect = useCallback(
    (tag: string | null) => {
      setSelectedHashtag(tag);
      setShowHashtagDropdown(false);
      handleFilterChange(tag, selectedDepartment);
    },
    [selectedDepartment, handleFilterChange],
  );

  const handleDepartmentSelect = useCallback(
    (dept: string | null) => {
      setSelectedDepartment(dept);
      setShowDepartmentDropdown(false);
      handleFilterChange(selectedHashtag, dept);
    },
    [selectedHashtag, handleFilterChange],
  );

  const onSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const currentPage = activeIndex + 1;

  if (kudos.length === 0 && !isFiltering) {
    return (
      <div className="px-4 md:px-[144px] mt-6 text-white/40 text-sm">
        {t("noHighlights")}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 highlight-kudos-carousel w-full mx-auto px-4 md:px-[144px]">
      {/* Section header row: subtitle + divider + title with filters */}
      <div className="flex flex-col gap-4 w-full px-4">
        <p className="font-montserrat font-bold text-lg md:text-[24px] leading-[32px] text-white">
          Sun* Annual Awards 2025
        </p>
        <div
          className="h-px"
          style={{ backgroundColor: "var(--color-divider)" }}
        />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2
            className="font-montserrat font-bold text-[32px] md:text-[57px] leading-[40px] md:leading-[64px] tracking-[-0.25px]"
            style={{ color: "var(--color-accent-gold)" }}
          >
            {t("title")}
          </h2>

          {/* Filter buttons */}
          <div className="flex items-center gap-2">
            <div className="relative" ref={hashtagRef}>
              <button
                type="button"
                onClick={() => {
                  setShowHashtagDropdown(!showHashtagDropdown);
                  setShowDepartmentDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-[var(--radius-sm)] border font-montserrat font-bold text-sm leading-6 text-white transition-colors duration-150 hover:bg-[var(--color-kudos-btn-hover)]"
                style={{
                  backgroundColor: selectedHashtag
                    ? "var(--color-kudos-btn-hover)"
                    : "var(--color-btn-kudos-bg)",
                  borderColor: selectedHashtag
                    ? "var(--color-accent-gold)"
                    : "var(--color-btn-kudos-border)",
                }}
              >
                <span>{selectedHashtag ?? t("hashtag")}</span>
                <ChevronDownIcon size={20} />
              </button>
              {showHashtagDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 rounded-[var(--radius-md)] border bg-[#0a1a24] border-[var(--color-btn-kudos-border)] z-50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleHashtagSelect(null)}
                    className="w-full text-left px-4 py-3 font-montserrat text-sm text-white hover:bg-[var(--color-kudos-btn-hover)] transition-colors"
                  >
                    {t("all")}
                  </button>
                  {hashtags.map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => handleHashtagSelect(h.name)}
                      className="w-full text-left px-4 py-3 font-montserrat text-sm text-white hover:bg-[var(--color-kudos-btn-hover)] transition-colors"
                    >
                      #{h.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={departmentRef}>
              <button
                type="button"
                onClick={() => {
                  setShowDepartmentDropdown(!showDepartmentDropdown);
                  setShowHashtagDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-[var(--radius-sm)] border font-montserrat font-bold text-sm leading-6 text-white transition-colors duration-150 hover:bg-[var(--color-kudos-btn-hover)]"
                style={{
                  backgroundColor: selectedDepartment
                    ? "var(--color-kudos-btn-hover)"
                    : "var(--color-btn-kudos-bg)",
                  borderColor: selectedDepartment
                    ? "var(--color-accent-gold)"
                    : "var(--color-btn-kudos-border)",
                }}
              >
                <span>{selectedDepartment ?? t("department")}</span>
                <ChevronDownIcon size={20} />
              </button>
              {showDepartmentDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 rounded-[var(--radius-md)] border bg-[#0a1a24] border-[var(--color-btn-kudos-border)] z-50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleDepartmentSelect(null)}
                    className="w-full text-left px-4 py-3 font-montserrat text-sm text-white hover:bg-[var(--color-kudos-btn-hover)] transition-colors"
                  >
                    {t("all")}
                  </button>
                  {departments.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => handleDepartmentSelect(d.name)}
                      className="w-full text-left px-4 py-3 font-montserrat text-sm text-white hover:bg-[var(--color-kudos-btn-hover)] transition-colors"
                    >
                      {d.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel — overflow hidden to clip half-cards at edges */}
      <div className="w-full max-w-[1152px] mx-auto overflow-hidden relative">
        {/* Left fade overlay */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[120px] z-[5] pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #00101A 0%, transparent 100%)",
          }}
        />
        {/* Right fade overlay */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[120px] z-[5] pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, #00101A 0%, transparent 100%)",
          }}
        />

        {/* Prev button — circle, semi-transparent dark */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-4 top-1/2 w-14 h-14 hidden md:flex items-center justify-center rounded-full transition-all z-10 cursor-pointer hover:bg-black/50"
          aria-label={t("prevKudos")}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            transform: "translateY(-50%)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path
              d="M20.5467 6.12L11.56 15.1067C10.56 16.1067 10.56 17.7067 11.56 18.7067L20.5467 27.6933"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={onSlideChange}
          slidesPerView={1.2}
          centeredSlides
          loop
          spaceBetween={32}
          speed={600}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            768: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2 },
          }}
          className="w-full"
          style={{ overflow: "hidden" }}
        >
          {kudos.map((kudo, index) => (
            <SwiperSlide key={kudo.id}>
              <HighlightKudoCard kudo={kudo} isActive={activeIndex === index} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next button — circle, semi-transparent dark */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-4 top-1/2 w-14 h-14 hidden md:flex items-center justify-center rounded-full transition-all z-10 cursor-pointer hover:bg-black/50"
          aria-label={t("nextKudos")}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            transform: "translateY(-50%)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path
              d="M11.4533 27.88L20.44 18.8933C21.44 17.8933 21.44 16.2933 20.44 15.2933L11.4533 6.30667"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-8">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-12 h-12 flex items-center justify-center rounded-[var(--radius-sm)] transition-colors duration-150 hover:bg-[rgba(255,234,158,0.10)] cursor-pointer"
          aria-label={t("prevPage")}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path
              d="M20.5467 6.12L11.56 15.1067C10.56 16.1067 10.56 17.7067 11.56 18.7067L20.5467 27.6933"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="font-montserrat font-bold leading-9">
          <span className="text-[36px]" style={{ color: "#FFEA9E" }}>{currentPage}</span>
          <span className="text-[28px]" style={{ color: "var(--color-kudos-text-secondary)" }}>
            /{totalSlides}
          </span>
        </span>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="w-12 h-12 flex items-center justify-center rounded-[var(--radius-sm)] transition-colors duration-150 hover:bg-[rgba(255,234,158,0.10)] cursor-pointer"
          aria-label={t("nextPage")}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path
              d="M11.4533 27.88L20.44 18.8933C21.44 17.8933 21.44 16.2933 20.44 15.2933L11.4533 6.30667"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
