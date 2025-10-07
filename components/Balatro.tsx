'use client'

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

// Fragment shader generating a silky, animated gradient inspired by Balatro's ambience.
const fragmentShader = `
precision highp float;

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

mat2 rotation(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rot = rotation(0.5);
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = rot * p * 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 screen = vUv * iResolution.xy;
  float pixelSize = max(1.0, length(iResolution.xy) / max(uPixelFilter, 1.0));
  screen = floor(screen / pixelSize) * pixelSize + pixelSize * 0.5;

  vec2 uv = screen / iResolution.y;
  uv -= vec2(iResolution.x / iResolution.y * 0.5, 0.5);
  uv -= uOffset;

  vec2 mouse = (uMouse - 0.5) * 2.0;
  float timeFactor = iTime * (0.15 + uSpinSpeed * 0.12);
  float rotationAmount = (uSpinRotation * 0.05 + mouse.x * 0.15) * mix(0.35, 1.3, clamp(uSpinEase, 0.0, 2.0));
  if (uIsRotate) {
    rotationAmount += timeFactor;
  }

  uv = rotation(rotationAmount) * uv;
  float radius = length(uv);
  float swirlStrength = mix(0.35, 1.65, clamp(uSpinAmount, 0.0, 1.0));
  float angle = atan(uv.y, uv.x) * swirlStrength;

  vec2 flowUv = rotation(timeFactor * 0.35) * uv;
  flowUv += vec2(angle * 0.45, radius * 1.2);
  flowUv += mouse * 0.2;
  flowUv *= mix(0.9, 2.4, clamp(1200.0 / max(uPixelFilter, 1.0), 0.0, 1.0));

  float flowNoise = fbm(flowUv + timeFactor) - 0.5;
  float wave = sin(angle * 3.0 - timeFactor * 2.5) * 0.5 + 0.5;
  float bloom = smoothstep(0.95, 0.1, radius + flowNoise * 0.18 - wave * 0.12);

  float gradientKey = clamp(radius * 0.85 + flowNoise * 0.25, 0.0, 1.2);
  vec3 baseColor = mix(uColor3.rgb, uColor2.rgb, gradientKey);
  vec3 highlightColor = mix(uColor2.rgb, uColor1.rgb, wave);
  vec3 color = mix(baseColor, highlightColor, bloom);

  float lightingStrength = mix(0.35, 1.35, clamp(uLighting, 0.0, 1.5));
  color += lightingStrength * vec3(pow(1.0 - clamp(radius, 0.0, 1.0), 2.0)) * (0.4 + 0.6 * wave);

  float contrastStrength = mix(0.75, 1.75, clamp(uContrast / 4.0, 0.0, 1.5));
  color = pow(color, vec3(1.0 / contrastStrength));

  float vignette = smoothstep(1.2, 0.35, radius + flowNoise * 0.1);
  color = mix(color * 0.85, color, vignette);

  color = clamp(color, 0.0, 1.0);
  float alpha = clamp((uColor1.a + uColor2.a + uColor3.a) / 3.0, 0.35, 1.0);
  gl_FragColor = vec4(color, alpha);
}
`

const FALLBACK_BACKGROUND =
  'radial-gradient(circle at 18% 20%, rgba(222,68,59,0.22), transparent 55%), radial-gradient(circle at 78% 18%, rgba(0,107,180,0.18), transparent 60%), radial-gradient(circle at 52% 78%, rgba(22,35,37,0.14), transparent 65%), linear-gradient(145deg, rgba(9,13,19,0.94), rgba(10,12,18,0.92))'

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
      renderer = new Renderer({ alpha: true, antialias: false })
    } catch (error) {
      console.error('Balatro shader: WebGL initialization failed', error)
      container.dataset.webgl = 'unsupported'
      return
    }

    const getDpr = () => Math.min(window.devicePixelRatio || 1, 1.8)

    rendererRef.current = renderer
    renderer.dpr = getDpr()

    const { gl } = renderer
    const canvas = gl.canvas as HTMLCanvasElement

    Object.assign(canvas.style, {
      display: 'block',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      pointerEvents: 'none',
    })

    canvas.setAttribute('aria-hidden', 'true')

    gl.clearColor(0, 0, 0, 1)

    const geometry = new Triangle(gl)

    let program: Program
    try {
      program = new Program(gl, {
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
    } catch (error) {
      console.error('Balatro shader: shader compilation failed', error)
      container.dataset.webgl = 'error'
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      rendererRef.current = null
      return
    }

    const mesh = new Mesh(gl, { geometry, program })

    const resize = () => {
      if (!container.offsetWidth || !container.offsetHeight) {
        return
      }

      renderer.dpr = getDpr()
      renderer.setSize(container.offsetWidth, container.offsetHeight)
      program.uniforms.iResolution.value = [
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height,
      ]
    }

    const scheduleResize = () => {
      window.requestAnimationFrame(resize)
    }

    resize()

    let resizeObserver: ResizeObserver | null = null

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        scheduleResize()
      })
      resizeObserver.observe(container)
    } else {
      window.addEventListener('resize', scheduleResize)
    }

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
      container.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
      }

      if (resizeObserver) {
        resizeObserver.disconnect()
      } else {
        window.removeEventListener('resize', scheduleResize)
      }

      if (mouseInteraction) {
        container.removeEventListener('mousemove', handleMouseMove)
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
      'absolute inset-0 h-full w-full overflow-hidden bg-[#0b1016]',
        !mouseInteraction && 'pointer-events-none',
        className,
      )}
      aria-hidden
    />
  )
}