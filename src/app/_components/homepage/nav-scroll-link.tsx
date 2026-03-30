'use client'

interface NavScrollLinkProps {
  children: React.ReactNode
}

export function NavScrollLink({ children }: NavScrollLinkProps) {
  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-4 py-4 rounded-sm font-montserrat font-bold text-[14px] leading-[20px] tracking-[0.1px] text-[#FFEA9E] border-b border-[#FFEA9E] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287] hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E]"
    >
      {children}
    </button>
  )
}
