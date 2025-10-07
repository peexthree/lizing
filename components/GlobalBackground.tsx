'use client'

import Balatro from '@/components/Balatro'

/**
 * Renders the animated Balatro shader as the global site background.
 * Gradient overlays stay on top to preserve the deep crimson & cobalt palette
 * and ensure a graceful fallback while the shader boots or if WebGL fails.
 */
const GlobalBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <Balatro
        className="absolute inset-0"
        spinRotation={-2.1}
        spinSpeed={6.5}
        spinAmount={0.32}
        pixelFilter={680}
        color1="#DE443B"
        color2="#006BB4"
        color3="#162325"
        contrast={3.4}
        lighting={0.35}
        spinEase={1.15}
        mouseInteraction={false}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1016] via-[#0c141c] to-[#0a0c12] opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(222,68,59,0.28),transparent_55%),radial-gradient(circle_at_78%_22%,rgba(0,107,180,0.24),transparent_58%),radial-gradient(circle_at_48%_78%,rgba(22,35,37,0.2),transparent_65%)] mix-blend-screen opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(222,68,59,0.2),transparent_58%),radial-gradient(circle_at_16%_82%,rgba(0,107,180,0.16),transparent_68%),radial-gradient(circle_at_82%_76%,rgba(10,16,22,0.32),transparent_70%)] mix-blend-plus-lighter opacity-70" />
    </div>
  )
}

export default GlobalBackground