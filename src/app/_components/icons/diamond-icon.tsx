interface DiamondIconProps {
  className?: string
  size?: number
}

/** MM_MEDIA_Diamond — gem/diamond icon used in quantity metadata boxes */
export function DiamondIcon({ className, size = 20 }: DiamondIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M10 2L14.5 7H5.5L10 2Z"
        fill="currentColor"
        opacity="0.6"
      />
      <path
        d="M5.5 7L10 18L14.5 7H5.5Z"
        fill="currentColor"
      />
      <path
        d="M2 7L5.5 7L10 18L4 10L2 7Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M18 7L14.5 7L10 18L16 10L18 7Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M2 7H5.5L10 2L14.5 7H18L10 2L2 7Z"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
