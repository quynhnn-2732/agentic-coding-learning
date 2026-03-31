interface ListIconProps {
  size?: number
  color?: string
  className?: string
}

export function ListIcon({ size = 24, color = 'currentColor', className }: ListIconProps) {
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
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <path d="M4 6h1v1H4z" />
      <path d="M4 12h1v1H4z" />
      <path d="M4 18h1v1H4z" />
    </svg>
  )
}
