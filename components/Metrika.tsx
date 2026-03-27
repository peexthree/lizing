'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function MetrikaTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    // @ts-ignore
    if (typeof window !== 'undefined' && window.ym) {
      // @ts-ignore
      window.ym(108276915, 'hit', url);
    }
  }, [pathname, searchParams]);

  return null;
}

export function Metrika() {
    return (
        <Suspense fallback={null}>
            <MetrikaTracker />
        </Suspense>
    );
}
