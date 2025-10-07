'use client'

import Balatro from '@/components/Balatro'

/**
 * Renders the animated Balatro shader as the global site background.
 * Gradient overlays stay on top to preserve the warm palette and
 * ensure a graceful fallback while the shader boots or if WebGL fails.
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
        color1="#11131A"
        color2="#0F1F3A"
        color3="#0A0C12"
        contrast={3.4}
        lighting={0.35}
        spinEase={1.15}
        mouseInteraction={false}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#050506] via-[#09090f] to-[#06060a] opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(234,179,8,0.22),transparent_55%),radial-gradient(circle_at_82%_18%,rgba(255,214,142,0.2),transparent_58%),radial-gradient(circle_at_48%_78%,rgba(156,107,26,0.16),transparent_65%)] mix-blend-screen opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(253,230,167,0.25),transparent_58%),radial-gradient(circle_at_12%_82%,rgba(234,179,8,0.18),transparent_68%),radial-gradient(circle_at_84%_76%,rgba(8,8,12,0.28),transparent_70%)] mix-blend-plus-lighter opacity-70" />
    </div>
  )
}

export default GlobalBackground