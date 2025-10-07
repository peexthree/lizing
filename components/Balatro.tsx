use client'

import clsx from 'clsx'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import { useEffect, useRef } from 'react'

interface BalatroProps {
  className?: string
  spinRotation?: number
  spinSpeed?: number
  offset?: [number, number]
  color1?: string
  color2?: string
  color3?: string
  contrast?: number
  lighting?: number
  spinAmount?: number
  pixelFilter?: number
  spinEase?: number
  isRotate?: boolean
  mouseInteraction?: boolean
}

const hexToVec4 = (hex: string): [number, number, number, number] => {
  const hexStr = hex.replace('#', '')
  let r = 0
  let g = 0
  let b = 0
  let a = 1

  if (hexStr.length === 6 || hexStr.length === 8) {
    r = parseInt(hexStr.slice(0, 2), 16) / 255
    g = parseInt(hexStr.slice(2, 4), 16) / 255
    b = parseInt(hexStr.slice(4, 6), 16) / 255
  }

  if (hexStr.length === 8) {
    a = parseInt(hexStr.slice(6, 8), 16) / 255
  }

  return [r, g, b, a]
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShader = `
precision highp float;

#define PI 3.14159265359

uniform float iTime;
uniform vec3 iResolution;
uniform float uSpinRotation;
uniform float uSpinSpeed;
uniform vec2 uOffset;
uniform vec4 uColor1;
uniform vec4 uColor2;
uniform vec4 uColor3;
uniform float uContrast;
uniform float uLighting;
uniform float uSpinAmount;
uniform float uPixelFilter;
uniform float uSpinEase;
uniform bool uIsRotate;
uniform vec2 uMouse;

varying vec2 vUv;

vec4 effect(vec2 screenSize, vec2 screen_coords) {
    float pixel_size = length(screenSize.xy) / uPixelFilter;
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;
    float uv_len = length(uv);

    float speed = (uSpinRotation * uSpinEase * 0.2);
    if(uIsRotate){
       speed = iTime * speed;
    }
    speed += 302.2;

    float mouseInfluence = (uMouse.x * 2.0 - 1.0);
    speed += mouseInfluence * 0.1;

    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);

    uv *= 30.0;
    float baseSpeed = iTime * uSpinSpeed;
    speed = baseSpeed + mouseInfluence * 2.0;

    vec2 uv2 = vec2(uv.x + uv.y);

    for(int i = 0; i < 5; i++) {
        uv2 += sin(max(uv.x, uv.y)) + uv;
        uv += 0.5 * vec2(
            cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),
            sin(uv2.x - 0.113 * speed)
        );
        uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);
    }

    float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
    float c3p = 1.0 - min(1.0, c1p + c2p);
    float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);

    return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;
}

void main() {
    vec2 uv = vUv * iResolution.xy;
    gl_FragColor = effect(iResolution.xy, uv);
}
`

const FALLBACK_BACKGROUND =
  'radial-gradient(circle at 18% 20%, rgba(234,179,8,0.18), transparent 55%), radial-gradient(circle at 82% 16%, rgba(255,214,142,0.16), transparent 60%), radial-gradient(circle at 52% 78%, rgba(156,107,26,0.12), transparent 65%), linear-gradient(145deg, rgba(6,6,10,0.92), rgba(5,5,8,0.9))'

export default function Balatro({
  className,
  spinRotation = -2.0,
  spinSpeed = 7.0,
  offset = [0.0, 0.0],
  color1 = '#DE443B',
  color2 = '#006BB4',
  color3 = '#162325',
  contrast = 3.5,
  lighting = 0.4,
  spinAmount = 0.25,
  pixelFilter = 745.0,
  spinEase = 1.0,
  isRotate = false,
  mouseInteraction = true,
}: BalatroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const rendererRef = useRef<Renderer | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    container.style.backgroundImage = FALLBACK_BACKGROUND

    let renderer: Renderer
    try {
      renderer = new Renderer({ alpha: true })
    } catch (error) {
      console.error('Balatro shader: WebGL initialization failed', error)
      container.dataset.webgl = 'unsupported'
      return
    }

    rendererRef.current = renderer
    const { gl } = renderer
    const canvas = gl.canvas

    Object.assign(canvas.style, {
      display: 'block',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      pointerEvents: 'none',
    })

    gl.clearColor(0, 0, 0, 1)

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height],
        },
        uSpinRotation: { value: spinRotation },
        uSpinSpeed: { value: spinSpeed },
        uOffset: { value: offset },
        uColor1: { value: hexToVec4(color1) },
        uColor2: { value: hexToVec4(color2) },
        uColor3: { value: hexToVec4(color3) },
        uContrast: { value: contrast },
        uLighting: { value: lighting },
        uSpinAmount: { value: spinAmount },
        uPixelFilter: { value: pixelFilter },
        uSpinEase: { value: spinEase },
        uIsRotate: { value: isRotate },
        uMouse: { value: [0.5, 0.5] },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })

    const resize = () => {
      if (!container.offsetWidth || !container.offsetHeight) {
        return
      }

      renderer.setSize(container.offsetWidth, container.offsetHeight)
      program.uniforms.iResolution.value = [
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height,
      ]
    }

    const handleResize = () => {
      window.requestAnimationFrame(resize)
    }

    resize()
    window.addEventListener('resize', handleResize)

    let animationFrameId: number | null = null
    const update = (time: number) => {
      animationFrameId = window.requestAnimationFrame(update)
      program.uniforms.iTime.value = time * 0.001
      renderer.render({ scene: mesh })
    }

    animationFrameId = window.requestAnimationFrame(update)
    container.appendChild(canvas)
    container.dataset.webgl = 'active'
    container.style.backgroundImage = 'none'

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = 1.0 - (event.clientY - rect.top) / rect.height
      program.uniforms.uMouse.value = [x, y]
    }

    if (mouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
      }

      window.removeEventListener('resize', handleResize)
      if (mouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove)
      }

      if (canvas.parentElement === container) {
        container.removeChild(canvas)
      }

      gl.getExtension('WEBGL_lose_context')?.loseContext()
      rendererRef.current = null
      container.dataset.webgl = 'released'
      container.style.backgroundImage = FALLBACK_BACKGROUND
    }
  }, [
    contrast,
    color1,
    color2,
    color3,
    isRotate,
    lighting,
    mouseInteraction,
    offset,
    pixelFilter,
    spinAmount,
    spinEase,
    spinRotation,
    spinSpeed,
  ])

  useEffect(
    () => () => {
      const renderer = rendererRef.current
      if (renderer) {
        renderer.gl?.getExtension('WEBGL_lose_context')?.loseContext()
      }
    },
    [],
  )

  return (
    <div
      ref={containerRef}
      className={clsx(
        'absolute inset-0 h-full w-full overflow-hidden',
        !mouseInteraction && 'pointer-events-none',
        className,
      )}
      aria-hidden
    />
  )
}
