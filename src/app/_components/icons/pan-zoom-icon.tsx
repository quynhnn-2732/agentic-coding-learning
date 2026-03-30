interface PanZoomIconProps {
  size?: number
  color?: string
  className?: string
}

export function PanZoomIcon({ size = 24, color = 'white', className }: PanZoomIconProps) {
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
        d="M12 2v20M2 12h20M5 5l2 2M17 5l-2 2M5 19l2-2M17 19l-2-2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
