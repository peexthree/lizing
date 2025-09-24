// src/components/calculator/ui/Slider.tsx

'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
const SCROLLABLE_OVERFLOW = /(auto|scroll)/i;

function findScrollableContainer(element: HTMLElement): HTMLElement | null {
  if (typeof window === 'undefined') return null;

  const ownerDocument = element.ownerDocument;
  let current: HTMLElement | null = element.parentElement;

  while (current && current !== ownerDocument.documentElement) {
    const style = window.getComputedStyle(current);
    const overflowY = style.overflowY || style.overflow;
    const hasScrollableContent = current.scrollHeight > current.clientHeight;

    if (hasScrollableContent && SCROLLABLE_OVERFLOW.test(overflowY)) {
      return current;
    }

    current = current.parentElement;
  }

  return (ownerDocument.scrollingElement as HTMLElement | null) ?? ownerDocument.documentElement;
}


const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, onWheel, ...props }, ref) => {
  const handleWheel = React.useCallback(
(event: React.WheelEvent<HTMLDivElement>) => {
      if (onWheel) {
        onWheel(event);
        if (event.defaultPrevented) {
          return;
        }
      }

       if (event.ctrlKey || event.metaKey) return;

      const target = event.currentTarget as HTMLElement | null;
      if (!target) return;

      const scrollContainer = findScrollableContainer(target);
      if (!scrollContainer) return;

      const { deltaX, deltaY } = event;
      if (deltaX === 0 && deltaY === 0) return;

      event.preventDefault();
      scrollContainer.scrollBy({ left: deltaX, top: deltaY, behavior: 'auto' });
    },
    [onWheel]
  );

  return (
    <SliderPrimitive.Root
      ref={ref}
      onWheel={handleWheel}
      className={`relative flex w-full touch-none select-none items-center ${className ?? ''}`}
      {...props}
    >
        <SliderPrimitive.Track className="relative h-[2px] w-full grow overflow-hidden rounded-full bg-white/10">
        <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-accent via-accent to-accent-alt" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full border border-white bg-accent shadow-[0_6px_14px_-6px_rgba(212,175,55,0.55)] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export default Slider;