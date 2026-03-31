export default function SunKudosLoading() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[var(--color-bg-dark)]">
      {/* Header skeleton */}
      <div className="sticky top-0 z-10 h-[80px] bg-[var(--color-header-bg)] backdrop-blur-sm" />

      {/* Hero skeleton */}
      <div className="px-4 md:px-[144px] pt-8 md:pt-16 space-y-4">
        <div className="h-8 w-[300px] bg-white/5 rounded animate-pulse" />
        <div className="h-16 w-[400px] bg-white/5 rounded animate-pulse" />
        <div className="flex gap-4 mt-4">
          <div className="h-[72px] flex-1 max-w-[738px] bg-white/5 rounded-full animate-pulse" />
          <div className="h-[72px] w-[381px] bg-white/5 rounded-full animate-pulse hidden md:block" />
        </div>
      </div>

      {/* Highlight section skeleton */}
      <div className="px-4 md:px-[144px] mt-10 space-y-4">
        <div className="h-6 w-[200px] bg-white/5 rounded animate-pulse" />
        <div className="h-px bg-white/5" />
        <div className="h-10 w-[300px] bg-white/5 rounded animate-pulse" />
        <div className="flex gap-4 mt-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-[528px] h-[480px] flex-shrink-0 bg-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>

      {/* Spotlight skeleton */}
      <div className="px-4 md:px-[144px] mt-10">
        <div className="h-[548px] bg-white/5 rounded-[47px] animate-pulse" />
      </div>

      {/* Feed + Sidebar skeleton */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 px-4 md:px-[144px] mt-10">
        <div className="flex-1 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[400px] bg-white/5 rounded-3xl animate-pulse" />
          ))}
        </div>
        <div className="w-full lg:w-[422px] space-y-6">
          <div className="h-[400px] bg-white/5 rounded-[17px] animate-pulse" />
          <div className="h-[500px] bg-white/5 rounded-[17px] animate-pulse" />
        </div>
      </div>
    </main>
  )
}
