export const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

export const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

export const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-1 my-2.5 mb-[18px]">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-gold text-[18px]">★</span>
    ))}
  </div>
)
