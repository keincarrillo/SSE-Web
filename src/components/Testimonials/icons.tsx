export { ChevronLeft, ChevronRight } from 'lucide-react'

export const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-1 my-2.5 mb-4.5">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-gold text-lg">★</span>
    ))}
  </div>
)
