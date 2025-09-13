'use client'
import React from 'react'

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Slider({ className = '', ...props }: SliderProps) {
  return (
    <input
      type="range"
      className={`w-full cursor-pointer ${className}`}
      {...props}
    />
  )
}