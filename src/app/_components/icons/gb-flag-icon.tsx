export function GbFlagIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="12" fill="#012169" />
      {/* White diagonal cross */}
      <path d="M3 4L21 20" stroke="white" strokeWidth="2" />
      <path d="M21 4L3 20" stroke="white" strokeWidth="2" />
      {/* Red diagonal cross */}
      <path d="M3 4L21 20" stroke="#C8102E" strokeWidth="0.8" />
      <path d="M21 4L3 20" stroke="#C8102E" strokeWidth="0.8" />
      {/* White cross */}
      <rect x="10" y="2" width="4" height="20" fill="white" />
      <rect x="2" y="10" width="20" height="4" fill="white" />
      {/* Red cross */}
      <rect x="11" y="2" width="2" height="20" fill="#C8102E" />
      <rect x="2" y="11" width="20" height="2" fill="#C8102E" />
    </svg>
  )
}
