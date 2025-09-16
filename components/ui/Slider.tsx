'use client'

import { forwardRef, memo } from 'react'

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Slider = memo(
  forwardRef<HTMLInputElement, SliderProps>(function Slider({ className = '', ...props }, ref) {
    return <input ref={ref} type="range" className={`w-full cursor-pointer ${className}`} {...props} />
  })
)

export default Slider
