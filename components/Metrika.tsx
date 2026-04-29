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

import Script from 'next/script';

export function Metrika() {
    return (
        <>
            <Script id="yandex-metrika" strategy="afterInteractive">
                {`
                    (function(m,e,t,r,i,k,a){
                        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();
                        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108276915', 'ym');

                    ym(108276915, 'init', {
                        defer: true,
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true,
                        webvisor: true
                    });
                `}
            </Script>
            <noscript>
                <div>
                    <img
                        src="https://mc.yandex.ru/watch/108276915"
                        style={{ position: 'absolute', left: '-9999px' }}
                        alt=""
                    />
                </div>
            </noscript>
            <Suspense fallback={null}>
                <MetrikaTracker />
            </Suspense>
        </>
    );
}
