export const ChevronLeft = () => (
  <svg
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

export const ChevronRight = () => (
  <svg
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
)

export const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    width="13" height="13" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export const InfoIcon = () => (
  <svg
    width="11" height="11" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
)
