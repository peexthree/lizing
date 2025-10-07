'use client'

import Balatro from '@/components/Balatro'

/**
 * Renders the animated Balatro shader as the global site background.
 * Gradient overlays preserve the neon amber & ultraviolet palette
 * and provide a graceful fallback while the shader boots or if WebGL fails.
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
        color1="#FF8A3D"
        color2="#e2be32ff"
        color3="#12061E"
        contrast={3.55}
        lighting={0.38}
        spinEase={1.15}
        mouseInteraction={false}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0718] via-[#110b24] to-[#180d2e] opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(255,138,61,0.3),transparent_55%),radial-gradient(circle_at_78%_18%,rgba(166,77,255,0.26),transparent_58%),radial-gradient(circle_at_46%_78%,rgba(18,6,30,0.22),transparent_68%)] mix-blend-screen opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_44%_0%,rgba(255,138,61,0.22),transparent_58%),radial-gradient(circle_at_16%_84%,rgba(166,77,255,0.18),transparent_70%),radial-gradient(circle_at_82%_76%,rgba(21,8,32,0.36),transparent_72%)] mix-blend-plus-lighter opacity-70" />
    </div>
  )
}

export default GlobalBackground