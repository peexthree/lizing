'use client'

import { useRef, useEffect } from 'react'

const Hyperspeed = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let stars: { x: number; y: number; z: number }[] = []
    const numStars = 1000
    let speed = 5

    const setup = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      stars = []
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * canvas.width,
        })
      }
    }

    const draw = () => {
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        star.z -= speed

        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - canvas.width / 2
          star.y = Math.random() * canvas.height - canvas.height / 2
          star.z = canvas.width
        }

        const k = 128 / star.z
        const px = star.x * k
        const py = star.y * k
        const size = (1 - star.z / canvas.width) * 3

        ctx.beginPath()
        ctx.arc(px, py, size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.fill()
      }
      ctx.restore()
      requestAnimationFrame(draw)
    }

    const handleResize = () => {
      setup()
    }

    window.addEventListener('resize', handleResize)
    setup()
    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-50" />
}

export default Hyperspeed
