interface AccountIconProps {
  size?: number
  color?: string
}

export function AccountIcon({ size = 40, color = 'currentColor' }: AccountIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="19" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="20" cy="15" r="5" stroke={color} strokeWidth="1.5" />
      <path
        d="M8 33c0-6.627 5.373-12 12-12s12 5.373 12 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
