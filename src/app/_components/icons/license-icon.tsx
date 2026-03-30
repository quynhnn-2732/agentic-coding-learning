interface LicenseIconProps {
  className?: string
  size?: number
}

/** MM_MEDIA_License — badge/medal icon used in prize value metadata boxes */
export function LicenseIcon({ className, size = 20 }: LicenseIconProps) {
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
      <circle cx="10" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="9" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 16.5L10 18L13 16.5V14.5C12.1 15 11.1 15.2 10 15.2C8.9 15.2 7.9 15 7 14.5V16.5Z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  )
}
