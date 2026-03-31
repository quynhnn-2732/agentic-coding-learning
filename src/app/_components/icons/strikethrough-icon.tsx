interface StrikethroughIconProps {
  size?: number
  color?: string
  className?: string
}

export function StrikethroughIcon({ size = 24, color = 'currentColor', className }: StrikethroughIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 4H9a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h6" />
      <path d="M8 20h7a3 3 0 0 0 3-3v0a3 3 0 0 0-3-3H6" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  )
}
