import { useRef, useEffect, useState } from 'react'

const ANIM_STYLES = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp 0.7s ease forwards; }
.hidden-init { opacity: 0; }

a.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: white;
  background: var(--color-green-dark);
  padding: 0 26px;
  height: 50px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.25s;
}
a.btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
  a.btn {
    padding: 0 20px;
    height: 44px;
    font-size: 14px;
  }
}
`

function inject() {
  if (document.getElementById('social-anim')) return
  const s = document.createElement('style')
  s.id = 'social-anim'
  s.innerHTML = ANIM_STYLES
  document.head.appendChild(s)
}

export function useInView() {
  const ref = useRef<HTMLElement | null>(null)
  const [v, setV] = useState(false)

  useEffect(() => {
    inject()
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); obs.disconnect() }
    })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return { ref, v }
}
