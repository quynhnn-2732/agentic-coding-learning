export function VnFlagIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="12" fill="#DA251D" />
      <polygon
        points="12,5 13.5,9.5 18.5,9.5 14.5,12.5 16,17 12,14 8,17 9.5,12.5 5.5,9.5 10.5,9.5"
        fill="#FFFF00"
      />
    </svg>
  )
}
