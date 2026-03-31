interface BoldIconProps {
  size?: number
  color?: string
  className?: string
}

export function BoldIcon({ size = 24, color = 'currentColor', className }: BoldIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"
        fill={color}
      />
      <path
        d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"
        fill={color}
      />
    </svg>
  )
}
