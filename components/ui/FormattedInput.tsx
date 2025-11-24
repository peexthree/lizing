'use client'

import React, { useState, useEffect, ChangeEvent } from 'react'

interface FormattedInputProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const parseNumber = (str: string): number => {
  return parseInt(str.replace(/\s/g, ''), 10) || 0
}

const FormattedInput: React.FC<FormattedInputProps> = ({ value, onChange, className }) => {
  const [displayValue, setDisplayValue] = useState(formatNumber(value))

  useEffect(() => {
    // Update display value when the parent's value changes (e.g., from the slider)
    setDisplayValue(formatNumber(value))
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const numericValue = parseNumber(rawValue)
    
    // Update parent state
    onChange(numericValue)
    
    // Update local display state to keep the formatted string
    setDisplayValue(rawValue === '' ? '' : formatNumber(numericValue))
  }

  const handleBlur = () => {
    // On blur, ensure the display value is correctly formatted from the source of truth (parent state)
    setDisplayValue(formatNumber(value))
  }

  return (
    <input
      type="text"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      className={className}
    />
  )
}

export default FormattedInput
