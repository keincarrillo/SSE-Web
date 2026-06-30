import { useRef, useEffect } from 'react'

export const AmbientCanvas = ({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let t = 0

    const resize = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const orbs = [
      { x: 0.0, y: 0.0, r: 350, a: 0.22, xA: 60, yA: -40, xD: 10, yD: 7 },
      { x: 1.0, y: 1.0, r: 300, a: 0.18, xA: -50, yA: 50, xD: 13, yD: 9 },
      { x: 0.9, y: 0.33, r: 128, a: 0.28, xA: 35, yA: -30, xD: 8, yD: 12 },
      { x: 0.08, y: 0.66, r: 96, a: 0.24, xA: -40, yA: 45, xD: 11, yD: 8 }
    ]

    const draw = () => {
      t += 0.016
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      orbs.forEach(o => {
        const ox = o.x * w + Math.sin(t / o.xD) * o.xA
        const oy = o.y * h + Math.sin(t / o.yD) * o.yA
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r)
        g.addColorStop(0, `rgba(201,170,101,${o.a})`)
        g.addColorStop(0.45, `rgba(201,170,101,0.03)`)
        g.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(ox, oy, o.r, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [containerRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: -1, display: 'block'
      }}
    />
  )
}
