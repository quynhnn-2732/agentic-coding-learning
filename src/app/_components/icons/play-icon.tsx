interface PlayIconProps {
  size?: number
  color?: string
  className?: string
}

export function PlayIcon({ size = 48, color = 'white', className }: PlayIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 3l15 9-15 9V3z"
        fill={color}
      />
    </svg>
  )
}
