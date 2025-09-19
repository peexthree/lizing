// src/components/calculator/ui/Slider.tsx

'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={`relative flex w-full touch-none select-none items-center ${className ?? ''}`}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[2px] w-full grow overflow-hidden rounded-full bg-dark/10">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-accent to-blue-500" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full border border-white bg-accent shadow-[0_6px_14px_-6px_rgba(30,102,255,0.65)] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

export default Slider;